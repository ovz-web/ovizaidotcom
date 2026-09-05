import { Language, Dictionary, CommandItem, PipelineTool } from '@/types';

export const DICTIONARY: Record<Language, Dictionary> = {
  fr: {
    status: 'PRODUCTION VIDÉO IA — PROJETS SÉLECTIONNÉS',
    eyebrow: 'DIRECTION ARTISTIQUE & CINÉMA IA',
    heroTitle: 'OVIZai',
    heroTagline: 'Films IA cinématographiques pour marques et artistes',
    heroSub: 'Production vidéo haut de gamme sans contrainte de tournage',
    searchPlaceholder: 'Rechercher une commande, un service, une collab…',
    searchTrigger: 'Rechercher… (⌘K)',
    commandsTitle: 'MENU COMMANDES',
    freePromptsTitle: 'RESSOURCES EN ACCÈS LIBRE',
    freePromptsDesc: 'Chaque semaine : méthodes, outils et techniques vidéo IA issus de nos productions\nZéro spam',
    emailPlaceholder: 'votre@email.com',
    joinBtn: 'Rejoindre gratuitement',
    submitting: 'Inscription…',
    subscribedMsg: 'Inscrit avec succès\nVérifiez votre boîte mail',
    alreadySubscribedMsg: 'Cet e-mail est déjà enregistré\nMerci de votre confiance',
    errorMsg: 'Une erreur est survenue\nVeuillez réessayer',
    followLabel: 'SUIVRE OVIZAI',
    pressCmd: '⌘K pour le menu rapide',
    pressEsc: 'ESC pour fermer',
    toastContact: 'Ouverture du client mail…',
    toastResources: 'Navigation vers les ressources…',
    toastCopied: 'Lien copié dans le presse-papier',
    rights: '© 2026 OVIZai — Tous droits réservés',
    privacy: 'Confidentialité',
    terms: 'Conditions',
    pipelineTitle: 'OUTILS & STACK TECHNIQUE',
    pipelineSub: 'Moteurs génératifs combinés à une post-production cinématographique',
  },
  en: {
    status: 'AI VIDEO PRODUCTION — SELECT PROJECTS ONLY',
    eyebrow: 'AI ART DIRECTION & CINEMATOGRAPHY',
    heroTitle: 'OVIZai',
    heroTagline: 'Cinematic AI films for brands and artists',
    heroSub: 'High-end video production with zero filming constraints',
    searchPlaceholder: 'Search a service, collab…',
    searchTrigger: 'Search… (⌘K)',
    commandsTitle: 'COMMAND MENU',
    freePromptsTitle: 'FREE RESOURCES',
    freePromptsDesc: 'Weekly methods, tools and techniques straight from our productions\nNo spam',
    emailPlaceholder: 'your@email.com',
    joinBtn: 'Join free',
    submitting: 'Subscribing…',
    subscribedMsg: 'Subscribed successfully\nCheck your inbox',
    alreadySubscribedMsg: 'This email is already registered\nThank you',
    errorMsg: 'An error occurred\nPlease try again',
    followLabel: 'FOLLOW OVIZAI',
    pressCmd: '⌘K for fast commands',
    pressEsc: 'ESC to close',
    toastContact: 'Opening email client…',
    toastResources: 'Scrolling to resources…',
    toastCopied: 'Link copied to clipboard',
    rights: '© 2026 OVIZai — All rights reserved',
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
    pipelineTitle: 'TOOLS & TECHNICAL STACK',
    pipelineSub: 'Generative engines combined with cinematic post-production',
  }
};

export const COMMANDS: CommandItem[] = [
  {
    id: 'cmd-films',
    title: {
      fr: '01. Films & Publicités IA',
      en: '01. AI Commercials & Films'
    },
    sub: {
      fr: 'Publicités narratives & campagnes grand écran',
      en: 'Narrative commercials & high-impact campaigns'
    },
    key: 'P',
    action: {
      fr: 'Réserver',
      en: 'Hire'
    },
    icon: 'video',
    type: 'contact',
    mailtoSubject: 'Demande de Production Film / Publicité IA — OVIZai'
  },
  {
    id: 'cmd-art',
    title: {
      fr: '02. Clips Musicaux & Direction Artistique',
      en: '02. Music Videos & Art Direction'
    },
    sub: {
      fr: 'Pipelines esthétiques & univers visuels cinématographiques',
      en: 'Aesthetic pipelines & cinematic visual universes'
    },
    key: 'D',
    action: {
      fr: 'Explorer',
      en: 'Explore'
    },
    icon: 'art',
    type: 'contact',
    mailtoSubject: 'Projet Clip Musical / Direction Artistique — OVIZai'
  },
  {
    id: 'cmd-workflows',
    title: {
      fr: '03. Workflows & Masterclasses',
      en: '03. Systems & Masterclasses'
    },
    sub: {
      fr: 'Prompts secrets, pipelines de génération & ressources',
      en: 'Secret prompts, generation pipelines & free access'
    },
    key: 'R',
    action: {
      fr: 'Accéder',
      en: 'Access'
    },
    icon: 'workflow',
    type: 'scroll',
    target: '#resources'
  },
  {
    id: 'cmd-contact',
    title: {
      fr: '04. Projets Sur-Mesure & Collabs',
      en: '04. Custom Projects & Collabs'
    },
    sub: {
      fr: 'Marques exigeantes et partenariats créatifs',
      en: 'Luxury brands and creative partnerships'
    },
    key: 'C',
    action: {
      fr: 'Écrire',
      en: 'Message'
    },
    icon: 'contact',
    type: 'contact',
    mailtoSubject: 'Demande de Collaboration / Projet Sur-Mesure — OVIZai'
  }
];

