'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Film, Music2, Clapperboard, Palette, Globe2, ChevronDown, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { Language, Currency } from '@/types';
import VideoShowcase, { VideoItem } from '@/components/VideoShowcase';
import TrustSection from '@/components/TrustSection';
import { YOUTUBE_VIDEOS, LOCAL_VIDEOS } from '@/lib/videos';

interface ServicesGridProps {
  lang: Language;
  currency?: Currency;
  onSelectCurrency?: (curr: Currency) => void;
}

const SERVICE_TYPE_MAP: Record<string, { type: string; budget: string }> = {
  'films-series': { type: 'film-series', budget: 'tier-3' },
  'clips-visualisers': { type: 'clip-visualiser', budget: 'tier-2' },
  'pub-brand-content': { type: 'pub-brand', budget: 'tier-2' },
  'direction-artistique': { type: 'art-direction', budget: 'tier-1' },
  'sites-web-nextjs': { type: 'site-web', budget: 'tier-2' }
};

const FIVE_SERVICES = [
  {
    id: 'films-series',
    number: '01',
    letterCode: 'A1',
    title: { fr: 'Production de Films & Séries IA', en: 'AI Film & Series Production' },
    tagline: {
      fr: 'Développement de courts-métrages, pilotes de séries et fictions narratives complètes.',
      en: 'Development of short films, series pilots, and complete narrative fiction.'
    },
    description: {
      fr: 'Conception intégrale de fictions cinématographiques. De l\'écriture du scénario au montage final, nous générons des plans d\'un réalisme saisissant avec une cohérence parfaite des personnages, des décors et de la lumière à travers chaque séquence.',
      en: 'Full creation of cinematic fiction. From scriptwriting to final cut, we generate strikingly realistic shots with consistent characters, sets, and lighting across scenes.'
    },
    deliverables: {
      fr: ['Bible visuelle & character design', 'Génération 4K cinématographique', 'Montage narratif & étalonnage', 'Sound design & bande-son originale', 'Export master cinéma (DCP / Pro-Res)'],
      en: ['Visual Bible & Character Design', '4K Cinematic Generation', 'Narrative Editing & Color Grading', 'Sound Design & Original Score', 'Cinema Master Export (DCP / ProRes)']
    },
    icon: Film
  },
  {
    id: 'clips-visualisers',
    number: '02',
    letterCode: 'A2',
    title: { fr: 'Clips Vidéos & Scénographies VJing', en: 'Music Videos & Stage Visuals' },
    tagline: {
      fr: 'Univers surréalistes et visuels scéniques synchronisés sur la musique pour artistes et labels.',
      en: 'Surreal universes and beat-synced stage visuals for artists and record labels.'
    },
    description: {
      fr: 'Réalisation de clips musicaux complets et de visuels de scène immersifs. Nous traduisons votre signature musicale en univers visuels inédits, avec une synchronisation rythmique précise et une direction artistique sur-mesure.',
      en: 'Production of music videos and immersive stage visuals. We translate your sound identity into unique visual worlds with precise rhythm synchronization and custom art direction.'
    },
    deliverables: {
      fr: ['Storyboard & moodboards visuels', 'Génération calée sur le BPM/rythme', 'Boucles VJing haute résolution', 'Déclinaisons réseaux (9:16, 1:1, 16:9)', 'Livrables prêts pour diffusion scène'],
      en: ['Storyboard & Visual Moodboards', 'BPM-Synced Generation', 'High-Res VJing Loops', 'Social Media Cuts (9:16, 1:1, 16:9)', 'Stage-Ready Display Files']
    },
    icon: Music2
  },
  {
    id: 'pub-brand-content',
    number: '03',
    letterCode: 'A3',
    title: { fr: 'Publicité & Brand Content', en: 'Commercials & Brand Content' },
    tagline: {
      fr: 'Spots publicitaires percutants et contenus visuels premium pour marques audacieuses.',
      en: 'Impactful commercials and premium visual content for forward-thinking brands.'
    },
    description: {
      fr: 'Campagnes publicitaires cinématiques qui captent l\'attention dès la première seconde. Nous créons des scènes impossibles à tourner en réel avec une qualité digne des plus grands studios, optimisées pour la conversion et l\'image de marque.',
      en: 'Cinematic ad campaigns engineered to capture attention from the first second. We create scenes impossible to shoot in real life, with top-studio quality optimized for conversion and brand authority.'
    },
    deliverables: {
      fr: ['Concept créatif & scénarisation', 'Packshots & scènes de marque sur-mesure', 'Formats multi-plateformes (Ads, Social, DOOH)', 'Voix-off IA ou studio & mix audio', 'A/B testing visuel disponible'],
      en: ['Creative Concept & Scripting', 'Custom Packshots & Brand Scenes', 'Multi-Platform Formats (Ads, Social, DOOH)', 'Studio or AI Voiceover & Audio Mix', 'Visual A/B Testing Variations']
    },
    icon: Clapperboard
  },
  {
    id: 'direction-artistique',
    number: '04',
    letterCode: 'A4',
    title: { fr: 'Direction Artistique & Identité Visuelle', en: 'Art Direction & Visual Identity' },
    tagline: {
      fr: 'Définition d\'univers graphiques singuliers, moodboards cinématiques et bibles visuelles.',
      en: 'Definition of distinctive visual worlds, cinematic moodboards, and visual bibles.'
    },
    description: {
      fr: 'Accompagnement créatif stratégique pour marques, agences et créateurs. Nous posons les fondations esthétiques de votre projet grâce à l\'exploration visuelle par IA : styles graphiques, palettes, textures et grammaire cinématographique.',
      en: 'Strategic creative direction for brands, agencies, and artists. We lay the aesthetic foundations of your project through generative visual exploration: art styles, palettes, textures, and cinematic grammar.'
    },
    deliverables: {
      fr: ['Guide de style & charte visuelle IA', 'Génération de keyframes de référence', 'Exploration de concepts en haute définition', 'Consulting & prompts certifiés', 'Fichiers sources & documentation'],
      en: ['AI Style Guide & Visual Specs', 'Reference Keyframe Generation', 'High-Definition Concept Exploration', 'Consulting & Verified Prompts', 'Source Files & Documentation']
    },
    icon: Palette
  },
  {
    id: 'sites-web-nextjs',
    number: '05',
    letterCode: 'A5',
    title: { fr: 'Création de Sites Web Next.js', en: 'Next.js Website Development' },
    tagline: {
      fr: 'Plateformes web sur-mesure, ultra-rapides et pensées comme des expériences immersives.',
      en: 'Custom, ultra-fast web platforms designed as immersive digital experiences.'
    },
    description: {
      fr: 'Conception et développement de sites vitrines et plateformes e-commerce à forte identité visuelle. Bâtis sur Next.js 15, ils allient performances exceptionnelles, design sombre cinématique et intégrations complètes (Stripe, CMS, formulaires).',
      en: 'Design and development of showcase websites and e-commerce platforms with a strong visual identity. Built on Next.js 15, they combine lightning-fast performance, cinematic dark aesthetics, and full integrations (Stripe, CMS, forms).'
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
    src: LOCAL_VIDEOS.spec01.src,
    poster: LOCAL_VIDEOS.spec01.poster,
    youtubeId: YOUTUBE_VIDEOS.servicesShowcase1,
    title: {
      fr: 'SPEC 01 — THE BANQUET / LE BANQUET (PARIS 1990)',
      en: 'SPEC 01 — THE BANQUET / LE BANQUET (PARIS 1990)',
    },
    description: {
      fr: 'Collision entre romantisme victorien sombre et béton brut. Bande-son : PNL — Autre monde.',
      en: 'Dark romanticism, opulence, and raw asphalt. Soundtrack: PNL — Autre monde.',
    },
    uploadDate: '2026-09-01',
    relatedServiceId: 'pub-brand-content',
    badge: { fr: '01 // SPEC FILM — PARIS 1990', en: '01 // SPEC FILM — PARIS 1990' },
  },
  {
    src: LOCAL_VIDEOS.spec02.src,
    poster: LOCAL_VIDEOS.spec02.poster,
    youtubeId: YOUTUBE_VIDEOS.servicesShowcase2,
    title: {
      fr: 'SPEC 02 — THE PROCESSION / LE CORTÈGE (PARIS 1990)',
      en: 'SPEC 02 — THE PROCESSION / LE CORTÈGE (PARIS 1990)',
    },
    description: {
      fr: 'Dandysme nocturne et dérive gothique sur l’asphalte froid. Bande-son : PNL — Autre monde.',
      en: 'Nocturnal dandyism, gothic drift, and cold concrete. Soundtrack: PNL — Autre monde.',
    },
    uploadDate: '2026-09-01',
    relatedServiceId: 'clips-visualisers',
    badge: { fr: '02 // SPEC FILM — PARIS 1990', en: '02 // SPEC FILM — PARIS 1990' },
  },
];

export default function ServicesGrid({ lang }: ServicesGridProps) {
  const isFr = lang === 'fr';
  const [openService, setOpenService] = useState<string | null>(null);

  const toggleService = (id: string) => {
    setOpenService(prev => (prev === id ? null : id));
  };

  return (
    <section id="services" className="max-w-xl mx-auto mb-14 px-4">
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
                className="w-full text-left p-4 sm:p-5 flex items-start justify-between gap-4 cursor-pointer focus:outline-none"
              >
                <div className="flex items-start gap-3.5 sm:gap-4 min-w-0">
                  <div className="p-2.5 sm:p-3 rounded-xl bg-black/60 border border-white/[0.08] text-[#CAA243] flex-shrink-0 mt-0.5">
                    <IconComp className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="mono text-[10px] text-[#CAA243] font-bold tracking-widest uppercase px-2 py-0.5 rounded bg-[#CAA243]/10 border border-[#CAA243]/20">
                        {isFr ? `${service.letterCode} // PÔLE` : `${service.letterCode} // UNIT`}
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
                <div className="px-4 pb-5 sm:px-5 pt-2 border-t border-white/[0.06] space-y-4 animate-fadeIn">
                  <div>
                    <h4 className="mono text-[10px] sm:text-[10.5px] uppercase text-[#CAA243] font-bold tracking-wider mb-2">
                      {isFr ? 'Description du pôle :' : 'Scope of service:'}
                    </h4>
                    <p className="text-xs text-[#ECE4D3] leading-relaxed">
                      {isFr ? service.description.fr : service.description.en}
                    </p>
                  </div>

                  <div>
                    <h4 className="mono text-[10px] sm:text-[10.5px] uppercase text-[#CAA243] font-bold tracking-wider mb-2.5">
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
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#CAA243] hover:bg-[#f0c869] text-black font-bold px-4 py-2.5 rounded-xl mono text-xs uppercase tracking-wider transition-all min-h-[44px]"
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
      <div className="mt-10 pt-8 border-t border-white/[0.08]">
        <div className="text-center mb-6">
          <p className="mono text-[10px] sm:text-[10.5px] uppercase tracking-widest text-[#CAA243] font-mono font-bold mb-1">
            {isFr ? 'DÉMONSTRATIONS EN ACTION' : 'DEMONSTRATIONS IN ACTION'}
          </p>
          <h2 className="text-xl font-bold text-[#ECE4D3]">
            {isFr ? 'Réalisations Vidéo & Direction Artistique' : 'Video Output & Art Direction Showcase'}
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          {SERVICES_SHOWCASE_VIDEOS.map((video, idx) => (
            <VideoShowcase key={video.src || video.youtubeId || idx} video={video} lang={lang} />
          ))}
        </div>

        {/* Social Proof & Guarantees accompanying demonstrations */}
        <TrustSection lang={lang} hideProcessStep={true} />
      </div>
    </section>
  );
}
