'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, GraduationCap } from 'lucide-react';
import { Language } from '@/types';

interface HeroBrutalistProps {
  lang: Language;
}

export default function HeroBrutalist({ lang }: HeroBrutalistProps) {
  const isFr = lang === 'fr';

  return (
    <section className="relative z-10 max-w-2xl mx-auto pt-1 pb-3 px-4 flex flex-col items-center justify-center text-center">
      {/* Eyebrow */}
      <p className="text-[11px] uppercase tracking-[0.25em] text-[#CAA243] mb-1.5 font-mono font-bold">
        {isFr ? 'DIRECTEURS ARTISTIQUES & CINÉASTES IA AUGMENTÉS' : 'AI ART DIRECTORS & AUGMENTED FILMMAKERS'}
      </p>

      {/* Hero Logo */}
      <div className="relative flex items-center justify-center my-1 overflow-visible">
        <img
          src="/logo.png"
          alt="OVIZai"
          style={{
            WebkitMaskImage: 'radial-gradient(ellipse 65% 65% at 50% 50%, black 55%, transparent 92%)',
            maskImage: 'radial-gradient(ellipse 65% 65% at 50% 50%, black 55%, transparent 92%)',
          }}
          className="h-36 sm:h-48 w-auto object-contain mix-blend-screen scale-[1.15] sm:scale-[1.25]"
        />
      </div>

      {/* Sobriety Main Title */}
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-[#ECE4D3] text-center mb-2 leading-snug">
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
      <p className="text-xs sm:text-sm text-[#8C8375] max-w-md text-center mx-auto mb-4 leading-relaxed">
        {isFr
          ? 'Direction artistique humaine et cinéma génératif de pointe pour créer des univers visuels immersifs.'
          : 'Human art direction and cutting-edge generative cinema to craft immersive visual universes.'}
      </p>

      {/* CHANTIER 2: Dual Navigation Buttons with Commercial Clarity & Subtexts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-lg mt-1">
        {/* Primary CTA: Services (Fond doré plein) */}
        <div className="flex flex-col items-center">
          <Link
            href="/services"
            className="w-full bg-[#CAA243] hover:bg-[#f0c869] text-black font-bold px-4 py-2.5 rounded-xl mono text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-[0_0_20px_rgba(202,162,67,0.3)] hover:scale-[1.02]"
          >
            <span>{isFr ? 'Services +' : 'Services +'}</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-black" />
          </Link>
          <p className="text-[10.5px] text-[#8C8375] font-mono mt-1.5 leading-tight text-center">
            {isFr ? 'Pour une marque ou un artiste — devis sous 24-48h' : 'For brands or artists — quote in 24-48h'}
          </p>
        </div>

        {/* Secondary CTA: Masterclass (Contour doré, fond transparent) */}
        <div className="flex flex-col items-center">
          <Link
            href="/formation"
            className="w-full bg-transparent hover:bg-[#CAA243]/10 text-[#ECE4D3] hover:text-[#f0c869] border border-[#CAA243]/80 hover:border-[#CAA243] font-semibold px-4 py-2.5 rounded-xl mono text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all"
          >
            <GraduationCap className="w-3.5 h-3.5 text-[#CAA243]" />
            <span>{isFr ? 'Masterclass +' : 'Masterclass +'}</span>
          </Link>
          <p className="text-[10.5px] text-[#8C8375] font-mono mt-1.5 leading-tight text-center">
            {isFr ? 'Pour les créateurs — accès immédiat, 680 $ CAD' : 'For creators — instant access, 680 $ CAD'}
          </p>
        </div>
      </div>
    </section>
  );
}