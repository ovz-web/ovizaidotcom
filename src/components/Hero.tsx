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
    <section className="relative z-10 mx-auto flex max-w-xl flex-col items-center justify-center px-4 py-2 text-center select-none">
      {/* Surtitre Monospace */}
      <p className="font-mono text-[10px] sm:text-xs tracking-[0.25em] uppercase text-[#CAA243] mb-1">
        {t.eyebrow}
      </p>

      {/* Conteneur Logo épuré : masque radial strict, aucun halo interne, bords dissous dans #080808 */}
      <div className="relative my-1 flex items-center justify-center overflow-visible">
        <img
          src="/logo.png"
          alt="OVIZai"
          style={{
            WebkitMaskImage: 'radial-gradient(ellipse 60% 60% at 50% 50%, black 40%, transparent 80%)',
            maskImage: 'radial-gradient(ellipse 60% 60% at 50% 50%, black 40%, transparent 80%)',
          }}
          className="h-28 sm:h-36 w-auto object-contain mix-blend-screen scale-115 sm:scale-125"
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