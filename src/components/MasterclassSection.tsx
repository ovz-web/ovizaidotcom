'use client';

import React from 'react';
import { GraduationCap, ShieldCheck, Sparkles } from 'lucide-react';
import { Language } from '@/types';

interface MasterclassSectionProps {
  lang: Language;
}

const MODULES = [
  {
    num: '01',
    title: { fr: 'Ingénierie de Prompts & Direction Visuelle 8K', en: 'Prompt Engineering & 8K Visual Direction' },
    desc: {
      fr: 'Conception d\'images cinématiques ultradétaillées\nMaîtrise des éclairages et cohérence des plans',
      en: 'Creation of detailed cinematic imagery\nLighting control and shot-to-shot consistency',
    },
  },
  {
    num: '02',
    title: { fr: 'Cinéma Génératif & Caméra Virtuelle', en: 'Generative Cinema & Virtual Camera' },
    desc: {
      fr: 'Moteurs d’animation physique et mouvements réalistes\nCaméra virtuelle 3D pour des plans fluides',
      en: 'Physics motion engines and realistic dynamics\n3D virtual camera for fluid cinematic shots',
    },
  },
  {
    num: '03',
    title: { fr: 'Post-Production & Upscaling 4K/8K', en: 'Post-Production & 4K/8K Upscaling' },
    desc: {
      fr: 'Upscaling neuronal 4K/8K sans artefact\nConformation temporelle et étalonnage ACES',
      en: 'Neural 4K/8K upscaling without artifacts\nTemporal consistency and ACES color grading',
    },
  },
  {
    num: '04',
    title: { fr: 'Sound Design & Doublage Voix IA', en: 'Sound Design & AI Voice Synchronization' },
    desc: {
      fr: 'Bandes-son spatialisées et sound design synchronisé\nSynthèse vocale multilingue haute fidélité',
      en: 'Spatial soundtracks and beat-synced audio design\nHigh-fidelity multilingual voice synthesis',
    },
  },
  {
    num: '05',
    title: { fr: 'Monétisation & Workflow Client Pro', en: 'Monetization & Professional Client Pipeline' },
    desc: {
      fr: 'Devis et négociation de contrats commerciaux\nGestion des droits d’auteur et livraison client',
      en: 'Commercial client quoting and contracts\nAI copyright frameworks and master delivery',
    },
  },
];

export default function MasterclassSection({ lang }: MasterclassSectionProps) {
  const isFr = lang === 'fr';

  return (
    <section id="masterclass" className="max-w-xl mx-auto mb-8 px-4">
      {/* Container Card */}
      <div className="ovizai-card relative p-4 sm:p-6 md:p-8">

        {/* Section Eyebrow */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <span className="mono text-[10px] tracking-[0.25em] uppercase text-gold font-bold flex items-center gap-1.5">
            <GraduationCap className="w-4 h-4 text-gold" />
            {isFr ? 'CURRICULUM DE FORMATION' : 'TRAINING CURRICULUM'}
          </span>
          <span className="mono text-[10px] uppercase font-bold text-gold bg-gold/10 border border-gold/25 px-2.5 py-0.5 rounded-full flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            {isFr ? 'Parcours Pro' : 'Pro Curriculum'}
          </span>
        </div>

        {/* Header Title */}
        <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-fg mb-1.5 leading-snug">
          {isFr ? (
            <>
              Maîtrisez le Cinéma IA <br />
              du Prompt au <span className="text-gold-gradient">Master Final</span>
            </>
          ) : (
            <>
              Master AI Cinematography <br />
              from Prompt to <span className="text-gold-gradient">Final Master</span>
            </>
          )}
        </h2>

        <p className="text-xs sm:text-sm text-muted leading-relaxed max-w-xl mb-6">
          {isFr
            ? 'Formation pratique pour intégrer l’IA générative dans vos productions vidéo'
            : 'Practical training to integrate generative AI into your video productions'}
        </p>

        {/* Modules List */}
        <div className="space-y-3 mb-8">
          <h3 className="mono text-xs font-semibold uppercase text-fg tracking-[0.2em] mb-2">
            {isFr ? 'Programme de la Masterclass' : 'Masterclass Curriculum'}
          </h3>

          {MODULES.map((mod) => (
            <div
              key={mod.num}
              className="flex items-start gap-3 p-3.5 rounded-xl border border-white/[0.06] bg-black/40 hover:border-border-gold transition-all"
            >
              <span className="mono text-xs font-bold text-gold bg-black/60 border border-border-gold px-2 py-0.5 rounded">
                {mod.num}
              </span>
              <div>
                <h4 className="mono text-xs sm:text-[13px] font-semibold text-fg">
                  {mod.title[lang]}
                </h4>
                <div className="text-[11.5px] text-muted mt-0.5 leading-normal space-y-0.5">
                  {mod.desc[lang].split('\n').map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Guarantee Badge */}
        <div className="pt-4 border-t border-border text-center">
          <p className="text-xs text-gold inline-flex items-center gap-1.5 font-mono">
            <ShieldCheck className="w-4 h-4 text-gold flex-shrink-0" />
            <span>
              {isFr
                ? 'Accès illimité à vie et mises à jour des futurs modèles incluses'
                : 'Unlimited lifetime access and future model updates included'}
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
