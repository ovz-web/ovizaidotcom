'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Film, GraduationCap, Cpu, Mail, X } from 'lucide-react';
import AIPipeline from '@/components/AIPipeline';
import { Language } from '@/types';

interface CommandMenuProps {
  lang: Language;
  onShowToast: (msg: string) => void;
}

/**
 * Navigation card — presents 4 key destinations clearly.
 * The ⌘K search palette has been removed; this is a simple, accessible nav list.
 */
export default function CommandMenu({ lang, onShowToast }: CommandMenuProps) {
  const isFr = lang === 'fr';
  const [isPipelineModalOpen, setIsPipelineModalOpen] = useState(false);
  const pipelineTriggerRef = useRef<HTMLButtonElement>(null);

  const NAV_ITEMS = [
    {
      id: 'nav-services',
      number: '01',
      title: isFr ? '01. Prestations & Services IA' : '01. AI Services & Production',
      sub: isFr ? 'Films, visualisers, pubs & DA générative' : 'Films, visualisers, ads & art direction',
      href: '/services',
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
      action: isFr ? 'Contacter' : 'Contact',
      icon: Mail,
      isExternalRoute: true
    }
  ];

  // Close pipeline modal on Escape
  useEffect(() => {
    if (!isPipelineModalOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsPipelineModalOpen(false);
        pipelineTriggerRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPipelineModalOpen]);

  const closePipelineModal = () => {
    setIsPipelineModalOpen(false);
    pipelineTriggerRef.current?.focus();
  };

  return (
    <>
      {/* Navigation Card */}
      <div className="ovizai-card max-w-xl mx-auto mb-8">
        {/* Navigation List */}
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

                <span className="mono text-[10.5px] text-[#CAA243] group-hover:text-[#f0c869] hidden sm:inline transition-colors font-medium flex-shrink-0">
                  [{item.action}]
                </span>
              </div>
            );

            if (item.isPipelineModal) {
              return (
                <button
                  key={item.id}
                  ref={pipelineTriggerRef}
                  type="button"
                  aria-expanded={isPipelineModalOpen}
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

      {/* AI Pipeline Tech Stack Modal */}
      {isPipelineModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={isFr ? 'Stack technique' : 'Technical Stack'}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex justify-center items-center p-4 overflow-y-auto"
          onClick={e => {
            if (e.target === e.currentTarget) closePipelineModal();
          }}
        >
          <div className="w-full max-w-2xl bg-[#0B0A08]/95 border border-white/[0.12] rounded-xl p-5 shadow-2xl relative my-8">
            <button
              onClick={closePipelineModal}
              aria-label={isFr ? 'Fermer la stack technique' : 'Close technical stack'}
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
