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
    <footer className="relative z-10 w-full border-t border-white/[0.06] bg-black/70 backdrop-blur-md mt-auto">
      <div className="w-full px-3 sm:px-6 md:px-8 py-2 sm:py-2.5 pb-[max(0.5rem,env(safe-area-inset-bottom))] flex flex-col sm:flex-row items-center justify-between gap-1.5 sm:gap-4 text-[10px] sm:text-[11.5px] text-muted/75">
        
        {/* Left: Copyright */}
        <div className="flex items-center gap-2 text-muted/80 select-none order-2 sm:order-1">
          <span>
            © 2026 OVIZai. {isFr ? 'Tous droits réservés.' : 'All rights reserved.'}
          </span>
        </div>

        {/* Right: Support/legal links & socials */}
        <div className="flex items-center flex-wrap justify-center sm:justify-end gap-x-2.5 sm:gap-x-4 gap-y-1 order-1 sm:order-2">
          <Link href="/contact" className="hover:text-fg transition-colors">
            {isFr ? 'Contact' : 'Contact'}
          </Link>
          <span className="text-white/[0.15] select-none">·</span>

          <Link href="/tarifs" className="hover:text-fg transition-colors">
            {isFr ? 'Tarifs' : 'Pricing'}
          </Link>
          <span className="text-white/[0.15] select-none">·</span>

          <Link href="/cgv" className="hover:text-fg transition-colors">
            {isFr ? 'CGV' : 'Terms'}
          </Link>
          <span className="text-white/[0.15] select-none">·</span>

          <Link href="/confidentialite" className="hover:text-fg transition-colors">
            {isFr ? 'Confidentialité' : 'Privacy'}
          </Link>
          <span className="text-white/[0.15] select-none">·</span>

          <Link href="/mentions-legales" className="hover:text-fg transition-colors">
            {isFr ? 'Mentions' : 'Legal'}
          </Link>

          <span className="text-white/[0.2] select-none hidden sm:inline">|</span>

          <a
            href="https://youtube.com/@ovizaidotcom"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gold-bright transition-colors inline-flex items-center gap-1"
          >
            <Youtube className="w-3 h-3 text-gold" />
            <span>YouTube</span>
          </a>

          <span className="text-white/[0.15] select-none sm:hidden">·</span>

          <a
            href="https://instagram.com/ovizai.co"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gold-bright transition-colors inline-flex items-center gap-1"
          >
            <Instagram className="w-3 h-3 text-gold" />
            <span>Instagram</span>
          </a>
        </div>
      </div>
    </footer>
  );
}

