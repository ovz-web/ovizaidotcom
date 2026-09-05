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
  stepPrefix?: 'numeric' | 'letterC';
  hideTechBadge?: boolean;
}

const PIPELINE_STEPS = [
  {
    id: 'step-design',
    title: {
      fr: '01 // Direction Artistique & Personnages',
      en: '01 // Art Direction & Character Design',
    },
    benefit: {
      fr: 'Création de l’univers visuel et de personnages uniques\nCohérence garantie d’un plan à l’autre',
      en: 'Creation of custom visual worlds and characters\nConsistent appearance from shot to shot',
    },
    techBadge: {
      fr: 'Génération Visuelle 8K',
      en: '8K Visual Generation',
    },
    icon: Cpu,
  },
  {
    id: 'step-motion',
    title: {
      fr: '02 // Animation & Mouvements',
      en: '02 // Animation & Natural Motion',
    },
    benefit: {
      fr: 'Animation réaliste des expressions et des fluides\nÉclairages dynamiques à haute cadence',
      en: 'Realistic animation of expressions and fluids\nDynamic lighting with natural motion',
    },
    techBadge: {
      fr: 'Simulation Physique & Mouvements',
      en: 'Physics & Motion Simulation',
    },
    icon: Zap,
  },
  {
    id: 'step-camera',
    title: {
      fr: '03 // Caméra & Mise en scène',
      en: '03 // Camera & Scene Direction',
    },
    benefit: {
      fr: 'Mouvements de caméra cinématographiques\nPanoramiques et travellings immersifs',
      en: 'Cinematic camera motion and direction\nImmersive panning and tracking shots',
    },
    techBadge: {
      fr: 'Caméra Virtuelle 3D',
      en: '3D Virtual Camera',
    },
    icon: Layers,
  },
  {
    id: 'step-grading',
    title: {
      fr: '04 // Étalonnage & Master 4K',
      en: '04 // Color Grading & 4K Master',
    },
    benefit: {
      fr: 'Étalonnage cinéma et émulation du grain 35mm\nSound design spatialisé et master final 4K',
      en: 'Cinema color grading and 35mm film emulation\nSpatial audio design and 4K final master',
    },
    techBadge: {
      fr: 'Étalonnage & Mastering 4K',
      en: 'Color Grading & 4K Master',
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
  hideTechBadge = false,
}: AIPipelineProps) {
  const isFr = lang === 'fr';

  return (
    <section className="max-w-xl mx-auto mb-6 px-4">
      {/* Section Title (rendered only if hideHeader is false) */}
      {!hideHeader && (
        <div className="mb-6 text-center">
          <p className="text-[10px] uppercase tracking-[0.25em] text-gold mb-1 font-mono font-bold">
            {customEyebrow || (isFr ? 'PIPELINE DE PRODUCTION' : 'PRODUCTION PIPELINE')}
          </p>
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-fg mb-1.5 leading-snug">
            {customTitle || (isFr ? 'Le Processus de votre Idée au Rendu Final' : 'The Process from Idea to Final Master')}
          </h2>
          <p className="text-xs text-muted max-w-md mx-auto leading-relaxed">
            {isFr
              ? '4 étapes combinant les moteurs génératifs et la post-production cinéma'
              : '4 steps combining generative engines and cinema post-production'}
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
              className="border border-border bg-card hover:border-gold/50 rounded-xl p-3.5 sm:p-5 transition-all duration-300 group shadow-lg"
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-black/60 border border-white/[0.1] text-gold group-hover:border-gold/50 transition-colors mt-0.5">
                    <IconComp className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="mono text-xs sm:text-[13px] font-semibold text-fg group-hover:text-gold-bright transition-colors leading-snug">
                      {step.title[lang]}
                    </h3>
                  </div>
                </div>

                {!hideTechBadge && (
                  <span className="mono text-[10px] px-2 py-0.5 rounded bg-gold/10 border border-gold/25 text-gold font-bold whitespace-nowrap">
                    {step.techBadge[lang]}
                  </span>
                )}
              </div>

              <div className="text-xs text-muted leading-relaxed pl-10 sm:pl-11 space-y-0.5">
                {step.benefit[lang].split('\n').map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Conversion Card */}
      {showConversionCard && (
        <div className="ovizai-card border border-border-gold bg-gold/[0.03] p-4 sm:p-5 rounded-xl sm:rounded-2xl text-center mt-8">
          <span className="mono text-[10px] uppercase tracking-[0.25em] text-gold font-bold block mb-1">
            {isFr ? 'Processus clair • Délais garantis' : 'Clear process • Guaranteed delivery'}
          </span>
          <h3 className="mono text-xs sm:text-[13px] font-semibold text-fg mb-2">
            {isFr ? 'Prêt à donner vie à votre projet visuel ?' : 'Ready to bring your visual project to life?'}
          </h3>
          <p className="text-xs text-muted max-w-md mx-auto mb-4 leading-relaxed">
            {isFr
              ? 'Profitez de la liberté de création du cinéma IA avec des délais garantis et des révisions incluses'
              : 'Enjoy the creative freedom of AI cinema with guaranteed delivery times and included revisions'}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/tarifs"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 bg-gold hover:bg-gold-bright text-black font-bold px-5 py-2.5 rounded-xl mono text-xs uppercase tracking-wider transition-all cursor-pointer min-h-[44px]"
            >
              <span>{isFr ? 'Voir nos tarifs & formules →' : 'View pricing & packages →'}</span>
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 bg-gold hover:bg-gold-bright text-black font-bold px-5 py-2.5 rounded-xl mono text-xs uppercase tracking-wider transition-all cursor-pointer min-h-[44px]"
            >
              <span>{isFr ? 'Demander un devis 24h →' : 'Request 24h quote →'}</span>
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}
