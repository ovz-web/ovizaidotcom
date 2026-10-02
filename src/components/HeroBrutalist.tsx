'use client';

import React from 'react';
import { Language } from '@/types';

interface HeroBrutalistProps {
  lang: Language;
}

export default function HeroBrutalist({ lang }: HeroBrutalistProps) {
  const isFr = lang === 'fr';

  return (
    <section className="relative pt-20 sm:pt-28 md:pt-32 pb-12 sm:pb-16 px-4 sm:px-6 overflow-hidden">
      {/* Subtle ambient lighting */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[750px] h-[350px] sm:h-[450px] bg-gradient-to-b from-gold/10 via-gold/[0.02] to-transparent rounded-full blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.02] mb-6 sm:mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
          <span className="mono text-xs sm:text-sm uppercase tracking-[0.2em] text-gold/90 font-medium">
            {isFr
              ? 'STUDIO CRÉATIF · FILM & IMAGE · WORLDWIDE'
              : 'CREATIVE STUDIO · FILM & IMAGE · WORLDWIDE'}
          </span>
        </div>

        {/* Headline — Deux phrases distinctes, sur deux lignes propres, sans point final */}
        <h1 className="font-display font-extrabold text-[clamp(1.4rem,6vw,4.8rem)] tracking-tight leading-[1.08] text-fg uppercase mb-6 sm:mb-8 text-center">
          {isFr ? (
            <>
              <span className="block whitespace-nowrap">DES IDÉES IMPOSSIBLES</span>
              <span className="block whitespace-nowrap text-gold-gradient">DES FILMS BIEN RÉELS</span>
            </>
          ) : (
            <>
              <span className="block whitespace-nowrap">IMPOSSIBLE IDEAS</span>
              <span className="block whitespace-nowrap text-gold-gradient">REAL FILMS</span>
            </>
          )}
        </h1>

        {/* Sous-phrase de positionnement — Bloc logique unique, sans <br>, sans point final */}
        <p className="text-base sm:text-lg md:text-xl text-muted/90 font-normal max-w-2xl mx-auto leading-relaxed text-center">
          {isFr
            ? 'OVIZai imagine et réalise des films, publicités et univers visuels pour les marques, artistes et agences'
            : 'OVIZai creates films, advertising and visual worlds for brands, artists and agencies'}
        </p>
      </div>
    </section>
  );
}