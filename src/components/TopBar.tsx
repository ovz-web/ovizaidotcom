'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Language } from '@/types';
import { hasPublishedProjects } from '@/lib/portfolio';

interface TopBarProps {
  lang: Language;
  onToggleLang: () => void;
  currency?: any;
  onSelectCurrency?: (curr: any) => void;
}

export default function TopBar({ lang, onToggleLang }: TopBarProps) {
  const isFr = lang === 'fr';
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const mobileDrawerRef = useRef<HTMLDivElement | null>(null);
  const hasWork = hasPublishedProjects();

  // Dynamic header height measurement
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

  // Lock body scroll and handle keyboard accessibility (Escape + Focus Trap)
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      // Focus the close button when opened
      closeButtonRef.current?.focus();

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setIsMobileMenuOpen(false);
          menuButtonRef.current?.focus();
        }

        // Focus trap
        if (e.key === 'Tab' && mobileDrawerRef.current) {
          const focusable = mobileDrawerRef.current.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
          );
          if (focusable.length > 0) {
            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            if (e.shiftKey && document.activeElement === first) {
              e.preventDefault();
              last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
              e.preventDefault();
              first.focus();
            }
          }
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isMobileMenuOpen]);

  // Close menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    ...(hasWork ? [{ href: '/services#portfolio', label: isFr ? 'WORK' : 'WORK' }] : []),
    { href: '/services', label: 'STUDIO' },
    { href: '/formation', label: 'FORMATION' },
    { href: '/contact', label: 'CONTACT' },
  ];

  return (
    <>
      <header
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-40 bg-[#050505]/95 backdrop-blur-sm border-b border-white/[0.06] transition-all"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-4">
          {/* Logo OVIZai officiel (Mix-blend screen vintage emblem) */}
          <Link
            href="/"
            className="group flex items-center text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-lg py-1 px-1 -ml-1"
            aria-label={isFr ? 'OVIZai — Accueil' : 'OVIZai — Home'}
          >
            <Image
              src="/logo.png"
              alt={isFr ? 'OVIZai — Studio créatif' : 'OVIZai — Creative studio'}
              width={120}
              height={63}
              className="h-6 sm:h-7 md:h-8 w-auto object-contain mix-blend-screen"
              priority
            />
          </Link>

          {/* Desktop Navigation — Épurée, sans bouton agressif */}
          <nav
            className="hidden md:flex items-center gap-8 text-xs font-mono tracking-widest uppercase"
            aria-label="Navigation principale"
          >
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`transition-colors py-1 ${
                    isActive
                      ? 'text-gold font-bold border-b border-gold'
                      : 'text-muted/80 hover:text-fg'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Lang Switcher */}
          <div className="hidden md:flex items-center gap-3">
            <button
              type="button"
              onClick={onToggleLang}
              className="text-xs font-mono uppercase tracking-wider text-muted hover:text-gold transition-colors py-1 px-2 rounded border border-white/[0.08] hover:border-gold/40 cursor-pointer"
              aria-label={isFr ? 'Basculer en Anglais' : 'Switch to French'}
            >
              {isFr ? 'EN' : 'FR'}
            </button>
          </div>

          {/* Mobile Right Bar: Lang + Evident Menu Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              type="button"
              onClick={onToggleLang}
              className="text-xs font-mono uppercase tracking-wider text-muted hover:text-fg py-1.5 px-2 rounded border border-white/[0.08]"
              aria-label={isFr ? 'Basculer en Anglais' : 'Switch to French'}
            >
              {isFr ? 'EN' : 'FR'}
            </button>

            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/[0.14] bg-white/[0.04] text-fg hover:text-gold font-mono text-xs uppercase tracking-wider focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              aria-label="Ouvrir le menu de navigation"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation-overlay"
            >
              <span className="text-gold font-bold">☰</span>
              <span>MENU</span>
            </button>
          </div>
        </div>
      </header>

      {/* 
        Mobile Fullscreen Overlay:
        100% OPAQUE (#050505), zero transparency, zero background bleeding through.
        Respects safe-area-inset and locks body scroll.
      */}
      {isMobileMenuOpen && (
        <div
          id="mobile-navigation-overlay"
          ref={mobileDrawerRef}
          role="dialog"
          aria-modal="true"
          aria-label={isFr ? 'Menu de navigation' : 'Navigation menu'}
          className="md:hidden fixed inset-0 z-[100] bg-[#050505] text-fg flex flex-col justify-between p-6 sm:p-8 animate-fadeIn"
          style={{
            backgroundColor: '#050505',
            opacity: 1,
            paddingTop: 'calc(1.5rem + env(safe-area-inset-top, 0px))',
            paddingBottom: 'calc(1.5rem + env(safe-area-inset-bottom, 0px))',
          }}
        >
          {/* Top Bar inside Overlay */}
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center"
              aria-label="OVIZai — Accueil"
            >
              <Image
                src="/logo.png"
                alt="OVIZai"
                width={110}
                height={58}
                className="h-7 w-auto object-contain mix-blend-screen"
                priority
              />
            </Link>

            <button
              ref={closeButtonRef}
              type="button"
              onClick={() => {
                setIsMobileMenuOpen(false);
                menuButtonRef.current?.focus();
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gold/40 bg-gold/10 text-gold font-mono text-xs uppercase tracking-wider hover:bg-gold/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold cursor-pointer"
              aria-label="Fermer le menu de navigation"
            >
              <span>FERMER</span>
              <span className="font-bold text-sm">×</span>
            </button>
          </div>

          {/* Navigation Links — Grande typographie éditoriale */}
          <nav className="flex flex-col gap-6 my-auto py-8" aria-label="Liens principaux">
            {navLinks.map((link, idx) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="group flex items-baseline gap-4 py-2 border-b border-white/[0.06] text-fg hover:text-gold transition-colors"
              >
                <span className="mono text-xs text-gold/70 font-semibold tracking-widest">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <span className="font-display font-extrabold text-2xl sm:text-3xl tracking-tight uppercase group-hover:translate-x-1 transition-transform">
                  {link.label}
                </span>
              </Link>
            ))}
          </nav>

          {/* Footer inside Overlay */}
          <div className="flex items-center justify-between pt-6 border-t border-white/[0.08] text-xs font-mono text-muted">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onToggleLang}
                className="uppercase tracking-wider text-fg hover:text-gold underline underline-offset-4"
              >
                {isFr ? 'ENGLISH' : 'FRANÇAIS'}
              </button>
            </div>

            <a
              href="https://instagram.com/ovizai.co"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted/70 hover:text-gold transition-colors tracking-widest uppercase"
            >
              INSTAGRAM ↗
            </a>
          </div>
        </div>
      )}
    </>
  );
}