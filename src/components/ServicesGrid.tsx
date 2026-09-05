'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Film, Music2, Clapperboard, Palette, Globe2, ChevronDown, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { Language, Currency } from '@/types';
import VideoShowcase, { VideoItem } from '@/components/VideoShowcase';
import TrustSection from '@/components/TrustSection';
import { YOUTUBE_VIDEOS } from '@/lib/videos';

interface ServicesGridProps {
  lang: Language;
  currency?: Currency;
  onSelectCurrency?: (curr: Currency) => void;
}

const SERVICE_TYPE_MAP: Record<string, { type: string; budget: string }> = {
  'films-series': { type: 'film-series', budget: 'tier-3' },
  'clips-visualisers': { type: 'clip-visualiser', budget: 'tier-2' },
  'pub-brand-content': { type: 'pub-brand', budget: 'tier-2' },
  'da-univers-visuels': { type: 'da-univers', budget: 'tier-1' },
  'web-digital': { type: 'web-digital', budget: 'tier-2' },
};

const FIVE_SERVICES = [
  {
    id: 'films-series',
    number: '01',
    title: {
      fr: 'Réalisation de Films & Séries',
      en: 'Film & Series Direction'
    },
    tagline: {
      fr: 'Productions cinématographiques d’envergure, de la première idée au rendu 4K.',
      en: 'Major cinematic productions, from initial vision to 4K master.'
    },
    description: {
      fr: 'Prise en charge complète : écriture, storyboard, génération 8K, montage et étalonnage.',
      en: 'Full production management: script, storyboard, 8K generation, editing, and color grading.'
    },
    deliverables: {
      fr: ['Concept & écriture', 'Storyboard numérique', 'Génération des plans', 'Montage & étalonnage ACES', 'Sound design spatialisé', 'Livraison multi-formats'],
      en: ['Concept & Script', 'Digital Storyboard', 'Shot Generation', 'ACES Editing & Grading', 'Spatial Sound Design', 'Multi-Format Delivery']
    },
    icon: Film
  },
  {
    id: 'clips-visualisers',
    number: '02',
    title: {
      fr: 'Clips Vidéos & Visualisers',
      en: 'Music Videos & Stage Visualisers'
    },
    tagline: {
      fr: 'Créations musicales et scénographies VJing à l\'esthétique sur-mesure.',
      en: 'Music creations and stage visualisers with custom aesthetics.'
    },
    description: {
      fr: 'Création de visuels de scène qui subliment la signature artistique.',
      en: 'Creation of stage visuals elevating the artist\'s identity.'
    },
    deliverables: {
      fr: ['Direction artistique', 'Moodboard & références', 'Séquences animées', 'Montage rythmé', 'Effets VFX & Lip-sync', 'Formats réseaux sociaux (Vertical 9:16)'],
      en: ['Art Direction', 'Moodboards & References', 'Animated Sequences', 'Rhythmic Editing', 'VFX & Lip-sync Effects', 'Social Media Formats (9:16)']
    },
    icon: Music2
  },
  {
    id: 'pub-brand-content',
    number: '03',
    title: {
      fr: 'Publicités & Brand Content',
      en: 'Commercials & Brand Content'
    },
    tagline: {
      fr: 'Spots publicitaires et contenus de marque produits plus vite.',
      en: 'Commercial spots and brand content produced faster.'
    },
    description: {
      fr: 'Publicités et spots sur-mesure intégrés à votre charte de marque.',
      en: 'Tailored commercial spots aligned with your brand identity.'
    },
    deliverables: {
      fr: ['Concept publicitaire', 'Script & storyboard', 'Production visuelle rapide', 'Déclinaisons multi-formats', 'Intégration charte de marque', 'Optimisation conversion'],
      en: ['Ad Concept', 'Script & Storyboard', 'Fast Visual Production', 'Multi-Format Variants', 'Brandbook Integration', 'Conversion Optimization']
    },
    icon: Clapperboard
  },
  {
    id: 'da-univers-visuels',
    number: '04',
    title: {
      fr: 'Direction Artistique & Univers de Marque',
      en: 'Art Direction & Brand Universes'
    },
    tagline: {
      fr: 'Façonnez l\'identité visuelle complète de votre marque.',
      en: 'Shape your brand\'s complete visual identity.'
    },
    description: {
      fr: 'Conception visuelle globale, charte graphique et visuels clés 8K.',
      en: 'Complete visual design, brand guidelines, and 8K key visuals.'
    },
    deliverables: {
      fr: ['Direction artistique globale', 'Univers visuel sur-mesure', 'Charte graphique & Brandbook', 'Visuels clés 8K (ultra haute définition)', 'Guidelines de marque'],
      en: ['Global Art Direction', 'Custom Visual Universe', 'Brandbook & Guidelines', '8K Key Visuals (ultra high definition)', 'Brand Guidelines']
    },
    icon: Palette
  },
  {
    id: 'web-digital',
    number: '05',
    title: {
      fr: 'Création de Sites Web & Plateformes Digitales',
      en: 'Custom Web & Digital Platforms'
    },
    tagline: {
      fr: 'Sites web sur-mesure (Next.js / React) optimisés pour la conversion.',
      en: 'Custom Next.js/React websites engineered for conversion.'
    },
    description: {
      fr: 'Design dark luxury, animations fluides et intégration responsive haute performance.',
      en: 'Dark luxury design, fluid animations, and high-performance responsive web engineering.'
    },
    deliverables: {
      fr: ['Maquette & design UI/UX', 'Développement Next.js sur-mesure', 'Animations & interactions', 'SEO sémantique', 'Mise en ligne & hébergement'],
      en: ['UI/UX Design Mockup', 'Custom Next.js Development', 'Animations & Micro-Interactions', 'Semantic SEO', 'Deployment & Hosting']
    },
    icon: Globe2
  }
];

