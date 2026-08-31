'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Film, GraduationCap, Cpu, Mail, X } from 'lucide-react';
import AIPipeline from '@/components/AIPipeline';
import { Language } from '@/types';

interface CommandMenuProps {
  lang: Language;
  onShowToast: (msg: string) => void;
}

export default function CommandMenu({ lang, onShowToast }: CommandMenuProps) {
  const isFr = lang === 'fr';
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPipelineModalOpen, setIsPipelineModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMac, setIsMac] = useState(true);

  useEffect(() => {
    setIsMac(typeof window !== 'undefined' && navigator.platform.toUpperCase().indexOf('MAC') >= 0);
  }, []);

  const modKey = isMac ? '⌘' : 'Ctrl+';

  const NAV_ITEMS = [
    {
      id: 'nav-services',
      number: '01',
      title: isFr ? '01. Prestations & Services IA' : '01. AI Services & Production',
      sub: isFr ? 'Films, visualisers, pubs & DA générative' : 'Films, visualisers, ads & art direction',
      href: '/services',
      key: 'P',
      action: isFr ? 'Explorer' : 'Explore',
      icon: Film,
      isExternalRoute: true
    },
    {
      id: 'nav-formation',
      number: '02',
      title: isFr ? '02. Masterclass & Formation Vidéo IA' : '02. AI Video Masterclass',
      sub: isFr ? '5 modules pratiques, prompts secrets & accès 4K' : '5 practical modules, secret prompts & 4K access',
      href: '/formation',
      key: 'D',
      action: isFr ? 'Accéder' : 'Access',
      icon: GraduationCap,
      isExternalRoute: true
    },
    {
      id: 'nav-pipeline',
      number: '03',
      title: isFr ? '03. Arsenal & Pipeline Technique' : '03. AI Tech Stack & Pipeline',
      sub: isFr ? 'Midjourney v6.1, Flux.1, Kling, Runway Gen-3' : 'Midjourney v6.1, Flux.1, Kling, Runway Gen-3',
      href: '#',
      key: 'R',
      action: isFr ? 'Voir Stack' : 'View Stack',
      icon: Cpu,
      isExternalRoute: false,
      isPipelineModal: true
    },
    {
      id: 'nav-contact',
      number: '04',
      title: isFr ? '04. Devis & Contact' : '04. Quote & Contact',
      sub: isFr ? 'Brief intelligent & réponse garantie sous 24/48h' : 'Smart brief form & guaranteed 24/48h SLA',
      href: '/contact',
      key: 'C',
      action: isFr ? 'Contacter' : 'Contact',
      icon: Mail,
      isExternalRoute: true
    }
  ];

  // Global Keyboard listener ⌘K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const targetTag = (e.target as HTMLElement)?.tagName?.toLowerCase();
      if (targetTag === 'input' || targetTag === 'textarea') {
        if (e.key === 'Escape') {
          setIsModalOpen(false);
          setIsPipelineModalOpen(false);
        }
        return;
      }

      const mod = isMac ? e.metaKey : e.ctrlKey;
      if (mod && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsModalOpen(prev => !prev);
      } else if (e.key === 'Escape') {
        setIsModalOpen(false);
        setIsPipelineModalOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMac]);

  const filteredNav = NAV_ITEMS.filter(item => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return item.title.toLowerCase().includes(q) || item.sub.toLowerCase().includes(q);
  });

  return (
    <>
      {/* Central Bento / Command Card Hub */}
      <div className="ovizai-card max-w-xl mx-auto mb-8">
        {/* Search Trigger */}
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="w-full flex items-center justify-between bg-none border-b border-white/[0.08] text-[#8c8375] hover:bg-white/[0.02] hover:text-[#ECE4D3] px-4 sm:px-5 py-3.5 text-xs sm:text-sm font-sans cursor-pointer transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <Search className="w-4 h-4 text-[#8c8375]" />
            <span>{isFr ? 'Rechercher une commande, un service... (⌘K)' : 'Search command or service... (⌘K)'}</span>
          </div>
          <kbd className="hidden sm:inline-block">{modKey}K</kbd>
        </button>

        {/* Command Navigation List */}
        <div className="flex flex-col divide-y divide-white/[0.06]">
          {NAV_ITEMS.map(item => {
            const IconComp = item.icon;
            const contentNode = (
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-3 min-w-0">
                  <IconComp className="w-4 h-4 text-[#CAA243] group-hover:text-[#f0c869] flex-shrink-0 transition-colors" />
                  <div className="flex flex-col min-w-0">
                    <span className="mono text-xs sm:text-[13px] font-semibold text-[#ECE4D3] group-hover:text-[#f0c869] transition-colors truncate">
                      {item.title}
                    </span>
                    <span className="text-[11px] sm:text-xs text-[#8c8375] mt-0.5 truncate">
                      {item.sub}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 flex-shrink-0">
                  <kbd className="mono text-[10px] text-[#8c8375]">
                    {modKey}{item.key}
                  </kbd>
                  <span className="mono text-[10.5px] text-[#CAA243] group-hover:text-[#f0c869] hidden sm:inline transition-colors font-medium">
                    [{item.action}]
                  </span>
                </div>
              </div>
            );

            if (item.isPipelineModal) {
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setIsPipelineModalOpen(true)}
                  className="group w-full flex items-center justify-between gap-3 px-4 sm:px-5 py-3.5 bg-none hover:bg-white/[0.025] text-left transition-colors cursor-pointer"
                >
                  {contentNode}
                </button>
              );
            }

            if (item.isExternalRoute) {
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className="group w-full flex items-center justify-between gap-3 px-4 sm:px-5 py-3.5 bg-none hover:bg-white/[0.025] text-left transition-colors cursor-pointer"
                >
                  {contentNode}
                </Link>
              );
            }

            return (
              <a
                key={item.id}
                href={item.href}
                className="group w-full flex items-center justify-between gap-3 px-4 sm:px-5 py-3.5 bg-none hover:bg-white/[0.025] text-left transition-colors cursor-pointer"
              >
                {contentNode}
              </a>
            );
          })}
        </div>
      </div>

      {/* 1. Modal Search Palette (⌘K) */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex justify-center items-start pt-20 sm:pt-28 px-4"
          onClick={e => {
            if (e.target === e.currentTarget) setIsModalOpen(false);
          }}
        >
          <div className="w-full max-w-xl bg-[#141210] border border-white/[0.12] rounded-xl p-3 shadow-2xl">
            <div className="flex items-center gap-3 border-b border-white/[0.08] pb-3 px-2">
              <Search className="w-4 h-4 text-[#8c8375] flex-shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder={isFr ? 'Rechercher...' : 'Search...'}
                autoFocus
                className="flex-1 bg-transparent border-none text-[#ECE4D3] mono text-xs sm:text-sm focus:outline-none placeholder:text-[#8c8375]"
              />
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-[#8c8375] hover:text-[#ECE4D3] p-1 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="py-2 max-h-72 overflow-y-auto space-y-1">
              {filteredNav.map(item => {
                if (item.isPipelineModal) {
                  return (
                    <button
                      key={`modal-${item.id}`}
                      type="button"
                      onClick={() => {
                        setIsModalOpen(false);
                        setIsPipelineModalOpen(true);
                      }}
                      className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-[#CAA243]/10 text-[#ECE4D3] hover:text-[#f0c869] transition-colors text-left mono text-xs cursor-pointer block"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#CAA243] inline-block" />
                        <span>{item.title}</span>
                      </div>
                      <span className="text-[#8c8375] text-[10.5px]">[{item.action}]</span>
                    </button>
                  );
                }

                return (
                  <Link
                    key={`modal-${item.id}`}
                    href={item.href}
                    onClick={() => setIsModalOpen(false)}
                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-[#CAA243]/10 text-[#ECE4D3] hover:text-[#f0c869] transition-colors text-left mono text-xs cursor-pointer block"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#CAA243] inline-block" />
                      <span>{item.title}</span>
                    </div>
                    <span className="text-[#8c8375] text-[10.5px]">[{item.action}]</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* 2. Dark Tech Stack Pipeline Modal */}
      {isPipelineModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex justify-center items-center p-4 overflow-y-auto"
          onClick={e => {
            if (e.target === e.currentTarget) setIsPipelineModalOpen(false);
          }}
        >
          <div className="w-full max-w-2xl bg-[#0B0A08]/95 border border-white/[0.12] rounded-xl p-5 shadow-2xl relative my-8">
            <button
              onClick={() => setIsPipelineModalOpen(false)}
              className="absolute top-4 right-4 text-[#8c8375] hover:text-[#ECE4D3] p-1.5 rounded-lg bg-black/40 border border-white/[0.08] cursor-pointer"
            >
              <X className="w-4 h-4 text-[#CAA243]" />
            </button>

            <AIPipeline lang={lang} />
          </div>
        </div>
      )}
    </>
  );
}
