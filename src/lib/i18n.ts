import { Language, Dictionary, CommandItem, PipelineTool } from '@/types';

export const DICTIONARY: Record<Language, Dictionary> = {
  fr: {
    status: 'PRODUCTION VIDÉO IA — PROJETS SÉLECTIONNÉS',
    eyebrow: 'DIRECTION ARTISTIQUE & CINÉMA IA',
    heroTitle: 'OVIZai',
    heroTagline: 'L’Art Algorithmique au service du Cinéma Narratif.',
    heroSub: 'Vidéo IA cinématographique pour marques et artistes d’exception. Sans template, sans bruit.',
    searchPlaceholder: 'Rechercher une commande, un pipeline, une collab…',
    searchTrigger: 'Rechercher… (⌘K)',
    commandsTitle: 'MENU COMMANDES',
    freePromptsTitle: 'PROMPTS & WORKFLOWS EN ACCÈS LIBRE',
    freePromptsDesc: 'Décryptage hebdomadaire direct de nos pipelines vidéo IA (Midjourney v6, Runway Gen-3, Kling AI). Zéro spam.',
    emailPlaceholder: 'votre@email.com',
    joinBtn: 'Rejoindre gratuitement',
    submitting: 'Inscription…',
    subscribedMsg: 'Inscrit avec succès. Vérifiez votre boîte mail.',
    alreadySubscribedMsg: 'Cet e-mail est déjà enregistré. Merci de votre confiance !',
    errorMsg: 'Une erreur est survenue. Veuillez réessayer.',
    followLabel: 'SUIVRE OVIZAI',
    pressCmd: '⌘K pour le menu rapide',
    pressEsc: 'ESC pour fermer',
    toastContact: 'Ouverture du client mail…',
    toastResources: 'Navigation vers les workflows & ressources…',
    toastCopied: 'Lien copié dans le presse-papier !',
    rights: '© 2026 OVIZai. Tous droits réservés.',
    privacy: 'Confidentialité',
    terms: 'Conditions',
    pipelineTitle: 'PIPELINE & STACK TECHNIQUE DE PRODUCTION',
    pipelineSub: 'Architecture d’outils génératifs haute fidélité combinée à de la post-production cinématographique professionnelle.',
  },
  en: {
    status: 'AI VIDEO PRODUCTION — SELECT PROJECTS ONLY',
    eyebrow: 'AI ART DIRECTION & CINEMATOGRAPHY',
    heroTitle: 'OVIZai',
    heroTagline: 'Algorithmic Art Meets Narrative Cinema.',
    heroSub: 'Cinematic AI video for visionaries, brands and artists. No templates, no noise.',
    searchPlaceholder: 'Search command, pipeline, collab…',
    searchTrigger: 'Search… (⌘K)',
    commandsTitle: 'COMMAND MENU',
    freePromptsTitle: 'FREE PROMPTS & WORKFLOWS',
    freePromptsDesc: 'A weekly, direct breakdown of high-end AI video pipelines (Midjourney v6, Runway Gen-3, Kling AI). No spam.',
    emailPlaceholder: 'your@email.com',
    joinBtn: 'Join free',
    submitting: 'Subscribing…',
    subscribedMsg: 'Subscribed successfully. Check your inbox.',
    alreadySubscribedMsg: 'This email is already registered. Thank you!',
    errorMsg: 'An error occurred. Please try again.',
    followLabel: 'FOLLOW OVIZAI',
    pressCmd: '⌘K for fast commands',
    pressEsc: 'ESC to close',
    toastContact: 'Opening email client…',
    toastResources: 'Scrolling to workflows & resources…',
    toastCopied: 'Link copied to clipboard!',
    rights: '© 2026 OVIZai. All rights reserved.',
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
    pipelineTitle: 'PRODUCTION PIPELINE & AI STACK',
    pipelineSub: 'High-fidelity generative toolset paired with professional cinematic post-production.',
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
    id: 'midjourney',
    name: 'Midjourney v6.1',
    category: 'IMAGE GEN & CONCEPT ART',
    version: 'v6.1 RAW',
    desc: {
      fr: 'Génération de keyframes cinématiques 8K, maîtrise absolue des éclairages volumétriques et cohérence stylistique des personnages.',
      en: '8K cinematic keyframe generation, master volumetric lighting, and character stylistic consistency.'
    },
    badge: 'Core Visual Engine',
    features: {
      fr: ['Prompting avancé RAW', 'Consistency Weights', 'Aspect Ratio 2.39:1 Anamorphic'],
      en: ['Advanced RAW Prompting', 'Consistency Weights', '2.39:1 Anamorphic Aspect Ratio']
    }
  },
  {
    id: 'runway',
    name: 'Runway Gen-3 Alpha',
    category: 'CAMERA MOTION & VIDEO SYNTHESIS',
    version: 'Gen-3 Turbo',
    desc: {
      fr: 'Contrôle précis des mouvements de caméra virtuels (crane, orbit, dolly, zoom) et simulation fluide de la physique.',
      en: 'Precise virtual camera motion control (crane, orbit, dolly, zoom) and fluid physics simulation.'
    },
    badge: 'Cinematography Engine',
    features: {
      fr: ['Motion Brush Multi-Layer', 'Camera Control 3D', 'High-Speed Motion Interpolation'],
      en: ['Multi-Layer Motion Brush', '3D Camera Control', 'High-Speed Motion Interpolation']
    }
  },
  {
    id: 'kling',
    name: 'Kling AI 1.5',
    category: 'PHYSICS & HIGH DYNAMICS',
    version: 'v1.5 Pro',
    desc: {
      fr: 'Rendu hyper-réaliste des mouvements complexes, drapés de vêtements, explosions et physiques naturelles à 60 FPS.',
      en: 'Hyper-realistic rendering of complex movements, cloth physics, explosions, and natural dynamics at 60 FPS.'
    },
    badge: 'Physics Engine',
    features: {
      fr: ['Physical World Model', 'Long Sequence Generation (10s+)', 'High Dynamic Range (HDR)'],
      en: ['Physical World Model', 'Long Sequence Generation (10s+)', 'High Dynamic Range (HDR)']
    }
  },
  {
    id: 'topaz',
    name: 'Topaz Video AI 5',
    category: 'UPSCALING & ENHANCEMENT',
    version: 'v5.2 AI',
    desc: {
      fr: 'Upscale 4K / 8K Master, débruitage argentique sélectif, restauration de textures et interpolation de fréquence d’images.',
      en: '4K / 8K Master Upscaling, selective film noise restoration, texture recovery, and frame interpolation.'
    },
    badge: 'Mastering & Enhancement',
    features: {
      fr: ['Artemis & Proteus Models', 'Motion Blur Compensation', 'Color Bitrate Expansion'],
      en: ['Artemis & Proteus Models', 'Motion Blur Compensation', 'Color Bitrate Expansion']
    }
  },
  {
    id: 'davinci',
    name: 'DaVinci Resolve Studio',
    category: 'COLOR GRADING & AUDIO SOUNDSCAPE',
    version: 'v19 Studio',
    desc: {
      fr: 'Étalonnage couleur ACES cinématographique, montage rythmé, sound design spatialisé et mastering final d’exportation.',
      en: 'Cinematic ACES color grading, rhythmic editing, spatial sound design, and master delivery exports.'
    },
    badge: 'Post-Production Core',
    features: {
      fr: ['Film Emulation 35mm LUTs', 'Fairlight Spatial Audio', 'Deliverables DCP & ProRes 4444 XQ'],
      en: ['35mm Film Emulation LUTs', 'Fairlight Spatial Audio', 'DCP & ProRes 4444 XQ Deliverables']
    }
  }
];
