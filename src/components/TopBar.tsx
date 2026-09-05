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
        const rect = headerRef.current.getBoundingClientRect();
        const height = Math.ceil(rect.height || headerRef.current.offsetHeight);
        if (height > 0) {
          document.documentElement.style.setProperty('--topbar-height', `${height}px`);
        }
      }
    };

    updateHeaderHeight();
    const rafId = requestAnimationFrame(updateHeaderHeight);
    if (typeof document !== 'undefined' && 'fonts' in document) {
      document.fonts.ready.then(updateHeaderHeight).catch(() => {});
    }

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined' && headerRef.current) {
      resizeObserver = new ResizeObserver(() => {
        updateHeaderHeight();
      });
      resizeObserver.observe(headerRef.current);
    }

    window.addEventListener('resize', updateHeaderHeight);
    window.addEventListener('orientationchange', updateHeaderHeight);
    return () => {
      cancelAnimationFrame(rafId);
      if (resizeObserver) resizeObserver.disconnect();
      window.removeEventListener('resize', updateHeaderHeight);
      window.removeEventListener('orientationchange', updateHeaderHeight);
    };
  }, []);

  const NAV_LINKS = [
    { href: '/', label: isFr ? '00 // Accueil' : '00 // Home' },
    { href: '/services', label: isFr ? '01 // Nos Services' : '01 // Our Services' },
    { href: '/formation', label: isFr ? '02 // Formation Vidéo IA' : '02 // AI Video Course' },
    { href: '/stack', label: isFr ? '03 // Notre Méthode de Production' : '03 // Our Production Method' },
    { href: '/tarifs', label: isFr ? '04 // Tarifs & Formules' : '04 // Pricing & Packages' },
    { href: '/contact', label: isFr ? '05 // Devis & Contact' : '05 // Contact & Quote' },
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
      document.body.style.position = originalPosition || '';
      document.body.style.top = originalTop || '';
      document.body.style.left = originalLeft || '';
      document.body.style.right = originalRight || '';
      document.body.style.width = originalWidth || '';
      document.body.style.overflow = originalOverflow || '';
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
      {/* Single Fixed TopBar — Strictly 1 single row on both mobile and desktop */}
      <header
        ref={headerRef}
        style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}
        className="fixed top-0 left-0 right-0 z-50 bg-bg/95 backdrop-blur-md border-b border-border px-3 sm:px-6 md:px-8 py-1.5 sm:py-0 sm:h-14 flex flex-col justify-center"
      >
        <div className="w-full flex items-center justify-between gap-1.5 sm:gap-4">
          {/* Left Column: Logo */}
          <div className="flex items-center flex-shrink-0">
            <Link
              className="flex items-center py-0.5"
              href="/"
              aria-label={isFr ? 'OVIZai — Accueil du studio de production vidéo IA' : 'OVIZai — AI Video Studio Home'}
            >
              <Image
                src="/logo.png"
                alt={isFr ? 'OVIZai — Studio de production vidéo et direction artistique IA' : 'OVIZai — AI Art Direction & Video Production Studio'}
                width={100}
                height={40}
                className="h-6 sm:h-8 w-auto object-contain mix-blend-screen"
                priority
              />
            </Link>
          </div>

          {/* Center Column: Centered Launch Offer Micro-Pill (Always on the same line) */}
          <div className="flex-1 flex justify-center items-center px-1 min-w-0">
            <PromoBar lang={lang} />
          </div>

          {/* Right Column: Language & Burger Menu (Always on the same line) */}
          <div className="flex items-center gap-1.5 sm:gap-3 flex-shrink-0">
            <button
              onClick={onToggleLang}
              type="button"
              aria-label={isFr ? 'Changer la langue (English)' : 'Switch language (Français)'}
              className="flex items-center gap-1 bg-white/[0.02] border border-border-strong text-fg hover:border-gold/50 hover:text-gold-bright rounded-full px-2 py-1 sm:px-3 sm:py-1.5 text-[10px] sm:text-[11px] font-mono transition-all cursor-pointer min-h-[32px] sm:min-h-[38px]"
            >
              <Globe className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gold" />
              <span className="mono font-semibold">{lang === 'en' ? 'FR' : 'EN'}</span>
            </button>

            <button
              ref={(el) => { if (el) burgerRef.current = el; }}
              type="button"
              onClick={() => setIsDrawerOpen(true)}
              aria-expanded={isDrawerOpen}
              aria-label={isFr ? 'Ouvrir le menu de navigation' : 'Open navigation menu'}
              className="p-1.5 sm:p-2.5 rounded-lg bg-white/[0.03] border border-border text-fg hover:text-gold-bright hover:border-gold/40 transition-all cursor-pointer min-h-[32px] min-w-[32px] sm:min-h-[38px] sm:min-w-[38px] flex items-center justify-center"
            >
              <Menu className="w-4 h-4 sm:w-5 sm:h-5 text-fg" />
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
            className="w-72 sm:w-80 fixed top-0 bottom-0 right-0 z-50 bg-card border-l border-border p-6 shadow-2xl flex flex-col justify-between transition-transform duration-300 overflow-y-auto"
          >
            {/* Drawer Top Header */}
            <div>
              <div className="flex items-center justify-end pb-4 border-b border-border mb-6">
                <button
                  type="button"
                  onClick={closeDrawer}
                  aria-label={isFr ? 'Fermer le menu' : 'Close menu'}
                  className="p-3 rounded-lg bg-white/[0.04] border border-border text-fg hover:text-gold transition-colors cursor-pointer min-h-[48px] min-w-[48px] flex items-center justify-center"
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
                    className="group flex items-center justify-between p-3.5 rounded-lg border border-border bg-black/40 hover:border-gold/40 hover:bg-gold/10 transition-all cursor-pointer min-h-[48px]"
                  >
                    <span className="mono text-xs font-bold text-fg group-hover:text-gold-bright">
                      {link.label}
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-gold" />
                  </Link>
                ))}
              </nav>

              {/* Segmented Selectors: Currency & Language */}
              <div className="space-y-3 pt-4 border-t border-border">
                {/* Multi-Currency Segmented Switcher */}
                <div>
                  <label className="mono text-[10px] uppercase font-bold text-muted block mb-1.5">
                    {isFr ? 'Devise de facturation :' : 'Billing Currency:'}
                  </label>
                  <div className="grid grid-cols-3 gap-1 bg-black/60 p-1 rounded-lg border border-border">
                    {(['USD', 'EUR', 'CAD'] as Currency[]).map(curr => (
                      <button
                        key={curr}
                        type="button"
                        aria-label={isFr ? `Sélectionner la devise ${curr}` : `Select ${curr} currency`}
                        onClick={() => handleCurrencyChange(curr)}
                        className={`py-2 text-center mono text-[11px] font-bold rounded transition-all cursor-pointer min-h-[44px] ${
                          currency === curr
                            ? 'bg-gold text-black shadow'
                            : 'text-muted hover:text-fg'
                        }`}
                      >
                        {curr}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Language Switcher */}
                <div>
                  <label className="mono text-[10px] uppercase font-bold text-muted block mb-1.5">
                    {isFr ? 'Langue d\'affichage :' : 'Display Language:'}
                  </label>
                  <button
                    onClick={onToggleLang}
                    type="button"
                    aria-label={isFr ? 'Basculer la langue en Anglais' : 'Switch language to French'}
                    className="w-full flex items-center justify-between p-3 rounded-lg bg-black/60 border border-border text-xs text-fg hover:border-gold/40 mono cursor-pointer min-h-[48px]"
                  >
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-gold" />
                      <span>{lang === 'fr' ? 'Français (FR)' : 'English (EN)'}</span>
                    </div>
                    <span className="text-[10px] text-gold font-bold">
                      {lang === 'fr' ? 'Changer en EN' : 'Switch to FR'}
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Social Links & Footer */}
            <div className="pt-4 border-t border-border">
              <div className="flex items-center justify-around font-mono text-xs">
                <a
                  href="https://instagram.com/ovizai.co"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram OVIZai"
                  className="flex items-center gap-1.5 text-muted hover:text-gold-bright transition-colors min-h-[44px] px-2"
                >
                  <Instagram className="w-4 h-4 text-gold" />
                  <span>Instagram</span>
                </a>
                <a
                  href="https://youtube.com/@ovizaidotcom"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube OVIZai"
                  className="flex items-center gap-1.5 text-muted hover:text-gold-bright transition-colors min-h-[44px] px-2"
                >
                  <Youtube className="w-4 h-4 text-gold" />
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