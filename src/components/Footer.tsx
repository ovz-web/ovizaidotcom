'use client';

import React from 'react';
import { Youtube, Instagram, Video, ShieldCheck, FileText } from 'lucide-react';
import { DICTIONARY } from '@/lib/i18n';
import { Language } from '@/types';

interface FooterProps {
  lang: Language;
  onShowToast: (msg: string) => void;
}

export default function Footer({ lang, onShowToast }: FooterProps) {
  const t = DICTIONARY[lang];

  return (
    <footer className="relative z-10 max-w-xl mx-auto pt-6 pb-12 px-4 border-t border-border flex flex-col gap-5 items-center text-center font-mono text-[11px] text-fg-muted2">
      {/* Helper Keyboard Bar */}
      <div className="flex items-center justify-between w-full pb-4 border-b border-border/40 text-[10.5px]">
        <span>{t.pressCmd}</span>
        <span>{t.pressEsc}</span>
      </div>

      {/* Social Links Row */}
      <div className="w-full">
        <p className="mono text-[10.5px] uppercase text-fg-muted2 mb-3 tracking-wider">
          {t.followLabel}
        </p>
        <div className="flex items-center justify-center gap-5 sm:gap-7 flex-wrap">
          <a
            href="https://youtube.com/@ovizaidotcom"
            target="_blank"
            rel="noopener noreferrer"
            title="OVIZai YouTube Channel"
            className="flex items-center gap-1.5 text-fg-muted hover:text-gold-bright transition-colors text-xs mono group"
          >
            <Youtube className="w-4 h-4 text-gold group-hover:scale-110 transition-transform" />
            <span>YouTube <span className="text-[10px] text-fg-muted2">(@ovizaidotcom)</span></span>
          </a>

          <a
            href="https://instagram.com/ovizaidotcom"
            target="_blank"
            rel="noopener noreferrer"
            title="OVIZai Instagram Profile"
            className="flex items-center gap-1.5 text-fg-muted hover:text-gold-bright transition-colors text-xs mono group"
          >
            <Instagram className="w-4 h-4 text-gold group-hover:scale-110 transition-transform" />
            <span>Instagram <span className="text-[10px] text-fg-muted2">(@ovizaidotcom)</span></span>
          </a>

          <a
            href="https://tiktok.com/@ovizaidotcom"
            target="_blank"
            rel="noopener noreferrer"
            title="OVIZai TikTok Profile"
            className="flex items-center gap-1.5 text-fg-muted hover:text-gold-bright transition-colors text-xs mono group"
          >
            <Video className="w-4 h-4 text-gold group-hover:scale-110 transition-transform" />
            <span>TikTok <span className="text-[10px] text-fg-muted2">(@ovizaidotcom)</span></span>
          </a>
        </div>
      </div>

      {/* Bottom Rights & Legal */}
      <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-3 pt-3">
        <span>{t.rights}</span>
        <div className="flex items-center gap-4 text-fg-muted2">
          <button
            type="button"
            onClick={() => onShowToast(t.privacy)}
            className="hover:text-fg transition-colors flex items-center gap-1 cursor-pointer"
          >
            <ShieldCheck className="w-3 h-3" />
            <span>{t.privacy}</span>
          </button>
          <button
            type="button"
            onClick={() => onShowToast(t.terms)}
            className="hover:text-fg transition-colors flex items-center gap-1 cursor-pointer"
          >
            <FileText className="w-3 h-3" />
            <span>{t.terms}</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
