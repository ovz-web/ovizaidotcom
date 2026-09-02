'use client';

import React from 'react';
import Image from 'next/image';
import { Language } from '@/types';
import { DICTIONARY } from '@/lib/i18n';

interface HeroBrutalistProps {
  lang: Language;
}

export default function HeroBrutalist({ lang }: HeroBrutalistProps) {
  const t = DICTIONARY[lang];
  const isFr = lang === 'fr';

  return (
    <section className="relative z-10 max-w-2xl mx-auto pt-1 pb-3 px-4 flex flex-col items-center justify-center text-center">
      {/* Eyebrow — audience-facing, not internal jargon */}
      <p className="text-[10.5px] uppercase tracking-[0.25em] text-[#CAA243] mb-1.5 font-mono font-bold">
        {isFr ? 'STUDIO DE PRODUCTION VIDÉO IA — PARIS' : 'AI VIDEO PRODUCTION STUDIO — PARIS'}
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

      {/* Main Headline — result-oriented + delivery time
        Variant 1 (default): "Des films IA au niveau cinéma, livrés en 24-48h"
        Variant 2: "Votre vision. Notre IA. Une vidéo cinéma en 48h."
        Variant 3: "Le rendu cinéma de vos campagnes, sans budget de tournage."
      */}
      <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight text-[#ECE4D3] text-center mb-2 leading-snug">
        {t.heroHeadline ? (
          <>
            {isFr ? (
              <>
                Des films IA au niveau cinéma,{' '}
                <span className="text-gold-gradient text-gold-glow">livrés en 24-48h</span>
              </>
            ) : (
              <>
                Cinema-grade AI films,{' '}
                <span className="text-gold-gradient text-gold-glow">delivered in 24-48h</span>
              </>
            )}
          </>
        ) : (
          <>
            {isFr ? (
              <>
                L'ART CINÉMATOGRAPHIQUE <br className="hidden sm:inline" />
                <span className="text-gold-gradient text-gold-glow">AUGMENTÉ</span>
              </>
            ) : (
              <>
                CINEMATIC ARTISTRY <br className="hidden sm:inline" />
                <span className="text-gold-gradient text-gold-glow">AUGMENTED</span>
              </>
            )}
          </>
        )}
      </h1>

      {/* Audience Subtitle — who this is for */}
      <p className="text-xs sm:text-sm text-[#8C8375] max-w-sm sm:max-w-md text-center mx-auto mb-2 leading-snug">
        {t.heroAudienceSub ||
          (isFr
            ? 'Studio de direction artistique et cinéma génératif.'
            : 'Art direction and generative cinema studio.')}
      </p>
    </section>
  );
}