'use client';

import React from 'react';
import Link from 'next/link';
import { GraduationCap, ArrowUpRight, ShieldCheck, Sparkles } from 'lucide-react';
import { Language } from '@/types';

interface MasterclassSectionProps {
  lang: Language;
}

const MODULES = [
  {
    num: '01',
    title: { fr: 'Ingénierie de Prompts & Direction Visuelle 8K', en: 'Prompt Engineering & 8K Visual Direction' },
    desc: {
      fr: 'Moteurs de rendu génératif pour concevoir des images cinématiques ultradétaillées et cohérentes.',
      en: 'Generative rendering engines to create detailed, coherent cinematic imagery.',
    },
  },
  {
    num: '02',
    title: { fr: 'Cinéma Génératif & Caméra Virtuelle', en: 'Generative Cinema & Virtual Camera' },
    desc: {
      fr: 'Moteurs d’animation physique et caméra virtuelle 3D pour animer vos plans avec fluidité.',
      en: 'Physics motion engines and 3D virtual camera systems for smooth cinematic sequences.',
    },
  },
  {
    num: '03',
    title: { fr: 'Post-Production & Upscaling 4K/8K', en: 'Post-Production & 4K/8K Upscaling' },
    desc: {
      fr: 'Upscaling neuronal 4K/8K, conformation temporelle et étalonnage colorimétrique ACES.',
      en: 'Neural 4K/8K upscaling, temporal consistency, and ACES color grading.',
    },
  },
  {
    num: '04',
    title: { fr: 'Sound Design & Doublage Voix IA', en: 'Sound Design & AI Voice Synchronization' },
    desc: {
      fr: 'Bandes-son spatialisées, synthèse vocale multilingue et sound design synchronisé.',
      en: 'Spatialized soundtracks, multilingual voice synthesis, and synchronized sound design.',
    },
  },
  {
    num: '05',
    title: { fr: 'Monétisation & Workflow Client Pro', en: 'Monetization & Professional Client Pipeline' },
    desc: {
      fr: 'Devis, gestion des droits d’auteur IA et méthodes pour signer vos contrats commerciaux.',
      en: 'Quotes, AI copyright frameworks, and landing commercial contracts.',
    },
  },
];

export default function MasterclassSection({ lang }: MasterclassSectionProps) {
  const isFr = lang === 'fr';

  return (
    <section id="masterclass" className="max-w-xl mx-auto mb-8 px-4">
      {/* Container Card */}
      <div className="relative border border-[#CAA243]/40 bg-[#0B0A08]/95 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-[0_0_35px_rgba(202,162,67,0.1)] overflow-hidden">
        {/* Ambient Radial Aura */}
        <div
          className="absolute top-0 right-0 w-80 h-80 blur-3xl pointer-events-none -z-10"
          style={{ background: 'radial-gradient(circle, rgba(202,162,67,0.15) 0%, transparent 70%)' }}
        />

        {/* Section Eyebrow */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <span className="mono text-[10px] tracking-[0.25em] uppercase text-[#CAA243] font-bold flex items-center gap-1.5">
            <GraduationCap className="w-4 h-4 text-[#CAA243]" />
            {isFr ? 'CURRICULUM DE FORMATION' : 'TRAINING CURRICULUM'}
          </span>
          <span className="mono text-[10px] uppercase font-bold text-[#CAA243] bg-[#CAA243]/10 border border-[#CAA243]/25 px-2.5 py-0.5 rounded-full flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-[#CAA243]" />
            {isFr ? 'Parcours Pro' : 'Pro Curriculum'}
          </span>
        </div>

        {/* Header Title */}
        <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#ECE4D3] mb-1.5 leading-snug">
          {isFr ? (
            <>
              Maîtrisez le Cinéma IA <br />
              du Prompt au <span className="text-gold-gradient text-gold-glow">Master Final</span>
            </>
          ) : (
            <>
              Master AI Cinematography <br />
              from Prompt to <span className="text-gold-gradient text-gold-glow">Final Master</span>
            </>
          )}
        </h2>

        <p className="text-xs sm:text-sm text-[#9C9384] leading-relaxed max-w-xl mb-6">
          {isFr
            ? 'Formation pratique pour intégrer l’IA générative dans vos productions vidéo.'
            : 'Practical training to integrate generative AI into your video productions.'}
        </p>

        {/* Modules List */}
        <div className="space-y-3 mb-8">
          <h3 className="mono text-xs font-semibold uppercase text-[#ECE4D3] tracking-[0.2em] mb-2">
            {isFr ? 'Programme de la Masterclass' : 'Masterclass Curriculum'}
          </h3>

          {MODULES.map((mod) => (
            <div
              key={mod.num}
              className="flex items-start gap-3 p-3.5 rounded-xl border border-white/[0.06] bg-black/40 hover:border-[#CAA243]/30 transition-all"
            >
              <span className="mono text-xs font-bold text-[#CAA243] bg-black/60 border border-[#CAA243]/30 px-2 py-0.5 rounded">
                {mod.num}
              </span>
              <div>
                <h4 className="mono text-xs sm:text-[13px] font-semibold text-[#ECE4D3]">
                  {mod.title[lang]}
                </h4>
                <p className="text-[11.5px] text-[#9C9384] mt-0.5 leading-normal">
                  {mod.desc[lang]}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Guarantee Badge */}
        <div className="pt-4 border-t border-white/[0.08] text-center">
          <p className="text-xs text-[#CAA243] inline-flex items-center gap-1.5 font-mono">
            <ShieldCheck className="w-4 h-4 text-[#CAA243] flex-shrink-0" />
            <span>
              {isFr
                ? 'Accès illimité et à vie + toutes les mises à jour futures des modèles incluses.'
                : 'Lifetime access + all future model updates included.'}
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
