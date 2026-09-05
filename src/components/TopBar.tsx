'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Globe, Youtube, Instagram, ArrowUpRight } from 'lucide-react';
import { Language, Currency } from '@/types';
import PromoBar from '@/components/PromoBar';

interface TopBarProps {
  lang: Language;
  onToggleLang: () => void;
  currency?: Currency;
  onSelectCurrency?: (curr: Currency) => void;
}

export default function TopBar({
  lang,
  onToggleLang,
  currency = 'USD',
  onSelectCurrency
}: TopBarProps) {
  const isFr = lang === 'fr';
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const burgerRef = useRef<HTMLButtonElement | null>(null);
  const headerRef = useRef<HTMLElement | null>(null);

  // Dynamic header height measurement for CSS variable --topbar-height + safe area
  useEffect(() => {
    const updateHeaderHeight = () => {
      if (headerRef.current) {
        const height = headerRef.current.offsetHeight;
        if (height > 0) {
          document.documentElement.style.setProperty('--topbar-height', `${height}px`);
        }
      }
    };

    updateHeaderHeight();

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined' && headerRef.current) {
      resizeObserver = new ResizeObserver(() => {
        updateHeaderHeight();
      });
      resizeObserver.observe(headerRef.current);
    }

    window.addEventListener('resize', updateHeaderHeight);
    return () => {
      if (resizeObserver) resizeObserver.disconnect();
      window.removeEventListener('resize', updateHeaderHeight);
    };
  }, []);

  const NAV_LINKS = [
    { href: '/', label: isFr ? '00. Accueil' : '00. Home' },
    { href: '/services', label: isFr ? '01. Nos Services' : '01. Our Services' },
    { href: '/formation', label: isFr ? '02. Formation Vidéo IA' : '02. AI Video Course' },
    { href: '/stack', label: isFr ? '03. Notre Méthode de Production' : '03. Our Production Method' },
    { href: '/tarifs', label: isFr ? '04. Tarifs & Formules' : '04. Pricing & Packages' },
    { href: '/contact', label: isFr ? '05. Devis & Contact' : '05. Contact & Quote' },
  ];

  const handleCurrencyChange = (curr: Currency) => {
    if (onSelectCurrency) {
      onSelectCurrency(curr);
    }
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    burgerRef.current?.focus();
  };

  // 100% Reliable iOS Safari + Desktop body scroll lock using position: fixed technique
  useEffect(() => {
    if (!isDrawerOpen) return;

    // 1. Save current scroll position
    const scrollY = window.scrollY || window.pageYOffset || 0;

    // Store original styles to restore seamlessly on cleanup/close
    const originalPosition = document.body.style.position;
    const originalTop = document.body.style.top;
    const originalLeft = document.body.style.left;
    const originalRight = document.body.style.right;
    const originalWidth = document.body.style.width;
    const originalOverflow = document.body.style.overflow;

    // 2. Lock body in place at current scroll Y position (prevents iOS rubber-banding)
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = '0px';
    document.body.style.right = '0px';
    document.body.style.width = '100%';
    document.body.style.overflow = 'hidden';

    // 3. Cleanup function on close or unmount
    return () => {
      // Restore original body styles
      document.body.style.position = originalPosition || '';
      document.body.style.top = originalTop || '';
      document.body.style.left = originalLeft || '';
      document.body.style.right = originalRight || '';
      document.body.style.width = originalWidth || '';
      document.body.style.overflow = originalOverflow || '';

      // Immediately restore exact scroll position without visual jump
      window.scrollTo(0, scrollY);
    };
  }, [isDrawerOpen]);

  // Close drawer on Escape key
  useEffect(() => {
    if (!isDrawerOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeDrawer();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isDrawerOpen]);

  return (
    <>
      {/* Single Fixed TopBar — 2 rows on mobile (<sm), 1 centered row on desktop (sm+) */}
      <header
        ref={headerRef}
        style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}
        className="fixed top-0 left-0 right-0 z-50 bg-[#080808]/95 backdrop-blur-md border-b border-white/[0.08] px-3 sm:px-4 py-2 sm:py-0 sm:h-14 flex flex-col justify-center"
      >
        <div className="max-w-6xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-1.5 sm:gap-4">
          {/* Mobile Row 1 (Logo left, controls right) / Desktop Left Column (Logo) */}
          <div className="w-full sm:w-auto flex items-center justify-between sm:justify-start gap-2">
            <Link className="flex items-center py-0.5 flex-shrink-0" href="/">
              <Image
                src="/logo.png"
                alt="OVIZai"
                width={100}
                height={40}
                className="h-7 sm:h-9 w-auto object-contain mix-blend-screen"
                priority
              />
            </Link>

            {/* Mobile Controls (Right side of Row 1 on mobile) */}
            <div className="flex sm:hidden items-center gap-2">
              <button
                onClick={onToggleLang}
                type="button"
                aria-label={isFr ? 'Changer la langue (English)' : 'Switch language (Français)'}
                className="flex items-center gap-1 bg-white/[0.02] border border-white/[0.12] text-[#ECE4D3] hover:border-[#CAA243]/50 hover:text-[#f0c869] rounded-full px-2.5 py-1 text-[10px] font-mono transition-all cursor-pointer min-h-[36px]"
              >
                <Globe className="w-3 h-3 text-[#CAA243]" />
                <span className="mono font-semibold">{lang === 'en' ? 'FR' : 'EN'}</span>
              </button>

              <button
                ref={(el) => { if (el) burgerRef.current = el; }}
                type="button"
                onClick={() => setIsDrawerOpen(true)}
                aria-expanded={isDrawerOpen}
                aria-label={isFr ? 'Ouvrir le menu de navigation' : 'Open navigation menu'}
                className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.1] text-[#ECE4D3] hover:text-[#f0c869] hover:border-[#CAA243]/40 transition-all cursor-pointer min-h-[36px] min-w-[36px] flex items-center justify-center"
              >
                <Menu className="w-4 h-4 text-[#ECE4D3]" />
              </button>
            </div>
          </div>

          {/* Mobile Row 2 / Desktop Center Column: Centered Launch Offer Micro-Pill */}
          <div className="w-full sm:w-auto flex-1 flex justify-center items-center py-0.5 sm:py-0">
            <PromoBar lang={lang} />
          </div>

          {/* Desktop Right Controls (Language + Burger Trigger) */}
          <div className="hidden sm:flex items-center gap-2.5 sm:gap-4 flex-shrink-0">
            <button
              onClick={onToggleLang}
              type="button"
              aria-label={isFr ? 'Changer la langue (English)' : 'Switch language (Français)'}
              className="flex items-center gap-1.5 bg-white/[0.02] border border-white/[0.12] text-[#ECE4D3] hover:border-[#CAA243]/50 hover:text-[#f0c869] rounded-full px-3 py-2 text-[11px] font-mono transition-all cursor-pointer min-h-[44px]"
            >
              <Globe className="w-3.5 h-3.5 text-[#CAA243]" />
              <span className="mono font-semibold">{lang === 'en' ? 'FR' : 'EN'}</span>
            </button>

            <button
              ref={(el) => { if (el) burgerRef.current = el; }}
              type="button"
              onClick={() => setIsDrawerOpen(true)}
              aria-expanded={isDrawerOpen}
              aria-label={isFr ? 'Ouvrir le menu de navigation' : 'Open navigation menu'}
              className="p-2.5 sm:p-3 rounded-lg bg-white/[0.03] border border-white/[0.1] text-[#ECE4D3] hover:text-[#f0c869] hover:border-[#CAA243]/40 transition-all cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
              <Menu className="w-5 h-5 text-[#ECE4D3]" />
            </button>
          </div>
        </div>
      </header>

      {/* Right Side Flyout Drawer & Backdrop */}
      {isDrawerOpen && (
        <>
          {/* Dimmed Backdrop - Prevents iOS Safari touch rubber-banding */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity overscroll-none touch-none"
            onClick={closeDrawer}
            onTouchMove={(e) => e.preventDefault()}
          />

          {/* Compact Right Side Flyout Drawer - 100% Opaque Solid Background, viewport anchored */}
          <aside
            role="dialog"
            aria-modal="true"
            aria-label={isFr ? 'Menu de navigation' : 'Navigation menu'}
            className="w-72 sm:w-80 fixed top-0 bottom-0 right-0 z-50 bg-[#0B0A08] border-l border-white/[0.08] p-6 shadow-2xl flex flex-col justify-between transition-transform duration-300 overflow-y-auto"
          >
            {/* Drawer Top Header */}
            <div>
              <div className="flex items-center justify-end pb-4 border-b border-white/[0.08] mb-6">
                <button
                  type="button"
                  onClick={closeDrawer}
                  aria-label={isFr ? 'Fermer le menu' : 'Close menu'}
                  className="p-3 rounded-lg bg-white/[0.04] border border-white/[0.1] text-[#ECE4D3] hover:text-[#CAA243] transition-colors cursor-pointer min-h-[48px] min-w-[48px] flex items-center justify-center"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="flex flex-col space-y-2 mb-6">
                {NAV_LINKS.map(link => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeDrawer}
                    className="group flex items-center justify-between p-3.5 rounded-lg border border-white/[0.06] bg-black/40 hover:border-[#CAA243]/40 hover:bg-[#CAA243]/10 transition-all cursor-pointer min-h-[48px]"
                  >
                    <span className="mono text-xs font-bold text-[#ECE4D3] group-hover:text-[#f0c869]">
                      {link.label}
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-[#CAA243]" />
                  </Link>
                ))}
              </nav>

              {/* Segmented Selectors: Currency & Language */}
              <div className="space-y-3 pt-4 border-t border-white/[0.08]">
                {/* Multi-Currency Segmented Switcher */}
                <div>
                  <label className="mono text-[10px] uppercase font-bold text-[#A39B8F] block mb-1.5">
                    {isFr ? 'Devise de facturation :' : 'Billing Currency:'}
                  </label>
                  <div className="grid grid-cols-3 gap-1 bg-black/60 p-1 rounded-lg border border-white/[0.08]">
                    {(['USD', 'EUR', 'CAD'] as Currency[]).map(curr => (
                      <button
                        key={curr}
                        type="button"
                        aria-label={isFr ? `Sélectionner la devise ${curr}` : `Select ${curr} currency`}
                        onClick={() => handleCurrencyChange(curr)}
                        className={`py-2 text-center mono text-[11px] font-bold rounded transition-all cursor-pointer min-h-[44px] ${
                          currency === curr
                            ? 'bg-[#CAA243] text-black shadow'
                            : 'text-[#A39B8F] hover:text-[#ECE4D3]'
                        }`}
                      >
                        {curr}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Language Switcher */}
                <div>
                  <label className="mono text-[10px] uppercase font-bold text-[#A39B8F] block mb-1.5">
                    {isFr ? 'Langue d\'affichage :' : 'Display Language:'}
                  </label>
                  <button
                    onClick={onToggleLang}
                    type="button"
                    aria-label={isFr ? 'Basculer la langue en Anglais' : 'Switch language to French'}
                    className="w-full flex items-center justify-between p-3 rounded-lg bg-black/60 border border-white/[0.08] text-xs text-[#ECE4D3] hover:border-[#CAA243]/40 mono cursor-pointer min-h-[48px]"
                  >
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-[#CAA243]" />
                      <span>{lang === 'fr' ? 'Français (FR)' : 'English (EN)'}</span>
                    </div>
                    <span className="text-[10px] text-[#CAA243] font-bold">
                      {lang === 'fr' ? 'Changer en EN' : 'Switch to FR'}
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Social Links & Footer */}
            <div className="pt-4 border-t border-white/[0.08]">
              <div className="flex items-center justify-around font-mono text-xs">
                <a
                  href="https://instagram.com/ovizai.co"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram OVIZai"
                  className="flex items-center gap-1.5 text-[#A39B8F] hover:text-[#f0c869] transition-colors min-h-[44px] px-2"
                >
                  <Instagram className="w-4 h-4 text-[#CAA243]" />
                  <span>Instagram</span>
                </a>
                <a
                  href="https://youtube.com/@ovizaidotcom"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube OVIZai"
                  className="flex items-center gap-1.5 text-[#A39B8F] hover:text-[#f0c869] transition-colors min-h-[44px] px-2"
                >
                  <Youtube className="w-4 h-4 text-[#CAA243]" />
                  <span>YouTube</span>
                </a>
              </div>
            </div>
          </aside>
        </>
      )}
    </>
  );
}