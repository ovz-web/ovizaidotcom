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
    <section className="relative z-10 max-w-xl mx-auto py-8 px-4 flex flex-col items-center justify-center gap-3 text-center">
      {/* Eyebrow */}
      <p className="mono text-[10px] sm:text-xs tracking-[0.2em] uppercase font-mono text-[#CAA243]">
        {t.eyebrow}
      </p>

      {/* Central Logo & Absolute Radial Halo */}
      <div className="relative flex items-center justify-center my-6 overflow-visible">
        {/* Halo doré diffus arrière-plan */}
        <div className="absolute -z-10 w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-radial from-[#CAA243]/25 via-[#CAA243]/5 to-transparent blur-3xl pointer-events-none" />

        {/* Conteneur de recadrage compact sans aucun fond */}
        <div className="relative flex items-center justify-center p-0 m-0 bg-transparent">
          <img
            src="/logo.png"
            alt="OVIZai"
            className="h-32 sm:h-44 w-auto object-contain mix-blend-screen scale-125 sm:scale-135 [mask-image:radial-gradient(ellipse_at_center,black_55%,transparent_90%)] drop-shadow-[0_0_35px_rgba(202,162,67,0.45)] priority"
          />
        </div>
      </div>

      {/* Value Proposition Title */}
      <h1 className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-[#ECE4D3] leading-tight max-w-lg">
        <span className="text-gold-gradient text-gold-glow">{t.heroTagline}</span>
      </h1>

      {/* Subtitle / Mission */}
      <p className="text-xs sm:text-sm leading-relaxed text-fg-muted max-w-md mx-auto">
        {t.heroSub}
      </p>
    </section>
  );
}
