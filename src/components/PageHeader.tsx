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
      <div className="flex justify-start mb-4">
        <Link
          href={backLinkHref}
          className="inline-flex items-center gap-2 text-xs font-mono text-[#8C8375] hover:text-[#CAA243] transition-colors min-h-[44px] py-1"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{backLinkLabel || defaultBackLabel}</span>
        </Link>
      </div>

      {/* 2. Eyebrow */}
      <p className="mono text-[10px] sm:text-[10.5px] uppercase tracking-[0.25em] text-[#CAA243] font-mono font-bold mb-1">
        {eyebrow}
      </p>

      {/* 3. Title H1 */}
      <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-gold-gradient text-gold-glow drop-shadow-[0_0_16px_rgba(202,162,67,0.3)] mb-2 leading-tight">
        {title}
      </h1>

      {/* 4. Subtitle */}
      {subtitle && (
        <p className="text-xs sm:text-sm text-[#9C9384] max-w-md sm:max-w-lg mx-auto leading-relaxed font-mono">
          {subtitle}
        </p>
      )}
    </div>
  );
}
