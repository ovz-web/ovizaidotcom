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
        {isFr ? 'FILMS IA POUR MARQUES ET ARTISTES' : 'AI FILMS FOR BRANDS AND ARTISTS'}
      </p>

      {/* Hero Logo */}
      <div className="relative flex items-center justify-center my-0.5 overflow-visible">
        <Image
          src="/logo.png"
          alt="OVIZai"
          width={140}
          height={140}
          style={{
            WebkitMaskImage: 'radial-gradient(ellipse 65% 65% at 50% 50%, black 55%, transparent 92%)',
            maskImage: 'radial-gradient(ellipse 65% 65% at 50% 50%, black 55%, transparent 92%)',
          }}
          className="h-20 sm:h-32 w-auto object-contain"
          priority
        />
      </div>

      {/* Sobriety Main Title */}
      <h1 className="text-lg sm:text-2xl lg:text-3xl font-semibold tracking-tight text-[#ECE4D3] text-center mb-1 leading-snug">
        {isFr ? (
          <>
            FILMS IA <span className="text-gold-gradient text-gold-glow">CINÉMATOGRAPHIQUES</span>
          </>
        ) : (
          <>
            CINEMATIC <span className="text-gold-gradient text-gold-glow">AI FILMS</span>
          </>
        )}
      </h1>

      {/* Short Subtitle */}
      <p className="text-xs text-[#9C9384] max-w-sm sm:max-w-md text-center mx-auto mb-1.5 leading-snug">
        {isFr
          ? 'Conception & direction artistique cinématographique affranchies des contraintes de tournage.'
          : 'Cinematic art direction and visual production free from traditional filming constraints.'}
      </p>
    </section>
  );
}