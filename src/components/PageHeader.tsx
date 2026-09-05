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
    <div className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 mb-5 sm:mb-6">
      {/* 1. Back Link — Repositioned to the left, outside the central box frame */}
      <div className="flex justify-start sm:absolute sm:left-4 lg:left-6 sm:top-0 mb-2 sm:mb-0 z-20">
        <Link
          href={backLinkHref}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-border hover:border-gold/50 text-xs font-mono text-fg hover:text-gold-bright transition-all min-h-[36px] cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-gold" />
          <span>{backLinkLabel || defaultBackLabel}</span>
        </Link>
      </div>

      {/* 2. Centered Page Header (Title sits high up directly under the topbar) */}
      <div className="max-w-xl mx-auto text-center">
        {/* Eyebrow */}
        <p className="text-[10px] uppercase tracking-[0.25em] text-gold mb-1 font-mono font-bold">
          {eyebrow}
        </p>

        {/* Title H1 */}
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight text-fg text-center mb-1.5 leading-snug">
          {title}
        </h1>

        {/* Subtitle */}
        {subtitle && (
          <p className="text-xs sm:text-sm text-muted max-w-xs sm:max-w-md text-center mx-auto mb-2 leading-relaxed font-mono">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
