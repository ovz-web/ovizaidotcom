'use client';

import React from 'react';
import { Globe } from 'lucide-react';
import { DICTIONARY } from '@/lib/i18n';
import { Language } from '@/types';

interface TopBarProps {
  lang: Language;
  onToggleLang: () => void;
}

export default function TopBar({ lang, onToggleLang }: TopBarProps) {
  const t = DICTIONARY[lang];

  return (
    <header className="topbar-glass px-4 sm:px-6 py-3.5 flex items-center justify-between transition-all">
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-gold animate-pulse inline-block" />
        <span className="mono text-[10.5px] sm:text-[11px] tracking-[0.14em] uppercase text-fg-muted font-medium">
          {t.status}
        </span>
      </div>

      <button
        onClick={onToggleLang}
        type="button"
        className="flex items-center gap-1.5 bg-white/[0.02] border border-border-strong text-fg hover:border-gold/50 hover:text-gold-bright rounded-full px-3 py-1.5 text-xs font-medium tracking-wide transition-all duration-200"
        aria-label="Changer de langue / Switch language"
      >
        <Globe className="w-3.5 h-3.5 text-gold" />
        <span className="mono font-semibold">{lang === 'en' ? 'FR' : 'EN'}</span>
      </button>
    </header>
  );
}
