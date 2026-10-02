/**
 * OVIZai Studio Pricing Constants
 * Contractual truth source: Launch Offer (530 USD) & Custom projects on quote.
 */

export const LAUNCH_OFFER_PRICE = { USD: 530, EUR: 490, CAD: 720 } as const;
export type PricingCurrency = keyof typeof LAUNCH_OFFER_PRICE;
export const MASTERCLASS_PRICE = LAUNCH_OFFER_PRICE;

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
  revisions: { fr: '1 série de retours consolidés incluse', en: '1 consolidated revision round included' },
  turnaround: {
    fr: 'Première version visée sous 5 jours ouvrables (après réception du brief complet, des éléments et validation du planning)',
    en: 'First cut targeted within 5 business days (after receipt of full brief, assets & schedule sign-off)',
  },
  paymentTerms: {
    fr: 'Acompte : 265 USD à la commande · Solde : 265 USD avant livraison du master final',
    en: 'Deposit: $265 USD upfront · Balance: $265 USD before final master delivery',
  },
  includes: {
    fr: [
      '1 publicité courte (durée finale : 10 à 15 secondes)',
      '1 concept créatif pensé pour votre produit ou marque',
      'Format principal 9:16 optimisé pour les réseaux sociaux (Reels, TikTok, Shorts)',
      'Direction créative, storyboard, animation & montage',
      'Sound design et mix audio immersif',
      'Carton final simple (logo & appel à l’action)',
      '1 série de retours consolidés sur le concept retenu',
      'Première version visée sous 5 jours ouvrables (après validation du brief)',
      'Acompte de 265 USD · Solde de 265 USD avant remise du master final',
    ],
    en: [
      '1 short-form ad (final duration: 10 to 15 seconds)',
      '1 creative concept tailored to your product or brand',
      'Primary 9:16 vertical format optimized for social channels (Reels, TikTok, Shorts)',
      'Creative direction, storyboard, animation & editing',
      'Immersive sound design and audio mix',
      'Simple end card (logo & call to action)',
      '1 consolidated revision round on the approved concept',
      'First cut targeted within 5 business days (upon brief sign-off)',
      '$265 USD deposit upfront · $265 USD balance before final master delivery',
    ],
  },
};

export interface CustomProjectDetails {
  id: string;
  name: { fr: string; en: string };
  badge: { fr: string; en: string };
  priceText: { fr: string; en: string };
  description: { fr: string; en: string };
  includes: { fr: string[]; en: string[] };
}

export const CUSTOM_PROJECT_OFFER: CustomProjectDetails = {
  id: 'custom',
  name: { fr: 'Projets Complexes & Sur-Mesure', en: 'Custom & Multi-Asset Projects' },
  badge: { fr: 'SUR DEVIS', en: 'CUSTOM QUOTE' },
  priceText: { fr: 'Sur devis', en: 'Custom quote' },
  description: {
    fr: 'Multi-assets, formats multiples (16:9, 1:1, 4:5), campagnes sociales complètes, production en marque blanche pour agences ou exigences spécifiques',
    en: 'Multi-asset delivery, multiple aspect ratios (16:9, 1:1, 4:5), full social campaigns, white-label agency production or custom technical requirements',
  },
  includes: {
    fr: [
      'Déclinaisons multi-formats (9:16, 16:9, 1:1, 4:5)',
      'Campagnes complètes & variations de concepts',
      'Production externalisée en marque blanche pour agences',
      'Accompagnement créatif dédié de bout en bout',
      'Devis personnalisé selon votre périmètre',
    ],
    en: [
      'Multi-format variations (9:16, 16:9, 1:1, 4:5)',
      'Complete multi-concept social campaigns',
      'Outsourced white-label production for agencies',
      'Dedicated creative direction end-to-end',
      'Custom tailored quote based on your scope',
    ],
  },
};
