'use client';

import React from 'react';
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
  eyebrow,
  title,
  subtitle,
}: PageHeaderProps) {
  return (
    <div className="max-w-xl mx-auto px-4 mb-1.5 sm:mb-2.5 text-center">
      {/* Eyebrow */}
      <p className="text-[8.5px] sm:text-[9.5px] uppercase tracking-[0.2em] text-gold mb-0.5 font-mono font-bold">
        {eyebrow}
      </p>

      {/* Title H1 */}
      <h1 className="text-base sm:text-xl lg:text-2xl font-semibold tracking-tight text-fg text-center mb-0.5 sm:mb-1 leading-snug">
        {title}
      </h1>

      {/* Subtitle */}
      {subtitle && (
        <p className="text-[10px] sm:text-[11px] text-muted max-w-xs sm:max-w-md text-center mx-auto mb-1 leading-tight font-mono">
          {subtitle}
        </p>
      )}
    </div>
  );
}
