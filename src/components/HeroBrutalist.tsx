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
    <section className="relative z-10 max-w-2xl mx-auto pt-0 pb-1 px-4 flex flex-col items-center justify-center text-center">
      {/* Eyebrow */}
      <p className="text-[10px] uppercase tracking-[0.25em] text-[#CAA243] mb-1 font-mono font-bold">
        {isFr ? 'CRÉATION VIDÉO IA POUR MARQUES ET ARTISTES' : 'AI VIDEO PRODUCTION FOR BRANDS AND ARTISTS'}
      </p>

      {/* Hero Logo - Enlarged & Cleaned */}
      <div className="relative flex items-center justify-center my-1 overflow-visible">
        <Image
          src="/logo.png"
          alt="OVIZai"
          width={240}
          height={240}
          className="h-36 sm:h-48 w-auto object-contain mix-blend-screen"
          priority
        />
      </div>

      {/* Sobriety Main Title */}
      <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight text-[#ECE4D3] text-center mb-1.5 leading-snug">
        {isFr ? (
          <>
            PRODUCTIONS IA <span className="text-gold-gradient text-gold-glow">CINÉMATOGRAPHIQUES</span>
          </>
        ) : (
          <>
            CINEMATIC <span className="text-gold-gradient text-gold-glow">AI PRODUCTIONS</span>
          </>
        )}
      </h1>

      {/* Short Subtitle - Punchy Single Sentence */}
      <p className="text-xs sm:text-sm text-[#9C9384] max-w-xs sm:max-w-xl text-center mx-auto mb-2 leading-relaxed font-mono sm:whitespace-nowrap">
        {isFr ? 'Vos projets visuels, sans contraintes de tournage' : 'Your visual projects, without the constraints of filming'}
      </p>
    </section>
  );
}