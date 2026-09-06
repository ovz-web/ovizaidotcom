'use client';

import React from 'react';
import { Language } from '@/types';

interface PageHeaderProps {
  tag: string;
  title: React.ReactNode;
  subtitle: string;
  showDetailsHint?: boolean;
  lang?: Language;
}

export default function PageHeader({
  tag,
  title,
  subtitle,
  showDetailsHint = true,
  lang = 'fr',
}: PageHeaderProps) {
  const isFr = lang === 'fr';

  return (
    <div className="max-w-xl mx-auto px-4 text-center">
      {/* 1. Eyebrow / Tag (0X // NOM) */}
      <p className="text-[8.5px] sm:text-[9.5px] uppercase tracking-[0.18em] sm:tracking-[0.22em] text-gold mb-0.5 font-mono font-bold">
        {tag}
      </p>

      {/* 2. Main Title (styled exactly like homepage HeroBrutalist) */}
      <h1 className="text-sm sm:text-lg md:text-xl font-semibold tracking-tight text-fg text-center mb-0.5 sm:mb-1 leading-tight">
        {title}
      </h1>

      {/* 3. Short Subtitle (styled exactly like homepage HeroBrutalist) */}
      <p className="text-[10px] sm:text-xs text-muted max-w-xs sm:max-w-xl text-center mx-auto mb-1 leading-tight font-mono sm:whitespace-nowrap">
        {subtitle}
      </p>

      {/* 4. Only "Détails ↓" hint right above the first box, aligned to the right */}
      {showDetailsHint && (
        <div className="flex justify-end text-[8.5px] sm:text-[9.5px] tracking-wider text-muted font-mono px-1 mb-1">
          <span>{isFr ? 'Détails ↓' : 'Details ↓'}</span>
        </div>
      )}
    </div>
  );
}
