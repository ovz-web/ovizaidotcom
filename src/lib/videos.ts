// NOTE : Ces champs restent vides définitivement (vidéos bloquées sur YouTube pour droits d'auteur PNL — Autre monde).
// Les deux films restent hébergés uniquement en local (LOCAL_VIDEOS) sur le site via lecteur HTML5 natif.
// Seul SOCIAL_LINKS.youtube reste le point de contact YouTube du projet (lien vers la chaîne en pied de page).

export const YOUTUBE_VIDEOS = {
  // Page d'accueil — Inutilisé (films hébergés en local)
  homeShowreel1: '',
  homeShowreel2: '',

  // Page Services — Inutilisé (films hébergés en local via LOCAL_VIDEOS)
  servicesShowcase1: '',
  servicesShowcase2: '',

  // Page Tarifs — Inutilisé
  tarifsSample: '',
} as const;

export const LOCAL_VIDEOS = {
  spec01: {
    src: '/videos/spec-01.mp4',
    webmSrc: '/videos/spec-01.webm',
    poster: '/videos/spec-01-poster.webp',
  },
  spec02: {
    src: '/videos/spec-02.mp4',
    webmSrc: '/videos/spec-02.webm',
    poster: '/videos/spec-02-poster.webp',
  },
} as const;

export const SOCIAL_LINKS = {
  youtube: 'https://youtube.com/@ovizaidotcom',
  instagram: 'https://instagram.com/ovizai.co',
} as const;
