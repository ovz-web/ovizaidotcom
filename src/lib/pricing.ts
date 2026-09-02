export const MASTERCLASS_PRICE = { USD: 500, EUR: 460, CAD: 680 } as const;
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
    badge: { fr: '01 // STARTER', en: '01 // STARTER' },
    minUsd: 530,
    budgetTierId: 'tier-0',
    tag: { fr: 'Sans engagement — paiement à la livraison', en: 'No commitment — payment on delivery' },
    period: { fr: '/ asset 15-30s', en: '/ 15-30s asset' },
    includes: {
      fr: [
        '1 asset publicitaire court (Reel/TikTok 15-30s)',
        '1 round de révision inclus',
        'Livraison garantie sous 48-72h',
        'Export 4K optimisé réseaux sociaux',
        'Direction artistique & concept inclus',
      ],
      en: [
        '1 short ad asset (Reel/TikTok 15-30s)',
        '1 revision round included',
        'Guaranteed 48-72h delivery',
        '4K social media export',
        'Art direction & concept included',
      ],
    },
    primary: false,
    starterHighlight: true,
  },
  {
    id: 'standard',
    name: { fr: 'Standard', en: 'Standard' },
    badge: { fr: '02 // POPULAIRE', en: '02 // POPULAR' },
    minUsd: 1030,
    budgetTierId: 'tier-1',
    period: { fr: '/ vidéo', en: '/ video' },
    includes: {
      fr: [
        '1 vidéo cinématographique finalisée',
        '2 rounds de révision inclus',
        'Livraison sous 3 à 5 jours ouvrés',
        'Export 4K + version réseaux sociaux',
        'Direction artistique & storyboarding',
      ],
      en: [
        '1 finalised cinematic video',
        '2 revision rounds included',
        'Delivery within 3 to 5 business days',
        '4K export + social media version',
        'Art direction & storyboarding',
      ],
    },
    primary: false,
  },
  {
    id: 'premium',
    name: { fr: 'Premium', en: 'Premium' },
    badge: { fr: '03 // CAMPAGNE', en: '03 // CAMPAIGN' },
    minUsd: 2600,
    budgetTierId: 'tier-1',
    period: { fr: '/ campagne 3 vidéos', en: '/ 3-video campaign' },
    includes: {
      fr: [
        '3 vidéos finalisées (campagne déclinée)',
        '3 rounds de révision inclus',
        'Livraison prioritaire 48-72h',
        'Export multi-formats (4K, Reel, YouTube)',
        'Direction artistique dédiée & suivi direct',
      ],
      en: [
        '3 finalised videos (campaign package)',
        '3 revision rounds included',
        'Priority delivery 48-72h',
        'Multi-format export (4K, Reel, YouTube)',
        'Dedicated art direction & direct support',
      ],
    },
    primary: true,
  },
];
