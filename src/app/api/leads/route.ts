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
    const { email, name, projectType, budgetRange, currency, message, company, website, bot_hp } = body;
    const sourcePlan = body.sourcePlan || body.originPlan;

    // Honeypot anti-spam: silent success if hidden bot_hp field is populated
    if (bot_hp && String(bot_hp).trim() !== '') {
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
    const cleanCompany = company ? sanitizeString(company, 150) : null;
    const cleanWebsite = website ? sanitizeString(website, 250) : null;
    const rawMessage = message ? sanitizeString(message, 3000) : null;

    const messageParts = [
      cleanCompany ? `Entreprise / Marque : ${cleanCompany}` : null,
      cleanWebsite ? `Lien produit / site : ${cleanWebsite}` : null,
      rawMessage ? `Détails du brief :\n${rawMessage}` : null,
    ].filter(Boolean);
    const cleanMessage = messageParts.length > 0 ? messageParts.join('\n\n') : null;

    const cleanCurrency = typeof currency === 'string' && ['USD', 'EUR', 'CAD'].includes(currency.toUpperCase())
      ? currency.toUpperCase()
      : 'USD';
    const cleanProjectType = projectType ? sanitizeString(projectType, 150) : null;
    const cleanBudgetRange = budgetRange ? sanitizeString(budgetRange, 100) : null;
    const cleanSourcePlan = sourcePlan ? sanitizeString(sourcePlan, 50) : null;

    // Insert into Supabase leads table — persist the FULL qualified brief.
    let dbSuccess = false;
    let dbData: any = null;

    try {
      const { data, error } = await supabaseAdmin
        .from('leads')
        .insert([{
          email: cleanEmail,
          name: cleanName ? (cleanCompany ? `${cleanName} (${cleanCompany})` : cleanName) : cleanCompany,
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
      } else {
        dbSuccess = true;
        dbData = data;
      }
    } catch (dbErr: any) {
      console.error(`[SUPABASE EXCEPTION] Connection failed for ${maskEmail(cleanEmail)}:`, dbErr?.message || dbErr);
    }

    // Dispatch transactional email notifications (non-blocking prospect, awaiting team)
    const mailResult = await sendTeamNotification({
      email: cleanEmail,
      name,
      projectType,
      budgetRange,
      currency,
      message,
    }).catch(err => {
      console.error(`[MAIL ERROR] Team notification error for ${maskEmail(cleanEmail)}:`, err);
      return { success: false, reason: err?.message };
    });

    sendProspectConfirmation(cleanEmail, name).catch(err =>
      console.error(`[MAIL ERROR] Prospect confirmation error for ${maskEmail(cleanEmail)}:`, err)
    );

    // Fallback persistence: if external database or email fails, persist to disk so lead is never lost
    if (!dbSuccess && (!mailResult || !mailResult.success)) {
      try {
        const fs = await import('fs');
        const fallbackLead = {
          timestamp: new Date().toISOString(),
          email: cleanEmail,
          name: cleanName,
          projectType: cleanProjectType,
          budgetRange: cleanBudgetRange,
          currency: cleanCurrency,
          message: cleanMessage,
        };
        fs.appendFileSync('/tmp/ovizai_leads_fallback.jsonl', JSON.stringify(fallbackLead) + '\n');
        console.warn(`[LEAD SAVED LOCALLY] Lead stored in /tmp/ovizai_leads_fallback.jsonl for ${maskEmail(cleanEmail)}`);
      } catch (fErr) {
        console.error('[LEAD FALLBACK ERROR]', fErr);
      }
    }

    return NextResponse.json(
      { status: 'subscribed', data: dbData || { saved: 'local_fallback' } },
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
