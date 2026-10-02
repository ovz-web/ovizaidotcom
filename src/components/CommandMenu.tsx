'use client';

import React from 'react';
import Link from 'next/link';
import { Language } from '@/types';
import { hasPublishedProjects } from '@/lib/portfolio';

interface CommandMenuProps {
  lang: Language;
}

interface NavEntry {
  id: string;
  num: string;
  title: string;
  desc: string;
  href: string;
}

/**
 * Boîte de navigation principale OVIZai — Élément éditorial fort au centre de la homepage.
 * Design épuré, fond sombre, bordure fine, index numérique discret, flèche à droite,
 * grandes zones cliquables pleine largeur.
 */
export default function CommandMenu({ lang }: CommandMenuProps) {
  const isFr = lang === 'fr';
  const hasWork = hasPublishedProjects();

  const rawEntries: Array<{
    id: string;
    title: { fr: string; en: string };
    desc: { fr: string; en: string };
    href: string;
  }> = [
    ...(hasWork
      ? [
          {
            id: 'nav-work',
            title: { fr: 'WORK', en: 'WORK' },
            desc: { fr: 'Voir les projets', en: 'View projects' },
            href: '/services#portfolio',
          },
        ]
      : []),
    {
      id: 'nav-services',
      title: { fr: 'SERVICES', en: 'SERVICES' },
      desc: { fr: 'Ce que nous créons', en: 'What we create' },
      href: '/services',
    },
    {
      id: 'nav-tarifs',
      title: { fr: 'OFFRE DE LANCEMENT', en: 'LAUNCH OFFER' },
      desc: { fr: '530 USD', en: '530 USD' },
      href: '/tarifs',
    },
    {
      id: 'nav-method',
      title: { fr: 'MÉTHODE', en: 'METHOD' },
      desc: { fr: 'Brief → Direction → Production', en: 'Brief → Direction → Production' },
      href: '#methode',
    },
    {
      id: 'nav-contact',
      title: { fr: 'DÉMARRER UN PROJET', en: 'START A PROJECT' },
      desc: {
        fr: 'Parlez-nous de ce que vous souhaitez promouvoir',
        en: 'Tell us what you want to promote',
      },
      href: '/contact',
    },
  ];

  // Auto-number entries (01, 02, 03, ...)
  const entries: NavEntry[] = rawEntries.map((item, idx) => ({
    id: item.id,
    num: String(idx + 1).padStart(2, '0'),
    title: item.title[lang],
    desc: item.desc[lang],
    href: item.href,
  }));

  return (
    <section
      id="menu-principal"
      className="max-w-3xl mx-auto px-4 sm:px-6 my-8 sm:my-14"
      aria-label={isFr ? 'Navigation principale OVIZai' : 'OVIZai main navigation'}
    >
      <div className="bg-[#0c0b0a] border border-white/[0.08] hover:border-white/[0.14] rounded-2xl sm:rounded-3xl p-1.5 sm:p-2 divide-y divide-white/[0.06] shadow-2xl transition-colors">
        {entries.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className="group w-full flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-4 py-4 sm:py-5 px-4 sm:px-6 hover:bg-white/[0.03] rounded-xl transition-all cursor-pointer text-left"
          >
            {/* Left side: index + title + short description */}
            <div className="flex items-baseline gap-3 sm:gap-4 min-w-0 flex-1">
              <span className="mono text-xs sm:text-sm text-gold/80 font-bold tracking-widest shrink-0 select-none">
                {item.num}
              </span>
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 min-w-0">
                <span className="font-display font-bold text-sm sm:text-base text-fg tracking-wide uppercase group-hover:text-gold transition-colors shrink-0">
                  {item.title}
                </span>
                <span className="text-xs sm:text-sm text-muted/70 font-sans truncate">
                  {item.desc}
                </span>
              </div>
            </div>

            {/* Right side: sleek trailing arrow */}
            <span
              className="mono text-sm sm:text-base text-muted/40 group-hover:text-gold group-hover:translate-x-1 transition-all shrink-0 self-end sm:self-center ml-2"
              aria-hidden="true"
            >
              →
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