export const PIPELINE_TOOLS: PipelineTool[] = [
  {
    id: 'image-engine',
    name: 'Moteur de Génération Visuelle',
    category: 'IMAGE GEN & CONCEPT ART',
    version: 'Rendu 8K RAW',
    desc: {
      fr: 'Génération de keyframes cinématiques 8K, maîtrise absolue des éclairages volumétriques et cohérence stylistique des personnages',
      en: '8K cinematic keyframe generation, master volumetric lighting, and character stylistic consistency'
    },
    badge: 'Core Visual Engine',
    features: {
      fr: ['Prompting avancé RAW', 'Consistency Weights', 'Aspect Ratio 2.39:1 Anamorphic'],
      en: ['Advanced RAW Prompting', 'Consistency Weights', '2.39:1 Anamorphic Aspect Ratio']
    }
  },
  {
    id: 'camera-motion',
    name: 'Moteur de Caméra Virtuelle 3D',
    category: 'CAMERA MOTION & VIDEO SYNTHESIS',
    version: 'Cinematics Engine',
    desc: {
      fr: 'Contrôle précis des mouvements de caméra virtuels (crane, orbit, dolly, zoom) et simulation fluide de la physique',
      en: 'Precise virtual camera motion control (crane, orbit, dolly, zoom) and fluid physics simulation'
    },
    badge: 'Cinematography Engine',
    features: {
      fr: ['Motion Brush Multi-Layer', 'Camera Control 3D', 'High-Speed Motion Interpolation'],
      en: ['Multi-Layer Motion Brush', '3D Camera Control', 'High-Speed Motion Interpolation']
    }
  },
  {
    id: 'physics-engine',
    name: 'Moteur d\'Animation & Physique',
    category: 'PHYSICS & HIGH DYNAMICS',
    version: 'High Dynamics',
    desc: {
      fr: 'Rendu hyper-réaliste des mouvements complexes, drapés de vêtements, explosions et physiques naturelles à 60 FPS',
      en: 'Hyper-realistic rendering of complex movements, cloth physics, explosions, and natural dynamics at 60 FPS'
    },
    badge: 'Physics Engine',
    features: {
      fr: ['Physical World Model', 'Long Sequence Generation (10s+)', 'High Dynamic Range (HDR)'],
      en: ['Physical World Model', 'Long Sequence Generation (10s+)', 'High Dynamic Range (HDR)']
    }
  },
  {
    id: 'mastering-upscale',
    name: 'Pipeline d\'Upscaling & Restauration',
    category: 'UPSCALING & ENHANCEMENT',
    version: 'Master 4K/8K',
    desc: {
      fr: 'Upscale 4K / 8K Master, débruitage argentique sélectif, restauration de textures et interpolation de fréquence d’images',
      en: '4K / 8K Master Upscaling, selective film noise restoration, texture recovery, and frame interpolation'
    },
    badge: 'Mastering & Enhancement',
    features: {
      fr: ['Algorithmes de Restauration', 'Motion Blur Compensation', 'Color Bitrate Expansion'],
      en: ['Restoration Algorithms', 'Motion Blur Compensation', 'Color Bitrate Expansion']
    }
  },
  {
    id: 'post-production-core',
    name: 'Suite d\'Étalonnage & Mastering',
    category: 'COLOR GRADING & AUDIO SOUNDSCAPE',
    version: 'Color Grading Pro',
    desc: {
      fr: 'Étalonnage couleur ACES cinématographique, montage rythmé, sound design spatialisé et mastering final d’exportation',
      en: 'Cinematic ACES color grading, rhythmic editing, spatial sound design, and master delivery exports'
    },
    badge: 'Post-Production Core',
    features: {
      fr: ['Film Emulation 35mm LUTs', 'Fairlight Spatial Audio', 'Deliverables DCP & ProRes 4444 XQ'],
      en: ['35mm Film Emulation LUTs', 'Fairlight Spatial Audio', 'DCP & ProRes 4444 XQ Deliverables']
    }
  }
];
