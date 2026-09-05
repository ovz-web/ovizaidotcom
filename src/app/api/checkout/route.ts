import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { MASTERCLASS_PRICE, PricingCurrency } from '@/lib/pricing';
import { checkRateLimit } from '@/lib/rateLimit';

export async function POST(req: NextRequest) {
  try {
    const rateLimit = await checkRateLimit(req, 'checkout', { limit: 5, windowMs: 60_000 });
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

    const apiKey = process.env.STRIPE_SECRET_KEY;
    if (!apiKey) {
      console.error('[STRIPE CHECKOUT] Missing STRIPE_SECRET_KEY environment variable.');
      return NextResponse.json(
        { error: 'Configuration Stripe manquante. Veuillez contacter le support.' },
        { status: 500 }
      );
    }

    const stripe = new Stripe(apiKey, {
      apiVersion: '2024-06-20' as any,
    });

    const body = await req.json().catch(() => ({}));
    const rawCurrency = typeof body.currency === 'string' ? body.currency.toUpperCase() : 'CAD';

    const validCurrency: PricingCurrency = (rawCurrency === 'USD' || rawCurrency === 'EUR' || rawCurrency === 'CAD')
      ? (rawCurrency as PricingCurrency)
      : 'CAD';

    const selectedCurrency = validCurrency.toLowerCase();
    const priceAmount = MASTERCLASS_PRICE[validCurrency] || MASTERCLASS_PRICE.CAD;
    const unitAmountCents = Math.round(priceAmount * 100);

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
    console.error('[STRIPE CHECKOUT ERROR]', error?.message || error);
    return NextResponse.json(
      { error: 'Impossible d’initialiser le paiement sécurisé. Veuillez réessayer.' },
      { status: 500 }
    );
  }
}
