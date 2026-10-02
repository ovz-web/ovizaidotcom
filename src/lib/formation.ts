/**
 * OVIZai Formation / Playbook Architecture
 * Completely decoupled from Studio production pricing.
 */

export type FormationStatus = 'draft' | 'founding' | 'live';

export interface FormationOffer {
  status: FormationStatus;
  version: string;
  title: { fr: string; en: string };
  subtitle: { fr: string; en: string };
  format: { fr: string; en: string };
  priceUsd: number;
  priceEur: number;
  priceCad: number;
  stripePriceId?: string;
  outcomes: { fr: string[]; en: string[] };
  includes: { fr: string[]; en: string[] };
  faq: { q: { fr: string; en: string }; a: { fr: string; en: string } }[];
}

export const FORMATION_OFFER: FormationOffer = {
  status: 'draft', // 'draft': no public checkout; 'founding' | 'live': checkout active
  version: '1.0',
  title: {
    fr: 'OVIZai METHOD',
    en: 'OVIZai METHOD',
  },
  subtitle: {
    fr: 'Le système de production derrière nos films — Guide pratique de création vidéo et direction visuelle',
    en: 'The production system behind our films — Practical video creation and visual direction playbook',
  },
  format: {
    fr: 'Guide pratique numérique & Playbook de production',
    en: 'Digital practical guide & production playbook',
  },
  priceUsd: 190,
  priceEur: 175,
  priceCad: 260,
  outcomes: {
    fr: [
      'Structurer une idée brute en concept cinématographique exploitable',
      'Maîtriser la direction artistique visuelle, les ambiances et le cadrage',
      'Orchestrer le rythme narratif, le montage et le sound design immersif',
      'Livrer des films publicitaires et artistiques de standard studio',
    ],
    en: [
      'Structure a raw idea into a viable cinematic concept',
      'Master visual art direction, moods and composition',
      'Direct narrative pacing, tight editing and immersive sound design',
      'Deliver studio-standard commercial and artistic films',
    ],
  },
  includes: {
    fr: [
      'Playbook de production complet étape par étape',
      'Grilles d’analyse visuelle et templates de brief',
      'Méthode d’écriture narrative et de découpage plan par plan',
      'Mises à jour du guide pour les membres fondateurs',
    ],
    en: [
      'Complete step-by-step production playbook',
      'Visual breakdown sheets and brief templates',
      'Narrative writing and shot-by-shot planning methodology',
      'Guide updates for founding members',
    ],
  },
  faq: [
    {
      q: {
        fr: 'À qui s’adresse ce guide ?',
        en: 'Who is this guide for?',
      },
      a: {
        fr: 'Aux réalisateurs, créatifs, directeurs artistiques et marques souhaitant maîtriser une méthodologie de production visuelle rigoureuse',
        en: 'For filmmakers, creatives, art directors and brands wanting to master a rigorous visual production methodology',
      },
    },
    {
      q: {
        fr: 'Quel est le format de livraison ?',
        en: 'What is the delivery format?',
      },
      a: {
        fr: 'Un playbook numérique structuré, immédiatement consultable et orienté vers la pratique',
        en: 'A structured digital playbook, instantly accessible and focused on hands-on execution',
      },
    },
    {
      q: {
        fr: 'Quand la méthode sera-t-elle accessible ?',
        en: 'When will the method be available?',
      },
      a: {
        fr: 'La publication officielle est en cours de finalisation — écrivez-nous pour être prévenu dès l’ouverture',
        en: 'The official release is being finalized — contact us to be notified upon launch',
      },
    },
  ],
};