const SERVICES_SHOWCASE_VIDEOS: VideoItem[] = [
  {
    youtubeId: YOUTUBE_VIDEOS.servicesShowcase1,
    title: {
      fr: 'Films Publicitaires & Direction Artistique IA',
      en: 'Commercial Films & AI Art Direction',
    },
    description: {
      fr: 'Aperçu de nos réalisations visuelles et univers générés par IA.',
      en: 'Overview of our visual productions and AI-generated universes.',
    },
    uploadDate: '2026-09-01',
    relatedServiceId: 'pub-brand-content',
    badge: { fr: '01 // COMMERCIAL SHOWREEL', en: '01 // COMMERCIAL SHOWREEL' },
  },
  {
    youtubeId: YOUTUBE_VIDEOS.servicesShowcase2,
    title: {
      fr: 'Clips Vidéos & Scénographies VJing',
      en: 'Music Videos & Stage Visualisers',
    },
    description: {
      fr: 'Démonstrations de nos créations pour artistes et scénographies scéniques.',
      en: 'Showcase of our creations for artists and stage visualisers.',
    },
    uploadDate: '2026-09-01',
    relatedServiceId: 'clips-visualisers',
    badge: { fr: '02 // MUSIC & VISUALISERS', en: '02 // MUSIC & VISUALISERS' },
  },
];

