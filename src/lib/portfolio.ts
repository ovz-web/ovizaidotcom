export interface PortfolioProject {
  id: string;
  title: { fr: string; en: string };
  status: 'SPEC PROJECT' | 'PROJET CONCEPT' | 'AI CINEMATIC STUDY' | 'INTERNAL PROJECT';
  category: { fr: string; en: string };
  youtubeId?: string;
  thumbnailUrl?: string;
  objective: { fr: string; en: string };
  creativeDirection: { fr: string; en: string };
  productionTools: string[];
  deliverables: { fr: string[]; en: string[] };
  featured: boolean;
}

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: 'spec-luxury-perfume',
    title: {
      fr: 'Étude Visuelle — Parfum d’Exception "Nuit d’Or"',
      en: 'Visual Study — Luxury Fragrance "Nuit d’Or"',
    },
    status: 'SPEC PROJECT',
    category: {
      fr: 'Publicité & Brand Content',
      en: 'Commercial & Brand Content',
    },
    youtubeId: '', // À remplir dès mise en ligne sur YouTube
    objective: {
      fr: 'Explorer la création d’une campagne de marque haute parfumerie sans tournage physique.',
      en: 'Explore high-end perfume brand campaign creation without physical filming.',
    },
    creativeDirection: {
      fr: 'Esthétique sombre et dorée, reflets métalliques, mouvements de caméra fluides et macro-gros plans liquides.',
      en: 'Dark gold aesthetic, metallic reflections, smooth camera drifts, and liquid macro close-ups.',
    },
    productionTools: ['Génération visuelle 8K', 'Animation cinématique', 'Caméra virtuelle 3D', 'Upscaling & netteté', 'Étalonnage cinéma'],
    deliverables: {
      fr: ['Spot principal 30s', 'Déclinaison verticale Reel 15s', 'Visuels clés 8K'],
      en: ['Main 30s commercial', 'Vertical 15s Reel variant', '8K key visuals'],
    },
    featured: true,
  },
  {
    id: 'spec-cyberpunk-clip',
    title: {
      fr: 'Étude Visuelle — Clip Musical "Neon Horizons"',
      en: 'Visual Study — Music Video "Neon Horizons"',
    },
    status: 'AI CINEMATIC STUDY',
    category: {
      fr: 'Clip Vidéo & Visualiser',
      en: 'Music Video & Stage Visualiser',
    },
    youtubeId: '', // À remplir dès mise en ligne sur YouTube
    objective: {
      fr: 'Développer un univers scénographique futuriste avec synchronisation rythmique.',
      en: 'Develop a futuristic stage visual universe with rhythmic beat synchronization.',
    },
    creativeDirection: {
      fr: 'Ambiance néo-noir, néons dorés, particules volumétriques et montage dynamique à 60fps.',
      en: 'Neo-noir atmosphere, golden neons, volumetric particles, and dynamic 60fps editing.',
    },
    productionTools: ['Génération visuelle', 'Animation dynamique', 'Rendu cinématique', 'Étalonnage cinéma'],
    deliverables: {
      fr: ['Visualiser complet 3mn', 'Loops scéniques VJ 4K'],
      en: ['3mn full visualiser', '4K VJ stage loops'],
    },
    featured: true,
  },
];
