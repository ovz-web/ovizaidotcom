'use client';

import React from 'react';
import Image from 'next/image';
import { Language } from '@/types';

interface HeroBrutalistProps {
  lang: Language;
}

export default function HeroBrutalist({ lang }: HeroBrutalistProps) {
  const isFr = lang === 'fr';

  return (
    <section className="relative z-10 max-w-xl mx-auto px-4 text-center">
      {/* Eyebrow */}
      <p className="text-[8.5px] sm:text-[9.5px] uppercase tracking-[0.18em] sm:tracking-[0.22em] text-gold mb-0.5 font-mono font-bold">
        {isFr ? 'CRÉATION VIDÉO IA POUR MARQUES ET ARTISTES' : 'AI VIDEO PRODUCTION FOR BRANDS AND ARTISTS'}
      </p>

      {/* Hero Logo - Responsive & Scaled */}
      <div className="relative flex items-center justify-center my-0.5 overflow-visible">
        <Image
          src="/logo.png"
          alt={isFr ? 'OVIZai — Logo Studio Cinéma & Vidéo IA 4K' : 'OVIZai — 4K AI Cinema & Video Studio Logo'}
          width={240}
          height={240}
          className="h-[clamp(72px,16dvh,96px)] sm:h-[clamp(96px,14dvh,160px)] w-auto object-contain mix-blend-screen"
          priority
        />
      </div>

      {/* Sobriety Main Title */}
      <h1 className="text-sm sm:text-lg md:text-xl font-semibold tracking-tight text-fg text-center mb-0.5 sm:mb-1 leading-tight">
        {isFr ? (
          <>
            PRODUCTIONS IA <span className="text-gold-gradient">CINÉMATOGRAPHIQUES</span>
          </>
        ) : (
          <>
            CINEMATIC <span className="text-gold-gradient">AI PRODUCTIONS</span>
          </>
        )}
      </h1>

      {/* Short Subtitle */}
      <p className="text-[10px] sm:text-xs text-muted max-w-xs sm:max-w-xl text-center mx-auto mb-1 leading-tight font-mono sm:whitespace-nowrap">
        {isFr ? 'Vos projets visuels sans contraintes de tournage' : 'Your visual projects without filming constraints'}
      </p>

      {/* Spacer matching Détails ↓ to guarantee identical first box position across all 9 pages */}
      <div className="hidden sm:flex w-full justify-end text-[8.5px] sm:text-[9.5px] tracking-wider font-mono px-1 mb-1 invisible select-none" aria-hidden="true">
        <span>&nbsp;</span>
      </div>
    </section>
  );
}