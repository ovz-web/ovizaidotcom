'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function PromoBar() {
  const { lang } = useLanguage();
  const isFr = lang === 'fr';

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-[#CAA243] text-[#080808] h-9 px-3 flex items-center justify-center border-b border-black/10 shadow-sm transition-all overflow-hidden">
      <Link
        href="/tarifs"
        className="group flex items-center justify-center gap-1.5 sm:gap-2 w-full max-w-6xl mx-auto text-center cursor-pointer select-none"
      >
        <span className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wide truncate">
          {isFr ? '🔥 Offre de lancement -30% — plus que quelques jours' : '🔥 Launch offer -30% — ends soon'}
        </span>
        <span className="hidden sm:inline-flex items-center gap-1 text-[10.5px] font-mono font-extrabold uppercase tracking-wider bg-black/10 group-hover:bg-black/20 text-[#080808] px-2 py-0.5 rounded transition-colors flex-shrink-0">
          <span>{isFr ? 'Voir les tarifs' : 'View pricing'}</span>
          <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
        </span>
      </Link>
    </div>
  );
}
