'use client';

import React from 'react';
import { Language } from '@/types';

interface PageHeaderProps {
  title: string | React.ReactNode;
  lang?: Language;
}

export default function PageHeader({
  title,
}: PageHeaderProps) {
  return (
    <div className="max-w-xl mx-auto px-4 mb-2 sm:mb-2.5 text-center">
      {/* Unified single-line title H1 */}
      <h1 className="text-xs sm:text-sm md:text-base uppercase tracking-[0.2em] text-gold font-mono font-bold leading-snug">
        {title}
      </h1>
    </div>
  );
}
