'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, GraduationCap } from 'lucide-react';
import { Language } from '@/types';

interface HeroActionsProps {
  lang: Language;
}

export default function HeroActions({ lang }: HeroActionsProps) {
  const isFr = lang === 'fr';

  return (
    <div className="max-w-xl mx-auto mb-8 px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
        {/* Primary CTA: Devis & Brief */}
        <div className="flex flex-col items-center">
          <Link
            href="/contact"
            className="w-full bg-[#CAA243] hover:bg-[#f0c869] text-black font-bold px-4 py-3 rounded-xl mono text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-[0_0_20px_rgba(202,162,67,0.25)] hover:scale-[1.01] cursor-pointer min-h-[48px]"
          >
            <span>{isFr ? 'Demander un Devis +' : 'Request Quote +'}</span>
            <ArrowUpRight className="w-4 h-4 text-black" />
          </Link>
          <p className="text-[10.5px] text-[#9C9384] font-mono mt-1.5 leading-tight text-center">
            {isFr ? 'Réponse sous 24h-48h ouvrées' : 'Quote reply in 24-48h'}
          </p>
        </div>

        {/* Secondary CTA: Tarifs & Formules */}
        <div className="flex flex-col items-center">
          <Link
            href="/tarifs"
            className="w-full bg-black/40 hover:bg-[#CAA243]/10 text-[#ECE4D3] hover:text-[#f0c869] border border-[#CAA243]/70 hover:border-[#CAA243] font-semibold px-4 py-3 rounded-xl mono text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer min-h-[48px]"
          >
            <span>{isFr ? 'Tarifs & Formules +' : 'Pricing & Packages +'}</span>
            <ArrowUpRight className="w-4 h-4 text-[#CAA243]" />
          </Link>
          <p className="text-[10.5px] text-[#9C9384] font-mono mt-1.5 leading-tight text-center">
            {isFr ? 'Transparence totale — 3 paliers' : 'Full transparency — 3 tiers'}
          </p>
        </div>
      </div>

      <div className="text-center mt-3 flex items-center justify-center gap-4 flex-wrap">
        <Link
          href="/services"
          className="text-xs font-mono text-[#9C9384] hover:text-[#CAA243] transition-colors inline-flex items-center gap-1 min-h-[48px] px-2 py-1"
        >
          <span>{isFr ? 'Découvrir nos 5 prestations →' : 'Explore 5 services →'}</span>
        </Link>
        <span className="text-[#9C9384] font-mono text-xs">•</span>
        <Link
          href="/formation"
          className="text-xs font-mono text-[#9C9384] hover:text-[#CAA243] transition-colors inline-flex items-center gap-1 min-h-[48px] px-2 py-1"
        >
          <GraduationCap className="w-3.5 h-3.5 text-[#CAA243]" />
          <span>{isFr ? 'Masterclass Cinéma IA →' : 'AI Cinema Masterclass →'}</span>
        </Link>
      </div>
    </div>
  );
}
