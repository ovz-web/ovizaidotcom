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
        {/* Primary CTA: Services */}
        <div className="flex flex-col items-center">
          <Link
            href="/services"
            className="w-full bg-[#CAA243] hover:bg-[#f0c869] text-black font-bold px-4 py-2.5 rounded-xl mono text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-[0_0_20px_rgba(202,162,67,0.25)] hover:scale-[1.01] cursor-pointer"
          >
            <span>{isFr ? 'Services +' : 'Services +'}</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-black" />
          </Link>
          <p className="text-[10.5px] text-[#8C8375] font-mono mt-1.5 leading-tight text-center">
            {isFr ? 'Pour marque ou artiste — devis 24-48h' : 'For brands & artists — quote in 24-48h'}
          </p>
        </div>

        {/* Secondary CTA: Masterclass */}
        <div className="flex flex-col items-center">
          <Link
            href="/formation"
            className="w-full bg-black/40 hover:bg-[#CAA243]/10 text-[#ECE4D3] hover:text-[#f0c869] border border-[#CAA243]/70 hover:border-[#CAA243] font-semibold px-4 py-2.5 rounded-xl mono text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer"
          >
            <GraduationCap className="w-3.5 h-3.5 text-[#CAA243]" />
            <span>{isFr ? 'Masterclass +' : 'Masterclass +'}</span>
          </Link>
          <p className="text-[10.5px] text-[#8C8375] font-mono mt-1.5 leading-tight text-center">
            {isFr ? 'Pour créateurs — accès immédiat' : 'For creators — instant access'}
          </p>
        </div>
      </div>
    </div>
  );
}
