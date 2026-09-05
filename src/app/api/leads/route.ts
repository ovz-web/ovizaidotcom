import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseServer';
import { sendTeamNotification, sendProspectConfirmation, maskEmail } from '@/lib/mail';
import { checkRateLimit } from '@/lib/rateLimit';
import { sanitizeString, sanitizeEmail } from '@/lib/sanitize';

export async function POST(req: NextRequest) {
  try {
    const rateLimit = await checkRateLimit(req, 'leads', { limit: 5, windowMs: 60_000 });
    if (!rateLimit.success) {
      return NextResponse.json(
        { error: 'Trop de requêtes. Veuillez patienter avant de réessayer' },
        {
          status: 429,
          headers: {
            'Retry-After': String(rateLimit.resetInSeconds),
          },
        }
      );
    }

    const body = await req.json().catch(() => ({}));
    const { email, name, projectType, budgetRange, currency, message, company, website } = body;
    const sourcePlan = body.sourcePlan || body.originPlan;

    // Honeypot anti-spam: silent success if hidden company or website field is populated
    const isSpam = (val: any) => val !== undefined && val !== null && String(val).trim() !== '';
    if (isSpam(company) || isSpam(website)) {
      return NextResponse.json(
        { status: 'subscribed' },
        { status: 200 }
      );
    }

    const cleanEmail = sanitizeEmail(email);
    if (!cleanEmail) {
      return NextResponse.json(
        { error: 'Adresse e-mail invalide (format RFC 5322 requis)' },
        { status: 400 }
      );
    }

    const cleanName = name ? sanitizeString(name, 100) : null;
    const cleanMessage = message ? sanitizeString(message, 3000) : null;
    const cleanCurrency = typeof currency === 'string' && ['USD', 'EUR', 'CAD'].includes(currency.toUpperCase())
      ? currency.toUpperCase()
      : 'USD';
    const cleanProjectType = projectType ? sanitizeString(projectType, 150) : null;
    const cleanBudgetRange = budgetRange ? sanitizeString(budgetRange, 100) : null;
    const cleanSourcePlan = sourcePlan ? sanitizeString(sourcePlan, 50) : null;

    // Insert into Supabase leads table — persist the FULL qualified brief.
    const { data, error } = await supabaseAdmin
      .from('leads')
      .insert([{
        email: cleanEmail,
        name: cleanName,
        project_type: cleanProjectType,
        budget_range: cleanBudgetRange,
        currency: cleanCurrency,
        message: cleanMessage,
        source_plan: cleanSourcePlan,
      }])
      .select();

    if (error) {
      if (error.code === '23505') {
        return NextResponse.json(
          { status: 'already_subscribed', message: 'E-mail déjà inscrit' },
          { status: 200 }
        );
      }
      console.error(`[SUPABASE ERROR] Lead insert failed for ${maskEmail(cleanEmail)}:`, error.message);
      return NextResponse.json(
        { error: 'Erreur lors de l’enregistrement de l’e-mail' },
        { status: 500 }
      );
    }

    // Dispatch transactional email notifications in background (non-blocking)
    sendTeamNotification({
      email: cleanEmail,
      name,
      projectType,
      budgetRange,
      currency,
      message,
    }).catch(err => console.error(`[MAIL ERROR] Team notification error for ${maskEmail(cleanEmail)}:`, err));

    sendProspectConfirmation(cleanEmail, name).catch(err =>
      console.error(`[MAIL ERROR] Prospect confirmation error for ${maskEmail(cleanEmail)}:`, err)
    );

    return NextResponse.json(
      { status: 'subscribed', data },
      { status: 201 }
    );
  } catch (err: any) {
    console.error('API /api/leads Catch Error:', err);
    return NextResponse.json(
      { error: 'Erreur serveur interne' },
      { status: 500 }
    );
  }
}
