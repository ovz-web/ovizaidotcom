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

      {/* Hero Logo with radial mask dissolve */}
      <div className="relative flex items-center justify-center my-4 overflow-visible">
        <img
          src="/logo.png"
          alt="OVIZai"
          className="h-36 sm:h-48 w-auto object-contain mix-blend-screen scale-125 [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_85%)] drop-shadow-[0_0_30px_rgba(202,162,67,0.35)] priority"
        />
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
