'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Globe, Youtube, Instagram, ArrowUpRight } from 'lucide-react';
import { Language } from '@/types';

interface TopBarProps {
  lang: Language;
  onToggleLang: () => void;
}

export default function TopBar({ lang, onToggleLang }: TopBarProps) {
  const isFr = lang === 'fr';
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const NAV_LINKS = [
    { href: '/', label: isFr ? '00. Accueil' : '00. Home' },
    { href: '/services', label: isFr ? '01. Prestations & Services IA' : '01. AI Services' },
    { href: '/formation', label: isFr ? '02. Masterclass & Formation Vidéo IA' : '02. AI Masterclass' },
    { href: '/contact', label: isFr ? '03. Devis & Contact Studio' : '03. Contact & Quote' },
  ];

  return (
    <>
      {/* 100% Fixed Persistent TopBar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#080808]/90 backdrop-blur-md border-b border-white/[0.08] px-4 py-3 h-14 flex items-center justify-between">
        <div className="max-w-6xl mx-auto w-full flex items-center justify-between gap-3">
          {/* Left: Clickable Brand Logo Link + Announcement */}
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="mono font-bold text-sm sm:text-base tracking-wider text-[#ECE4D3] hover:text-[#f0c869] transition-colors flex items-center gap-1.5"
            >
              <span className="w-2 h-2 rounded-full bg-[#CAA243] inline-block" />
              <span>OVIZai</span>
            </Link>

            <Link
              href="/formation"
              className="hidden md:flex items-center gap-2 group hover:opacity-90 transition-opacity border-l border-white/[0.1] pl-4"
            >
              <span className="mono text-[11px] tracking-wider uppercase text-[#ECE4D3] font-medium group-hover:text-[#f0c869]">
                {isFr ? (
                  <>
                    <strong className="text-[#CAA243]">FORMATION VIDÉO IA</strong> — EN SAVOIR PLUS +
                  </>
                ) : (
                  <>
                    <strong className="text-[#CAA243]">AI MASTERCLASS</strong> — EXPLORE +
                  </>
                )}
              </span>
            </Link>
          </div>

          {/* Right: Language Switcher + Burger Menu Trigger */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={onToggleLang}
              type="button"
              className="flex items-center gap-1 bg-white/[0.02] border border-white/[0.12] text-[#ECE4D3] hover:border-[#CAA243]/50 hover:text-[#f0c869] rounded-full px-2.5 py-1 text-[11px] font-mono font-medium transition-all cursor-pointer"
              aria-label="Changer de langue"
            >
              <Globe className="w-3 h-3 text-[#CAA243]" />
              <span className="mono font-semibold">{lang === 'en' ? 'FR' : 'EN'}</span>
            </button>

            {/* Burger Menu Button */}
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

      {/* Fullscreen Mobile/Desktop Navigation Drawer */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 bg-[#080808]/95 backdrop-blur-xl p-6 flex flex-col justify-between overflow-y-auto animate-fade-in">
          {/* Drawer Top Header */}
          <div className="flex items-center justify-between pb-6 border-b border-white/[0.08]">
            <Link
              href="/"
              onClick={() => setIsDrawerOpen(false)}
              className="mono font-bold text-lg text-[#ECE4D3] flex items-center gap-2"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#CAA243]" />
              <span>OVIZai Studio</span>
            </Link>

            <button
              type="button"
              onClick={() => setIsDrawerOpen(false)}
              className="p-2 rounded-lg bg-white/[0.04] border border-white/[0.1] text-[#ECE4D3] hover:text-[#CAA243] transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Drawer Navigation Links */}
          <div className="py-8 flex flex-col space-y-4 max-w-md mx-auto w-full">
            {NAV_LINKS.map(link => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsDrawerOpen(false)}
                className="group flex items-center justify-between p-4 rounded-xl border border-white/[0.08] bg-[#141210] hover:border-[#CAA243]/50 hover:bg-[#CAA243]/10 transition-all cursor-pointer"
              >
                <span className="mono text-sm sm:text-base font-bold text-[#ECE4D3] group-hover:text-[#f0c869]">
                  {link.label}
                </span>
                <ArrowUpRight className="w-4 h-4 text-[#CAA243]" />
              </Link>
            ))}
          </div>

          {/* Drawer Footer: Language & Socials */}
          <div className="pt-6 border-t border-white/[0.08] max-w-md mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              onClick={() => {
                onToggleLang();
                setIsDrawerOpen(false);
              }}
              type="button"
              className="mono text-xs text-[#CAA243] hover:underline flex items-center gap-2 cursor-pointer"
            >
              <Globe className="w-4 h-4" />
              <span>{isFr ? 'Langue : Français (Passer en EN)' : 'Language: English (Switch to FR)'}</span>
            </button>

            <div className="flex items-center gap-5 font-mono text-xs">
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
        </div>
      )}
    </>
  );
}
