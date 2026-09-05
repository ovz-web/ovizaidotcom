'use client';

import React from 'react';
import Link from 'next/link';
import { Film, GraduationCap, Cpu, Tag, Mail } from 'lucide-react';
import { Language } from '@/types';

interface CommandMenuProps {
  lang: Language;
  onShowToast: (msg: string) => void;
}

/**
 * Navigation card — presents 5 key destinations clearly.
 */
export default function CommandMenu({ lang }: CommandMenuProps) {
  const isFr = lang === 'fr';

  const NAV_ITEMS = [
    {
      id: 'nav-services',
      number: '01',
      title: isFr ? '01. Nos Services' : '01. Our Services',
      sub: isFr ? 'Films, pubs, clips & direction artistique' : 'Films, ads, music videos & art direction',
      href: '/services',
      action: isFr ? 'Explorer' : 'Explore',
      icon: Film,
      isExternalRoute: true
    },
    {
      id: 'nav-formation',
      number: '02',
      title: isFr ? '02. Formation Vidéo IA' : '02. AI Video Course',
      sub: isFr ? '5 modules pratiques & méthode 4K' : '5 practical modules & 4K workflow',
      href: '/formation',
      action: isFr ? 'Accéder' : 'Access',
      icon: GraduationCap,
      isExternalRoute: true
    },
    {
      id: 'nav-pipeline',
      number: '03',
      title: isFr ? '03. Notre Méthode de Production' : '03. Our Production Method',
      sub: isFr ? 'Création générative 4K & étalonnage pro' : '4K generative workflow & pro grading',
      href: '/stack',
      action: isFr ? 'Découvrir' : 'Discover',
      icon: Cpu,
      isExternalRoute: true
    },
    {
      id: 'nav-tarifs',
      number: '04',
      title: isFr ? '04. Tarifs & Formules' : '04. Pricing & Packages',
      sub: isFr ? 'Formules Sprint 48h & projets sur-mesure' : '48h Sprint packages & custom projects',
      href: '/tarifs',
      action: isFr ? 'Voir Tarifs' : 'View Pricing',
      icon: Tag,
      isExternalRoute: true
    },
    {
      id: 'nav-contact',
      number: '05',
      title: isFr ? '05. Devis & Contact' : '05. Contact & Quote',
      sub: isFr ? 'Formulaire de demande de devis & contact sous 24h' : 'Quote request & 24h direct response form',
      href: '/contact',
      action: isFr ? 'Contacter' : 'Contact',
      icon: Mail,
      isExternalRoute: true
    }
  ];

  return (
    <div className="ovizai-card max-w-xl mx-auto mb-3">
      {/* Navigation List */}
      <div className="flex flex-col divide-y divide-white/[0.06]">
        {NAV_ITEMS.map(item => {
          const IconComp = item.icon;
          return (
            <Link
              key={item.id}
              href={item.href}
              className="group w-full flex items-center justify-between gap-3 px-4 sm:px-5 py-2.5 sm:py-3 bg-none hover:bg-white/[0.025] text-left transition-colors cursor-pointer"
            >
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
                  →
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
