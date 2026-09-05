'use client';

import Link from 'next/link';
import { Youtube, Instagram, ShieldCheck, FileText, Tag } from 'lucide-react';
import { DICTIONARY } from '@/lib/i18n';
import { Language } from '@/types';

interface FooterProps {
  lang: Language;
  onShowToast?: (msg: string) => void;
}

export default function Footer({ lang, onShowToast }: FooterProps) {
  const t = DICTIONARY[lang];

  return (
    <footer className="relative z-10 max-w-xl mx-auto pt-6 pb-12 px-4 border-t border-border flex flex-col gap-5 items-center text-center font-mono text-[11px] text-muted">
      {/* Social Links Row */}
      <div className="w-full">
        <p className="mono text-[10.5px] uppercase text-muted mb-3 tracking-wider">
          {t.followLabel}
        </p>
        <div className="flex items-center justify-center gap-8">
          <a
            href="https://youtube.com/@ovizaidotcom"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-muted hover:text-gold-bright transition-colors text-xs font-medium"
          >
            <Youtube className="w-4 h-4 text-gold" />
            <span>YouTube</span>
          </a>

          <a
            href="https://instagram.com/ovizai.co"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-muted hover:text-gold-bright transition-colors text-xs font-medium"
          >
            <Instagram className="w-4 h-4 text-gold" />
            <span>Instagram</span>
          </a>
        </div>
      </div>

      {/* Bottom Rights & Legal */}
      <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-4 pt-3 border-t border-border">
        <span className="text-muted">{t.rights}</span>
        <div className="grid grid-cols-2 sm:flex sm:flex-row items-center justify-center gap-2 sm:gap-4 text-muted w-full sm:w-auto">
          <Link
            href="/tarifs"
            className="hover:text-fg transition-colors flex items-center justify-center gap-1 cursor-pointer text-gold font-bold min-h-[44px] px-2 bg-black/30 sm:bg-transparent rounded-lg border border-border sm:border-0"
          >
            <Tag className="w-3 h-3 text-gold" />
            <span>{lang === 'fr' ? 'Tarifs' : 'Pricing'}</span>
          </Link>
          <Link
            href="/mentions-legales"
            className="hover:text-fg transition-colors flex items-center justify-center gap-1 cursor-pointer min-h-[44px] px-2 bg-black/30 sm:bg-transparent rounded-lg border border-border sm:border-0"
          >
            <FileText className="w-3 h-3 text-gold" />
            <span>{lang === 'fr' ? 'Mentions Légales' : 'Legal Notice'}</span>
          </Link>
          <Link
            href="/confidentialite"
            className="hover:text-fg transition-colors flex items-center justify-center gap-1 cursor-pointer min-h-[44px] px-2 bg-black/30 sm:bg-transparent rounded-lg border border-border sm:border-0"
          >
            <ShieldCheck className="w-3 h-3 text-gold" />
            <span>{lang === 'fr' ? 'Confidentialité' : 'Privacy Policy'}</span>
          </Link>
          <Link
            href="/cgv"
            className="hover:text-fg transition-colors flex items-center justify-center gap-1 cursor-pointer min-h-[44px] px-2 bg-black/30 sm:bg-transparent rounded-lg border border-border sm:border-0"
          >
            <FileText className="w-3 h-3 text-gold" />
            <span>{lang === 'fr' ? 'CGV' : 'Terms'}</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
