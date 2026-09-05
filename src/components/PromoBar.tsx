'use client';

import React from 'react';
import Link from 'next/link';
import { Language } from '@/types';

interface PromoBarProps {
  lang: Language;
}

export default function PromoBar({ lang }: PromoBarProps) {
  const isFr = lang === 'fr';

  return (
    <Link
      href="/tarifs"
      className="group inline-flex items-center gap-2 bg-black/80 hover:bg-[#CAA243]/15 border border-[#CAA243]/40 hover:border-[#CAA243]/70 px-3 py-1 rounded-full text-xs font-mono transition-all cursor-pointer shadow-[0_0_12px_rgba(202,162,67,0.15)] flex-shrink-0"
    >
      {/* Pulsating Gold Dot */}
      <span className="relative flex h-2 w-2 flex-shrink-0">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#CAA243] opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#CAA243]" />
      </span>

      {/* Main Promo Text */}
      <span className="text-[#ECE4D3] group-hover:text-[#f0c869] font-medium tracking-wide text-[11px] sm:text-xs whitespace-nowrap">
        {isFr ? 'Offre de lancement -30% →' : 'Launch offer -30% →'}
      </span>
    </Link>
  );
}
