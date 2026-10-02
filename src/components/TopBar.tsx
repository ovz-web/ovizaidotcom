'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { Language } from '@/types';
import { hasPublishedProjects } from '@/lib/portfolio';

interface TopBarProps {
  lang: Language;
  onToggleLang: () => void;
  currency?: any;
  onSelectCurrency?: (curr: any) => void;
}

export default function TopBar({
  lang,
  onToggleLang,
}: TopBarProps) {
  const isFr = lang === 'fr';
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);
  const hasWork = hasPublishedProjects();

  // Dynamic header height measurement for layout padding
  useEffect(() => {
    const updateHeaderHeight = () => {
      if (headerRef.current) {
        const height = Math.ceil(headerRef.current.offsetHeight);
        if (height > 0) {
          document.documentElement.style.setProperty('--topbar-height', `${height}px`);
        }
      }
    };

    updateHeaderHeight();
    window.addEventListener('resize', updateHeaderHeight);
    return () => window.removeEventListener('resize', updateHeaderHeight);
  }, []);

  // Lock body scroll on mobile drawer open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Close menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    ...(hasWork ? [{ href: '/services#portfolio', label: isFr ? 'Work' : 'Work' }] : []),
    { href: '/services', label: isFr ? 'Services' : 'Services' },
    { href: '/tarifs', label: isFr ? 'Tarifs' : 'Pricing' },
    { href: '/contact', label: isFr ? 'Contact' : 'Contact' },
  ];

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50 bg-[#080808]/90 backdrop-blur-md border-b border-white/[0.08] transition-all"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-4">
        {/* Logo OVIZai */}
        <Link
          href="/"
          className="group flex items-center text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-lg py-1 px-1 -ml-1"
          aria-label={isFr ? 'OVIZai — Accueil' : 'OVIZai — Home'}
        >
          <Image
            src="/logo.png"
            alt={isFr ? 'OVIZai — Studio de création publicitaire' : 'OVIZai — Creative Ad Studio'}
            width={120}
            height={63}
            className="h-6 sm:h-7 md:h-8 w-auto object-contain mix-blend-screen"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium" aria-label="Navigation principale">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors py-1 ${
                  isActive
                    ? 'text-gold font-semibold'
                    : 'text-muted hover:text-fg'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Actions: Lang Switcher & Primary CTA */}
        <div className="hidden md:flex items-center gap-4">
          <button
            type="button"
            onClick={onToggleLang}
            className="text-xs mono uppercase tracking-wider text-muted hover:text-gold transition-colors py-1 px-2 rounded border border-white/[0.08] hover:border-gold/40 cursor-pointer"
            aria-label={isFr ? 'Basculer en Anglais' : 'Switch to French'}
          >
            {isFr ? 'EN' : 'FR'}
          </button>

          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 bg-gold hover:bg-gold-bright text-black font-semibold text-xs mono uppercase tracking-wider px-4 py-2.5 rounded-full transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-md shadow-gold/10"
          >
            <span>{isFr ? 'Démarrer un projet' : 'Start a project'}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile Right Bar: Lang + Hamburger Toggle */}
        <div className="flex md:hidden items-center gap-3">
          <button
            type="button"
            onClick={onToggleLang}
            className="text-xs mono uppercase tracking-wider text-muted hover:text-fg py-1 px-2 rounded border border-white/[0.08]"
            aria-label={isFr ? 'Basculer en Anglais' : 'Switch to French'}
          >
            {isFr ? 'EN' : 'FR'}
          </button>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-fg hover:text-gold rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            aria-label={isMobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Accessible Mobile Drawer */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-x-0 top-14 sm:top-16 bg-[#080808]/98 border-b border-white/[0.08] px-6 py-8 flex flex-col gap-6 backdrop-blur-xl animate-fadeIn"
          style={{ minHeight: 'calc(100dvh - 56px)' }}
        >
          <nav className="flex flex-col gap-5 text-lg font-display tracking-wide" aria-label="Navigation mobile">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-fg hover:text-gold transition-colors py-2 border-b border-white/[0.04]"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="pt-4 flex flex-col gap-3">
            <Link
              href="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold-bright text-black font-bold text-sm mono uppercase tracking-wider py-3.5 rounded-xl transition-all"
            >
              <span>{isFr ? 'Démarrer un projet' : 'Start a project'}</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <p className="text-xs text-muted text-center mono pt-2">
              {isFr ? 'Studio Publicitaire · Worldwide' : 'Creative Ad Studio · Worldwide'}
            </p>
          </div>
        </div>
      )}
    </header>
  );
}