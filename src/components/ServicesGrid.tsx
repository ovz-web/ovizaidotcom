'use client';

import React, { useState } from 'react';
import { Film, Music2, Clapperboard, Palette, Globe2, ChevronDown, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { Language } from '@/types';

interface ServicesGridProps {
  lang: Language;
}

const FIVE_SERVICES = [
  {
    id: 'films-series',
    number: '01',
    title: {
      fr: 'Réalisation de Films & Séries IA',
      en: 'AI Film & Series Direction'
    },
    tagline: {
      fr: 'Des films et séries entièrement générés ou augmentés par l\'IA, de l\'écriture au master final.',
      en: 'Films and series entirely generated or augmented by AI, from writing to final master.'
    },
    description: {
      fr: 'Nous prenons en charge l\'ensemble de la chaîne de production : développement du concept, écriture, storyboard IA, génération des plans 8K, montage rythmé et étalonnage cinématographique. Idéal pour courts-métrages, pilotes, teasers et contenus narratifs ambitieux sans contraintes de tournage.',
      en: 'We manage the entire production pipeline: concept development, scriptwriting, AI storyboarding, 8K shot generation, editing, and cinematic color grading. Ideal for short films, series pilots, and narrative teasers.'
    },
    deliverables: {
      fr: ['Concept & écriture', 'Storyboard IA', 'Génération des plans', 'Montage & étalonnage ACES', 'Sound design spatialisé', 'Livraison multi-formats (DCP / ProRes)'],
      en: ['Concept & Script', 'AI Storyboard', 'Shot Generation', 'ACES Editing & Grading', 'Spatial Sound Design', 'Multi-Format Delivery (DCP / ProRes)']
    },
    pricing: '8 000 € – 15 000 €+',
    icon: Film
  },
  {
    id: 'clips-visualisers',
    number: '02',
    title: {
      fr: 'Clips Vidéos IA & Visualisers',
      en: 'AI Music Videos & Stage Visualisers'
    },
    tagline: {
      fr: 'Des clips musicaux et scénographies à l\'esthétique unique, pensés pour marquer les esprits.',
      en: 'Unique aesthetic music videos and stage visualisers engineered to make an impact.'
    },
    description: {
      fr: 'De la direction artistique à la livraison finale, nous créons des clips vidéo qui subliment l\'univers de l\'artiste. Recherche visuelle, moodboards, séquences IA d\'animation, scénographies de scène (Bercy / Festivals) et formats verticaux optimisés.',
      en: 'From art direction to final delivery, we create music videos that elevate the artist\'s universe. Visual research, moodboards, AI animation sequences, stage visuals (Accor Arena / Festivals).'
    },
    deliverables: {
      fr: ['Direction artistique', 'Moodboard & références', 'Séquences IA animées', 'Montage rythmé', 'Effets VFX & Lip-sync', 'Formats réseaux sociaux (Vertical 9:16)'],
      en: ['Art Direction', 'Moodboards & References', 'Animated AI Sequences', 'Rhythmic Editing', 'VFX & Lip-sync Effects', 'Social Media Formats (9:16)']
    },
    pricing: '3 000 € – 8 000 €',
    icon: Music2
  },
  {
    id: 'pub-brand-content',
    number: '03',
    title: {
      fr: 'Publicités IA & Brand Content',
      en: 'AI Commercials & Brand Content'
    },
    tagline: {
      fr: 'Des campagnes publicitaires percutantes, produites plus vite et avec une créativité sans limite.',
      en: 'High-impact advertising campaigns produced faster with unlimited creative freedom.'
    },
    description: {
      fr: 'Spots publicitaires, contenus de marque et formats courts réseaux sociaux. Nous concevons des publicités sur-mesure intégrant votre charte de marque avec des itérations rapides et des déclinaisons multi-plateformes.',
      en: 'Commercial spots, brand content, and short social formats. We design custom ads integrating your brand guidelines with fast iterations and multi-platform variations.'
    },
    deliverables: {
      fr: ['Concept publicitaire', 'Script & storyboard', 'Production IA rapide', 'Déclinaisons multi-formats', 'Intégration charte de marque', 'Optimisation conversion'],
      en: ['Ad Concept', 'Script & Storyboard', 'Fast AI Production', 'Multi-Format Variants', 'Brandbook Integration', 'Conversion Optimization']
    },
    pricing: '3 000 € – 8 000 €',
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
      fr: 'Nous façonnons l\'identité visuelle complète de votre marque, du concept à l\'univers visuel génératif.',
      en: 'We shape your brand\'s complete visual identity from concept to generative visual universe.'
    },
    description: {
      fr: 'Direction artistique globale, création d\'univers visuels, chartes graphiques génératives et visuels clés. Nous accompagnons les marques et artistes dans la définition d\'un langage visuel fort, cohérent et différenciant.',
      en: 'Global art direction, visual universe creation, generative brandbooks, and key visuals. We define a strong, consistent, and unique visual language.'
    },
    deliverables: {
      fr: ['Direction artistique globale', 'Univers visuel génératif', 'Charte graphique & Brandbook', 'Visuels clés 8K', 'Guidelines de marque'],
      en: ['Global Art Direction', 'Generative Visual Universe', 'Brandbook & Guidelines', '8K Key Visuals', 'Brand Guidelines']
    },
    pricing: '1 500 € – 5 000 €',
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
      fr: 'Des sites web sur-mesure (Next.js / React), à l\'image de votre univers et optimisés pour convertir.',
      en: 'Custom Next.js/React websites aligned with your aesthetic and engineered for conversion.'
    },
    description: {
      fr: 'Conception et développement de sites vitrines, portfolios immersifs et landing pages haute performance. Design sur-mesure dark luxury, intégration responsive mobile-first, animations fluides et optimisation SEO de pointe.',
      en: 'Design and development of immersive portfolios and high-performance landing pages. Dark luxury design, mobile-first responsive integration, smooth animations, and advanced SEO.'
    },
    deliverables: {
      fr: ['Maquette & design UI/UX', 'Développement Next.js sur-mesure', 'Animations & interactions', 'SEO sémantique de base', 'Mise en ligne & hébergement'],
      en: ['UI/UX Design Mockup', 'Custom Next.js Development', 'Animations & Micro-Interactions', 'Semantic SEO', 'Deployment & Hosting']
    },
    pricing: '2 500 € – 6 000 €',
    icon: Globe2
  }
];

