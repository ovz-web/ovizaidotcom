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
      fr: 'Courts-métrages, pilotes de séries et fictions narratives complètes',
      en: 'Short films, series pilots and complete narrative fiction'
    },
    descriptionLines: {
      fr: [
        'Conception intégrale de fictions cinématographiques',
        'De l\'écriture du scénario jusqu\'au montage final',
        'Plans cinématiques au réalisme saisissant',
        'Cohérence totale des personnages et des décors',
        'Gestion sur-mesure de la lumière sur chaque séquence'
      ],
      en: [
        'End-to-end production of cinematic fiction',
        'From original scriptwriting to final cut',
        'Strikingly realistic generative shots',
        'Seamless consistency for characters and sets',
        'Custom lighting control across every sequence'
      ]
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
      fr: 'Univers surréalistes et visuels scéniques synchronisés sur la musique',
      en: 'Surreal worlds and beat-synced stage visuals for artists'
    },
    descriptionLines: {
      fr: [
        'Réalisation de clips musicaux complets et visuels de scène',
        'Traduction de votre univers sonore en images inédites',
        'Synchronisation rythmique précise calée sur le tempo',
        'Direction artistique sur-mesure pour artistes et labels'
      ],
      en: [
        'Music video production and immersive stage visuals',
        'Translating your sound identity into distinctive imagery',
        'Precise rhythm synchronization mapped to BPM',
        'Tailored art direction for artists and record labels'
      ]
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
      fr: 'Spots publicitaires percutants et contenus visuels premium pour marques',
      en: 'Impactful commercials and premium visual content for brands'
    },
    descriptionLines: {
      fr: [
        'Campagnes publicitaires cinématiques conçues pour captiver',
        'Scènes impossibles à tourner en conditions réelles',
        'Qualité digne des plus grands studios de production',
        'Formats optimisés pour la conversion et l\'autorité de marque'
      ],
      en: [
        'Cinematic ad campaigns designed to capture immediate attention',
        'Visual scenes impossible to shoot in real life',
        'Studio-grade quality matching major production houses',
        'Formats optimized for conversion and brand authority'
      ]
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
      fr: 'Définition d\'univers graphiques singuliers et moodboards cinématiques',
      en: 'Distinctive visual worlds and cinematic moodboards'
    },
    descriptionLines: {
      fr: [
        'Accompagnement créatif stratégique pour marques et artistes',
        'Fondations esthétiques complètes pour votre projet',
        'Exploration visuelle par génération haute fidélité',
        'Palettes de couleurs, textures et grammaire cinématographique'
      ],
      en: [
        'Strategic creative direction for brands and artists',
        'Complete aesthetic foundations for your visual project',
        'Generative exploration in high definition',
        'Color palettes, textures and cinematic visual language'
      ]
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
      fr: 'Plateformes web Next.js ultra-rapides et expériences immersives',
      en: 'Ultra-fast Next.js web platforms and immersive digital experiences'
    },
    descriptionLines: {
      fr: [
        'Conception et développement de sites vitrines et plateformes',
        'Architecture moderne propulsée par Next.js',
        'Performances d\'affichage ultra-rapides et design sombre',
        'Intégrations complètes incluant Stripe, CMS et formulaires'
      ],
      en: [
        'Design and development of showcase websites and platforms',
        'Modern architecture powered by Next.js',
        'Lightning-fast load speed and cinematic dark aesthetics',
        'Full integrations including Stripe, CMS and custom forms'
      ]
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
    webmSrc: LOCAL_VIDEOS.spec01.webmSrc,
    poster: LOCAL_VIDEOS.spec01.poster,
    youtubeId: YOUTUBE_VIDEOS.servicesShowcase1,
    title: {
      fr: 'SPEC 01 — THE BANQUET / LE BANQUET (PARIS 1990)',
      en: 'SPEC 01 — THE BANQUET / LE BANQUET (PARIS 1990)',
    },
    description: {
      fr: 'Collision entre romantisme victorien sombre et béton brut\nBande-son : PNL — Autre monde',
      en: 'Dark romanticism, opulence, and raw asphalt\nSoundtrack: PNL — Autre monde',
    },
    uploadDate: '2026-09-01',
    relatedServiceId: 'pub-brand-content',
    badge: { fr: 'SPEC FILM — PARIS 1990', en: 'SPEC FILM — PARIS 1990' },
  },
  {
    src: LOCAL_VIDEOS.spec02.src,
    webmSrc: LOCAL_VIDEOS.spec02.webmSrc,
    poster: LOCAL_VIDEOS.spec02.poster,
    youtubeId: YOUTUBE_VIDEOS.servicesShowcase2,
    title: {
      fr: 'SPEC 02 — THE PROCESSION / LE CORTÈGE (PARIS 1990)',
      en: 'SPEC 02 — THE PROCESSION / LE CORTÈGE (PARIS 1990)',
    },
    description: {
      fr: 'Dandysme nocturne et dérive gothique sur l’asphalte froid\nBande-son : PNL — Autre monde',
      en: 'Nocturnal dandyism, gothic drift, and cold concrete\nSoundtrack: PNL — Autre monde',
    },
    uploadDate: '2026-09-01',
    relatedServiceId: 'clips-visualisers',
    badge: { fr: 'SPEC FILM — PARIS 1990', en: 'SPEC FILM — PARIS 1990' },
  },
];

