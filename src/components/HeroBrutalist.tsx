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
    <section className="relative z-10 max-w-2xl mx-auto pt-1 pb-3 px-4 flex flex-col items-center justify-center text-center">
      {/* Eyebrow */}
      <p className="text-[10.5px] uppercase tracking-[0.25em] text-[#CAA243] mb-1.5 font-mono font-bold">
        {isFr ? 'DIRECTEURS ARTISTIQUES & CINÉASTES AUGMENTÉS' : 'ART DIRECTORS & AUGMENTED CINEMATOGRAPHERS'}
      </p>

      {/* Hero Logo */}
      <div className="relative flex items-center justify-center my-1 overflow-visible">
        <Image
          src="/logo.png"
          alt="OVIZai"
          width={150}
          height={150}
          style={{
            WebkitMaskImage: 'radial-gradient(ellipse 65% 65% at 50% 50%, black 55%, transparent 92%)',
            maskImage: 'radial-gradient(ellipse 65% 65% at 50% 50%, black 55%, transparent 92%)',
          }}
          className="h-28 sm:h-36 w-auto object-contain"
          priority
        />
      </div>

      {/* Sobriety Main Title */}
      <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight text-[#ECE4D3] text-center mb-2 leading-snug">
        {isFr ? (
          <>
            L’ART CINÉMATOGRAPHIQUE <br className="hidden sm:inline" />
            <span className="text-gold-gradient text-gold-glow">AUGMENTÉ</span>
          </>
        ) : (
          <>
            CINEMATIC ARTISTRY <br className="hidden sm:inline" />
            <span className="text-gold-gradient text-gold-glow">AUGMENTED</span>
          </>
        )}
      </h1>

      {/* Short Subtitle */}
      <p className="text-xs sm:text-sm text-[#8C8375] max-w-sm sm:max-w-md text-center mx-auto mb-2 leading-snug">
        {isFr
          ? 'Studio de direction artistique et cinéma génératif.'
          : 'Art direction and generative cinema studio.'}
      </p>
    </section>
  );
}