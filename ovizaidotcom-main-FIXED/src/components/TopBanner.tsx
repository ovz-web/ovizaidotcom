'use client';

import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Language } from '@/types';

interface TopBannerProps {
  lang: Language;
}

export default function TopBanner({ lang }: TopBannerProps) {
  const isFr = lang === 'fr';

  const handleClick = () => {
    const target = document.querySelector('#masterclass');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <aside
      onClick={handleClick}
      className="w-full bg-[#0B0A08] border-b border-white/[0.08] py-2 px-4 cursor-pointer hover:bg-white/[0.02] transition-colors relative z-40"
    >
      <div className="max-w-4xl mx-auto flex items-center justify-center gap-2 text-center text-xs">
        <span className="w-2 h-2 rounded-full bg-[#CAA243] animate-pulse flex-shrink-0" />
        <span className="mono text-[10.5px] sm:text-xs text-[#ECE4D3] tracking-wide font-medium">
          {isFr ? (
            <>
              <strong className="text-[#CAA243]">FORMATION & MASTERCLASS VIDÉO IA DISPONIBLE</strong> — ACCÉDER AUX SESSIONS EN LIGNE
            </>
          ) : (
            <>
              <strong className="text-[#CAA243]">AI VIDEO MASTERCLASS & SYSTEMS AVAILABLE</strong> — ACCESS ONLINE SESSIONS
            </>
          )}
        </span>
        <ArrowRight className="w-3.5 h-3.5 text-[#CAA243] flex-shrink-0 hidden sm:inline-block" />
      </div>
    </aside>
  );
}
