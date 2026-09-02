'use client';

import Link from 'next/link';
import { Youtube, Instagram, ShieldCheck, FileText, Tag } from 'lucide-react';
import { DICTIONARY } from '@/lib/i18n';
import { Language } from '@/types';

interface FooterProps {
  lang: Language;
  onShowToast: (msg: string) => void;
}

export default function Footer({ lang, onShowToast }: FooterProps) {
  const t = DICTIONARY[lang];

  return (
    <footer className="relative z-10 max-w-xl mx-auto pt-6 pb-12 px-4 border-t border-border flex flex-col gap-5 items-center text-center font-mono text-[11px] text-fg-muted">
      {/* Helper Keyboard Bar */}
      <div className="flex items-center justify-between w-full pb-4 border-b border-border/40 text-[10.5px]">
        <span>{t.pressCmd}</span>
        <span>{t.pressEsc}</span>
      </div>

      {/* Social Links Row */}
      <div className="w-full">
        <p className="mono text-[10.5px] uppercase text-fg-muted mb-3 tracking-wider">
          {t.followLabel}
        </p>
        <div className="flex items-center justify-center gap-8">
          <a
            href="https://youtube.com/@ovizaidotcom"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-fg-muted hover:text-gold-bright transition-colors text-xs font-medium"
          >
            <Youtube className="w-4 h-4 text-gold" />
            <span>YouTube</span>
          </a>

          <a
            href="https://instagram.com/ovizai.co"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-fg-muted hover:text-gold-bright transition-colors text-xs font-medium"
          >
            <Instagram className="w-4 h-4 text-gold" />
            <span>Instagram</span>
          </a>
        </div>
      </div>

      {/* Bottom Rights & Legal */}
      <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-3 pt-3">
        <span className="text-[#9C9384]">{t.rights}</span>
        <div className="flex flex-wrap items-center justify-center gap-4 text-[#9C9384]">
          <Link
            href="/tarifs"
            className="hover:text-[#ECE4D3] transition-colors flex items-center gap-1 cursor-pointer text-[#CAA243] font-bold min-h-[44px] px-1"
          >
            <Tag className="w-3 h-3 text-[#CAA243]" />
            <span>{lang === 'fr' ? 'Tarifs' : 'Pricing'}</span>
          </Link>
          <Link
            href="/mentions-legales"
            className="hover:text-[#ECE4D3] transition-colors flex items-center gap-1 cursor-pointer min-h-[44px] px-1"
          >
            <FileText className="w-3 h-3 text-[#CAA243]" />
            <span>{lang === 'fr' ? 'Mentions Légales' : 'Legal Notice'}</span>
          </Link>
          <Link
            href="/confidentialite"
            className="hover:text-[#ECE4D3] transition-colors flex items-center gap-1 cursor-pointer min-h-[44px] px-1"
          >
            <ShieldCheck className="w-3 h-3 text-[#CAA243]" />
            <span>{lang === 'fr' ? 'Confidentialité' : 'Privacy Policy'}</span>
          </Link>
          <Link
            href="/cgv"
            className="hover:text-[#ECE4D3] transition-colors flex items-center gap-1 cursor-pointer min-h-[44px] px-1"
          >
            <FileText className="w-3 h-3 text-[#CAA243]" />
            <span>{lang === 'fr' ? 'CGV' : 'Terms'}</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
