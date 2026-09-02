'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Globe, DollarSign, Youtube, Instagram, ArrowUpRight } from 'lucide-react';
import { Language, Currency } from '@/types';

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
  const burgerRef = useRef<HTMLButtonElement>(null);

  const NAV_LINKS = [
    { href: '/', label: isFr ? '00. Accueil' : '00. Home' },
    { href: '/services', label: isFr ? '01. Prestations & Services' : '01. Services & Production' },
    { href: '/tarifs', label: isFr ? '02. Tarifs & Offre de lancement' : '02. Pricing & Launch Offer' },
    { href: '/formation', label: isFr ? '03. Formation & Masterclass' : '03. Video Masterclass' },
    { href: '/stack', label: isFr ? '04. Stack Technique & Pipeline' : '04. Tech Stack & Pipeline' },
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
      {/* 100% Fixed TopBar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#080808]/95 backdrop-blur-md border-b border-white/[0.08] h-14 px-4 flex items-center justify-between">
        <div className="max-w-6xl mx-auto w-full flex items-center justify-between gap-3">
          {/* Top-Left: Imposing Clean Logo Image Link */}
          <Link className="flex items-center py-0.5" href="/">
            <Image
              src="/logo.png"
              alt="OVIZai"
              width={100}
              height={40}
              className="h-8 sm:h-9 w-auto object-contain drop-shadow-[0_0_12px_rgba(202,162,67,0.3)]"
              priority
            />
          </Link>

          {/* Center: Integrated Permanent Masterclass Micro-Pill Announcement */}
          <Link
            href="/formation"
            className="flex items-center gap-2 group hover:opacity-90 transition-opacity bg-white/[0.03] border border-white/[0.08] px-3 py-1 rounded-full"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#CAA243] animate-pulse inline-block flex-shrink-0" />
            <span className="mono text-[10.5px] sm:text-xs tracking-wider uppercase text-[#ECE4D3] font-medium group-hover:text-[#f0c869]">
              {isFr ? (
                <>
                  <strong className="text-[#CAA243]">FORMATION & MASTERCLASS</strong> — ACCÉDER +
                </>
              ) : (
                <>
                  <strong className="text-[#CAA243]">VIDEO MASTERCLASS</strong> — ACCESS +
                </>
              )}
            </span>
          </Link>

          {/* Top-Right Controls: Language & Compact Burger Trigger */}
          <div className="flex items-center gap-2">
            <button
              onClick={onToggleLang}
              type="button"
              aria-label={isFr ? 'Changer la langue (English)' : 'Switch language (Français)'}
              className="hidden sm:flex items-center gap-1.5 bg-white/[0.02] border border-white/[0.12] text-[#ECE4D3] hover:border-[#CAA243]/50 hover:text-[#f0c869] rounded-full px-3 py-2 text-[11px] font-mono transition-all cursor-pointer min-h-[48px]"
            >
              <Globe className="w-3.5 h-3.5 text-[#CAA243]" />
              <span className="mono font-semibold">{lang === 'en' ? 'FR' : 'EN'}</span>
            </button>

            <button
              ref={burgerRef}
              type="button"
              onClick={() => setIsDrawerOpen(true)}
              aria-expanded={isDrawerOpen}
              aria-label={isFr ? 'Ouvrir le menu de navigation' : 'Open navigation menu'}
              className="p-3 rounded-lg bg-white/[0.03] border border-white/[0.1] text-[#ECE4D3] hover:text-[#f0c869] hover:border-[#CAA243]/40 transition-all cursor-pointer min-h-[48px] min-w-[48px] flex items-center justify-center"
            >
              <Menu className="w-5 h-5 text-[#ECE4D3]" />
            </button>
          </div>
        </div>
      </header>

      {/* Right Side Flyout Drawer & Backdrop */}
      {isDrawerOpen && (
        <>
          {/* Dimmed Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity"
            onClick={closeDrawer}
          />

          {/* Compact Right Side Flyout Drawer */}
          <aside
            role="dialog"
            aria-modal="true"
            aria-label={isFr ? 'Menu de navigation' : 'Navigation menu'}
            className="w-72 sm:w-80 fixed top-0 bottom-0 right-0 z-50 bg-[#0B0A08]/98 border-l border-white/[0.08] backdrop-blur-2xl p-6 shadow-2xl flex flex-col justify-between transition-transform duration-300 overflow-y-auto"
          >
            {/* Drawer Top Header */}
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-6">
                <Link
                  href="/"
                  onClick={closeDrawer}
                  className="flex items-center gap-2 min-h-[48px]"
                >
                  <Image
                    src="/logo.png"
                    alt="OVIZai"
                    width={70}
                    height={28}
                    className="h-7 w-auto object-contain"
                  />
                </Link>

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