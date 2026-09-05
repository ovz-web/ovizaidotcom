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
      className="group inline-flex items-center gap-1.5 sm:gap-2 bg-black/80 hover:bg-gold/15 border border-border-gold hover:border-gold/70 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs font-mono transition-all cursor-pointer shadow-gold flex-shrink-0"
    >
      {/* Pulsating Gold Dot */}
      <span className="relative flex h-1.5 w-1.5 flex-shrink-0">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75" />
        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-gold" />
      </span>

      {/* Main Promo Text - strictly whitespace-nowrap, ultra-compact on mobile */}
      <span className="text-fg group-hover:text-gold-bright font-medium tracking-wide text-[10px] sm:text-xs whitespace-nowrap">
        <span className="sm:hidden">{isFr ? 'Tarifs →' : 'Pricing →'}</span>
        <span className="hidden sm:inline">{isFr ? 'Tarifs & Formules →' : 'Pricing & Packages →'}</span>
      </span>
    </Link>
  );
}
