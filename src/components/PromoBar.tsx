'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Language } from '@/types';

interface PromoBarProps {
  lang: Language;
}

export default function PromoBar({ lang }: PromoBarProps) {
  const isFr = lang === 'fr';

  return (
    <Link
      href="/tarifs"
      className="group inline-flex items-center gap-2 bg-black/60 hover:bg-[#CAA243]/10 border border-[#CAA243]/30 hover:border-[#CAA243]/60 px-2.5 sm:px-3.5 py-1 rounded-full text-xs font-mono transition-all cursor-pointer mx-1 max-w-[200px] sm:max-w-none truncate"
    >
      {/* Pulsating Gold Dot */}
      <span className="relative flex h-2 w-2 flex-shrink-0">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#CAA243] opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#CAA243]" />
      </span>

      {/* Desktop Text */}
      <span className="hidden sm:inline text-[#ECE4D3] group-hover:text-[#f0c869] font-medium tracking-wide text-[11px] sm:text-xs truncate">
        {isFr ? 'Offre de lancement -30% — plus que quelques jours' : 'Launch offer -30% — ends soon'}
      </span>

      {/* Mobile Text */}
      <span className="inline sm:hidden text-[#CAA243] group-hover:text-[#f0c869] font-bold text-[10.5px] truncate">
        {isFr ? 'Offre -30% →' : '-30% Offer →'}
      </span>

      {/* Desktop Arrow */}
      <ArrowRight className="hidden sm:inline w-3 h-3 text-[#CAA243] group-hover:translate-x-0.5 transition-transform flex-shrink-0" />
    </Link>
  );
}
