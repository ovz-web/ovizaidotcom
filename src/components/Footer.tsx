'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Instagram } from 'lucide-react';
import { Language } from '@/types';

interface FooterProps {
  lang: Language;
  onToggleLang?: () => void;
  onShowToast?: (msg: string) => void;
}

export default function Footer({ lang }: FooterProps) {
  const isFr = lang === 'fr';

  return (
    <footer className="border-t border-white/[0.08] bg-[#050505] py-12 sm:py-16 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        {/* Brand identity: Real OVIZai Logo */}
        <div>
          <Link
            href="/"
            className="inline-block mb-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded"
            aria-label={isFr ? 'OVIZai — Accueil' : 'OVIZai — Home'}
          >
            <Image
              src="/logo.png"
              alt={isFr ? 'OVIZai — Studio de création publicitaire' : 'OVIZai — Creative Ad Studio'}
              width={120}
              height={63}
              className="h-7 sm:h-8 w-auto object-contain mix-blend-screen"
            />
          </Link>
          <p className="text-sm font-medium text-fg/90">
            {isFr ? 'Studio créatif' : 'Creative Studio'}
          </p>
          <p className="text-xs text-muted mt-0.5">
            Worldwide
          </p>
          <p className="text-xs text-muted/60 mt-3">
            © {new Date().getFullYear()} OVIZai Studio · {isFr ? 'Tous droits réservés' : 'All rights reserved'}
          </p>
        </div>

        {/* Minimal Links: Contact, Instagram, CGV, Confidentialité, Mentions légales */}
        <div className="flex flex-wrap items-center gap-5 sm:gap-7 text-xs sm:text-sm">
          <Link href="/contact" className="text-muted hover:text-fg transition-colors">
            Contact
          </Link>
          <a
            href="https://instagram.com/ovizai.co"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-muted hover:text-gold transition-colors"
          >
            <Instagram className="w-3.5 h-3.5" />
            <span>Instagram</span>
          </a>
          <span className="text-white/[0.12] hidden sm:inline select-none">|</span>
          <Link href="/cgv" className="text-muted/80 hover:text-fg transition-colors">
            CGV
          </Link>
          <Link href="/confidentialite" className="text-muted/80 hover:text-fg transition-colors">
            {isFr ? 'Confidentialité' : 'Privacy'}
          </Link>
          <Link href="/mentions-legales" className="text-muted/80 hover:text-fg transition-colors">
            {isFr ? 'Mentions légales' : 'Legal'}
          </Link>
        </div>
      </div>
    </footer>
  );
}