export default function ServicesGrid({ lang }: ServicesGridProps) {
  const isFr = lang === 'fr';
  const [openService, setOpenService] = useState<string | null>(null);

  const toggleService = (id: string) => {
    setOpenService(prev => (prev === id ? null : id));
  };

  return (
    <section id="services" className="max-w-3xl mx-auto mb-14 px-4">
      {/* Grid of 5 Services */}
      <div className="space-y-4 mb-12">
        {FIVE_SERVICES.map(service => {
          const IconComp = service.icon;
          const isOpen = openService === service.id;
          const mapInfo = SERVICE_TYPE_MAP[service.id];
          const quoteHref = mapInfo
            ? `/contact?service=${service.id}&type=${mapInfo.type}&budget=${mapInfo.budget}`
            : `/contact?service=${service.id}`;

          return (
            <div
              key={service.id}
              className={`ovizai-card transition-all duration-300 ${
                isOpen ? 'border-[#CAA243]/50 bg-black/80' : 'hover:border-[#CAA243]/30'
              }`}
            >
              {/* Header Button (Click to Expand) */}
              <button
                type="button"
                onClick={() => toggleService(service.id)}
                className="w-full text-left p-5 sm:p-6 flex items-start justify-between gap-4 cursor-pointer focus:outline-none"
              >
                <div className="flex items-start gap-4 min-w-0">
                  <div className="p-3 rounded-xl bg-black/60 border border-white/[0.08] text-[#CAA243] flex-shrink-0 mt-0.5">
                    <IconComp className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="mono text-[10px] text-[#CAA243] font-bold tracking-widest uppercase px-2 py-0.5 rounded bg-[#CAA243]/10 border border-[#CAA243]/20">
                        {`${service.number} // PÔLE`}
                      </span>
                    </div>
                    <h3 className="font-display text-base sm:text-lg font-bold text-[#ECE4D3] leading-snug">
                      {isFr ? service.title.fr : service.title.en}
                    </h3>
                    <p className="text-xs text-[#9C9384] mt-1 leading-relaxed">
                      {isFr ? service.tagline.fr : service.tagline.en}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0 pt-1">
                  <span className="mono text-[10px] uppercase text-[#CAA243] hidden sm:inline font-semibold">
                    {isOpen ? (isFr ? 'Fermer' : 'Close') : (isFr ? 'Détails' : 'Details')}
                  </span>
                  <div className={`p-1.5 rounded-lg border border-white/[0.08] bg-black/40 transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#CAA243]' : 'text-[#8C8375]'}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </div>
              </button>

              {/* Collapsible Details */}
              {isOpen && (
                <div className="px-5 pb-6 sm:px-6 pt-2 border-t border-white/[0.06] space-y-5 animate-fadeIn">
                  <div>
                    <h4 className="mono text-[10.5px] uppercase text-[#CAA243] font-bold tracking-wider mb-2">
                      {isFr ? 'Description du pôle :' : 'Scope of service:'}
                    </h4>
                    <p className="text-xs text-[#ECE4D3] leading-relaxed">
                      {isFr ? service.description.fr : service.description.en}
                    </p>
                  </div>

                  <div>
                    <h4 className="mono text-[10.5px] uppercase text-[#CAA243] font-bold tracking-wider mb-2.5">
                      {isFr ? 'Livrables inclus :' : 'Deliverables included:'}
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {(isFr ? service.deliverables.fr : service.deliverables.en).map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-[#9C9384] bg-black/40 p-2 rounded-lg border border-white/[0.04]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#CAA243] flex-shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Footer CTAs inside card */}
                  <div className="pt-3 flex justify-end border-t border-white/[0.06]">
                    <Link
                      href={quoteHref}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#CAA243] hover:bg-[#f0c869] text-black font-bold px-5 py-2.5 rounded-xl mono text-xs uppercase tracking-wider transition-all min-h-[44px]"
                    >
                      <span>{isFr ? 'Demander un devis pour ce service →' : 'Request a quote for this service →'}</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Video Showcase Section embedded at bottom of Services page */}
      <div className="mt-12 pt-8 border-t border-white/[0.08]">
        <div className="text-center mb-6">
          <p className="mono text-xs uppercase tracking-widest text-[#CAA243] font-bold mb-1">
            {isFr ? '02 // DÉMONSTRATIONS EN ACTION' : '02 // DEMONSTRATIONS IN ACTION'}
          </p>
          <h2 className="text-xl font-bold text-[#ECE4D3]">
            {isFr ? 'Réalisations Vidéo & Direction Artistique' : 'Video Output & Art Direction Showcase'}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          {SERVICES_SHOWCASE_VIDEOS.map((video, idx) => (
            <VideoShowcase key={video.youtubeId || idx} video={video} lang={lang} />
          ))}
        </div>

        {/* Social Proof & Guarantees accompanying demonstrations */}
        <TrustSection lang={lang} hideProcessStep={true} />
      </div>
    </section>
  );
}
