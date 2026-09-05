'use client';

import React from 'react';
import Link from 'next/link';
import { Language } from '@/types';

interface FooterProps {
  lang: Language;
  onShowToast?: (msg: string) => void;
}

/**
 * Minimalist, low-profile cinema studio bottom bar inspired by top AI creative suites.
 * Very low height, discreet typography, clean horizontal layout.
 */
export default function Footer({ lang }: FooterProps) {
  const isFr = lang === 'fr';

  return (
    <footer className="relative z-10 w-full border-t border-white/[0.06] bg-black/40 backdrop-blur-sm mt-auto">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] font-mono text-muted">
        
        {/* Left: Copyright */}
        <div className="flex items-center gap-2 text-muted/90">
          <span>
            © 2026 OVIZai. {isFr ? 'Tous droits réservés.' : 'All rights reserved.'}
          </span>
        </div>

        {/* Right: Social & Navigation / Legal Links */}
        <div className="flex items-center flex-wrap justify-center gap-x-4 sm:gap-x-5 gap-y-1.5 text-muted">
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

          <span className="text-white/[0.12] hidden sm:inline select-none">|</span>

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
        </div>
      </div>
    </footer>
  );
}
