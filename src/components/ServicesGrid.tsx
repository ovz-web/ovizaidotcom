'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Film, Music2, Clapperboard, Palette, Building2, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { Language, Currency } from '@/types';
import VideoShowcase, { VideoItem } from '@/components/VideoShowcase';
import TrustSection from '@/components/TrustSection';
import { YOUTUBE_VIDEOS, LOCAL_VIDEOS } from '@/lib/videos';
import ListMenuCard, { ListMenuItem } from '@/components/ListMenuCard';

interface ServicesGridProps {
  lang: Language;
  currency?: Currency;
  onSelectCurrency?: (curr: Currency) => void;
}

const SERVICE_TYPE_MAP: Record<string, { type: string; budget: string }> = {
  'pub-restaurants': { type: 'pub-restaurant', budget: 'tier-launch' },
  'pub-produits': { type: 'pub-produit', budget: 'tier-launch' },
  'direction-artistique': { type: 'da-univers', budget: 'tier-custom' },
  'partenariat-agences': { type: 'agence-whitelabel', budget: 'tier-custom' },
  'clips-sur-mesure': { type: 'clip-visualiser', budget: 'tier-custom' },
};

const FIVE_SERVICES = [
  {
    id: 'pub-restaurants',
    number: '01',
    letterCode: 'A1',
    title: {
      fr: 'Publicités Restaurants & Marques Alimentaires',
      en: 'Commercials for Restaurants & Food Brands',
    },
    tagline: {
      fr: 'Publicités courtes 10-15s & mise en valeur culinaire',
      en: '10-15s short-form ads & culinary food styling',
    },
    descriptionLines: {
      fr: [
        'Mise en valeur des produits, textures, vapeurs et appétence visuelle',
        'Publicités courtes au format 9:16 pensées pour attirer l\'attention sur les réseaux sociaux',
        'Valorisation de votre établissement, de l\'atmosphère et de votre savoir-faire',
        'Direction créative humaine et outils génératifs pour sublimer votre carte',
      ],
      en: [
        'Showcasing food products, textures, sizzle, and visual appetite appeal',
        'Short 9:16 vertical ads engineered to capture immediate social attention',
        'Highlighting your restaurant venue, ambiance, and culinary craftsmanship',
        'Human creative direction combined with generative tools to elevate your menu',
      ],
    },
    deliverables: {
      fr: [
        '1 publicité courte (durée finale : 10 à 15 secondes)',
        '1 concept créatif adapté à votre identité',
        'Format principal 9:16 (Reels, TikTok, Ads)',
        'Sound design & mixage audio immersif',
        '1 série de corrections incluse (Offre de lancement)',
        'Première version sous 5 jours ouvrables',
      ],
      en: [
        '1 short commercial (final duration: 10 to 15 seconds)',
        '1 creative concept tailored to your identity',
        'Primary 9:16 vertical format (Reels, TikTok, Ads)',
        'Immersive sound design & audio mix',
        '1 revision round included (Launch offer)',
        'First cut delivered within 5 business days',
      ],
    },
    icon: Clapperboard,
  },
  {
    id: 'pub-produits',
    number: '02',
    letterCode: 'A2',
    title: {
      fr: 'Publicités Produits & E-commerce',
      en: 'Product Commercials & E-commerce',
    },
    tagline: {
      fr: 'Packshots dynamiques & création publicitaire courte',
      en: 'Dynamic packshots & short-form commercial ads',
    },
    descriptionLines: {
      fr: [
        'Sublimation de vos produits sous des angles et éclairages cinématographiques',
        'Mise en avant des détails, matières et de l\'usage concret de votre produit',
        'Création publicitaire courte conçue pour susciter l\'intérêt et l\'engagement',
        'Adaptation aux exigences des campagnes sociales et digitales',
      ],
      en: [
        'Elevating your products under cinematic angles and bespoke lighting',
        'Highlighting fine details, premium materials, and product in-use',
        'Short-form ad creation designed to spark curiosity and user action',
        'Tailored for paid social campaigns and digital brand acquisition',
      ],
    },
    deliverables: {
      fr: [
        'Scénarisation & packshots cinématiques',
        'Format principal vertical 9:16 ou déclinaison 16:9',
        'Sound design & mix audio calibré',
        'Première version sous 5 jours ouvrables (Offre de lancement)',
        'Export haute définition prêt à diffuser',
      ],
      en: [
        'Scripting & cinematic product packshots',
        'Primary 9:16 vertical format or 16:9 cut',
        'Bespoke sound design & calibrated audio mix',
        'First cut within 5 business days (Launch offer)',
        'High-definition export ready for broadcasting',
      ],
    },
    icon: Film,
  },
  {
    id: 'direction-artistique',
    number: '03',
    letterCode: 'A3',
    title: {
      fr: 'Direction Artistique & Univers de Marque',
      en: 'Art Direction & Brand Worlds',
    },
    tagline: {
      fr: 'Moodboards cinématographiques & bibles visuelles',
      en: 'Cinematic moodboards & visual style bibles',
    },
    descriptionLines: {
      fr: [
        'Accompagnement créatif stratégique pour marques et créateurs',
        'Définition d\'une grammaire esthétique cohérente et distinctive',
        'Création de moodboards, keyframes de référence et palettes chromatiques',
        'Cohérence visuelle assurée entre toutes vos prises de parole',
      ],
      en: [
        'Strategic creative direction for brands and innovators',
        'Defining a distinct, coherent aesthetic visual language',
        'Moodboards, reference keyframes, and tailored color grading palettes',
        'Consistent artistic continuity across all communication touchpoints',
      ],
    },
    deliverables: {
      fr: [
        'Guide de style visuel & moodboards de marque',
        'Keyframes de référence haute définition',
        'Palettes chromatiques & univers de textures',
        'Consulting créatif & accompagnement dédié',
      ],
      en: [
        'Visual style guide & brand moodboards',
        'High-definition reference keyframes',
        'Color grading palettes & texture styling',
        'Creative consulting & dedicated direction',
      ],
    },
    icon: Palette,
  },
  {
    id: 'partenariat-agences',
    number: '04',
    letterCode: 'A4',
    title: {
      fr: 'Partenariat Agences (Marque Blanche)',
      en: 'Agency Partner (White-Label)',
    },
    tagline: {
      fr: 'Production vidéo & IA externalisée en marque blanche',
      en: 'Outsourced white-label AI video production',
    },
    descriptionLines: {
      fr: [
        'Capacité de production vidéo et générative en marque blanche',
        'Exécution discrète pour agences de publicité, créatives et médias',
        'Accord de confidentialité strict (NDA) et cession intégrale des droits',
        'Respect rigoureux des plannings de vos clients finaux',
      ],
      en: [
        'White-label video and generative production capacity',
        'Discreet execution for ad agencies, creative boutiques, and media brands',
        'Strict non-disclosure agreements (NDA) and 100% IP rights assignment',
        'Rigorous adherence to your clients’ delivery deadlines',
      ],
    },
    deliverables: {
      fr: [
        'Exécution 100 % marque blanche (White-Label)',
        'Accord de confidentialité (NDA) & cession totale des droits',
        'Formats prêts à diffuser pour vos clients finaux',
        'Interlocuteur dédié & devis sur-mesure sous 24h',
      ],
      en: [
        '100% White-label production delivery',
        'Strict NDA & full IP rights assignment',
        'Broadcast-ready assets for your end clients',
        'Dedicated production lead & 24h quote turnaround',
      ],
    },
    icon: Building2,
  },
  {
    id: 'clips-sur-mesure',
    number: '05',
    letterCode: 'A5',
    title: {
      fr: 'Clips Vidéos & Projets Sur-Mesure',
      en: 'Music Videos & Custom Projects',
    },
    tagline: {
      fr: 'Clips musicaux, visuels scéniques & fictions courtes',
      en: 'Music videos, stage visuals & short fiction',
    },
    descriptionLines: {
      fr: [
        'Traduction d\'un univers sonore ou narratif en images marquantes',
        'Synchronisation précise sur le tempo, la rythmique et les impacts sonores',
        'Scénographie visuelle sur-mesure pour artistes, labels et créateurs',
        'Projets plus complexes ou formats narratifs : sur devis',
      ],
      en: [
        'Translating sound identities or narrative concepts into impactful imagery',
        'Precise synchronization to musical tempo, rhythm, and sonic impacts',
        'Custom scenography for artists, record labels, and creative storytellers',
        'Complex productions or longer narrative formats: custom quote',
      ],
    },
    deliverables: {
      fr: [
        'Storyboard & scénarisation complète',
        'Génération calée sur le tempo musical',
        'Formats réseaux (9:16) et écrans larges (16:9)',
        'Master final haute qualité sur devis',
      ],
      en: [
        'Complete storyboard & script development',
        'Generation synced to musical tempo / BPM',
        'Social cuts (9:16) & widescreen masters (16:9)',
        'High-quality final master upon custom quote',
      ],
    },
    icon: Music2,
  },
];

