// Centralized YouTube Video IDs & Social Media Links for OVIZai
// Remplacer par l'ID YouTube une fois la vidéo publiée (11 caractères après v= dans l'URL)

export const YOUTUBE_VIDEOS = {
  // Page d'accueil — Showreel & Démos principaux
  homeShowreel1: '', // Remplacer par l'ID YouTube une fois la vidéo publiée (11 caractères après v= dans l'URL)
  homeShowreel2: '', // Remplacer par l'ID YouTube une fois la vidéo publiée (11 caractères après v= dans l'URL)

  // Page Services — Showcase par prestation
  servicesShowcase1: '', // Remplacer par l'ID YouTube une fois la vidéo publiée (11 caractères après v= dans l'URL)
  servicesShowcase2: '', // Remplacer par l'ID YouTube une fois la vidéo publiée (11 caractères après v= dans l'URL)

  // Page Tarifs — Démonstration de rendu
  tarifsSample: '', // Remplacer par l'ID YouTube une fois la vidéo publiée (11 caractères après v= dans l'URL)
} as const;

export const LOCAL_VIDEOS = {
  spec01: {
    src: '/videos/spec-01.mp4',
    poster: '/videos/spec-01-poster.png',
  },
  spec02: {
    src: '/videos/spec-02.mp4',
    poster: '/videos/spec-02-poster.png',
  },
} as const;

export const SOCIAL_LINKS = {
  youtube: 'https://youtube.com/@ovizaidotcom',
  instagram: 'https://instagram.com/ovizai.co',
} as const;
