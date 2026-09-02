'use client';

import React from 'react';
import Link from 'next/link';
import { Film, GraduationCap, Cpu, Tag } from 'lucide-react';
import { Language } from '@/types';

interface CommandMenuProps {
  lang: Language;
  onShowToast: (msg: string) => void;
}

/**
 * Navigation card — presents 4 key destinations clearly.
 */
export default function CommandMenu({ lang }: CommandMenuProps) {
  const isFr = lang === 'fr';

  const NAV_ITEMS = [
    {
      id: 'nav-services',
      number: '01',
      title: isFr ? '01. Prestations & Services' : '01. Services & Production',
      sub: isFr ? 'Films, visualisers, publicités & direction artistique' : 'Films, visualisers, ads & art direction',
      href: '/services',
      action: isFr ? 'Explorer' : 'Explore',
      icon: Film,
      isExternalRoute: true
    },
    {
      id: 'nav-formation',
      number: '02',
      title: isFr ? '02. Formation & Masterclass Vidéo' : '02. Video Masterclass',
      sub: isFr ? '5 modules pratiques, prompts exclusifs & accès aux ressources' : '5 practical modules, exclusive prompts & resource access',
      href: '/formation',
      action: isFr ? 'Accéder' : 'Access',
      icon: GraduationCap,
      isExternalRoute: true
    },
    {
      id: 'nav-pipeline',
      number: '03',
      title: isFr ? '03. Stack Technique & Pipeline' : '03. Tech Stack & Pipeline',
      sub: isFr ? 'Midjourney, Kling, Runway, DaVinci Resolve' : 'Midjourney, Kling, Runway, DaVinci Resolve',
      href: '/stack',
      action: isFr ? 'Voir Stack' : 'View Stack',
      icon: Cpu,
      isExternalRoute: true
    },
    {
      id: 'nav-tarifs',
      number: '04',
      title: isFr ? '04. Tarifs & Formules' : '04. Pricing & Packages',
      sub: isFr ? 'Packs Sprint 48h & productions sur-mesure' : '48h Sprint packages & custom productions',
      href: '/tarifs',
      action: isFr ? 'Voir Tarifs' : 'View Pricing',
      icon: Tag,
      isExternalRoute: true
    }
  ];

  return (
    <div className="ovizai-card max-w-xl mx-auto mb-4">
      {/* Navigation List */}
      <div className="flex flex-col divide-y divide-white/[0.06]">
        {NAV_ITEMS.map(item => {
          const IconComp = item.icon;
          return (
            <Link
              key={item.id}
              href={item.href}
              className="group w-full flex items-center justify-between gap-3 px-4 sm:px-5 py-3.5 bg-none hover:bg-white/[0.025] text-left transition-colors cursor-pointer"
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
