import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseServer';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Adresse e-mail invalide' },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();

    // Insert into Supabase leads table
    const { data, error } = await supabaseAdmin
      .from('leads')
      .insert([{ email: cleanEmail }])
      .select();

    if (error) {
      // 23505 is PostgreSQL unique constraint violation
      if (error.code === '23505') {
        return NextResponse.json(
          { status: 'already_subscribed', message: 'E-mail déjà inscrit' },
          { status: 200 }
        );
      }
      console.error('Supabase Lead Insert Error:', error);
      return NextResponse.json(
        { error: 'Erreur lors de l’enregistrement de l’e-mail', details: error.message },
        { status: 500 }
      );
    }

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
