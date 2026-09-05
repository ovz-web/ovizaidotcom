'use client';

import React from 'react';
import Link from 'next/link';
import { Cpu, Zap, Layers, Sliders } from 'lucide-react';
import { Language } from '@/types';

interface AIPipelineProps {
  lang: Language;
  customEyebrow?: string;
  customTitle?: string;
  showConversionCard?: boolean;
  hideHeader?: boolean;
}

const PIPELINE_STEPS = [
  {
    stepNum: '01',
    id: 'step-design',
    title: {
      fr: '01. Direction Artistique & Personnages',
      en: '01. Art Direction & Character Design',
    },
    benefit: {
      fr: 'Création de l’univers visuel et de personnages uniques, constants d’un plan à l’autre.',
      en: 'Creation of custom visual universes and characters with shot-to-shot consistency.',
    },
    techBadge: {
      fr: 'Midjourney & Flux.1',
      en: 'Midjourney & Flux.1',
    },
    icon: Cpu,
  },
  {
    stepNum: '02',
    id: 'step-motion',
    title: {
      fr: '02. Animation & Mouvements',
      en: '02. Animation & Natural Motion',
    },
    benefit: {
      fr: 'Animation réaliste des expressions, des fluides et des éclairages dynamiques.',
      en: 'Realistic animation of expressions, fluids, and dynamic lighting.',
    },
    techBadge: {
      fr: 'Kling AI',
      en: 'Kling AI',
    },
    icon: Zap,
  },
  {
    stepNum: '03',
    id: 'step-camera',
    title: {
      fr: '03. Caméra & Mise en scène',
      en: '03. Camera & Scene Direction',
    },
    benefit: {
      fr: 'Mouvements de caméra cinématographiques (panoramiques, travellings) pour rythmer le récit.',
      en: 'Cinematic camera motion (panning, tracking shots) pacing the story.',
    },
    techBadge: {
      fr: 'Runway Gen-3',
      en: 'Runway Gen-3',
    },
    icon: Layers,
  },
  {
    stepNum: '04',
    id: 'step-grading',
    title: {
      fr: '04. Étalonnage & Master 4K',
      en: '04. Color Grading & 4K Master',
    },
    benefit: {
      fr: 'Étalonnage cinéma, émulation du grain 35mm, sound design et master final 4K.',
      en: 'Cinema color grading, 35mm film grain, spatial audio design, and 4K master.',
    },
    techBadge: {
      fr: 'DaVinci Resolve Studio',
      en: 'DaVinci Resolve Studio',
    },
    icon: Sliders,
  },
];

export default function AIPipeline({
  lang,
  customEyebrow,
  customTitle,
  showConversionCard = true,
  hideHeader = false,
}: AIPipelineProps) {
  const isFr = lang === 'fr';

  return (
    <section className="max-w-xl mx-auto mb-6 px-4">
      {/* Section Title (rendered only if hideHeader is false) */}
      {!hideHeader && (
        <div className="mb-6 text-center">
          <p className="mono text-[10px] tracking-[0.2em] uppercase text-[#CAA243] font-mono mb-1 font-bold">
            {customEyebrow || (isFr ? '03 // NOTRE PIPELINE DE PRODUCTION' : '03 // OUR PRODUCTION PIPELINE')}
          </p>
          <h2 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-[#ECE4D3] mb-2">
            {customTitle || (isFr ? 'Le Processus de votre Idée au Rendu Final' : 'The Process from Idea to Final Master')}
          </h2>
          <p className="text-xs text-[#9C9384] max-w-md mx-auto leading-relaxed">
            {isFr
              ? '4 étapes combinant les meilleures technologies IA et la post-production cinéma.'
              : '4 steps combining top generative AI and cinema post-production.'}
          </p>
        </div>
      )}

      {/* 4 Numbered Steps */}
      <div className="space-y-3">
        {PIPELINE_STEPS.map((step) => {
          const IconComp = step.icon;
          return (
            <div
              key={step.id}
              className="border border-white/[0.08] bg-[#0B0A08] hover:border-[#CAA243]/50 rounded-xl p-4 sm:p-5 transition-all duration-300 group shadow-lg"
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-black/60 border border-white/[0.1] text-[#CAA243] group-hover:border-[#CAA243]/50 transition-colors mt-0.5">
                    <IconComp className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-display text-sm sm:text-base font-extrabold text-[#ECE4D3] group-hover:text-[#f0c869] transition-colors leading-snug">
                      {step.title[lang]}
                    </h3>
                  </div>
                </div>

                <span className="mono text-[9.5px] px-2.5 py-1 rounded bg-[#CAA243]/10 border border-[#CAA243]/25 text-[#CAA243] font-bold whitespace-nowrap">
                  {step.techBadge[lang]}
                </span>
              </div>

              <p className="text-xs text-[#9C9384] leading-relaxed pl-11">
                {step.benefit[lang]}
              </p>
            </div>
          );
        })}
      </div>

      {/* Bottom Conversion Card */}
      {showConversionCard && (
        <div className="ovizai-card border border-[#CAA243]/30 bg-[#CAA243]/[0.03] p-5 rounded-2xl text-center mt-8">
          <span className="mono text-[10px] text-[#CAA243] uppercase tracking-widest font-bold block mb-1">
            {isFr ? 'UN PROCESSUS CLAIR, DES RÉSULTATS GARANTIS' : 'CLEAR PROCESS, GUARANTEED RESULTS'}
          </span>
          <h3 className="text-sm sm:text-base font-bold text-[#ECE4D3] mb-2">
            {isFr ? 'Prêt à donner vie à votre projet visuel ?' : 'Ready to bring your visual project to life?'}
          </h3>
          <p className="text-xs text-[#9C9384] max-w-md mx-auto mb-4 leading-relaxed">
            {isFr
              ? 'Profitez de la liberté de création du cinéma IA avec des délais garantis et des révisions incluses.'
              : 'Enjoy the creative freedom of AI cinema with guaranteed delivery times and included revisions.'}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/tarifs"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 bg-[#CAA243] hover:bg-[#f0c869] text-black font-bold px-5 py-2.5 rounded-xl mono text-xs uppercase tracking-wider transition-all cursor-pointer min-h-[44px]"
            >
              <span>{isFr ? 'Voir nos tarifs & formules →' : 'View pricing & packages →'}</span>
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 bg-[#CAA243] hover:bg-[#f0c869] text-black font-bold px-5 py-2.5 rounded-xl mono text-xs uppercase tracking-wider transition-all cursor-pointer min-h-[44px]"
            >
              <span>{isFr ? 'Demander un devis 24h →' : 'Request 24h quote →'}</span>
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}
