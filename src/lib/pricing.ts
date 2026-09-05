export const MASTERCLASS_PRICE = { USD: 320, EUR: 290, CAD: 430 } as const;
export const MASTERCLASS_ORIGINAL_PRICE = { USD: 450, EUR: 415, CAD: 620 } as const;
export type PricingCurrency = keyof typeof MASTERCLASS_PRICE;

export interface PricingPlan {
  id: 'sprint' | 'premium';
  name: { fr: string; en: string };
  badge: { fr: string; en: string };
  minUsd: number;
  originalMinUsd?: number;
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
    id: 'sprint',
    name: { fr: 'Sprint Pilote 48-72h', en: '48-72h Pilot Sprint' },
    badge: { fr: 'ASSET COURT 48-72H', en: '48-72H SHORT ASSET' },
    minUsd: 890,
    originalMinUsd: 1250,
    launchOffer: false,
    budgetTierId: 'tier-0',
    tag: { fr: 'Sans engagement — validation sur prévisualisation', en: 'No commitment — preview validation' },
    period: { fr: '/ asset 15-30s', en: '/ 15-30s asset' },
    includes: {
      fr: [
        '1 asset publicitaire court (Reel/TikTok 15-30s)',
        '1 round de révision inclus',
        'Livraison garantie sous 48-72h ouvrées',
        'Export 4K Master (16:9 & 9:16 vertical)',
        'Direction artistique, concept & étalonnage cinéma',
      ],
      en: [
        '1 short ad asset (Reel/TikTok 15-30s)',
        '1 revision round included',
        'Guaranteed 48-72h delivery',
        '4K Master export (16:9 & 9:16 vertical)',
        'Art direction, concept & cinema color grading',
      ],
    },
    primary: false,
    starterHighlight: true,
  },
  {
    id: 'premium',
    name: { fr: 'Campagne de Marque (3 Films)', en: 'Brand Campaign (3 Films)' },
    badge: { fr: 'CAMPAGNE COMPLÈTE', en: 'COMPLETE CAMPAIGN' },
    minUsd: 2100,
    originalMinUsd: 2950,
    launchOffer: false,
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
