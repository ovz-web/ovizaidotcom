'use client';

import React, { useState } from 'react';
import { Palette, Film, SlidersHorizontal, Layers, Check } from 'lucide-react';
import { Language } from '@/types';
import ListMenuCard, { ListMenuItem } from '@/components/ListMenuCard';

interface AIPipelineProps {
  lang: Language;
}

interface ToolCategory {
  name: { fr: string; en: string };
  tools: string[];
}

interface PipelineStep {
  id: string;
  num: string;
  icon: React.ComponentType<{ className?: string }>;
  title: { fr: string; en: string };
  subtitle: { fr: string; en: string };
  specs: { fr: string[]; en: string[] };
  categories: ToolCategory[];
  deliverables: { fr: string[]; en: string[] };
}

const PIPELINE_STEPS: PipelineStep[] = [
  {
    id: 'step-01',
    num: '01',
    icon: Palette,
    title: {
      fr: 'Conception Visuelle & Storyboard 8K',
      en: 'Visual Conception & 8K Storyboard',
    },
    subtitle: {
      fr: 'Direction artistique, cohérence des personnages & moodboards',
      en: 'Art direction, character consistency & moodboards',
    },
    specs: {
      fr: [
        'Création de la bible visuelle et fixation des codes cinématographiques de votre marque',
        'Génération d’images clés 8K photoréalistes avec contrôle optique (anamorphique, 35mm)',
        'Verrouillage des visages, silhouettes et décors pour une continuité sans rupture',
      ],
      en: [
        'Creation of the visual bible and definition of brand cinematic language',
        'Photorealistic 8K keyframe generation with cine lens control (anamorphic, 35mm)',
        'Character, setting and lighting consistency locking across all planned sequences',
      ],
    },
    categories: [
      {
        name: { fr: 'Image Models', en: 'Image Models' },
        tools: ['Flux 2', 'Seedream 5', 'Nano Banana', 'GPT Image 2', 'Midjourney v6.1'],
      },
      {
        name: { fr: 'Create (Édition & Graphisme)', en: 'Create (Design & Editing)' },
        tools: ['AI Image', 'Edit Image', 'Inpaint', 'Mixed Media'],
      },
      {
        name: { fr: 'Studios (Conception Visuelle)', en: 'Studios (Visual Design)' },
        tools: ['Photodump Studio', 'Higgsfield Canvas'],
      },
    ],
    deliverables: {
      fr: ['Bible de style & moodboard validé', 'Storyboard complet séquence par séquence'],
      en: ['Approved visual style bible & moodboard', 'Complete shot-by-shot sequence storyboard'],
    },
  },
  {
    id: 'step-02',
    num: '02',
    icon: Film,
    title: {
      fr: 'Génération Cinématographique & Mouvements',
      en: 'Cinematic Generation & Natural Motion',
    },
    subtitle: {
      fr: 'Animation physique, caméra virtuelle 3D & cohérence temporelle',
      en: 'Physics animation, 3D virtual camera & temporal consistency',
    },
    specs: {
      fr: [
        'Mise en mouvement des séquences via les moteurs génératifs de pointe',
        'Trajectoires de caméras immersives : travellings, panoramiques et plans séquences fluides',
        'Gestion de la dynamique physique des fluides, de la lumière et des micro-expressions',
      ],
      en: [
        'Sequence animation using state-of-the-art generative video neural engines',
        'Immersive 3D camera paths: dolly shots, tracking pans, and seamless continuous takes',
        'Accurate fluid dynamics, volumetric lighting, and organic physical motion',
      ],
    },
    categories: [
      {
        name: { fr: 'Video Models', en: 'Video Models' },
        tools: [
          'Seedance 2.5',
          'Seedance 2.0',
          'Kling 3.0',
          'Sora 2 Introduction',
          'Veo 3.1 Introduction',
          'WAN 2.6',
          'Grok Imagine 1.5',
          'Gemini Omni Flash',
          'Runway Gen-3 Alpha',
        ],
      },
      {
        name: { fr: 'Create (Moteur Vidéo)', en: 'Create (Video Engine)' },
        tools: ['AI Video'],
      },
      {
        name: { fr: 'Studios (Cinéma & Scénographie)', en: 'Studios (Cinema & Scenography)' },
        tools: ['Cinema Studio', 'Luma Dream Machine'],
      },
    ],
    deliverables: {
      fr: ['Rushes cinématiques bruts haute fidélité', 'Prévisualisation de montage rythmée'],
      en: ['High-fidelity raw cinematic rushes', 'Paced preview rough-cut for review'],
    },
  },
  {
    id: 'step-03',
    num: '03',
    icon: SlidersHorizontal,
    title: {
      fr: 'Étalonnage ACES & Sound Design Spatialisé',
      en: 'ACES Color Grading & Spatial Sound Design',
    },
    subtitle: {
      fr: 'Conformation couleur cinéma, émulation 35mm & audio immersif',
      en: 'Cinema color conformation, 35mm film emulation & spatial audio',
    },
    specs: {
      fr: [
        'Pipeline colorimétrique ACES garantissant un rendu cinéma organique et luxueux',
        'Application de grain argentique 35mm pour briser l’aspect synthétique du numérique',
        'Création d’un sound design spatialisé complet, bruitages cinéma et voix IA calibrées',
      ],
      en: [
        'ACES color pipeline delivering rich, cinematic, high-end organic textures',
        '35mm analog film grain emulation to eliminate synthetic digital sheen',
        'Spatial sound design, bespoke foley, cinematic impacts, and studio-grade voiceover',
      ],
    },
    categories: [
      {
        name: { fr: 'Studios & Usines de Production', en: 'Studios & Production Factories' },
        tools: [
          'Marketing Studio',
          'Lipsync Studio',
          'Fashion Factory',
          'UGC Factory',
          'Higgsfield Popcorn',
        ],
      },
      {
        name: { fr: 'Create (Identités & Avatars)', en: 'Create (Identities & Avatars)' },
        tools: ['AI Face Swap', 'AI Influencer'],
      },
      {
        name: { fr: 'Audio & Post-Production', en: 'Audio & Post-Production' },
        tools: ['ElevenLabs Voice', 'DaVinci Resolve Studio', 'Banque SFX OVIZai'],
      },
    ],
    deliverables: {
      fr: ['Étalonnage cinéma finalisé', 'Mixage audio stéréo & spatialisé master'],
      en: ['Finalized cinema color grading', 'Master stereo & spatial sound mix'],
    },
  },
  {
    id: 'step-04',
    num: '04',
    icon: Layers,
    title: {
      fr: 'Upscaling Neuronal & Livraison Master 4K',
      en: 'Neural Upscaling & 4K Master Delivery',
    },
    subtitle: {
      fr: 'Nettoyage des artefacts, suréchantillonnage & formats finaux',
      en: 'Artifact elimination, neural upscaling & broadcast formats',
    },
    specs: {
      fr: [
        'Nettoyage chirurgical des micro-artefacts d’IA par interpolation temporelle',
        'Suréchantillonnage neuronal 4K ultra-net sans altération des textures',
        'Exportation aux normes cinéma et broadcast : ProRes 422 HQ, MP4 web optimisé et formats verticaux (9:16)',
      ],
      en: [
        'Temporal interpolation cleanup removing all residual generative artifacts',
        'Neural 4K upscaling preserving micro-contrast and fine organic textures',
        'Broadcast-ready exports: Apple ProRes 422 HQ, high-bitrate MP4, and 9:16 vertical cuts',
      ],
    },
    categories: [
      {
        name: { fr: 'Create (Upscaling & Suite)', en: 'Create (Upscaling & Suite)' },
        tools: ['Sora 2 Upscale', 'Upscale', 'Apps'],
      },
      {
        name: { fr: 'Restauration & Suréchantillonnage', en: 'Restoration & Upscaling' },
        tools: ['Topaz Video AI v5', 'Magnific AI'],
      },
      {
        name: { fr: 'Normes Broadcast & Masters', en: 'Broadcast Standards & Masters' },
        tools: ['Apple ProRes 422 HQ', 'DCP Cinéma'],
      },
    ],
    deliverables: {
      fr: ['Master 4K sans compression', 'Déclinaisons 16:9 & 9:16 prêtes à diffuser'],
      en: ['Uncompressed 4K master file', 'Multi-format 16:9 & 9:16 ready-to-air exports'],
    },
  },
];

