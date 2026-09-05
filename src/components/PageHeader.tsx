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
    <div className="max-w-xl mx-auto px-4 mb-3 sm:mb-4 text-center">
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
  );
}
