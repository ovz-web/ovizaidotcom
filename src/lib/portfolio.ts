export interface PortfolioProject {
  id: string;
  title: { fr: string; en: string };
  status: 'CONCEPT PUBLICITAIRE' | 'PROJET CONCEPTUEL' | 'ÉTUDE DE PROCESSUS';
  category: { fr: string; en: string };
  youtubeId?: string;
  thumbnailUrl?: string;
  videoSrc?: string;
  objective: { fr: string; en: string };
  creativeDirection: { fr: string; en: string };
  productionTools: string[];
  deliverables: { fr: string[]; en: string[] };
  featured: boolean;
}

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: 'concept-dernier-burger',
    title: {
      fr: 'Le Dernier Burger',
      en: 'The Last Burger',
    },
    status: 'CONCEPT PUBLICITAIRE',
    category: {
      fr: 'Restauration & Marque Alimentaire',
      en: 'Restaurant & Food Brand',
    },
    videoSrc: '/videos/spec-01.mp4',
    thumbnailUrl: '/videos/spec-01-poster.webp',
    objective: {
      fr: 'Projet conceptuel OVIZai — Démontrer l’appétence visuelle, le travail des textures, la gourmandise et la capacité à transformer un produit culinaire en publicité courte cinématographique pour les réseaux sociaux (10-15s).',
      en: 'OVIZai concept project — Demonstrating appetite appeal, rich texture rendering, cinematic food styling, and the ability to elevate a food product into a punchy short social ad (10-15s).',
    },
    creativeDirection: {
      fr: 'Éclairage chaud et contrasté, plans macro sur les ingrédients, vapeur et textures gourmandes, rythme court et dynamique pensé pour capter l’attention.',
      en: 'Warm contrasting lighting, macro texture close-ups, steam and appetite highlights, dynamic short-form pacing engineered for instant retention.',
    },
    productionTools: ['Direction créative humaine', 'Génération visuelle haute définition', 'Animation cinématique', 'Sound design immersif', 'Étalonnage cinéma'],
    deliverables: {
      fr: ['Publicité courte 10-15s (format 9:16 vertical)', 'Sound design immersif', 'Déclinaison 16:9'],
      en: ['10-15s short-form ad (9:16 vertical format)', 'Immersive sound design', '16:9 landscape cut'],
    },
    featured: true,
  },
  {
    id: 'concept-apres-fermeture',
    title: {
      fr: 'Après la Fermeture',
      en: 'After Closing',
    },
    status: 'CONCEPT PUBLICITAIRE',
    category: {
      fr: 'Établissement & Expérience de Lieu',
      en: 'Venue & Place Experience',
    },
    videoSrc: '/videos/spec-02.mp4',
    thumbnailUrl: '/videos/spec-02-poster.webp',
    objective: {
      fr: 'Projet conceptuel OVIZai — Créer une publicité courte autour d’un établissement, d’une atmosphère nocturne et d’une identité de lieu pour susciter l’envie de s’y rendre et vivre l’expérience.',
      en: 'OVIZai concept project — Crafting a short ad around a venue, nighttime atmosphere, and space identity to spark curiosity and drive foot traffic.',
    },
    creativeDirection: {
      fr: 'Ambiance nocturne cinématographique, néons et reflets sur le bitume, immersion sensorielle dans l’énergie du lieu après le service.',
      en: 'Cinematic neo-noir mood, neons and asphalt reflections, sensory immersion into the late-night venue atmosphere after service.',
    },
    productionTools: ['Direction créative & scénarisation', 'Génération d’ambiance spatiale', 'Mouvement de caméra immersif', 'Mixage audio & sound design', 'Finishing cinéma'],
    deliverables: {
      fr: ['Publicité courte 10-15s (format 9:16 vertical)', 'Sound design de lieu', 'Déclinaison 16:9'],
      en: ['10-15s short-form ad (9:16 vertical format)', 'Venue sound design', '16:9 landscape cut'],
    },
    featured: true,
  },
  {
    id: 'concept-fidelite-produit',
    title: {
      fr: 'Fidélité Produit & Respect de Marque (Gravity / Packshot)',
      en: 'Product Fidelity & Brand Compliance (Gravity / Packshot)',
    },
    status: 'ÉTUDE DE PROCESSUS',
    category: {
      fr: 'Méthodologie & Prochains Travaux',
      en: 'Methodology & Upcoming Work',
    },
    objective: {
      fr: 'Démonstration de notre méthodologie pour préserver l’intégrité des vrais produits clients : respect des emballages exacts, logos nets et lisibles, proportions fidèles et palette de marque conservée sans déformation.',
      en: 'Demonstrating our workflow to preserve real client product integrity: exact packaging replication, crisp readable logos, accurate proportions, and brand color palette consistency.',
    },
    creativeDirection: {
      fr: 'Intégration d’assets réels (packshots studio 2D/3D) dans des environnements génératifs cinématiques avec éclairage réaliste et ombres de contact crédibles.',
      en: 'Seamless integration of real reference assets (2D/3D studio packshots) into cinematic generative environments with realistic lighting and contact shadows.',
    },
    productionTools: ['Packshots réels haute résolution', 'Contrôle vectoriel des logos', 'Projection 3D & éclairage adapté', 'Validation sur prévisualisation'],
    deliverables: {
      fr: ['Démonstration de fidélité produit en cours d’intégration au portfolio', 'Validation préalable sur prévisualisation pour chaque client'],
      en: ['Product fidelity demonstration in progress for portfolio release', 'Systematic preview cut validation for every client'],
    },
    featured: false,
  },
];
