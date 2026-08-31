'use client';

import React from 'react';
import { DICTIONARY } from '@/lib/i18n';
import { Language } from '@/types';

interface HeroProps {
  lang: Language;
}

export default function Hero({ lang }: HeroProps) {
  const t = DICTIONARY[lang];

  return (
    <section className="relative z-10 mx-auto flex max-w-xl flex-col items-center justify-center px-4 py-3 sm:py-6 text-center select-none">
      {/* Surtitre Monospace compact */}
      <p className="font-mono text-[10px] sm:text-xs tracking-[0.25em] uppercase text-[#CAA243] mb-1">
        {t.eyebrow}
      </p>

      {/* Conteneur Logo sans cadre avec masque de fusion & halo diffus */}
      <div className="relative my-2 sm:my-3 flex items-center justify-center overflow-visible">
        {/* Halo doré circulaire d'arrière-plan */}
        <div className="pointer-events-none absolute -z-10 h-44 w-44 sm:h-60 sm:w-60 rounded-full bg-[radial-gradient(circle,rgba(202,162,67,0.22)_0%,rgba(202,162,67,0.05)_50%,transparent_75%)] blur-2xl" />

        {/* Logo agrandi avec suppression des bordures par masque radial */}
        <img
          src="/logo.png"
          alt="OVIZai"
          className="h-28 sm:h-40 w-auto object-contain mix-blend-screen scale-115 sm:scale-125 [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_85%)] drop-shadow-[0_0_35px_rgba(202,162,67,0.35)]"
        />
      </div>

      {/* Titre Principal */}
      <h1 className="max-w-lg font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#ECE4D3] leading-tight mt-1">
        <span className="text-gold-gradient text-gold-glow">{t.heroTagline}</span>
      </h1>

      {/* Sous-titre / Mission */}
      <p className="mx-auto mt-2 max-w-md text-xs sm:text-sm leading-relaxed text-[#8C8375] text-fg-muted">
        {t.heroSub}
      </p>
    </section>
  );
}