export default function AIPipeline({ lang }: AIPipelineProps) {
  const isFr = lang === 'fr';
  const [openStep, setOpenStep] = useState<string | null>(null);

  const toggleStep = (id: string) => {
    setOpenStep((prev) => (prev === id ? null : id));
  };

  const items: ListMenuItem[] = PIPELINE_STEPS.map((step) => {
    const isOpen = openStep === step.id;

    return {
      id: step.id,
      icon: step.icon,
      title: `${step.num} // ${isFr ? step.title.fr : step.title.en}`,
      subtitle: isFr ? step.subtitle.fr : step.subtitle.en,
      trailing: isOpen ? '↑' : '↓',
      onClick: () => toggleStep(step.id),
      expanded: isOpen,
      expandedContent: (
        <div className="space-y-4 pt-1">
          <div>
            <h4 className="mono text-[10px] uppercase text-gold font-bold tracking-[0.2em] mb-2">
              {isFr ? 'Spécifications Techniques' : 'Technical Specifications'}
            </h4>
            <div className="space-y-1.5 text-xs text-fg/90 leading-relaxed">
              {(isFr ? step.specs.fr : step.specs.en).map((line, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <span className="text-gold font-mono text-[11px] mt-0.5">•</span>
                  <span>{line}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mono text-[10px] uppercase text-gold font-bold tracking-[0.2em] mb-2.5">
              {isFr ? 'Moteurs & Outils Déployés' : 'Deployed Engines & Tools'}
            </h4>
            <div className="space-y-2.5">
              {step.categories.map((cat, catIdx) => (
                <div key={catIdx} className="space-y-1.5">
                  <span className="mono text-[10px] uppercase tracking-[0.15em] text-muted/90 font-semibold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block" />
                    {isFr ? cat.name.fr : cat.name.en}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.tools.map((tool) => (
                      <span
                        key={tool}
                        className="mono text-[10.5px] font-semibold px-2.5 py-1 rounded-md bg-black/60 border border-white/[0.08] text-fg hover:border-gold/40 hover:text-gold-bright transition-colors"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-white/[0.06]">
            <h4 className="mono text-[10px] uppercase text-gold font-bold tracking-[0.2em] mb-2">
              {isFr ? 'Livrables de l’Étape' : 'Phase Deliverables'}
            </h4>
            <div className="space-y-1 text-xs text-muted">
              {(isFr ? step.deliverables.fr : step.deliverables.en).map((deliv, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                  <span className="text-fg/80">{deliv}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
    };
  });

  return (
    <div className="max-w-xl mx-auto px-4 mb-3 sm:mb-4">
      <div className="mb-2 sm:mb-2.5">
        <span className="mono text-[10px] uppercase tracking-[0.25em] text-gold font-bold block mb-0.5">
          {isFr ? 'NOTRE MÉTHODE DE STUDIO' : 'OUR STUDIO WORKFLOW'}
        </span>
        <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-fg leading-snug">
          {isFr ? 'Le Pipeline de Production 4K' : 'The 4K Production Pipeline'}
        </h2>
        <p className="text-xs text-muted mt-1">
          {isFr
            ? 'Cliquez sur chaque phase pour explorer les moteurs, les spécifications et les livrables'
            : 'Click on each phase to explore engines, technical specs, and deliverables'}
        </p>
      </div>

      <ListMenuCard items={items} />
    </div>
  );
}
