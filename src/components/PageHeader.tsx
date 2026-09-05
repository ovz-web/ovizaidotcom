'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Language } from '@/types';

interface PageHeaderProps {
  lang: Language;
  eyebrow: string;
  title: string | React.ReactNode;
  subtitle?: string;
  backLinkHref?: string;
  backLinkLabel?: string;
}

export default function PageHeader({
  lang,
  eyebrow,
  title,
  subtitle,
  backLinkHref = '/',
  backLinkLabel,
}: PageHeaderProps) {
  const isFr = lang === 'fr';
  const defaultBackLabel = isFr ? 'Retour Accueil' : 'Back Home';

  return (
    <div className="max-w-xl mx-auto px-4 mb-6 text-center">
      {/* 1. Back Link */}
      <div className="flex justify-start mb-4 sm:mb-5">
        <Link
          href={backLinkHref}
          className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/[0.03] border border-white/[0.08] hover:border-[#CAA243]/50 text-xs font-mono text-[#ECE4D3] hover:text-[#f0c869] transition-all min-h-[44px] cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-[#CAA243]" />
          <span>{backLinkLabel || defaultBackLabel}</span>
        </Link>
      </div>

      {/* 2. Eyebrow */}
      <p className="text-[10px] uppercase tracking-[0.25em] text-[#CAA243] mb-1 font-mono font-bold">
        {eyebrow}
      </p>

      {/* 3. Title H1 */}
      <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight text-[#ECE4D3] text-center mb-1.5 leading-snug">
        {title}
      </h1>

      {/* 4. Subtitle */}
      {subtitle && (
        <p className="text-xs sm:text-sm text-[#9C9384] max-w-xs sm:max-w-md text-center mx-auto mb-2 leading-relaxed font-mono">
          {subtitle}
        </p>
      )}
    </div>
  );
}