const SERVICES_SHOWCASE_VIDEOS: VideoItem[] = [
  {
    src: LOCAL_VIDEOS.spec01.src,
    webmSrc: LOCAL_VIDEOS.spec01.webmSrc,
    poster: LOCAL_VIDEOS.spec01.poster,
    youtubeId: YOUTUBE_VIDEOS.servicesShowcase1,
    title: {
      fr: 'CONCEPT 01 — LE DERNIER BURGER',
      en: 'CONCEPT 01 — THE LAST BURGER',
    },
    description: {
      fr: 'Concept publicitaire OVIZai — Démontrer immédiatement le produit, les textures, l’appétence, la qualité cinématographique et la capacité à transformer un produit culinaire en publicité courte.',
      en: 'OVIZai advertising concept — Immediately showcasing the product, textures, appetite appeal, cinematic quality, and the ability to turn a culinary item into a compelling short ad.',
    },
    uploadDate: '2026-09-01',
    relatedServiceId: 'pub-restaurants',
    badge: { fr: 'CONCEPT PUBLICITAIRE', en: 'ADVERTISING CONCEPT' },
  },
  {
    src: LOCAL_VIDEOS.spec02.src,
    webmSrc: LOCAL_VIDEOS.spec02.webmSrc,
    poster: LOCAL_VIDEOS.spec02.poster,
    youtubeId: YOUTUBE_VIDEOS.servicesShowcase2,
    title: {
      fr: 'CONCEPT 02 — APRÈS LA FERMETURE',
      en: 'CONCEPT 02 — AFTER CLOSING',
    },
    description: {
      fr: 'Projet conceptuel OVIZai — Montrer qu’OVIZai sait créer une publicité courte autour d’un établissement, d’une atmosphère nocturne, d’une expérience et d’une identité de lieu.',
      en: 'OVIZai concept project — Demonstrating how OVIZai crafts a short ad around an establishment, nighttime atmosphere, real experience, and venue identity.',
    },
    uploadDate: '2026-09-01',
    relatedServiceId: 'pub-restaurants',
    badge: { fr: 'PROJET CONCEPTUEL OVIZAI', en: 'OVIZAI CONCEPT PROJECT' },
  },
];

