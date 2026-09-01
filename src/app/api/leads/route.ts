import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseServer';
import { sendTeamNotification, sendProspectConfirmation, maskEmail } from '@/lib/mail';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, name, projectType, budgetRange, currency, message } = body;

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Adresse e-mail invalide' },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();

    // Insert into Supabase leads table — persist the FULL qualified brief.
    const { data, error } = await supabaseAdmin
      .from('leads')
      .insert([{
        email: cleanEmail,
        name: typeof name === 'string' ? name.trim() : null,
        project_type: typeof projectType === 'string' ? projectType : null,
        budget_range: typeof budgetRange === 'string' ? budgetRange : null,
        currency: typeof currency === 'string' ? currency : null,
        message: typeof message === 'string' ? message.trim() : null,
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
        { error: 'Erreur lors de l’enregistrement de l’e-mail', details: error.message },
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
      { error: 'Erreur serveur interne', details: err.message },
      { status: 500 }
    );
  }
}
