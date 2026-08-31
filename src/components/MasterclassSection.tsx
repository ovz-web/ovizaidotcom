'use client';

import React from 'react';
import Link from 'next/link';
import { GraduationCap, BookOpen, ShieldCheck, ArrowUpRight, Zap } from 'lucide-react';
import { Language, Currency } from '@/types';

interface MasterclassSectionProps {
  lang: Language;
  currency?: Currency;
  onSelectCurrency?: (curr: Currency) => void;
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
      fr: 'Maîtrise de l’éclairage studio, des optiques de caméra (Anamorphique 2.39:1), des textures de peau et création de moodboards de production.',
      en: 'Mastering lighting, camera optics (Anamorphic 2.39:1), skin textures, and production-ready moodboards.'
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
      fr: 'Contrôle précis des trajectoires de caméra (crane, orbit, dolly, zoom), physiques naturelles et scènes d’action.',
      en: 'Precise virtual camera trajectory control (crane, orbit, dolly), natural physics, and action scenes.'
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
      fr: 'Méthode pas-à-pas pour maintenir la consistance faciale d’un personnage à travers plusieurs plans et doublage vocal IA.',
      en: 'Step-by-step method to maintain facial character consistency across multiple shots with AI voice synthesis.'
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
      fr: 'Restauration de textures, étalonnage couleur cinématographique ACES, émulation de film 35mm et upscaling 4K sans perte.',
      en: 'Texture recovery, ACES cinematic color grading, 35mm film emulation, and crisp 4K master upscaling.'
    }
  },
  {
    number: 'M05',
    title: {
      fr: 'Workflows Commerciaux & Monétisation',
      en: 'Commercial Workflows & Monetization'
    },
    tools: 'Pricing B2B • Briefs Client • Livrables Industriels',
    desc: {
      fr: 'Cadre tarifaire commercial, rédaction des devis, workflow client efficace et monétisation de votre savoir-faire vidéo IA.',
      en: 'B2B pricing framework, quoting client briefs, production efficiency, and monetization of your AI video expertise.'
    }
  }
];

export default function MasterclassSection({ lang, currency = 'USD', onSelectCurrency }: MasterclassSectionProps) {
  const isFr = lang === 'fr';

  const MASTERCLASS_PRICES: Record<Currency, string> = {
    USD: '490 $ USD',
    EUR: '450 € EUR',
    CAD: '650 $ CAD'
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
              {isFr ? 'ACCÈS IMMÉDIAT • BIBLIOTHÈQUE DE PROMPTS • ACCÈS À VIE' : 'IMMEDIATE ACCESS • RAW PROMPTS • LIFETIME ACCESS'}
            </span>
          </div>

          <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-[#ECE4D3] mb-2">
            {isFr ? 'FORMATION VIDÉO IA ULTRA-RÉALISTE' : 'ULTRA-REALISTIC AI VIDEO MASTERCLASS'}
          </h2>

          <p className="text-xs sm:text-sm text-[#8c8375] max-w-lg mx-auto mb-3">
            {isFr
              ? 'Le programme d’apprentissage accéléré pour maîtriser l’ensemble de la chaîne de production vidéo IA et monétiser vos créations.'
              : 'The accelerated learning system to master the entire AI video production chain and monetize your creations.'}
          </p>

          {/* Currency Selector */}
          {onSelectCurrency && (
            <div className="inline-flex items-center gap-1 bg-black/60 p-1 rounded-lg border border-white/[0.08] mono text-xs">
              <span className="text-[10px] text-[#8C8375] px-2 font-mono">
                {isFr ? 'Devise :' : 'Currency:'}
              </span>
              {(['USD', 'EUR', 'CAD'] as Currency[]).map(curr => (
                <button
                  key={curr}
                  type="button"
                  onClick={() => onSelectCurrency(curr)}
                  className={`px-2 py-0.5 rounded text-[11px] font-bold transition-all cursor-pointer ${
                    currency === curr
                      ? 'bg-[#CAA243] text-black'
                      : 'text-[#8C8375] hover:text-[#ECE4D3]'
                  }`}
                >
                  {curr}
                </button>
              ))}
            </div>
          )}
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
            <Zap className="w-4 h-4 text-[#CAA243] flex-shrink-0" />
            <span>{isFr ? 'Workflows Production 4K' : '4K Production Workflows'}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#ECE4D3] bg-white/[0.02] p-2.5 rounded-lg border border-white/[0.06]">
            <ShieldCheck className="w-4 h-4 text-[#CAA243] flex-shrink-0" />
            <span>{isFr ? 'Accès Immédiat & Mises à Jour' : 'Lifetime Access & Updates'}</span>
          </div>
        </div>

        {/* Action Button & Pricing */}
        <div className="text-center">
          <p className="mono text-xs text-[#8c8375] mb-3">
            {isFr ? 'Tarif d’accès complet :' : 'Full Access Price:'}{' '}
            <strong className="text-[#f0c869] text-base font-bold">{MASTERCLASS_PRICES[currency]}</strong>
          </p>

          <Link
            href="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#CAA243] hover:bg-[#f0c869] text-black font-bold px-7 py-3.5 rounded-lg mono text-xs uppercase tracking-wider transition-all cursor-pointer shadow-[0_0_20px_rgba(202,162,67,0.25)] hover:scale-[1.02]"
          >
            <span>{isFr ? 'Rejoindre la Formation +' : 'Access Masterclass +'}</span>
            <ArrowUpRight className="w-4 h-4 text-black" />
          </Link>
        </div>
      </div>
    </section>
  );
}
