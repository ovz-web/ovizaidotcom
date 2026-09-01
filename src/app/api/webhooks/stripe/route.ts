import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { supabaseAdmin } from '@/lib/supabaseServer';
import { sendMasterclassWelcome, sendMasterclassSaleNotification, maskEmail } from '@/lib/mail';

export async function POST(req: NextRequest) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const apiKey = process.env.STRIPE_SECRET_KEY;

  if (!apiKey || !webhookSecret) {
    console.error('[STRIPE WEBHOOK ERROR] Missing STRIPE_SECRET_KEY or STRIPE_WEBHOOK_SECRET');
    return NextResponse.json(
      { error: 'Webhook configuration incomplete.' },
      { status: 500 }
    );
  }

  const stripe = new Stripe(apiKey, {
    apiVersion: '2024-06-20' as any,
  });

  const body = await req.text();
  const signature = req.headers.get('stripe-signature') || '';

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: any) {
    console.error(`[STRIPE WEBHOOK SIGNATURE ERROR] ${err.message}`);
    return NextResponse.json(
      { error: `Webhook Signature Verification Failed: ${err.message}` },
      { status: 400 }
    );
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    const customerEmail = session.customer_details?.email || session.customer_email;
    const customerName = session.customer_details?.name || 'Étudiant Masterclass';
    const amountTotal = session.amount_total ? session.amount_total / 100 : 680;
    const currencyUpper = (session.currency || 'cad').toUpperCase();

    if (customerEmail) {
      const cleanEmail = customerEmail.trim().toLowerCase();

      // 1. Insert paid lead into Supabase
      const { error: dbError } = await supabaseAdmin.from('leads').insert([
        {
          email: cleanEmail,
          name: customerName,
          project_type: 'Masterclass IA (Payé)',
          budget_range: `${amountTotal} ${currencyUpper}`,
          currency: currencyUpper,
          message: `Paiement Stripe Checkout validé (Session: ${session.id})`,
        },
      ]);

      if (dbError) {
        console.error('[STRIPE WEBHOOK] Supabase Insert Error:', dbError);
      } else {
        console.log(`[STRIPE WEBHOOK] Paid lead recorded for ${maskEmail(cleanEmail)}`);
      }

      // 2. Dispatch Welcome Email to student via Resend (Non-blocking)
      sendMasterclassWelcome(cleanEmail, customerName).catch((err) =>
        console.error(`[STRIPE WEBHOOK] Welcome Email Error for ${maskEmail(cleanEmail)}:`, err)
      );

      // 3. Dispatch Sale Notification Email to OVIZai team via Resend (Non-blocking)
      sendMasterclassSaleNotification({
        email: cleanEmail,
        name: customerName,
        amount: amountTotal,
        currency: currencyUpper,
      }).catch((err) =>
        console.error(`[STRIPE WEBHOOK] Sale Notification Email Error for ${maskEmail(cleanEmail)}:`, err)
      );
    }
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
