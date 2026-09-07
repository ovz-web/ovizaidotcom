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
    <section className="relative z-10 max-w-xl mx-auto pt-0 pb-0.5 sm:pb-1 px-4 flex flex-col items-center justify-center text-center">
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
          className="h-10 sm:h-20 md:h-24 w-auto object-contain mix-blend-screen"
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
      <p className="text-[10px] sm:text-xs text-muted max-w-xs sm:max-w-xl text-center mx-auto mb-1 sm:mb-1.5 leading-tight font-mono sm:whitespace-nowrap">
        {isFr ? 'Vos projets visuels sans contraintes de tournage' : 'Your visual projects without filming constraints'}
      </p>
    </section>
  );
}