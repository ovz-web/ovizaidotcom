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
      fr: 'Définition de l’univers visuel, des éclairages et création de personnages uniques à la cohérence parfaite d’un plan à l’autre.',
      en: 'Definition of the visual universe, lighting, and creation of unique characters with perfect consistency across every shot.',
    },
    techBadge: {
      fr: 'Moteurs visuels : Midjourney & Flux.1',
      en: 'Visual engines: Midjourney & Flux.1',
    },
    icon: Cpu,
  },
  {
    stepNum: '02',
    id: 'step-motion',
    title: {
      fr: '02. Animation & Physique des Mouvements',
      en: '02. Animation & Natural Motion',
    },
    benefit: {
      fr: 'Simulation réaliste des mouvements : tissus qui bougent naturellement, fluides, éclairages dynamiques et scènes d’action fluides.',
      en: 'Realistic motion simulation: naturally moving fabrics, fluids, dynamic lighting, and fluid action sequences.',
    },
    techBadge: {
      fr: 'Moteur physique : Kling AI',
      en: 'Physics engine: Kling AI',
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
      fr: 'Mouvements de caméra cinématographiques (panoramiques, travellings, zooms) pour cadrer et rythmer chaque scène comme un vrai film.',
      en: 'Cinematic camera movements (panning, tracking shots, zooms) framing and pacing every scene like a feature film.',
    },
    techBadge: {
      fr: 'Contrôle 3D : Runway Gen-3',
      en: '3D control: Runway Gen-3',
    },
    icon: Layers,
  },
  {
    stepNum: '04',
    id: 'step-grading',
    title: {
      fr: '04. Étalonnage Couleur & Master 4K',
      en: '04. Color Grading & 4K Master',
    },
    benefit: {
      fr: 'Calibrage colorimétrique de qualité cinéma, émulation du grain 35mm, sound design spatialisé et livraison du Master final 4K.',
      en: 'Cinema-grade color calibration, 35mm film grain emulation, spatial audio design, and final 4K Master delivery.',
    },
    techBadge: {
      fr: 'Post-production : DaVinci Resolve Studio',
      en: 'Post-production: DaVinci Resolve Studio',
    },
    icon: Sliders,
  },
];

export default function AIPipeline({
  lang,
  customEyebrow,
  customTitle,
  showConversionCard = true,
}: AIPipelineProps) {
  const isFr = lang === 'fr';

  return (
    <section className="max-w-xl mx-auto mb-10 px-4">
      {/* Section Title */}
      <div className="mb-6 text-center">
        <p className="mono text-[10px] tracking-[0.2em] uppercase text-[#CAA243] font-mono mb-1 font-bold">
          {customEyebrow || (isFr ? '03 // NOTRE MÉTHODE DE PRODUCTION' : '03 // OUR PRODUCTION METHOD')}
        </p>
        <h2 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-[#ECE4D3] mb-2">
          {customTitle || (isFr ? 'Le Processus de votre Idée au Rendu Final' : 'The Process from Idea to Final Master')}
        </h2>
        <p className="text-xs text-[#9C9384] max-w-md mx-auto leading-relaxed">
          {isFr
            ? '4 étapes claires combinant les meilleures technologies génératives et logiciels de post-production cinéma.'
            : '4 clear steps combining top generative technologies and cinema post-production tools.'}
        </p>
      </div>

      {/* 4 Numbered Steps */}
      <div className="space-y-3">
        {PIPELINE_STEPS.map((step) => {
          const IconComp = step.icon;
          return (
            <div
              key={step.id}
              className="border border-white/[0.08] bg-[#141210] hover:border-[#CAA243]/40 rounded-xl p-4 transition-all duration-300 group"
            >
              <div className="flex items-center justify-between gap-3 mb-2">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-black/40 border border-white/[0.08] text-[#CAA243] group-hover:border-[#CAA243]/40 transition-colors">
                    <IconComp className="w-4 h-4" />
                  </div>
                  <h3 className="mono text-xs sm:text-sm font-bold text-[#ECE4D3] group-hover:text-[#f0c869] transition-colors">
                    {step.title[lang]}
                  </h3>
                </div>

                <span className="mono text-[9px] px-2 py-0.5 rounded bg-black/60 border border-white/[0.08] text-[#8c8375] font-medium whitespace-nowrap">
                  {step.techBadge[lang]}
                </span>
              </div>

              <p className="text-xs text-[#8c8375] leading-relaxed">
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
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 bg-black/50 border border-white/[0.12] hover:border-[#CAA243] text-[#ECE4D3] hover:text-[#CAA243] px-5 py-2.5 rounded-xl mono text-xs uppercase tracking-wider transition-all cursor-pointer min-h-[44px]"
            >
              <span>{isFr ? 'Demander un devis 24h →' : 'Request 24h quote →'}</span>
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}
