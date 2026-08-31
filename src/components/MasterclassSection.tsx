'use client';

import React from 'react';
import { GraduationCap, Sparkles, BookOpen, MessageSquare, Video, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { Language } from '@/types';

interface MasterclassSectionProps {
  lang: Language;
}

const MODULES = [
  {
    number: 'M01',
    title: {
      fr: 'Fondations & Prompts Avancés',
      en: 'Foundations & Advanced Prompting'
    },
    tools: 'Midjourney v6.1 • Flux.1 Pro • Stable Diffusion',
    desc: {
      fr: 'Maîtrise de l’éclairage studio, des optiques de caméra (Anamorphique 2.39:1), des textures de peau et création de moodboards prêts pour la production.',
      en: 'Mastering studio lighting, camera optics (Anamorphic 2.39:1), skin textures, and production-ready moodboards.'
    }
  },
  {
    number: 'M02',
    title: {
      fr: 'Génération Vidéo & Mouvements de Caméra',
      en: 'Video Generation & Camera Controls'
    },
    tools: 'Runway Gen-3 Alpha • Kling AI 1.5 • Luma Dream Machine',
    desc: {
      fr: 'Contrôle précis des trajectoires de caméra (crane, orbit, dolly, zoom), physiques naturelles, mouvements d’action et gestion des artefacts.',
      en: 'Precise virtual camera trajectory control (crane, orbit, dolly), natural physics, action scenes, and artifact cleanup.'
    }
  },
  {
    number: 'M03',
    title: {
      fr: 'Lip-Sync & Cohérence des Personnages',
      en: 'Lip-Sync & Character Consistency'
    },
    tools: 'ElevenLabs • Sync Labs • Character LoRA Weights',
    desc: {
      fr: 'Méthode pas-à-pas pour maintenir la consistance faciale d’un personnage à travers plusieurs plans et doublage vocal IA naturel.',
      en: 'Step-by-step method to maintain facial character consistency across multiple shots with natural AI voice cloning.'
    }
  },
  {
    number: 'M04',
    title: {
      fr: 'Post-Production, Upscaling 4K & VFX',
      en: 'Post-Production, 4K Upscaling & VFX'
    },
    tools: 'Topaz Video AI 5 • DaVinci Resolve 19 • After Effects',
    desc: {
      fr: 'Restauration de textures, étalonnage couleur cinématographique ACES, émulation de film 35mm et upscaling 4K sans perte de piqué.',
      en: 'Texture recovery, ACES cinematic color grading, 35mm film emulation, and crisp 4K master upscaling.'
    }
  },
  {
    number: 'M05',
    title: {
      fr: 'Workflows Commerciaux & Business Studio',
      en: 'Commercial Workflows & Studio Business'
    },
    tools: 'Pricing B2B • Briefs Client • Livrables Industriels',
    desc: {
      fr: 'Cadre tarifaire (1 500 € à 15 000 €+), rédaction des devis, workflow client efficace et monétisation de votre savoir-faire vidéo IA.',
      en: 'B2B pricing framework (€1,500 to €15,000+), quoting client briefs, production efficiency, and studio monetization.'
    }
  }
];

export default function MasterclassSection({ lang }: MasterclassSectionProps) {
  const isFr = lang === 'fr';

  const scrollToContact = () => {
    const el = document.querySelector('#contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="masterclass" className="max-w-3xl mx-auto mb-14 px-4">
      {/* Container Box */}
      <div className="border border-[#CAA243]/40 bg-[#0B0A08] rounded-xl p-5 sm:p-7 relative overflow-hidden shadow-[0_0_30px_rgba(202,162,67,0.1)]">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#CAA243]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Section Header */}
        <div className="mb-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#CAA243]/10 border border-[#CAA243]/30 mb-3">
            <GraduationCap className="w-3.5 h-3.5 text-[#CAA243]" />
            <span className="mono text-[10px] uppercase font-bold tracking-widest text-[#f0c869]">
              {isFr ? 'ACCÈS IMMÉDIAT • DISCORD PRIVÉ • PROMPTS EXCLUSIFS' : 'IMMEDIATE ACCESS • PRIVATE DISCORD • EXCLUSIVE PROMPTS'}
            </span>
          </div>

          <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-[#ECE4D3] mb-2">
            {isFr ? 'MASTERCLASS VIDÉO IA ULTRA-RÉALISTE' : 'ULTRA-REALISTIC AI VIDEO MASTERCLASS'}
          </h2>

          <p className="text-xs sm:text-sm text-[#8c8375] max-w-lg mx-auto">
            {isFr
              ? 'Le programme d’apprentissage accéléré pour maîtriser l’ensemble de la chaîne de production vidéo IA et monétiser vos créations.'
              : 'The accelerated learning system to master the entire AI video production chain and monetize your creations.'}
          </p>
        </div>

        {/* 5 Modules List */}
        <div className="space-y-3.5 mb-6">
          {MODULES.map(mod => (
            <div
              key={mod.number}
              className="p-4 rounded-lg bg-black/50 border border-white/[0.08] hover:border-[#CAA243]/40 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                <div className="flex items-center gap-2.5">
                  <span className="mono text-xs font-bold text-[#CAA243] bg-[#CAA243]/10 px-2 py-0.5 rounded border border-[#CAA243]/20">
                    {mod.number}
                  </span>
                  <h3 className="mono text-sm font-bold text-[#ECE4D3]">
                    {mod.title[lang]}
                  </h3>
                </div>
                <span className="mono text-[10px] text-[#8c8375]">
                  {mod.tools}
                </span>
              </div>
              <p className="text-xs text-[#8c8375] leading-relaxed mt-1">
                {mod.desc[lang]}
              </p>
            </div>
          ))}
        </div>

        {/* Perks Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6 pt-4 border-t border-white/[0.08]">
          <div className="flex items-center gap-2 text-xs text-[#ECE4D3] bg-white/[0.02] p-2.5 rounded-lg border border-white/[0.06]">
            <BookOpen className="w-4 h-4 text-[#CAA243] flex-shrink-0" />
            <span>{isFr ? 'Bibliothèque de Prompts RAW' : 'RAW Prompt Library'}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#ECE4D3] bg-white/[0.02] p-2.5 rounded-lg border border-white/[0.06]">
            <MessageSquare className="w-4 h-4 text-[#CAA243] flex-shrink-0" />
            <span>{isFr ? 'Discord Privé des Créateurs' : 'Private Creators Discord'}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#ECE4D3] bg-white/[0.02] p-2.5 rounded-lg border border-white/[0.06]">
            <ShieldCheck className="w-4 h-4 text-[#CAA243] flex-shrink-0" />
            <span>{isFr ? 'Accès Immédiat & Mises à Jour' : 'Lifetime Access & Updates'}</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="text-center">
          <button
            type="button"
            onClick={scrollToContact}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#CAA243] hover:bg-[#f0c869] text-black font-bold px-7 py-3.5 rounded-lg mono text-xs uppercase tracking-wider transition-all cursor-pointer shadow-[0_0_20px_rgba(202,162,67,0.25)] hover:scale-[1.02]"
          >
            <span>{isFr ? 'Rejoindre la Masterclass +' : 'Join Masterclass +'}</span>
            <ArrowUpRight className="w-4 h-4 text-black" />
          </button>
        </div>
      </div>
    </section>
  );
}
