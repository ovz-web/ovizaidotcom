'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, ArrowRight, Plus, Minus } from 'lucide-react';
import { Language } from '@/types';
import { hasPublishedProjects } from '@/lib/portfolio';

interface CentralIndexProps {
  lang: Language;
}

export default function CentralIndex({ lang }: CentralIndexProps) {
  const isFr = lang === 'fr';
  const hasWork = hasPublishedProjects();
  // Single active accordion panel (null = all closed)
  const [activePanel, setActivePanel] = useState<string | null>(null);

  const togglePanel = (panelId: string) => {
    setActivePanel((current) => (current === panelId ? null : panelId));
  };

  const handleKeyDown = (e: React.KeyboardEvent, panelId: string) => {
    if (e.key === 'Escape' && activePanel === panelId) {
      setActivePanel(null);
    }
  };

  // Dynamic numbering based on portfolio publication state
  const items = [
    ...(hasWork
      ? [
          {
            id: 'work',
            title: isFr ? 'WORK' : 'WORK',
            tagline: isFr ? 'Voir les films' : 'Watch our films',
            isWork: true,
          },
        ]
      : []),
    {
      id: 'studio',
      title: 'STUDIO',
      tagline: isFr ? 'Créer avec OVIZai' : 'Create with OVIZai',
    },
    {
      id: 'formation',
      title: 'FORMATION',
      tagline: isFr ? 'Apprendre la méthode OVIZai' : 'Learn the OVIZai method',
    },
    {
      id: 'contact',
      title: 'CONTACT',
      tagline: isFr ? 'Démarrer une conversation' : 'Start a conversation',
    },
  ];

  return (
    <section className="w-full px-4 sm:px-6 pt-4 pb-20 sm:pb-28">
      <div className="max-w-[760px] mx-auto">
        {/* Index Container — Minimaliste, grand espace, inspiration Ohneis */}
        <div className="bg-[#0b0b0a] border border-white/[0.08] rounded-2xl overflow-hidden divide-y divide-white/[0.06] shadow-2xl">
          {items.map((item, index) => {
            const num = String(index + 1).padStart(2, '0');
            const isOpen = activePanel === item.id;
            const contentId = `index-content-${item.id}`;
            const headerId = `index-header-${item.id}`;

            return (
              <div
                key={item.id}
                className="transition-colors hover:bg-white/[0.015]"
                onKeyDown={(e) => handleKeyDown(e, item.id)}
              >
                {/* Accordion Trigger Header */}
                <button
                  type="button"
                  id={headerId}
                  aria-expanded={isOpen}
                  aria-controls={contentId}
                  onClick={() => togglePanel(item.id)}
                  className="w-full py-5 sm:py-6 px-6 sm:px-8 flex items-center justify-between gap-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 cursor-pointer group"
                >
                  <div className="flex items-baseline gap-4 sm:gap-6 min-w-0">
                    <span className="mono text-xs sm:text-sm text-gold/80 font-bold tracking-widest shrink-0">
                      {num}
                    </span>
                    <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 min-w-0">
                      <span className="font-display font-extrabold text-lg sm:text-2xl text-fg tracking-wide uppercase group-hover:text-gold transition-colors">
                        {item.title}
                      </span>
                      <span className="text-xs sm:text-sm text-muted/80 font-sans truncate">
                        {item.tagline}
                      </span>
                    </div>
                  </div>

                  <span
                    className="p-1 rounded-md text-muted/60 group-hover:text-gold transition-colors shrink-0"
                    aria-hidden="true"
                  >
                    {isOpen ? <Minus className="w-4 h-4 text-gold" /> : <Plus className="w-4 h-4" />}
                  </span>
                </button>

                {/* Progressive Disclosure Content Panel */}
                {isOpen && (
                  <div
                    id={contentId}
                    role="region"
                    aria-labelledby={headerId}
                    className="px-6 sm:px-8 pb-8 pt-2 animate-fadeIn"
                  >
                    {/* 01 // STUDIO CONTENT */}
                    {item.id === 'studio' && (
                      <div className="space-y-6 pt-3 border-t border-white/[0.04]">
                        {/* 4 Expertises fondamentales (Style éditorial direct) */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 py-1">
                          <Link
                            href="/services"
                            className="group/item flex items-center gap-2.5 p-2 rounded-lg hover:bg-white/[0.02] transition-colors"
                          >
                            <span className="mono text-xs text-gold/80 font-bold">01</span>
                            <span className="mono text-xs uppercase tracking-wider text-fg/90 group-hover/item:text-gold transition-colors">
                              {isFr ? 'FILMS & PUBLICITÉ' : 'FILMS & ADVERTISING'}
                            </span>
                          </Link>
                          <Link
                            href="/services"
                            className="group/item flex items-center gap-2.5 p-2 rounded-lg hover:bg-white/[0.02] transition-colors"
                          >
                            <span className="mono text-xs text-gold/80 font-bold">02</span>
                            <span className="mono text-xs uppercase tracking-wider text-fg/90 group-hover/item:text-gold transition-colors">
                              {isFr ? 'PRODUIT & MARQUE' : 'PRODUCT & BRAND'}
                            </span>
                          </Link>
                          <Link
                            href="/services"
                            className="group/item flex items-center gap-2.5 p-2 rounded-lg hover:bg-white/[0.02] transition-colors"
                          >
                            <span className="mono text-xs text-gold/80 font-bold">03</span>
                            <span className="mono text-xs uppercase tracking-wider text-fg/90 group-hover/item:text-gold transition-colors">
                              {isFr ? 'MUSIQUE & CULTURE' : 'MUSIC & CULTURE'}
                            </span>
                          </Link>
                          <Link
                            href="/services"
                            className="group/item flex items-center gap-2.5 p-2 rounded-lg hover:bg-white/[0.02] transition-colors"
                          >
                            <span className="mono text-xs text-gold/80 font-bold">04</span>
                            <span className="mono text-xs uppercase tracking-wider text-fg/90 group-hover/item:text-gold transition-colors">
                              {isFr ? 'CREATIVE PRODUCTION' : 'CREATIVE PRODUCTION'}
                            </span>
                          </Link>
                        </div>

                        {/* Deux options : Offre de lancement (Pilote) & Projet sur mesure */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                          {/* Offre de lancement */}
                          <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.08] hover:border-gold/40 transition-colors flex flex-col justify-between">
                            <div>
                              <div className="flex items-baseline justify-between mb-2">
                                <span className="mono text-xs font-bold uppercase tracking-wider text-gold">
                                  {isFr ? 'OFFRE DE LANCEMENT' : 'LAUNCH OFFER'}
                                </span>
                                <span className="font-display font-bold text-sm text-fg">530 USD</span>
                              </div>
                              <p className="text-xs text-muted leading-relaxed mb-4">
                                {isFr
                                  ? 'Un projet publicitaire de 10–15 secondes pour découvrir le studio'
                                  : 'A 10–15 second commercial ad project to experience the studio'}
                              </p>
                            </div>
                            <Link
                              href="/tarifs"
                              className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-gold hover:text-gold-bright transition-colors"
                            >
                              <span>{isFr ? 'VOIR L’OFFRE →' : 'VIEW OFFER →'}</span>
                            </Link>
                          </div>

                          {/* Projet sur mesure */}
                          <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.08] hover:border-gold/40 transition-colors flex flex-col justify-between">
                            <div>
                              <div className="flex items-baseline justify-between mb-2">
                                <span className="mono text-xs font-bold uppercase tracking-wider text-fg">
                                  {isFr ? 'PROJET SUR MESURE' : 'CUSTOM PROJECT'}
                                </span>
                                <span className="mono text-xs text-muted">{isFr ? 'Sur devis' : 'Quote'}</span>
                              </div>
                              <p className="text-xs text-muted leading-relaxed mb-4">
                                {isFr
                                  ? 'Films, campagnes et productions adaptés au périmètre de votre projet'
                                  : 'Films, campaigns and productions tailored to your project scope'}
                              </p>
                            </div>
                            <Link
                              href="/contact?offer=custom"
                              className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-fg hover:text-gold transition-colors"
                            >
                              <span>{isFr ? 'PARLER DU PROJET →' : 'DISCUSS PROJECT →'}</span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* 02 // FORMATION CONTENT */}
                    {item.id === 'formation' && (
                      <div className="space-y-4 pt-3 border-t border-white/[0.04]">
                        <div>
                          <span className="mono text-xs text-gold font-bold uppercase tracking-wider block mb-1">
                            OVIZai METHOD
                          </span>
                          <p className="text-sm sm:text-base text-fg/90 leading-relaxed">
                            {isFr
                              ? 'La méthode derrière nos productions'
                              : 'The methodology behind our productions'}
                          </p>
                        </div>

                        <div className="pt-1">
                          <Link
                            href="/formation"
                            className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-gold hover:text-gold-bright transition-colors"
                          >
                            <span>{isFr ? 'Découvrir la formation →' : 'Discover the training →'}</span>
                          </Link>
                        </div>
                      </div>
                    )}

                    {/* 03 // CONTACT CONTENT */}
                    {item.id === 'contact' && (
                      <div className="space-y-4 pt-3 border-t border-white/[0.04]">
                        <p className="text-sm sm:text-base text-fg/90 leading-relaxed">
                          {isFr ? 'Vous avez un projet' : 'You have a project'}
                        </p>

                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-1">
                          <Link
                            href="/contact"
                            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-gold hover:bg-gold-bright text-black font-semibold text-xs mono uppercase tracking-wider transition-all"
                          >
                            <span>{isFr ? 'Démarrer une conversation →' : 'Start a conversation →'}</span>
                          </Link>

                          <div className="flex items-center gap-5 text-xs font-mono text-muted pl-1">
                            <a
                              href="https://instagram.com/ovizai.co"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:text-gold transition-colors tracking-wider"
                            >
                              Instagram ↗
                            </a>
                            <a
                              href="mailto:contact@ovizai.com"
                              className="hover:text-gold transition-colors tracking-wider"
                            >
                              contact@ovizai.com
                            </a>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* WORK CONTENT (when published) */}
                    {item.id === 'work' && (
                      <div className="space-y-4 pt-3 border-t border-white/[0.04]">
                        <p className="text-sm sm:text-base text-fg/90">
                          {isFr ? 'Voir les films officiels du studio' : 'Watch official studio films'}
                        </p>
                        <Link
                          href="/services#portfolio"
                          className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-gold hover:text-gold-bright"
                        >
                          <span>{isFr ? 'VOIR LES FILMS →' : 'WATCH THE FILMS →'}</span>
                        </Link>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