export default function ServicesGrid({ lang }: ServicesGridProps) {
  const isFr = lang === 'fr';
  const [openService, setOpenService] = useState<string | null>('films-series');

  const toggleService = (id: string) => {
    setOpenService(prev => (prev === id ? null : id));
  };

  const scrollToContact = (serviceTitle: string) => {
    const contactEl = document.querySelector('#contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="services" className="max-w-3xl mx-auto mb-14 px-4">
      {/* Section Header */}
      <div className="mb-8 text-center">
        <p className="mono text-[10px] tracking-[0.2em] uppercase text-[#CAA243] font-mono mb-1 font-bold">
          {isFr ? '01 // PÔLES D’EXPERTISE & PRESTATIONS' : '01 // SERVICES & CORE PILLARS'}
        </p>
        <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-[#ECE4D3] mb-2">
          {isFr ? 'CE QUE NOUS FAISONS' : 'WHAT WE DO'}
        </h2>
        <p className="text-xs sm:text-sm text-[#8c8375] max-w-md mx-auto">
          {isFr
            ? 'De la conception à la livraison finale, nous mettons l’intelligence artificielle au service de votre vision.'
            : 'From concept to final delivery, we put generative AI at the service of your creative vision.'}
        </p>
      </div>

      {/* Accordion / Details Grid */}
      <div className="space-y-4">
        {FIVE_SERVICES.map(service => {
          const IconComp = service.icon;
          const isOpen = openService === service.id;

          return (
            <div
              key={service.id}
              className={`border transition-all duration-300 rounded-xl overflow-hidden bg-[#0B0A08]/90 backdrop-blur-md ${
                isOpen
                  ? 'border-[#CAA243]/50 shadow-[0_0_25px_rgba(202,162,67,0.12)]'
                  : 'border-white/[0.08] hover:border-[#CAA243]/30'
              }`}
            >
              {/* Header Toggle Row */}
              <button
                type="button"
                onClick={() => toggleService(service.id)}
                className="w-full p-4 sm:p-5 flex items-center justify-between text-left cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-3.5 min-w-0 pr-2">
                  <span className="mono text-xs font-bold text-[#CAA243] bg-black/50 border border-[#CAA243]/30 px-2 py-1 rounded">
                    {service.number}
                  </span>
                  <div className="min-w-0">
                    <h3 className="mono text-sm sm:text-base font-bold text-[#ECE4D3] group-hover:text-[#f0c869] truncate">
                      {service.title[lang]}
                    </h3>
                    <p className="text-xs text-[#8c8375] mt-0.5 truncate hidden sm:block">
                      {service.tagline[lang]}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className="mono text-[10.5px] px-2.5 py-1 rounded bg-black/60 border border-white/[0.08] text-[#CAA243] font-semibold hidden md:inline-block">
                    {service.pricing}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#CAA243] transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : 'rotate-0'
                    }`}
                  />
                </div>
              </button>

              {/* Expandable Content Body */}
              {isOpen && (
                <div className="px-4 pb-5 sm:px-5 sm:pb-6 pt-2 border-t border-white/[0.06] bg-black/40">
                  <p className="text-xs sm:text-sm text-[#8c8375] leading-relaxed mb-4">
                    {service.description[lang]}
                  </p>

                  {/* Deliverables Grid */}
                  <div className="mb-5">
                    <h4 className="mono text-[11px] uppercase tracking-wider text-[#CAA243] font-bold mb-2.5 flex items-center gap-1.5">
                      <span>◆</span> {isFr ? 'CE QUE COMPREND LA PRESTATION :' : 'INCLUDED DELIVERABLES:'}
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {service.deliverables[lang].map((item, idx) => (
                        <div
                          key={`${service.id}-deliv-${idx}`}
                          className="flex items-center gap-2 text-xs text-[#ECE4D3]/90 bg-white/[0.02] border border-white/[0.06] p-2 rounded-lg"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#CAA243] flex-shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action CTA */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-white/[0.06]">
                    <span className="mono text-xs text-[#8c8375]">
                      {isFr ? 'Budget indicatif :' : 'Estimated Budget:'}{' '}
                      <strong className="text-[#CAA243]">{service.pricing}</strong>
                    </span>

                    <button
                      type="button"
                      onClick={() => scrollToContact(service.title[lang])}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#CAA243] hover:bg-[#f0c869] text-black font-bold px-4 py-2 rounded-lg mono text-xs uppercase tracking-wider transition-all cursor-pointer"
                    >
                      <span>{isFr ? 'Demander un Devis +' : 'Request Quote +'}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-black" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
