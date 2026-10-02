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
        { error: 'Trop de requêtes. Veuillez patienter avant de réessayer.' },
        {
          status: 429,
          headers: {
            'Retry-After': String(rateLimit.resetInSeconds),
          },
        }
      );
    }

    const body = await req.json().catch(() => ({}));
    const {
      email,
      name,
      company,
      promotionTarget,
      projectType,
      budgetRange,
      currency,
      message,
      links,
      deadline,
      bot_hp,
      source = 'project_inquiry',
    } = body;

    // Strict Honeypot: Silent success if invisible bot_hp field is populated
    if (bot_hp && String(bot_hp).trim() !== '') {
      return NextResponse.json({ status: 'success' }, { status: 200 });
    }

    const cleanEmail = sanitizeEmail(email);
    if (!cleanEmail) {
      return NextResponse.json(
        { error: 'Adresse e-mail valide requise.' },
        { status: 400 }
      );
    }

    const cleanName = name ? sanitizeString(name, 100) : null;
    const cleanCompany = company ? sanitizeString(company, 150) : null;
    const cleanPromotionTarget = promotionTarget ? sanitizeString(promotionTarget, 200) : null;
    const cleanLinks = links ? sanitizeString(links, 300) : null;
    const cleanDeadline = deadline ? sanitizeString(deadline, 100) : null;
    const rawMessage = message ? sanitizeString(message, 3000) : null;

    // Structured message compilation
    const messageParts = [
      cleanCompany ? `Entreprise / Marque : ${cleanCompany}` : null,
      cleanPromotionTarget ? `Élément à promouvoir : ${cleanPromotionTarget}` : null,
      cleanLinks ? `Lien produit / site / références : ${cleanLinks}` : null,
      cleanDeadline ? `Délai souhaité : ${cleanDeadline}` : null,
      rawMessage ? `Détails & notes complémentaires :\n${rawMessage}` : null,
    ].filter(Boolean);
    const cleanMessage = messageParts.length > 0 ? messageParts.join('\n\n') : 'Demande via formulaire de contact.';

    const cleanCurrency = typeof currency === 'string' && ['USD', 'EUR', 'CAD'].includes(currency.toUpperCase())
      ? currency.toUpperCase()
      : 'USD';
    const cleanProjectType = projectType ? sanitizeString(projectType, 150) : (cleanPromotionTarget || 'Publicité');
    const cleanBudgetRange = budgetRange ? sanitizeString(budgetRange, 100) : 'Offre de Lancement (530 USD)';

    let dbSaved = false;

    // 1. Supabase Persistence
    try {
      // Attempt insert
      const { error: insertError } = await supabaseAdmin
        .from('leads')
        .insert([{
          email: cleanEmail,
          name: cleanName ? (cleanCompany ? `${cleanName} (${cleanCompany})` : cleanName) : cleanCompany,
          project_type: cleanProjectType,
          budget_range: cleanBudgetRange,
          currency: cleanCurrency,
          message: cleanMessage,
          source_plan: source,
        }]);

      if (insertError) {
        // If email already exists (code 23505 unique constraint violation):
        // Update the existing contact with new brief details so returning clients are never blocked!
        if (insertError.code === '23505') {
          const { error: updateError } = await supabaseAdmin
            .from('leads')
            .update({
              name: cleanName ? (cleanCompany ? `${cleanName} (${cleanCompany})` : cleanName) : cleanCompany,
              project_type: cleanProjectType,
              budget_range: cleanBudgetRange,
              currency: cleanCurrency,
              message: cleanMessage,
            })
            .eq('email', cleanEmail);

          if (!updateError) {
            dbSaved = true;
          } else {
            console.error(`[SUPABASE UPDATE ERROR] Failed for ${maskEmail(cleanEmail)}:`, updateError.message);
          }
        } else {
          console.error(`[SUPABASE INSERT ERROR] Failed for ${maskEmail(cleanEmail)}:`, insertError.message);
        }
      } else {
        dbSaved = true;
      }
    } catch (dbErr: any) {
      console.error(`[SUPABASE EXCEPTION] Connection failed for ${maskEmail(cleanEmail)}:`, dbErr?.message || dbErr);
    }

    // 2. Transactional Email Notification via Resend
    let emailDispatched = false;
    try {
      const mailResult = await sendTeamNotification({
        email: cleanEmail,
        name: cleanName || cleanCompany || 'Nouveau Prospect',
        projectType: cleanProjectType,
        budgetRange: cleanBudgetRange,
        currency: cleanCurrency,
        message: cleanMessage,
      });

      if (mailResult && mailResult.success) {
        emailDispatched = true;
      }
    } catch (mailErr: any) {
      console.error(`[MAIL ERROR] Team notification error for ${maskEmail(cleanEmail)}:`, mailErr?.message || mailErr);
    }

    // Non-blocking prospect confirmation email
    sendProspectConfirmation(cleanEmail, cleanName || undefined).catch((err) =>
      console.error(`[MAIL ERROR] Prospect confirmation error for ${maskEmail(cleanEmail)}:`, err)
    );

    // 3. Robust Error Handling: If neither DB nor Email succeeded, DO NOT pretend it succeeded!
    if (!dbSaved && !emailDispatched) {
      console.error(`[CRITICAL] Lead failed both DB and Email for ${maskEmail(cleanEmail)}`);
      return NextResponse.json(
        {
          error:
            'Une erreur technique temporaire est survenue lors de l’enregistrement de votre brief. Veuillez nous contacter directement par e-mail à contact@ovizai.com.',
        },
        { status: 503 }
      );
    }

    return NextResponse.json(
      {
        status: 'success',
        message: 'Brief reçu. Nous revenons vers vous avec la prochaine étape.',
      },
      { status: 201 }
    );
  } catch (err: any) {
    console.error('API /api/leads Catch Error:', err);
    return NextResponse.json(
      { error: 'Erreur serveur interne. Veuillez réessayer ou contacter contact@ovizai.com.' },
      { status: 500 }
    );
  }
}
