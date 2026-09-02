'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Language } from '@/types';
import { DICTIONARY } from '@/lib/i18n';

interface HeroActionsProps {
  lang: Language;
}

export default function HeroActions({ lang }: HeroActionsProps) {
  const t = DICTIONARY[lang];
  const isFr = lang === 'fr';

  return (
    <div className="max-w-xl mx-auto mb-6 px-4 flex flex-col items-center gap-3">
      {/* ── Primary CTA — single dominant button ── */}
      <Link
        href="/contact"
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#CAA243] hover:bg-[#f0c869] text-black font-bold px-8 py-3.5 rounded-xl mono text-sm uppercase tracking-wider transition-all shadow-[0_0_28px_rgba(202,162,67,0.35)] hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(202,162,67,0.5)] cursor-pointer"
      >
        <span>{t.ctaPrimary || (isFr ? 'Demander un devis' : 'Get a quote')}</span>
        <ArrowUpRight className="w-4 h-4 text-black" />
      </Link>

      {/* Helper line — delivery SLA reassurance */}
      <p className="text-[11px] text-[#8C8375] font-mono text-center leading-tight">
        {isFr ? 'Réponse garantie sous 24h · Sans engagement' : 'Response guaranteed within 24h · No commitment'}
      </p>

      {/* ── Secondary link — masterclass (text only, low visual weight) ── */}
      <p className="text-[11px] text-[#8C8375] font-mono text-center mt-1">
        <span>{t.ctaSecondaryText || (isFr ? 'Vous êtes créateur ?' : 'Are you a creator?')}</span>
        {' '}
        <Link
          href="/formation"
          className="text-[#CAA243] hover:text-[#f0c869] underline underline-offset-2 transition-colors cursor-pointer"
        >
          {t.ctaSecondaryLink || (isFr ? 'Découvrez la Masterclass →' : 'Discover the Masterclass →')}
        </Link>
      </p>
    </div>
  );
}
