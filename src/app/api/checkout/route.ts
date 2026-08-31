import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.STRIPE_SECRET_KEY;
    if (!apiKey) {
      console.error('[STRIPE CHECKOUT] Missing STRIPE_SECRET_KEY environment variable.');
      return NextResponse.json(
        { error: 'Stripe configuration missing. Please set STRIPE_SECRET_KEY.' },
        { status: 500 }
      );
    }

    const stripe = new Stripe(apiKey, {
      apiVersion: '2024-06-20' as any,
    });

    const body = await req.json().catch(() => ({}));
    const rawCurrency = typeof body.currency === 'string' ? body.currency.toLowerCase() : 'cad';

    let selectedCurrency = 'cad';
    let unitAmountCents = 68000; // Default 680.00 CAD in cents

    if (rawCurrency === 'usd') {
      selectedCurrency = 'usd';
      unitAmountCents = 50000; // 500.00 USD
    } else if (rawCurrency === 'eur') {
      selectedCurrency = 'eur';
      unitAmountCents = 46000; // 460.00 EUR
    } else {
      selectedCurrency = 'cad';
      unitAmountCents = 68000; // 680.00 CAD
    }

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ovizai.com';

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: selectedCurrency,
            product_data: {
              name: 'Masterclass Cinéma IA — OVIZai',
              description: 'Accès à vie au programme complet (5 Modules) + Mises à jour des modèles génératifs.',
              images: [`${baseUrl}/logo.png`],
            },
            unit_amount: Math.round(unitAmountCents),
          },
          quantity: 1,
        },
      ],
      success_url: `${baseUrl}/formation/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/formation/cancel`,
    });

    return NextResponse.json({ url: session.url }, { status: 200 });
  } catch (error: any) {
    console.error('[STRIPE CHECKOUT ERROR]', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to create Stripe Checkout session' },
      { status: 500 }
    );
  }
}
