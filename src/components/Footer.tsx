'use client';

import React from 'react';
import Link from 'next/link';
import { Instagram, ArrowUpRight } from 'lucide-react';
import { Language } from '@/types';

interface FooterProps {
  lang: Language;
  onToggleLang?: () => void;
  onShowToast?: (msg: string) => void;
}

export default function Footer({ lang, onToggleLang, onShowToast }: FooterProps) {
  const isFr = lang === 'fr';

  return (
    <footer className="border-t border-white/[0.08] bg-[#050505] py-12 sm:py-16 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        {/* Brand identity */}
        <div>
          <Link
            href="/"
            className="font-display font-extrabold text-2xl tracking-tighter text-fg hover:text-gold transition-colors inline-block mb-2"
          >
            OVIZ<span className="text-gold">ai</span>
          </Link>
          <p className="text-sm text-muted">
            {isFr ? 'Studio de Création Publicitaire' : 'Creative Ad Studio'} · Worldwide
          </p>
          <p className="text-xs text-muted/60 mt-1">
            © {new Date().getFullYear()} OVIZai Studio. {isFr ? 'Tous droits réservés.' : 'All rights reserved.'}
          </p>
        </div>

        {/* Primary nav links */}
        <div className="flex flex-wrap items-center gap-6 sm:gap-8 text-sm font-medium">
          <Link href="/services" className="text-muted hover:text-fg transition-colors">
            Services
          </Link>
          <Link href="/tarifs" className="text-muted hover:text-fg transition-colors">
            {isFr ? 'Tarifs' : 'Pricing'}
          </Link>
          <Link href="/contact" className="text-muted hover:text-fg transition-colors">
            Contact
          </Link>
          <a
            href="https://instagram.com/ovizai.co"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-muted hover:text-gold transition-colors"
          >
            <Instagram className="w-4 h-4" />
            <span>Instagram</span>
          </a>
          {onToggleLang && (
            <button
              type="button"
              onClick={onToggleLang}
              className="text-xs mono uppercase text-muted hover:text-gold px-2 py-1 rounded border border-white/[0.08]"
              aria-label={isFr ? 'Basculer en anglais' : 'Switch to French'}
            >
              {isFr ? 'EN' : 'FR'}
            </button>
          )}
        </div>

        {/* Legal links */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-muted/80 mono border-t md:border-t-0 pt-4 md:pt-0 w-full md:w-auto border-white/[0.04]">
          <Link href="/cgv" className="hover:text-fg transition-colors">
            CGV
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
