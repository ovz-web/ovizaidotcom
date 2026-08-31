'use client';

import React from 'react';
import { Clapperboard, Music2, GraduationCap, ArrowUpRight } from 'lucide-react';
import { Language } from '@/types';

interface ServicesGridProps {
  lang: Language;
}

const SERVICES = [
  {
    id: 'service-da',
    number: '01',
    title: {
      fr: 'DA & Vidéos Publicitaires IA',
      en: 'AI Art Direction & Commercials'
    },
    subtitle: {
      fr: 'Films de marque & campagnes narratives haute fidélité',
      en: 'Brand films & high-fidelity narrative campaigns'
    },
    desc: {
      fr: 'Direction créative augmentée par l’IA. Production de spots publicitaires, moodboards génératifs et univers visuels cinématographiques sans contraintes de tournage traditionnel.',
      en: 'AI-augmented creative direction. Production of commercial spots, generative moodboards, and cinematic visual universes without traditional filming constraints.'
    },
    pricingTag: {
      fr: '3 000 € – 15 000 €+',
      en: '€3,000 – €15,000+'
    },
    icon: Clapperboard,
    mailtoSubject: 'Demande de projet : DA & Vidéo Publicitaire IA'
  },
  {
    id: 'service-music',
    number: '02',
    title: {
      fr: 'Visualisers & Clips Musicaux',
      en: 'Music Visualisers & Music Videos'
    },
    subtitle: {
      fr: 'Scénographies visuelles & clips 3D/VFX/IA',
      en: 'Visual stage design & 3D/VFX/AI videos'
    },
    desc: {
      fr: 'Conception de visualisers d’albums, animations de scène (Bercy / Zéniths), et clips d’animation IA photoréalistes pour artistes et labels exigeants.',
      en: 'Album visualisers, stage animations (Bercy / Arenas), and photorealistic AI video clips for demanding artists and labels.'
    },
    pricingTag: {
      fr: '1 500 € – 8 000 €',
      en: '€1,500 – €8,000'
    },
    icon: Music2,
    mailtoSubject: 'Demande de projet : Visualiser & Clip Musical IA'
  },
  {
    id: 'service-training',
    number: '03',
    title: {
      fr: 'Formations & Masterclasses IA',
      en: 'AI Video Masterclasses & Systems'
    },
    subtitle: {
      fr: 'Workflows de vidéo IA ultra-réaliste & prompts secrets',
      en: 'Ultra-realistic AI video workflows & secret prompts'
    },
    desc: {
      fr: 'Transmission directe du savoir-faire studio : maîtrise de Midjourney v6, Flux, Runway Gen-3, Kling AI, lip-sync, consistance des personnages et post-production 4K.',
      en: 'Direct studio knowledge transfer: mastering Midjourney v6, Flux, Runway Gen-3, Kling AI, lip-sync, character consistency, and 4K post-production.'
    },
    pricingTag: {
      fr: 'Accès Masterclass / Sur Devis',
      en: 'Masterclass Access / Quote'
    },
    icon: GraduationCap,
    mailtoSubject: 'Demande d’information : Formation & Masterclass IA'
  }
];

export default function ServicesGrid({ lang }: ServicesGridProps) {
  const isFr = lang === 'fr';

  return (
    <section className="max-w-xl mx-auto mb-10 px-4">
      {/* Section Title */}
      <div className="mb-6 text-center">
        <p className="mono text-[10px] tracking-[0.2em] uppercase text-[#CAA243] font-mono mb-1">
          {isFr ? '01 // PÔLES D’EXPERTISE & OFFRES' : '01 // EXPERTISE & SERVICES'}
        </p>
        <h2 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-[#ECE4D3]">
          {isFr ? 'Prestations & Solutions Créatives' : 'Creative Services & Solutions'}
        </h2>
      </div>

      {/* Services Grid */}
      <div className="space-y-4">
        {SERVICES.map((service) => {
          const IconComp = service.icon;
          const mailtoHref = `mailto:contact@ovizai.com?subject=${encodeURIComponent(service.mailtoSubject)}`;

          return (
            <div
              key={service.id}
              className="group border border-white/[0.08] bg-[#141210] hover:border-[#CAA243]/40 rounded-xl p-5 transition-all duration-300 shadow-lg relative overflow-hidden"
            >
              {/* Top Row: Icon + Number & Pricing Tag */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-black/40 border border-white/[0.08] text-[#CAA243] group-hover:border-[#CAA243]/50 transition-colors">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="mono text-[10px] tracking-widest text-[#8c8375] uppercase block">
                      NO. {service.number}
                    </span>
                    <h3 className="mono text-sm font-bold text-[#ECE4D3] group-hover:text-[#f0c869] transition-colors">
                      {service.title[lang]}
                    </h3>
                  </div>
                </div>

                <span className="mono text-[10px] px-2.5 py-1 rounded bg-black/60 border border-white/[0.08] text-[#CAA243] font-semibold">
                  {service.pricingTag[lang]}
                </span>
              </div>

              {/* Subtitle */}
              <p className="mono text-xs text-[#CAA243]/90 font-medium mb-2">
                {service.subtitle[lang]}
              </p>

              {/* Description */}
              <p className="text-xs text-[#8c8375] leading-relaxed mb-4">
                {service.desc[lang]}
              </p>

              {/* Action Button */}
              <div className="pt-3 border-t border-white/[0.06] flex justify-end">
                <a
                  href={mailtoHref}
                  className="inline-flex items-center gap-1.5 mono text-[11px] font-semibold text-[#ECE4D3] group-hover:text-[#f0c869] transition-colors"
                >
                  <span>{isFr ? 'Commander / Réserver' : 'Book / Order'}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#CAA243]" />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
