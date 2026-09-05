'use client';

import React from 'react';
import Link from 'next/link';
import { Youtube, Instagram } from 'lucide-react';
import { Language } from '@/types';
import { useLanguage } from '@/context/LanguageContext';

interface FooterProps {
  lang?: Language;
  onShowToast?: (msg: string) => void;
}

/**
 * Minimalist, low-profile bottom bar.
 * TopBar remains the single language switch. Social icons included with labels.
 */
export default function Footer({ lang }: FooterProps) {
  const langContext = useLanguage();
  const activeLang = lang || langContext?.lang || 'fr';
  const isFr = activeLang === 'fr';

  return (
    <footer className="relative z-10 w-full border-t border-white/[0.06] bg-black/60 backdrop-blur-md mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-3.5 sm:py-3 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] sm:text-[11.5px] text-muted/75">
        
        {/* Left: Copyright */}
        <div className="flex items-center gap-2 text-muted/85 select-none">
          <span>
            © 2026 OVIZai. {isFr ? 'Tous droits réservés.' : 'All rights reserved.'}
          </span>
        </div>

        {/* Right: Support/legal links & socials with miniature icons */}
        <div className="flex items-center flex-wrap justify-center sm:justify-end gap-x-4 sm:gap-x-5 gap-y-1.5">
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
            className="hover:text-gold-bright transition-colors inline-flex items-center gap-1.5"
          >
            <Youtube className="w-3.5 h-3.5 text-gold" />
            <span>YouTube</span>
          </a>
          <a
            href="https://instagram.com/ovizai.co"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gold-bright transition-colors inline-flex items-center gap-1.5"
          >
            <Instagram className="w-3.5 h-3.5 text-gold" />
            <span>Instagram</span>
          </a>
        </div>
      </div>
    </footer>
  );
}

