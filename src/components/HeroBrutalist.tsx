'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { Language } from '@/types';

interface HeroBrutalistProps {
  lang: Language;
  heroVideoUrl?: string;
  heroPosterUrl?: string;
}

export default function HeroBrutalist({
  lang,
  heroVideoUrl,
  heroPosterUrl,
}: HeroBrutalistProps) {
  const isFr = lang === 'fr';

  return (
    <section className="relative pt-16 sm:pt-24 pb-16 sm:pb-24 px-4 sm:px-6 overflow-hidden">
      {/* Background ambient lighting */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[750px] h-[350px] sm:h-[450px] bg-gradient-to-b from-gold/10 via-gold/[0.03] to-transparent rounded-full blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm mb-6 sm:mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
          <span className="mono text-xs sm:text-sm uppercase tracking-[0.2em] text-gold font-semibold">
            {isFr
              ? 'STUDIO CRÉATIF PUBLICITAIRE · WORLDWIDE'
              : 'CREATIVE AD STUDIO · WORLDWIDE'}
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-display font-extrabold text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[1.05] text-fg uppercase mb-6 sm:mb-8">
          {isFr ? (
            <>
              DES IDÉES IMPOSSIBLES.<br />
              <span className="text-gold-gradient">DES PUBLICITÉS BIEN RÉELLES.</span>
            </>
          ) : (
            <>
              IMPOSSIBLE IDEAS.<br />
              <span className="text-gold-gradient">REAL ADS.</span>
            </>
          )}
        </h1>

        {/* Sub-headline */}
        <p className="text-lg sm:text-xl md:text-2xl text-muted font-normal max-w-2xl leading-relaxed mb-8 sm:mb-10 text-balance">
          {isFr
            ? 'OVIZai conçoit des publicités courtes pour marques, produits et établissements — de l’idée au film final.'
            : 'OVIZai creates short-form ads for brands, products and businesses — from concept to final film.'}
        </p>

        {/* Dual Commercial CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 w-full sm:w-auto mb-6 sm:mb-8">
          <Link
            href="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold-bright text-black font-bold text-sm sm:text-base mono uppercase tracking-wider px-8 py-4 rounded-full transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-gold/15 min-h-[48px]"
          >
            <span>{isFr ? 'Démarrer un projet' : 'Start a project'}</span>
            <ArrowUpRight className="w-4 h-4 text-black" />
          </Link>

          <Link
            href="/tarifs"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.12] hover:border-gold/40 text-fg hover:text-gold font-medium text-sm sm:text-base mono tracking-wide px-7 py-4 rounded-full transition-all duration-200 min-h-[48px]"
          >
            <span>{isFr ? 'Voir l’offre — 530 USD' : 'See the launch offer — 530 USD'}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Micro-line */}
        <p className="mono text-xs sm:text-sm text-muted/80 tracking-wide text-center">
          {isFr
            ? '10–15 s · Format 9:16 · Première version visée sous 5 jours ouvrables'
            : '10–15 sec · 9:16 · First cut targeted within 5 business days'}
        </p>

        {/* Optional Slot for Future Hero Video (Seamless plug-and-play when official videos arrive) */}
        {heroVideoUrl && (
          <div className="w-full max-w-3xl mt-12 sm:mt-16 rounded-2xl overflow-hidden border border-white/[0.1] shadow-2xl bg-black aspect-[9/16] sm:aspect-video">
            <video
              src={heroVideoUrl}
              poster={heroPosterUrl}
              controls
              playsInline
              muted
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>
    </section>
  );
}