'use client';

import React from 'react';
import Link from 'next/link';
import { Globe } from 'lucide-react';
import { Language } from '@/types';

interface TopBarProps {
  lang: Language;
  onToggleLang: () => void;
}

export default function TopBar({ lang, onToggleLang }: TopBarProps) {
  const isFr = lang === 'fr';

  return (
    <header className="sticky top-0 z-50 bg-[#080808]/90 backdrop-blur-md border-b border-white/[0.06] px-4 py-3 transition-all">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
        {/* Left: Pulsing dot + clickable link to Formation */}
        <Link
          href="/formation"
          className="flex items-center gap-2 group hover:opacity-90 transition-opacity"
        >
          <span className="w-2 h-2 rounded-full bg-[#CAA243] animate-pulse inline-block flex-shrink-0" />
          <span className="mono text-[10.5px] sm:text-xs tracking-wider uppercase text-[#ECE4D3] font-medium group-hover:text-[#f0c869]">
            {isFr ? (
              <>
                <strong className="text-[#CAA243]">FORMATION VIDÉO IA</strong> — EN SAVOIR PLUS +
              </>
            ) : (
              <>
                <strong className="text-[#CAA243]">AI VIDEO MASTERCLASS</strong> — EXPLORE +
              </>
            )}
          </span>
        </Link>

        {/* Right: Bilingual Switcher */}
        <button
          onClick={onToggleLang}
          type="button"
          className="flex items-center gap-1.5 bg-white/[0.02] border border-white/[0.12] text-[#ECE4D3] hover:border-[#CAA243]/50 hover:text-[#f0c869] rounded-full px-3 py-1 text-xs font-mono font-medium tracking-wide transition-all cursor-pointer"
          aria-label="Changer de langue / Switch language"
        >
          <Globe className="w-3.5 h-3.5 text-[#CAA243]" />
          <span className="mono font-semibold">{lang === 'en' ? 'FR' : 'EN'}</span>
        </button>
      </div>
    </header>
  );
}