import ListMenuCard, { ListMenuItem } from '@/components/ListMenuCard';

export default function ServicesGrid({ lang }: ServicesGridProps) {
  const isFr = lang === 'fr';
  const [openService, setOpenService] = useState<string | null>(null);

  const toggleService = (id: string) => {
    setOpenService(prev => (prev === id ? null : id));
  };

  const serviceItems: ListMenuItem[] = FIVE_SERVICES.map(service => {
    const isOpen = openService === service.id;
    const mapInfo = SERVICE_TYPE_MAP[service.id];
    const quoteHref = mapInfo
      ? `/contact?service=${service.id}&type=${mapInfo.type}&budget=${mapInfo.budget}`
      : `/contact?service=${service.id}`;

    return {
      id: service.id,
      icon: service.icon,
      title: `${service.number} // ${isFr ? service.title.fr : service.title.en}`,
      subtitle: isFr ? service.tagline.fr : service.tagline.en,
      trailing: isOpen ? '↑' : '↓',
      onClick: () => toggleService(service.id),
      expanded: isOpen,
      expandedContent: (
        <div className="space-y-4 animate-fadeIn">
          <div>
            <h4 className="mono text-[10px] uppercase text-gold font-bold tracking-[0.2em] mb-2">
              {isFr ? 'Présentation' : 'Overview'}
            </h4>
            <div className="text-xs text-fg leading-relaxed space-y-1">
              {(isFr ? service.descriptionLines.fr : service.descriptionLines.en).map((line, idx) => (
                <p key={idx}>{line}</p>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mono text-[10px] uppercase text-gold font-bold tracking-[0.2em] mb-2.5">
              {isFr ? 'Livrables inclus' : 'Deliverables'}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {(isFr ? service.deliverables.fr : service.deliverables.en).map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-muted bg-black/40 p-2 rounded-lg border border-white/[0.04]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer CTAs inside card */}
          <div className="pt-3 flex justify-end border-t border-white/[0.06]">
            <Link
              href={quoteHref}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold-bright text-black font-bold px-4 py-2.5 rounded-xl mono text-xs uppercase tracking-wider transition-all min-h-[44px]"
            >
              <span>{isFr ? 'Demander un devis pour ce service →' : 'Request a quote for this service →'}</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      ),
    };
  });

  return (
    <section id="services" className="max-w-xl mx-auto mb-8 px-4">
      {/* 5 Services List in Unified ListMenuCard */}
      <ListMenuCard items={serviceItems} className="mb-12" />

      {/* Video Showcase Section embedded at bottom of Services page */}
      <div className="mt-10 pt-8 border-t border-border">
        <div className="text-center mb-6">
          <p className="text-[10px] uppercase tracking-[0.25em] text-gold mb-1 font-mono font-bold">
            {isFr ? 'DÉMONSTRATIONS EN ACTION' : 'DEMONSTRATIONS IN ACTION'}
          </p>
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-fg mb-1.5 leading-snug">
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
