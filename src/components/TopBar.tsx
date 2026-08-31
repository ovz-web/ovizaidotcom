'use client';

import React, { useState } from 'react';
import Link from 'next/link';
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

  const NAV_LINKS = [
    { href: '/', label: isFr ? '00. Accueil' : '00. Home' },
    { href: '/services', label: isFr ? '01. Prestations & Services IA' : '01. AI Services' },
    { href: '/formation', label: isFr ? '02. Formation Vidéo IA' : '02. AI Masterclass' },
    { href: '/contact', label: isFr ? '03. Devis & Contact' : '03. Contact & Quote' },
  ];

  const handleCurrencyChange = (curr: Currency) => {
    if (onSelectCurrency) {
      onSelectCurrency(curr);
    }
  };

  return (
    <>
      {/* 100% Fixed TopBar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#080808]/95 backdrop-blur-md border-b border-white/[0.08] h-14 px-4 flex items-center justify-between">
        <div className="max-w-6xl mx-auto w-full flex items-center justify-between gap-3">
          {/* Top-Left: OVIZai Logo Image Link */}
          <Link href="/" className="flex items-center gap-2 group hover:opacity-90 transition-opacity">
            <img
              src="/logo.png"
              alt="OVIZai"
              className="h-7 sm:h-8 w-auto object-contain mix-blend-screen drop-shadow-[0_0_10px_rgba(202,162,67,0.2)]"
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
                  <strong className="text-[#CAA243]">FORMATION VIDÉO IA</strong> — ACCÉDER +
                </>
              ) : (
                <>
                  <strong className="text-[#CAA243]">AI VIDEO MASTERCLASS</strong> — ACCESS +
                </>
              )}
            </span>
          </Link>

          {/* Top-Right Controls: Language & Compact Burger Trigger */}
          <div className="flex items-center gap-2">
            <button
              onClick={onToggleLang}
              type="button"
              className="hidden sm:flex items-center gap-1 bg-white/[0.02] border border-white/[0.12] text-[#ECE4D3] hover:border-[#CAA243]/50 hover:text-[#f0c869] rounded-full px-2.5 py-1 text-[11px] font-mono transition-all cursor-pointer"
            >
              <Globe className="w-3 h-3 text-[#CAA243]" />
              <span className="mono font-semibold">{lang === 'en' ? 'FR' : 'EN'}</span>
            </button>

            <button
              type="button"
              onClick={() => setIsDrawerOpen(true)}
              className="p-1.5 rounded-lg bg-white/[0.03] border border-white/[0.1] text-[#ECE4D3] hover:text-[#f0c869] hover:border-[#CAA243]/40 transition-all cursor-pointer"
              aria-label="Ouvrir le menu"
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
            className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 transition-opacity"
            onClick={() => setIsDrawerOpen(false)}
          />

          {/* Compact Right Side Flyout Drawer */}
          <aside className="w-72 sm:w-80 fixed top-0 bottom-0 right-0 z-50 bg-[#0B0A08]/98 border-l border-white/[0.08] backdrop-blur-2xl p-6 shadow-2xl flex flex-col justify-between transition-transform duration-300">
            {/* Drawer Top Header */}
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-6">
                <Link
                  href="/"
                  onClick={() => setIsDrawerOpen(false)}
                  className="flex items-center gap-2"
                >
                  <img src="/logo.png" alt="OVIZai" className="h-6 w-auto object-contain mix-blend-screen" />
                </Link>

                <button
                  type="button"
                  onClick={() => setIsDrawerOpen(false)}
                  className="p-1.5 rounded-lg bg-white/[0.04] border border-white/[0.1] text-[#ECE4D3] hover:text-[#CAA243] transition-colors cursor-pointer"
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
                    onClick={() => setIsDrawerOpen(false)}
                    className="group flex items-center justify-between p-3 rounded-lg border border-white/[0.06] bg-black/40 hover:border-[#CAA243]/40 hover:bg-[#CAA243]/10 transition-all cursor-pointer"
                  >
                    <span className="mono text-xs font-bold text-[#ECE4D3] group-hover:text-[#f0c869]">
                      {link.label}
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#CAA243]" />
                  </Link>
                ))}
              </nav>

              {/* Segmented Selectors: Currency & Language */}
              <div className="space-y-3 pt-4 border-t border-white/[0.08]">
                {/* Multi-Currency Segmented Switcher */}
                <div>
                  <label className="mono text-[10px] uppercase font-bold text-[#8C8375] block mb-1.5">
                    {isFr ? 'Devise de facturation :' : 'Billing Currency:'}
                  </label>
                  <div className="grid grid-cols-3 gap-1 bg-black/60 p-1 rounded-lg border border-white/[0.08]">
                    {(['USD', 'EUR', 'CAD'] as Currency[]).map(curr => (
                      <button
                        key={curr}
                        type="button"
                        onClick={() => handleCurrencyChange(curr)}
                        className={`py-1 text-center mono text-[11px] font-bold rounded transition-all cursor-pointer ${
                          currency === curr
                            ? 'bg-[#CAA243] text-black shadow'
                            : 'text-[#8C8375] hover:text-[#ECE4D3]'
                        }`}
                      >
                        {curr}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Language Switcher */}
                <div>
                  <label className="mono text-[10px] uppercase font-bold text-[#8C8375] block mb-1.5">
                    {isFr ? 'Langue d’affichage :' : 'Display Language:'}
                  </label>
                  <button
                    onClick={onToggleLang}
                    type="button"
                    className="w-full flex items-center justify-between p-2 rounded-lg bg-black/60 border border-white/[0.08] text-xs text-[#ECE4D3] hover:border-[#CAA243]/40 mono cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <Globe className="w-3.5 h-3.5 text-[#CAA243]" />
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
                  className="flex items-center gap-1.5 text-[#8C8375] hover:text-[#f0c869] transition-colors"
                >
                  <Instagram className="w-4 h-4 text-[#CAA243]" />
                  <span>Instagram</span>
                </a>
                <a
                  href="https://youtube.com/@ovizaidotcom"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-[#8C8375] hover:text-[#f0c869] transition-colors"
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
