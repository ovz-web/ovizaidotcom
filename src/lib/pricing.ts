export const MASTERCLASS_PRICE = { USD: 320, EUR: 290, CAD: 430 } as const;
export const MASTERCLASS_ORIGINAL_PRICE = { USD: 450, EUR: 415, CAD: 620 } as const;
export type PricingCurrency = keyof typeof MASTERCLASS_PRICE;

export interface LaunchOfferDetails {
  id: string;
  name: { fr: string; en: string };
  badge: { fr: string; en: string };
  totalUsd: number;
  depositUsd: number;
  balanceUsd: number;
  duration: { fr: string; en: string };
  concept: { fr: string; en: string };
  format: { fr: string; en: string };
  soundDesign: { fr: string; en: string };
  revisions: { fr: string; en: string };
  turnaround: { fr: string; en: string };
  paymentTerms: { fr: string; en: string };
  includes: { fr: string[]; en: string[] };
}

export const LAUNCH_OFFER: LaunchOfferDetails = {
  id: 'launch',
  name: { fr: 'Offre de Lancement', en: 'Launch Offer' },
  badge: { fr: 'OFFRE DE LANCEMENT', en: 'LAUNCH OFFER' },
  totalUsd: 530,
  depositUsd: 265,
  balanceUsd: 265,
  duration: { fr: '10 à 15 secondes', en: '10 to 15 seconds' },
  concept: { fr: '1 concept créatif', en: '1 creative concept' },
  format: { fr: 'Format principal 9:16 (vertical mobile / social)', en: 'Main 9:16 vertical format (mobile / social)' },
  soundDesign: { fr: 'Sound design & mix audio inclus', en: 'Sound design & audio mix included' },
  revisions: { fr: '1 série de corrections incluse', en: '1 revision round included' },
  turnaround: {
    fr: 'Première version sous 5 jours ouvrables (après réception des éléments & validation du planning)',
    en: 'First cut within 5 business days (upon receipt of all assets & schedule sign-off)',
  },
  paymentTerms: {
    fr: 'Acompte : 265 USD à la commande · Solde : 265 USD avant livraison du master final',
    en: 'Deposit: $265 USD upfront · Balance: $265 USD before final master delivery',
  },
  includes: {
    fr: [
      '1 publicité courte (durée finale : 10 à 15 secondes)',
      '1 concept créatif pensé pour votre produit ou établissement',
      'Format principal 9:16 optimisé pour les réseaux sociaux (Reels, TikTok, Ads)',
      'Sound design et habillage audio immersif',
      '1 série de corrections incluse sur la première version',
      'Première version sous 5 jours ouvrables (après réception des éléments et validation du planning)',
      'Acompte de 265 USD · Solde de 265 USD avant livraison du master final',
    ],
    en: [
      '1 short-form commercial (final duration: 10 to 15 seconds)',
      '1 creative concept tailored to your product or venue',
      'Primary 9:16 vertical format optimized for social channels (Reels, TikTok, Ads)',
      'Immersive sound design and audio mix included',
      '1 revision round included on the initial version',
      'First cut delivered within 5 business days (after receipt of assets & schedule sign-off)',
      '$265 USD deposit upfront · $265 USD balance before final master delivery',
    ],
  },
};

export interface PricingPlan {
  id: 'launch' | 'custom' | 'sprint' | 'premium';
  name: { fr: string; en: string };
  badge: { fr: string; en: string };
  minUsd: number;
  depositUsd?: number;
  balanceUsd?: number;
  launchOffer?: boolean;
  budgetTierId: string;
  tag?: { fr: string; en: string };
  period: { fr: string; en: string };
  includes: { fr: string[]; en: string[] };
  primary: boolean;
  starterHighlight?: boolean;
}

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'launch',
    name: { fr: 'Offre de Lancement', en: 'Launch Offer' },
    badge: { fr: 'OFFRE DE LANCEMENT', en: 'LAUNCH OFFER' },
    minUsd: 530,
    depositUsd: 265,
    balanceUsd: 265,
    launchOffer: true,
    budgetTierId: 'tier-launch',
    tag: {
      fr: 'Acompte : 265 USD · Solde avant livraison du master final',
      en: 'Deposit: $265 USD · Balance before final master delivery',
    },
    period: { fr: '/ publicité 10-15s', en: '/ 10-15s ad' },
    includes: LAUNCH_OFFER.includes,
    primary: true,
    starterHighlight: true,
  },
];
