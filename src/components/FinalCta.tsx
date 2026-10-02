'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Language } from '@/types';

interface FinalCtaProps {
  lang: Language;
}

export default function FinalCta({ lang }: FinalCtaProps) {
  const isFr = lang === 'fr';

  return (
    <section className="py-20 sm:py-32 px-4 sm:px-6 max-w-5xl mx-auto text-center relative overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] sm:w-[650px] h-[300px] bg-gold/10 rounded-full blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-2xl mx-auto">
        <h2 className="font-display font-extrabold text-3xl sm:text-5xl md:text-6xl text-fg tracking-tight uppercase leading-[1.1] mb-6">
          {isFr ? (
            <>
              PARLONS DE VOTRE <span className="text-gold-gradient">PROCHAINE PUBLICITÉ.</span>
            </>
          ) : (
            <>
              LET’S TALK ABOUT YOUR <span className="text-gold-gradient">NEXT AD.</span>
            </>
          )}
        </h2>

        <p className="text-base sm:text-lg text-muted mb-8 sm:mb-10 leading-relaxed text-balance">
          {isFr
            ? 'Décrivez votre produit ou marque en deux minutes. Nous revenons vers vous rapidement avec une orientation créative et les prochaines étapes.'
            : 'Outline your product or brand in two minutes. We will respond promptly with creative guidance and next steps.'}
        </p>

        <Link
          href="/contact"
          className="inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold-bright text-black font-bold text-base sm:text-lg mono uppercase tracking-wider px-10 py-5 rounded-full transition-all duration-200 hover:scale-[1.03] active:scale-[0.98] shadow-2xl shadow-gold/20 min-h-[52px]"
        >
          <span>{isFr ? 'Démarrer un projet' : 'Start a project'}</span>
          <ArrowUpRight className="w-5 h-5 text-black" />
        </Link>
      </div>
    </section>
  );
}
