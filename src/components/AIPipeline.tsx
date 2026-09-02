'use client';

import React from 'react';
import { Cpu, Layers, Zap, Sparkles, Sliders } from 'lucide-react';
import { Language } from '@/types';

interface AIPipelineProps {
  lang: Language;
  customEyebrow?: string;
  customTitle?: string;
}

const PIPELINE_DATA = [
  {
    id: 'mj-v6',
    name: 'Midjourney v6.1',
    category: 'Images-clés & Concept Art',
    version: 'Génération ultra haute définition',
    desc: {
      fr: 'Création des images maîtresses du projet en ultra haute définition — éclairages cinématiques, cohérence parfaite des personnages d\'un plan à l\'autre.',
      en: 'Creation of the project\'s master images in ultra high definition — cinematic lighting, perfect character consistency across every shot.'
    },
    badge: 'Moteur visuel principal',
    icon: Cpu,
    tags: ['Ultra haute définition', 'Format grand écran cinéma', 'Cohérence des personnages']
  },
  {
    id: 'flux-1',
    name: 'Flux.1 Pro',
    category: 'Photoréalisme & Textures',
    version: 'Modèle professionnel',
    desc: {
      fr: 'Rendu ultra-réaliste des détails : peau, matières métalliques, bois, tissus — et intégration parfaite du texte dans l\'image.',
      en: 'Ultra-realistic rendering of fine details: skin, metallic materials, wood, fabric — and seamless text integration within the image.'
    },
    badge: 'Référence photoréalisme',
    icon: Sparkles,
    tags: ['Texte intégré à l\'image', 'Micro-détails de texture', 'Précision anatomique']
  },
  {
    id: 'kling-pro',
    name: 'Kling AI 1.5',
    category: 'Physique & Mouvements naturels',
    version: 'Haute fluidité 60 images/sec',
    desc: {
      fr: 'Simulation des lois physiques : vêtements qui bougent naturellement, eau, feu, explosions — des scènes d\'action qui semblent réelles.',
      en: 'Physical world simulation: naturally moving clothing, water, fire, explosions — action scenes that feel genuinely real.'
    },
    badge: 'Moteur physique',
    icon: Zap,
    tags: ['Simulation physique réaliste', 'Séquences longues', 'Plage dynamique étendue']
  },
  {
    id: 'runway-g3',
    name: 'Runway Gen-3 Alpha',
    category: 'Mouvements de caméra',
    version: 'Gen-3 Turbo',
    desc: {
      fr: 'Contrôle précis de la caméra virtuelle : panoramique, travelling, zoom lent — chaque plan pensé comme un vrai tournage.',
      en: 'Precise virtual camera control: panning, tracking shots, slow zoom — every shot crafted like a real film production.'
    },
    badge: 'Moteur cinématographique',
    icon: Layers,
    tags: ['Masque de mouvement multicouche', 'Contrôles 3D de caméra', 'Rotation d\'axe']
  },
  {
    id: 'davinci-studio',
    name: 'DaVinci Resolve Studio',
    category: 'Étalonnage & Finition',
    version: 'v19 Studio',
    desc: {
      fr: 'Calibrage colorimétrique de qualité cinéma, émulation de la pellicule 35mm, son spatialisé et livraison dans tous les formats professionnels.',
      en: 'Cinema-grade color calibration, 35mm film emulation, spatial audio design, and delivery in all professional formats.'
    },
    badge: 'Cœur de post-production',
    icon: Sliders,
    tags: ['Étalonnage couleur cinéma', 'Son spatialisé Fairlight', 'Tous formats de livraison']
  }
];

export default function AIPipeline({ lang, customEyebrow, customTitle }: AIPipelineProps) {
  const isFr = lang === 'fr';

  return (
    <section className="max-w-xl mx-auto mb-10 px-4">
      {/* Section Title */}
      <div className="mb-6 text-center">
        <p className="mono text-[10px] tracking-[0.2em] uppercase text-[#CAA243] font-mono mb-1 font-bold">
          {customEyebrow || (isFr ? '03 // STACK TECHNIQUE & PIPELINE' : '03 // TECH STACK & PIPELINE')}
        </p>
        <h2 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-[#ECE4D3] mb-2">
          {customTitle || (isFr ? 'Moteurs Génératifs & Post-Production' : 'Generative Engines & Post-Production')}
        </h2>
        <p className="text-xs text-[#8c8375] max-w-md mx-auto leading-relaxed">
          {isFr
            ? 'Une combinaison des meilleures technologies génératives et logiciels de post-production pour garantir une qualité 8K cinématique et un étalonnage cinéma.'
            : 'A combination of top generative technologies and pro post-production tools delivering 8K cinematic quality and color grading.'}
        </p>
      </div>

      {/* Grid of Badges */}
      <div className="space-y-3">
        {PIPELINE_DATA.map((tool) => {
          const IconComp = tool.icon;
          return (
            <div
              key={tool.id}
              className="border border-white/[0.08] bg-[#141210] hover:border-[#CAA243]/40 rounded-xl p-4 transition-all duration-300 group"
            >
              <div className="flex items-center justify-between gap-3 mb-2">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-black/40 border border-white/[0.08] text-[#CAA243] group-hover:border-[#CAA243]/40 transition-colors">
                    <IconComp className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="mono text-xs sm:text-sm font-bold text-[#ECE4D3] group-hover:text-[#f0c869] transition-colors">
                      {tool.name}
                    </h3>
                    <span className="mono text-[9.5px] tracking-wider text-[#8c8375] uppercase">
                      {tool.category} • {tool.version}
                    </span>
                  </div>
                </div>

                <span className="mono text-[9px] px-2 py-0.5 rounded bg-black/60 border border-white/[0.08] text-[#CAA243] font-medium whitespace-nowrap">
                  {tool.badge}
                </span>
              </div>

              <p className="text-xs text-[#8c8375] leading-relaxed mb-3">
                {tool.desc[lang]}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/[0.04]">
                {tool.tags.map((tag, tIdx) => (
                  <span
                    key={`${tool.id}-tag-${tIdx}`}
                    className="mono text-[9.5px] text-[#8c8375] bg-black/40 border border-white/[0.06] px-2 py-0.5 rounded-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
