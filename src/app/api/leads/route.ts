import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseServer';
import { sendTeamNotification, sendProspectConfirmation, maskEmail } from '@/lib/mail';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, name, projectType, budgetRange, currency, message, company, website, sourcePlan } = body;

    // Honeypot anti-spam: silent success if hidden company or website field is populated
    const isSpam = (val: any) => val !== undefined && val !== null && String(val).trim() !== '';
    if (isSpam(company) || isSpam(website)) {
      return NextResponse.json(
        { status: 'subscribed' },
        { status: 200 }
      );
    }

    const RFC5322_EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email || typeof email !== 'string' || !RFC5322_EMAIL_REGEX.test(email.trim())) {
      return NextResponse.json(
        { error: 'Adresse e-mail invalide (format RFC 5322 requis)' },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanName = typeof name === 'string' ? name.trim().slice(0, 100) : null;
    const cleanMessage = typeof message === 'string' ? message.trim().slice(0, 3000) : null;
    const cleanCurrency = typeof currency === 'string' && ['USD', 'EUR', 'CAD'].includes(currency.toUpperCase())
      ? currency.toUpperCase()
      : 'USD';
    const cleanProjectType = typeof projectType === 'string' ? projectType.slice(0, 150) : null;
    const cleanBudgetRange = typeof budgetRange === 'string' ? budgetRange.slice(0, 100) : null;
    const cleanSourcePlan = typeof sourcePlan === 'string' ? sourcePlan.slice(0, 50) : null;

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
