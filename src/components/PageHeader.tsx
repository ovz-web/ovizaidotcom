'use client';

import React from 'react';
import { Language } from '@/types';

interface PageHeaderProps {
  title: string | React.ReactNode;
  eyebrow?: string;
  subtitle?: string;
  lang?: Language;
  backLinkHref?: string;
  backLinkLabel?: string;
}

export default function PageHeader({
  title,
  eyebrow,
}: PageHeaderProps) {
  // If an eyebrow starting with "0X //" exists during migration, prioritize it, otherwise use title
  const displayTitle =
    typeof eyebrow === 'string' && /^\d{2}\s*\/\//.test(eyebrow)
      ? eyebrow
      : title || eyebrow;

  return (
    <div className="max-w-xl mx-auto px-4 mb-2 sm:mb-2.5 text-center">
      {/* Unified single-line title H1 */}
      <h1 className="text-xs sm:text-sm md:text-base uppercase tracking-[0.2em] text-gold font-mono font-bold leading-snug">
        {displayTitle}
      </h1>
    </div>
  );
}
