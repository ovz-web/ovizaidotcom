export const MASTERCLASS_PRICE = { USD: 490, EUR: 450, CAD: 670 } as const;
export const MASTERCLASS_ORIGINAL_PRICE = { USD: 990, EUR: 900, CAD: 1300 } as const;
export type PricingCurrency = keyof typeof MASTERCLASS_PRICE;

export interface PricingPlan {
  id: 'sprint' | 'standard' | 'premium';
  name: { fr: string; en: string };
  badge: { fr: string; en: string };
  minUsd: number;
  budgetTierId: string;
  tag?: { fr: string; en: string };
  period: { fr: string; en: string };
  includes: { fr: string[]; en: string[] };
  primary: boolean;
  starterHighlight?: boolean;
}

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'sprint',
    name: { fr: 'Sprint Pilote 48-72h', en: '48-72h Pilot Sprint' },
    badge: { fr: '01 // TARIF DE LANCEMENT', en: '01 // LAUNCH TIER' },
    minUsd: 530,
    budgetTierId: 'tier-0',
    tag: { fr: 'Sans engagement — validation sur prévisualisation', en: 'No commitment — preview validation' },
    period: { fr: '/ asset 15-30s', en: '/ 15-30s asset' },
    includes: {
      fr: [
        '1 asset publicitaire court (Reel/TikTok 15-30s)',
        '1 round de révision inclus',
        'Livraison garantie sous 48-72h ouvrées',
        'Export 4K Master (16:9 & 9:16 vertical)',
        'Direction artistique, concept & étalonnage DaVinci',
      ],
      en: [
        '1 short ad asset (Reel/TikTok 15-30s)',
        '1 revision round included',
        'Guaranteed 48-72h delivery',
        '4K Master export (16:9 & 9:16 vertical)',
        'Art direction, concept & DaVinci Resolve grading',
      ],
    },
    primary: false,
    starterHighlight: true,
  },
  {
    id: 'standard',
    name: { fr: 'Standard', en: 'Standard' },
    badge: { fr: '02 // PROD COMPLETE', en: '02 // FULL PROD' },
    minUsd: 1030,
    budgetTierId: 'tier-1',
    period: { fr: '/ film cinématographique', en: '/ cinematic film' },
    includes: {
      fr: [
        '1 vidéo cinématographique finalisée (45-60s)',
        '2 rounds de révision inclus',
        'Livraison sous 3 à 5 jours ouvrés',
        'Export 4K multi-formats + sound design spatialisé',
        'Direction artistique dédiée & storyboarding 8K',
      ],
      en: [
        '1 finalised cinematic video (45-60s)',
        '2 revision rounds included',
        'Delivery within 3 to 5 business days',
        '4K multi-format export + spatial sound design',
        'Dedicated art direction & 8K storyboarding',
      ],
    },
    primary: false,
  },
  {
    id: 'premium',
    name: { fr: 'Premium', en: 'Premium' },
    badge: { fr: '03 // CAMPAGNE DE MARQUE', en: '03 // BRAND CAMPAIGN' },
    minUsd: 2600,
    budgetTierId: 'tier-1',
    period: { fr: '/ campagne 3 films', en: '/ 3-film campaign' },
    includes: {
      fr: [
        '3 vidéos cinématographiques (campagne déclinée)',
        '3 rounds de révision inclus',
        'Livraison prioritaire 48-72h',
        'Export multi-formats 4K (Ciné, Reel, YouTube)',
        'Direction artistique dédiée & accompagnement sur-mesure',
      ],
      en: [
        '3 finalised cinematic videos (campaign package)',
        '3 revision rounds included',
        'Priority delivery 48-72h',
        '4K multi-format export (Cinema, Reel, YouTube)',
        'Dedicated art direction & tailored support',
      ],
    },
    primary: true,
  },
];
