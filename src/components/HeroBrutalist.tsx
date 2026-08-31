'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, GraduationCap } from 'lucide-react';
import OvizaiLogo from '@/components/OvizaiLogo';
import { Language } from '@/types';

interface HeroBrutalistProps {
  lang: Language;
}

export default function HeroBrutalist({ lang }: HeroBrutalistProps) {
  const isFr = lang === 'fr';

  return (
    <section className="relative z-10 max-w-2xl mx-auto pt-4 pb-6 px-4 flex flex-col items-center justify-center text-center">
      {/* Eyebrow */}
      <p className="text-[11px] uppercase tracking-[0.25em] text-[#CAA243] mb-4 font-mono font-bold">
        {isFr ? 'DIRECTEURS ARTISTIQUES & CINÉASTES IA AUGMENTÉS' : 'AI ART DIRECTORS & AUGMENTED FILMMAKERS'}
      </p>

      {/* Enlarged Clean Hero Logo & Centered Diffuse Halo */}
      <div className="relative flex justify-center items-center mb-6 p-0 m-0">
        <div className="absolute -z-10 w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-radial from-[#CAA243]/25 via-[#CAA243]/5 to-transparent blur-3xl pointer-events-none" />
        <OvizaiLogo
          className="max-h-[150px] sm:max-h-[200px] w-auto object-contain drop-shadow-[0_0_40px_rgba(202,162,67,0.4)] scale-105 transition-transform duration-300 hover:scale-[1.07]"
        />
      </div>

      {/* Sobriety Main Title */}
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-[#ECE4D3] text-center mb-3 leading-snug">
        {isFr ? (
          <>
            L’ART CINÉMATOGRAPHIQUE <br className="hidden sm:inline" />
            <span className="text-gold-gradient text-gold-glow">AUGMENTÉ PAR L'IA</span>
          </>
        ) : (
          <>
            CINEMATIC ARTISTRY <br className="hidden sm:inline" />
            <span className="text-gold-gradient text-gold-glow">AUGMENTED BY AI</span>
          </>
        )}
      </h1>

      {/* Short Subtitle */}
      <p className="text-xs sm:text-sm text-[#8C8375] max-w-md text-center mx-auto mb-6 leading-relaxed">
        {isFr
          ? 'Direction artistique humaine et cinéma génératif de pointe pour créer des univers visuels immersifs.'
          : 'Human art direction and cutting-edge generative cinema to craft immersive visual universes.'}
      </p>

      {/* Dual Navigation Buttons */}
      <div className="flex items-center justify-center gap-3 w-full max-w-sm">
        <Link
          href="/services"
          className="flex-1 bg-[#CAA243] hover:bg-[#f0c869] text-black font-bold px-4 py-2.5 rounded-lg mono text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-[0_0_15px_rgba(202,162,67,0.25)] hover:scale-[1.02]"
        >
          <span>{isFr ? 'Services +' : 'Services +'}</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-black" />
        </Link>

        <Link
          href="/formation"
          className="flex-1 bg-black/40 hover:bg-white/[0.04] text-[#ECE4D3] hover:text-[#f0c869] border border-white/[0.12] hover:border-[#CAA243]/50 font-semibold px-4 py-2.5 rounded-lg mono text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all"
        >
          <GraduationCap className="w-3.5 h-3.5 text-[#CAA243]" />
          <span>{isFr ? 'Masterclass +' : 'Masterclass +'}</span>
        </Link>
      </div>
    </section>
  );
}
