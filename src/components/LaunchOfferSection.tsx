'use client';

import React from 'react';
import Link from 'next/link';
import { Check, ArrowUpRight, ShieldCheck, Clock, Layers } from 'lucide-react';
import { Language } from '@/types';
import { LAUNCH_OFFER, CUSTOM_PROJECT_OFFER } from '@/lib/pricing';

interface LaunchOfferSectionProps {
  lang: Language;
}

export default function LaunchOfferSection({ lang }: LaunchOfferSectionProps) {
  const isFr = lang === 'fr';

  return (
    <section id="tarifs" className="py-16 sm:py-24 px-4 sm:px-6 max-w-5xl mx-auto">
      {/* Section Tag */}
      <div className="text-center mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 mb-3">
          <span className="mono text-xs sm:text-sm uppercase tracking-[0.2em] text-gold font-bold">
            {isFr ? 'OFFRE PILOTE & SUR MESURE' : 'PILOT OFFER & CUSTOM'}
          </span>
        </div>
        <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-fg tracking-tight uppercase leading-tight mb-4">
          {isFr ? 'UNE OFFRE SIMPLE PENSÉE POUR COMMENCER' : 'ONE SIMPLE OFFER BUILT TO START'}
        </h2>
        <p className="text-base sm:text-lg text-muted max-w-xl mx-auto">
          {isFr
            ? 'Périmètre clair · Délais calibrés · Sans frais cachés'
            : 'Clear scope · Committed turnaround · Zero hidden fees'}
        </p>
      </div>

      {/* Main Launch Offer Card */}
      <div className="bg-[#12110f] border-2 border-gold/40 rounded-3xl p-8 sm:p-12 mb-8 shadow-2xl shadow-gold/5 relative overflow-hidden">
        {/* Subtle gold flare */}
        <div
          className="absolute -top-32 -right-32 w-80 h-80 bg-gold/10 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8 mb-8 pb-8 border-b border-white/[0.08]">
          <div>
            <div className="inline-block px-3 py-1 rounded-full bg-gold/15 border border-gold/40 text-gold text-xs mono uppercase tracking-widest font-bold mb-4">
              {LAUNCH_OFFER.badge[lang]}
            </div>
            <h3 className="font-display font-bold text-2xl sm:text-3xl text-fg uppercase mb-2">
              {LAUNCH_OFFER.name[lang]}
            </h3>
            <p className="mono text-sm sm:text-base text-gold/90 font-medium">
              {isFr
                ? '10–15 s · Format 9:16 · 1 concept · 1 série de corrections'
                : '10–15 sec · 9:16 · 1 concept · 1 revision round'}
            </p>
          </div>

          <div className="lg:text-right flex-shrink-0">
            <div className="font-display font-extrabold text-5xl sm:text-6xl text-fg tracking-tight mb-1">
              530 <span className="text-2xl text-gold font-normal mono">USD</span>
            </div>
            <p className="text-xs sm:text-sm mono text-muted">
              {isFr
                ? 'Acompte : 265 USD · Solde : 265 USD avant master final'
                : 'Deposit: $265 USD · Balance: $265 USD before final master'}
            </p>
          </div>
        </div>

        {/* Scope list */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 mb-10">
          {LAUNCH_OFFER.includes[lang].map((item, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 p-3 rounded-xl bg-black/40 border border-white/[0.04]"
            >
              <div className="w-5 h-5 rounded-full bg-gold/15 flex items-center justify-center flex-shrink-0 mt-0.5 text-gold">
                <Check className="w-3.5 h-3.5" />
              </div>
              <span className="text-sm text-fg/90 leading-relaxed font-sans">{item}</span>
            </div>
          ))}
        </div>

        {/* Primary CTA button */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/[0.06]">
          <div className="flex items-center gap-2 text-xs mono text-muted">
            <Clock className="w-4 h-4 text-gold" />
            <span>
              {isFr
                ? 'Délai visé : 5 jours ouvrables après réception du brief'
                : 'Targeted delivery: 5 business days after brief sign-off'}
            </span>
          </div>

          <Link
            href="/contact?offer=launch"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold-bright text-black font-bold text-sm sm:text-base mono uppercase tracking-wider px-8 py-4 rounded-full transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-gold/20 min-h-[48px]"
          >
            <span>{isFr ? 'Démarrer avec l’offre (530 $) →' : 'Book Launch Offer ($530) →'}</span>
            <ArrowUpRight className="w-4 h-4 text-black" />
          </Link>
        </div>
      </div>

      {/* Secondary Project Box: Sur Devis */}
      <div className="bg-[#11100e] border border-white/[0.08] hover:border-white/[0.15] rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 transition-all">
        <div className="max-w-xl">
          <div className="flex items-center gap-2 mb-2">
            <Layers className="w-4 h-4 text-muted" />
            <h4 className="font-display font-bold text-lg sm:text-xl text-fg uppercase">
              {isFr ? 'PROJET SUR MESURE' : 'CUSTOM PROJECT'}
            </h4>
            <span className="mono text-[10px] uppercase tracking-wider text-muted px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.08]">
              {isFr ? 'Sur devis' : 'Custom quote'}
            </span>
          </div>
          <p className="text-sm text-muted leading-relaxed">
            {isFr
              ? 'Films publicitaires, contenus de marque, films produit, clips, campagnes et formats sur mesure adaptés à vos objectifs'
              : 'Commercial films, branded content, product films, music videos, campaigns and tailored formats adapted to your goals'}
          </p>
        </div>

        <Link
          href="/contact?offer=custom"
          className="inline-flex items-center gap-2 bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] hover:border-gold/40 text-fg hover:text-gold text-xs sm:text-sm mono uppercase tracking-wider px-6 py-3.5 rounded-full transition-all flex-shrink-0"
        >
          <span>{isFr ? 'Parler du projet →' : 'Discuss project →'}</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </section>
  );
}
