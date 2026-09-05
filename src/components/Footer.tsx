'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { Language } from '@/types';
import { useLanguage } from '@/context/LanguageContext';

interface FooterProps {
  lang?: Language;
  onShowToast?: (msg: string) => void;
}

/**
 * Minimalist, low-profile bottom bar inspired by top AI creative suites (Higgsfield style).
 * Very low height, discreet typography, clean horizontal layout, full responsiveness.
 */
export default function Footer({ lang }: FooterProps) {
  const langContext = useLanguage();
  const activeLang = lang || langContext?.lang || 'fr';
  const isFr = activeLang === 'fr';

  const handleToggleLang = () => {
    if (langContext?.toggleLanguage) {
      langContext.toggleLanguage();
    }
  };

  return (
    <footer className="relative z-10 w-full border-t border-white/[0.06] bg-black/60 backdrop-blur-md mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-3.5 sm:py-3 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] sm:text-[11.5px] text-muted/75">
        
        {/* Left: Copyright */}
        <div className="flex items-center gap-2 text-muted/85 select-none">
          <span>
            © 2026 OVIZai. {isFr ? 'Tous droits réservés.' : 'All rights reserved.'}
          </span>
        </div>

        {/* Right: Language switch, support/legal links & socials */}
        <div className="flex items-center flex-wrap justify-center sm:justify-end gap-x-4 sm:gap-x-5 gap-y-1.5">
          {/* Interactive Language Selector */}
          <button
            type="button"
            onClick={handleToggleLang}
            title={isFr ? 'Passer en Anglais' : 'Switch to French'}
            className="inline-flex items-center gap-1 hover:text-fg transition-colors cursor-pointer text-muted/90"
          >
            <span>{isFr ? '🇫🇷 Français' : '🇺🇸 English'}</span>
            <ChevronDown className="w-3 h-3 opacity-60 transition-transform duration-200" />
          </button>

          <Link href="/contact" className="hover:text-fg transition-colors">
            {isFr ? 'Contact & Studio' : 'Contact & Studio'}
          </Link>

          <Link href="/tarifs" className="hover:text-fg transition-colors">
            {isFr ? 'Tarifs' : 'Pricing'}
          </Link>

          <Link href="/cgv" className="hover:text-fg transition-colors">
            {isFr ? 'CGV' : 'Terms'}
          </Link>

          <Link href="/confidentialite" className="hover:text-fg transition-colors">
            {isFr ? 'Confidentialité' : 'Privacy'}
          </Link>

          <Link href="/mentions-legales" className="hover:text-fg transition-colors">
            {isFr ? 'Mentions Légales' : 'Legal'}
          </Link>

          <span className="text-white/[0.12] hidden md:inline select-none">|</span>

          <a
            href="https://youtube.com/@ovizaidotcom"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gold-bright transition-colors"
          >
            YouTube
          </a>
          <a
            href="https://instagram.com/ovizai.co"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gold-bright transition-colors"
          >
            Instagram
          </a>
        </div>
      </div>
    </footer>
  );
}