export default function ServicesGrid({ lang }: ServicesGridProps) {
  const isFr = lang === 'fr';
  const [openService, setOpenService] = useState<string | null>(null);
  const [isDemosOpen, setIsDemosOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const checkHash = () => {
        if (window.location.hash === '#portfolio') {
          setIsDemosOpen(true);
          setTimeout(() => {
            const el = document.getElementById('portfolio');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }, 150);
        }
      };
      checkHash();
      window.addEventListener('hashchange', checkHash);
      return () => window.removeEventListener('hashchange', checkHash);
    }
  }, []);

  const toggleService = (id: string) => {
    setOpenService((prev) => (prev === id ? null : id));
  };

  const serviceItems: ListMenuItem[] = FIVE_SERVICES.map((service) => {
    const isOpen = openService === service.id;
    const mapInfo = SERVICE_TYPE_MAP[service.id];
    const isLaunchEligible = service.id === 'pub-restaurants' || service.id === 'pub-produits';
    const quoteHref = `/contact?service=${service.id}&type=${mapInfo.type}&budget=${mapInfo.budget}`;

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
              {isFr ? 'Périmètre & Livrables' : 'Scope & Deliverables'}
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
          <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-2 border-t border-white/[0.06]">
            {isLaunchEligible && (
              <Link
                href="/tarifs"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 bg-gold/15 hover:bg-gold/25 border border-gold/40 text-gold-bright font-bold px-3.5 py-2 rounded-xl mono text-xs uppercase tracking-wider transition-all min-h-[44px]"
              >
                <span>{isFr ? 'Voir l’Offre de Lancement (530 $) →' : 'View Launch Offer ($530) →'}</span>
              </Link>
            )}
            <Link
              href={quoteHref}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold-bright text-black font-bold px-4 py-2.5 rounded-xl mono text-xs uppercase tracking-wider transition-all min-h-[44px]"
            >
              <span>{isFr ? 'Démarrer un projet avec ce service →' : 'Start a project with this service →'}</span>
              <ArrowUpRight className="w-4 h-4 text-black" />
            </Link>
          </div>
        </div>
      ),
    };
  });

  return (
    <section id="services" className="max-w-xl mx-auto mb-0.5 sm:mb-1.5 px-4">
      {/* 5 Services List in Unified ListMenuCard */}
      <ListMenuCard
        items={serviceItems}
        className="mb-1 sm:mb-1.5"
      />

      {/* Video Showcase Section (Collapsible accordion, closed by default, opens with #portfolio) */}
      <div id="portfolio" className="mt-1 sm:mt-1.5 scroll-mt-20">
        <div className="ovizai-card border border-border bg-card rounded-xl overflow-hidden">
          <button
            type="button"
            onClick={() => setIsDemosOpen((prev) => !prev)}
            aria-expanded={isDemosOpen}
            className="w-full flex items-center justify-between gap-3 px-3 sm:px-3.5 py-1 sm:py-1.5 text-left hover:bg-white/[0.025] transition-colors cursor-pointer group"
          >
            <div className="flex flex-col min-w-0">
              <span className="mono text-[8.5px] sm:text-[9px] uppercase tracking-[0.18em] text-gold font-bold block mb-0.5">
                {isFr ? 'PORTFOLIO & RÉALISATIONS' : 'PORTFOLIO & WORK'}
              </span>
              <h3 className="mono text-[11px] sm:text-xs font-semibold text-fg group-hover:text-gold-bright transition-colors truncate">
                {isFr ? 'Concepts Publicitaires & Études Visuelles (2)' : 'Advertising Concepts & Visual Studies (2)'}
              </h3>
            </div>

            <span className="mono text-xs sm:text-[13px] text-gold group-hover:text-gold-bright transition-colors font-medium flex-shrink-0 ml-2">
              {isDemosOpen ? '↑' : '↓'}
            </span>
          </button>

          {isDemosOpen && (
            <div className="p-4 sm:p-5 border-t border-border animate-fadeIn space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {SERVICES_SHOWCASE_VIDEOS.map((video, idx) => (
                  <VideoShowcase key={video.src || video.youtubeId || idx} video={video} lang={lang} />
                ))}
              </div>

              {/* Product Fidelity & Brand Integrity Note */}
              <div className="bg-black/50 border border-white/[0.08] rounded-xl p-4 sm:p-5 text-left space-y-3">
                <div className="flex items-center gap-2">
                  <span className="mono text-[9px] uppercase tracking-[0.2em] text-gold font-bold bg-gold/10 border border-gold/20 px-2 py-0.5 rounded">
                    {isFr ? 'MÉTHODOLOGIE & FIDÉLITÉ PRODUIT' : 'METHODOLOGY & PRODUCT FIDELITY'}
                  </span>
                </div>
                <div>
                  <h4 className="mono text-xs sm:text-[13px] font-semibold text-fg mb-1">
                    {isFr ? 'Préservation de l’Intégrité de Marque & Produits Réels' : 'Brand Integrity & Real Product Preservation'}
                  </h4>
                  <p className="text-xs text-muted leading-relaxed">
                    {isFr
                      ? 'Notre processus intègre vos packshots et assets de référence pour respecter fidèlement emballages, logos lisibles, proportions et teintes de votre marque. Chaque projet fait l’objet d’une validation sur prévisualisation avant livraison du master final.'
                      : 'Our workflow integrates your reference packshots and assets to faithfully preserve real packaging, readable logos, accurate proportions, and brand colors. Every project undergoes preview validation prior to final master delivery.'}
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-[11px] font-mono text-fg/80">
                  <div className="flex items-center gap-2 bg-black/40 p-2 rounded-lg border border-white/[0.04]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                    <span>{isFr ? 'Logos lisibles & proportions fidèles' : 'Readable logos & accurate proportions'}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-black/40 p-2 rounded-lg border border-white/[0.04]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                    <span>{isFr ? 'Validation préalable sur prévisualisation' : 'Systematic preview cut validation'}</span>
                  </div>
                </div>
                <p className="text-[10px] font-mono text-muted/70 italic">
                  {isFr
                    ? 'Note : Démonstration spécifique de fidélité produit (Gravity / Packshot) en cours d’intégration au portfolio.'
                    : 'Note: Dedicated product fidelity demonstration (Gravity / Packshot) in progress for portfolio integration.'}
                </p>
              </div>

              {/* Guarantees & Production Process */}
              <TrustSection lang={lang} hideProcessStep={true} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
