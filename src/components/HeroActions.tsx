'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Language } from '@/types';

interface HeroActionsProps {
  lang: Language;
}

export default function HeroActions({ lang }: HeroActionsProps) {
  const isFr = lang === 'fr';

  return (
    <div className="max-w-xl mx-auto mb-8 px-4 flex flex-col items-center text-center gap-2">
      {/* Primary CTA: Démarrer un projet */}
      <Link
        href="/contact"
        className="w-full sm:max-w-md bg-[#CAA243] hover:bg-[#f0c869] text-black font-bold px-4 py-3.5 rounded-xl mono text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-[0_0_20px_rgba(202,162,67,0.25)] hover:scale-[1.01] cursor-pointer min-h-[48px]"
      >
        <span>{isFr ? 'Démarrer un projet +' : 'Start a project +'}</span>
        <ArrowUpRight className="w-4 h-4 text-black" />
      </Link>

      {/* Discrete Secondary Link: Voir les tarifs */}
      <Link
        href="/tarifs"
        className="text-xs font-mono text-[#9C9384] hover:text-[#CAA243] transition-colors inline-flex items-center gap-1 min-h-[44px] px-2 py-1"
      >
        <span>{isFr ? 'Voir les tarifs →' : 'View pricing →'}</span>
      </Link>
    </div>
  );
}
