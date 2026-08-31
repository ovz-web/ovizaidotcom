'use client';

import React from 'react';
import { ArrowUpRight, GraduationCap, Sparkles } from 'lucide-react';
import { Language } from '@/types';

interface HeroBrutalistProps {
  lang: Language;
}

export default function HeroBrutalist({ lang }: HeroBrutalistProps) {
  const isFr = lang === 'fr';

  const scrollToSection = (id: string) => {
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="relative z-10 max-w-3xl mx-auto py-10 sm:py-14 px-4 flex flex-col items-center justify-center text-center">
      {/* Eyebrow */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] mb-5">
        <Sparkles className="w-3.5 h-3.5 text-[#CAA243]" />
        <span className="mono text-[10px] sm:text-xs tracking-[0.2em] uppercase font-mono text-[#CAA243] font-bold">
          {isFr ? 'DIRECTEURS ARTISTIQUES & CINÉASTES IA AUGMENTÉS' : 'AI ART DIRECTORS & AUGMENTED FILMMAKERS'}
        </span>
      </div>

      {/* Central Logo & Absolute Radial Halo */}
      <div className="relative flex justify-center items-center mb-6">
        <div className="absolute -z-10 w-56 h-56 rounded-full bg-radial from-[#CAA243]/25 via-[#CAA243]/5 to-transparent blur-3xl pointer-events-none" />
        <img
          src="/logo.png"
          alt="OVIZai Studio"
          className="object-contain w-auto h-auto max-h-[80px] sm:max-h-[105px] mix-blend-screen drop-shadow-[0_0_25px_rgba(202,162,67,0.3)] transition-transform duration-300 hover:scale-[1.02]"
        />
      </div>

      {/* Monumental Brutalist Title */}
      <h1 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-[#ECE4D3] leading-[1.1] max-w-2xl mb-4">
        {isFr ? (
          <>
            L'ART CINÉMATOGRAPHIQUE <br />
            <span className="text-gold-gradient text-gold-glow">AUGMENTÉ PAR L'IA</span>
          </>
        ) : (
          <>
            CINEMATIC ARTISTRY <br />
            <span className="text-gold-gradient text-gold-glow">AUGMENTED BY AI</span>
          </>
        )}
      </h1>

      {/* Subtitle / Value Proposition */}
      <p className="text-xs sm:text-sm sm:leading-relaxed text-[#8c8375] max-w-xl mx-auto mb-8 font-normal">
        {isFr
          ? 'Nous fusionnons direction artistique humaine, cinéma et algorithmes génératifs de pointe pour donner vie à des univers visuels immersifs sans les contraintes de tournage traditionnelles.'
          : 'We merge human art direction, cinema, and cutting-edge generative algorithms to craft immersive visual universes free from traditional filming constraints.'}
      </p>

      {/* Strategic Dual CTA */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-md">
        {/* Primary High-Ticket B2B Button */}
        <button
          type="button"
          onClick={() => scrollToSection('#contact')}
          className="w-full sm:w-auto flex-1 bg-[#CAA243] hover:bg-[#f0c869] text-black font-bold px-6 py-3.5 rounded-lg mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(202,162,67,0.3)] hover:scale-[1.02] cursor-pointer"
        >
          <span>{isFr ? 'Démarrer un Projet +' : 'Start a Project +'}</span>
          <ArrowUpRight className="w-4 h-4 text-black" />
        </button>

        {/* Secondary Masterclass B2C Button */}
        <button
          type="button"
          onClick={() => scrollToSection('#masterclass')}
          className="w-full sm:w-auto flex-1 bg-black/40 hover:bg-white/[0.04] text-[#ECE4D3] hover:text-[#f0c869] border border-white/[0.12] hover:border-[#CAA243]/50 font-semibold px-6 py-3.5 rounded-lg mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <GraduationCap className="w-4 h-4 text-[#CAA243]" />
          <span>{isFr ? 'Découvrir la Masterclass +' : 'Explore Masterclass +'}</span>
        </button>
      </div>
    </section>
  );
}
