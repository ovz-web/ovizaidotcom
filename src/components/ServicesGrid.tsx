'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, Smartphone, Sparkles, Layers } from 'lucide-react';
import { Language } from '@/types';

interface ServicesGridProps {
  lang: Language;
}

export interface ServiceFamily {
  id: string;
  number: string;
  icon: React.ComponentType<{ className?: string }>;
  title: { fr: string; en: string };
  tagline: { fr: string; en: string };
  description: { fr: string; en: string };
  examples: { fr: string; en: string };
  ctaText: { fr: string; en: string };
}

export const THREE_SERVICES: ServiceFamily[] = [
  {
    id: 'short-form-ads',
    number: '01',
    icon: Smartphone,
    title: {
      fr: 'SHORT-FORM ADS',
      en: 'SHORT-FORM ADS',
    },
    tagline: {
      fr: 'Publicités courtes pensées pour Reels, TikTok, Shorts et campagnes sociales.',
      en: 'Short-form ads engineered for Reels, TikTok, Shorts and social campaigns.',
    },
    description: {
      fr: 'Formats verticaux 9:16 percutants (10 à 15 secondes) avec rythme serré, sound design immersif et accroche visuelle immédiate pour capter l’attention en moins de deux secondes.',
      en: 'High-impact 9:16 vertical video (10 to 15 seconds) featuring dynamic pacing, immersive sound design and immediate hook retention.',
    },
    examples: {
      fr: 'Idéal pour : restaurants, marques alimentaires, hospitality, retail et commerces.',
      en: 'Ideal for: restaurants, food & beverage, hospitality, retail, and lifestyle brands.',
    },
    ctaText: {
      fr: 'Démarrer une publicité courte →',
      en: 'Start a short-form ad →',
    },
  },
  {
    id: 'product-brand-films',
    number: '02',
    icon: Sparkles,
    title: {
      fr: 'PRODUCT & BRAND FILMS',
      en: 'PRODUCT & BRAND FILMS',
    },
    tagline: {
      fr: 'Films produit, lancements et concepts visuels pour marques.',
      en: 'Product films, brand launches and cinematic visual concepts.',
    },
    description: {
      fr: 'Mise en valeur cinématique de votre produit : éclairage studio, textures détaillées, univers visuel affirmé et scénarisation valorisant vos caractéristiques uniques.',
      en: 'Cinematic showcase of your product: studio lighting, rich textural detail, distinctive brand aesthetic, and narrative pacing highlighting your key attributes.',
    },
    examples: {
      fr: 'Idéal pour : lancements produits, e-commerce, cosmétique, mode et design.',
      en: 'Ideal for: product launches, e-commerce, cosmetics, fashion and design brands.',
    },
    ctaText: {
      fr: 'Créer un film produit →',
      en: 'Create a product film →',
    },
  },
  {
    id: 'agency-white-label',
    number: '03',
    icon: Layers,
    title: {
      fr: 'AGENCY / WHITE-LABEL',
      en: 'AGENCY / WHITE-LABEL',
    },
    tagline: {
      fr: 'Production créative externalisée pour agences, livrée en marque blanche.',
      en: 'Outsourced creative production for agencies, delivered white-label.',
    },
    description: {
      fr: 'Partenaire de production agile pour vos comptes clients : concepts publicitaires courts, déclinaisons rapides et exécution visuelle haute fidélité intégrée à vos plannings de campagne.',
      en: 'Agile creative production partner for agency client rosters: short-form ad concepts, rapid variations, and high-fidelity visual execution on tight schedules.',
    },
    examples: {
      fr: 'Idéal pour : agences de publicité, studios digitaux, directeurs de création et médias.',
      en: 'Ideal for: ad agencies, creative studios, art directors, and media agencies.',
    },
    ctaText: {
      fr: 'Échanger en marque blanche →',
      en: 'Discuss agency partnership →',
    },
  },
];

export default function ServicesGrid({ lang }: ServicesGridProps) {
  const isFr = lang === 'fr';

  return (
    <section id="services" className="py-16 sm:py-24 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="max-w-2xl mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 mb-3">
          <span className="mono text-xs sm:text-sm uppercase tracking-[0.2em] text-gold font-bold">
            {isFr ? '01 // CE QUE NOUS CRÉONS' : '01 // WHAT WE MAKE'}
          </span>
        </div>
        <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-fg tracking-tight uppercase leading-tight mb-4">
          {isFr ? 'TROIS FORMATS ESSENTIELS.' : 'THREE ESSENTIAL FORMATS.'}
        </h2>
        <p className="text-base sm:text-lg text-muted leading-relaxed">
          {isFr
            ? 'Direction créative humaine et production visuelle augmentée. Rien de superflu.'
            : 'Human creative direction and elevated visual production. Pure signal, zero noise.'}
        </p>
      </div>

      {/* 3 Services Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {THREE_SERVICES.map((service) => {
          const Icon = service.icon;
          return (
            <article
              key={service.id}
              className="group bg-[#11100e] border border-white/[0.08] hover:border-gold/40 rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-xl hover:shadow-gold/5"
            >
              <div>
                {/* Number & Icon */}
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/[0.06]">
                  <span className="mono text-sm font-bold text-gold tracking-widest">
                    {service.number}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-gold group-hover:text-gold-bright transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                {/* Title & Tagline */}
                <h3 className="font-display font-bold text-xl sm:text-2xl text-fg uppercase tracking-tight mb-3">
                  {service.title[lang]}
                </h3>
                <p className="text-sm sm:text-base font-medium text-gold/90 mb-4 leading-snug">
                  {service.tagline[lang]}
                </p>

                {/* Description */}
                <p className="text-sm text-muted leading-relaxed mb-6">
                  {service.description[lang]}
                </p>

                {/* Target examples */}
                <div className="p-3 rounded-lg bg-black/40 border border-white/[0.04] text-xs text-muted/90 mono mb-6">
                  {service.examples[lang]}
                </div>
              </div>

              {/* Action Link */}
              <div className="pt-2">
                <Link
                  href={`/contact?service=${service.id}`}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm mono uppercase tracking-wider text-fg group-hover:text-gold font-semibold transition-colors"
                >
                  <span>{service.ctaText[lang]}</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
