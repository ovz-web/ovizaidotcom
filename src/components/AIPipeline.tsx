'use client';

import React from 'react';
import { Cpu, Layers, Zap, Sparkles, Sliders } from 'lucide-react';
import { Language } from '@/types';

interface AIPipelineProps {
  lang: Language;
}

const PIPELINE_DATA = [
  {
    id: 'mj-v6',
    name: 'Midjourney v6.1',
    category: 'Keyframes & Concept Art',
    version: 'RAW 8K Engine',
    desc: {
      fr: 'Génération de keyframes cinématiques 8K, maîtrise des éclairages volumétriques et consistance parfaite des personnages.',
      en: '8K cinematic keyframe generation, master volumetric lighting, and character stylistic consistency.'
    },
    badge: 'Core Visual Engine',
    icon: Cpu,
    tags: ['RAW Prompting', '2.39:1 Anamorphic', 'Character Weights']
  },
  {
    id: 'flux-1',
    name: 'Flux.1 Pro',
    category: 'Photorealism & Typography',
    version: 'Dev / Pro Model',
    desc: {
      fr: 'Rendu ultra-réaliste des détails de peau, textures métalliques et intégration typographique générative directe.',
      en: 'Ultra-realistic rendering of skin details, metallic textures, and direct generative typographic integration.'
    },
    badge: 'Realism Benchmark',
    icon: Sparkles,
    tags: ['High Fidelity Text', 'Skin Micro-Textures', 'Anatomy Precision']
  },
  {
    id: 'kling-pro',
    name: 'Kling AI 1.5',
    category: 'Physics & High Dynamics',
    version: 'v1.5 Pro 60FPS',
    desc: {
      fr: 'Simulation physique complexe, mouvements fluides de vêtements, explosions et scènes d’action naturelles.',
      en: 'Complex physical simulation, fluid clothing movement, explosions, and natural high-action scenes.'
    },
    badge: 'Physics Engine',
    icon: Zap,
    tags: ['Physical World Model', 'Long Clips 10s+', 'HDR Dynamic Range']
  },
  {
    id: 'runway-g3',
    name: 'Runway Gen-3 Alpha',
    category: 'Camera Motion & Control',
    version: 'Gen-3 Turbo',
    desc: {
      fr: 'Contrôle millimétré de la caméra virtuelle (crane, orbit, dolly, zoom) et interpolation de mouvement haute vitesse.',
      en: 'Millimetric virtual camera control (crane, orbit, dolly, zoom) and high-speed motion interpolation.'
    },
    badge: 'Cinematography Engine',
    icon: Layers,
    tags: ['Motion Brush Multi-Layer', '3D Camera Controls', 'Camera Roll']
  },
  {
    id: 'davinci-studio',
    name: 'DaVinci Resolve Studio',
    category: 'ACES Grading & Mastering',
    version: 'v19 Studio',
    desc: {
      fr: 'Étalonnage couleur ACES cinématographique, émulation de pellicule 35mm, sound design spatialisé et exports ProRes 4444 XQ.',
      en: 'Cinematic ACES color grading, 35mm film emulation, spatial sound design, and ProRes 4444 XQ master delivery.'
    },
    badge: 'Post-Production Core',
    icon: Sliders,
    tags: ['35mm Film LUTs', 'Fairlight Spatial Audio', 'DCP Delivery']
  }
];

export default function AIPipeline({ lang }: AIPipelineProps) {
  const isFr = lang === 'fr';

  return (
    <section className="max-w-xl mx-auto mb-10 px-4">
      {/* Section Title */}
      <div className="mb-6 text-center">
        <p className="mono text-[10px] tracking-[0.2em] uppercase text-[#CAA243] font-mono mb-1">
          {isFr ? '02 // STACK TECHNIQUE & PIPELINE' : '02 // AI PIPELINE & TOOLSET'}
        </p>
        <h2 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-[#ECE4D3]">
          {isFr ? 'Moteurs Génératifs & Post-Production' : 'Generative Engines & Post-Production'}
        </h2>
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
