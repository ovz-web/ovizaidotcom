'use client';

import React from 'react';
import Image from 'next/image';
import { DICTIONARY } from '@/lib/i18n';
import { Language } from '@/types';

interface HeroProps {
  lang: Language;
}

export default function Hero({ lang }: HeroProps) {
  const t = DICTIONARY[lang];

  return (
    <section className="relative z-10 max-w-xl mx-auto pt-10 sm:pt-14 pb-8 px-4 text-center">
      {/* Eyebrow */}
      <p className="mono text-[11px] sm:text-xs tracking-[0.22em] uppercase text-gold mb-5 font-semibold">
        {t.eyebrow}
      </p>

      {/* Central Logo */}
      <div className="relative group inline-block mb-6">
        <div className="absolute -inset-2 rounded-full bg-gold/20 blur-xl opacity-75 group-hover:opacity-100 transition duration-500" />
        <div className="relative flex justify-center">
          <img
            src="/logo.png"
            alt="OVIZai Studio Logo"
            className="w-[210px] sm:w-[240px] h-auto object-contain filter drop-shadow-[0_14px_26px_rgba(202,162,67,0.22)] transition-transform duration-300 hover:scale-[1.02]"
          />
        </div>
      </div>

      {/* Value Proposition */}
      <h1 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight mb-3 text-fg leading-tight">
        <span className="text-gold-gradient text-gold-glow">{t.heroTagline}</span>
      </h1>

      {/* Mission / Tagline */}
      <p className="text-sm sm:text-base leading-relaxed text-fg-muted max-w-md mx-auto font-normal">
        {t.heroSub}
      </p>
    </section>
  );
}
