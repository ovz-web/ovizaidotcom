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
      <div className="w-full px-2 sm:px-6 md:px-8 py-1.5 sm:py-2.5 pb-[max(0.4rem,env(safe-area-inset-bottom))] flex flex-row items-center justify-between gap-1 sm:gap-4 text-[8px] min-[375px]:text-[8.5px] sm:text-[11.5px] text-muted/75 whitespace-nowrap">
        
        {/* Left: Copyright */}
        <div className="flex items-center gap-1 sm:gap-2 text-muted/80 select-none shrink-0 font-medium">
          <span>
            © 2026 OVIZai<span className="hidden sm:inline">. {isFr ? 'Tous droits réservés.' : 'All rights reserved.'}</span>
          </span>
        </div>

        {/* Right: Support/legal links & socials */}
        <div className="flex items-center flex-row justify-end gap-x-1 sm:gap-x-4 gap-y-1 shrink-0">
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

          <span className="text-white/[0.2] select-none mx-0.5 sm:mx-0">|</span>

          <a
            href="https://youtube.com/@ovizaidotcom"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gold-bright transition-colors inline-flex items-center gap-0.5 sm:gap-1 text-gold"
            aria-label="YouTube"
          >
            <Youtube className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-gold shrink-0" />
            <span className="hidden sm:inline">YouTube</span>
            <span className="sm:hidden">YT</span>
          </a>

          <span className="text-white/[0.15] select-none">·</span>

          <a
            href="https://instagram.com/ovizai.co"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gold-bright transition-colors inline-flex items-center gap-0.5 sm:gap-1 text-gold"
            aria-label="Instagram"
          >
            <Instagram className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-gold shrink-0" />
            <span className="hidden sm:inline">Instagram</span>
            <span className="sm:hidden">IG</span>
          </a>
        </div>
      </div>
    </footer>
  );
}

