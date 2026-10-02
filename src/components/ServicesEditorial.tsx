'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, ArrowRight, Plus, Minus } from 'lucide-react';
import { Language } from '@/types';

interface ServicesEditorialProps {
  lang: Language;
}

export interface Discipline {
  id: string;
  number: string;
  title: { fr: string; en: string };
  phrase: { fr: string; en: string };
  details?: { fr: string; en: string };
}

export const FOUR_DISCIPLINES: Discipline[] = [
  {
    id: 'films-publicite',
    number: '01',
    title: {
      fr: 'FILMS & PUBLICITÉ',
      en: 'FILMS & ADVERTISING',
    },
    phrase: {
      fr: 'Des films conçus autour d’une idée forte, du concept au master final',
      en: 'Films crafted around a bold idea, from concept to final master',
    },
    details: {
      fr: 'Direction artistique, scénarisation, réalisation et sound design complet',
      en: 'Art direction, scriptwriting, direction and full immersive sound design',
    },
  },
  {
    id: 'produit-marque',
    number: '02',
    title: {
      fr: 'PRODUIT & MARQUE',
      en: 'PRODUCT & BRAND',
    },
    phrase: {
      fr: 'Lancements, campagnes et univers visuels pensés autour de votre produit',
      en: 'Launches, campaigns and visual worlds engineered around your product',
    },
    details: {
      fr: 'Mise en valeur cinématique, textures détaillées et identité visuelle singulière',
      en: 'Cinematic staging, rich textural detail and distinct visual identity',
    },
  },
  {
    id: 'musique-culture',
    number: '03',
    title: {
      fr: 'MUSIQUE & CULTURE',
      en: 'MUSIC & CULTURE',
    },
    phrase: {
      fr: 'Clips, séquences visuelles et projets pour artistes et univers culturels',
      en: 'Music videos, visual sequences and projects for artists and cultural worlds',
    },
    details: {
      fr: 'Vidéoclips narratifs, visualizers de scène et contenus artistiques immersifs',
      en: 'Narrative music videos, stage visualizers and immersive artistic content',
    },
  },
  {
    id: 'creative-production',
    number: '04',
    title: {
      fr: 'CREATIVE PRODUCTION',
      en: 'CREATIVE PRODUCTION',
    },
    phrase: {
      fr: 'Production sur mesure et marque blanche pour agences et studios',
      en: 'Custom production and white-label execution for agencies and studios',
    },
    details: {
      fr: 'Partenaire de production agile, déclinaisons créatives et intégration fluide',
      en: 'Agile production partner, creative adaptations and seamless workflow delivery',
    },
  },
];

export default function ServicesEditorial({ lang }: ServicesEditorialProps) {
  const isFr = lang === 'fr';
  const [activeId, setActiveId] = useState<string | null>(null);

  const toggleDiscipline = (id: string) => {
    setActiveId((curr) => (curr === id ? null : id));
  };

  return (
    <section className="w-full px-4 sm:px-6 pt-12 sm:pt-16 pb-20 sm:pb-28">
      <div className="max-w-4xl mx-auto">
        {/* En-tête éditorial */}
        <div className="mb-14 sm:mb-20 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/[0.08] bg-white/[0.02] mb-6">
            <span className="mono text-xs uppercase tracking-[0.2em] text-gold font-bold">
              {isFr ? 'EXPERTISES DU STUDIO' : 'STUDIO DISCIPLINES'}
            </span>
          </div>

          <h1 className="font-display font-extrabold text-3xl sm:text-5xl md:text-6xl text-fg uppercase tracking-tight leading-[1.08] mb-6">
            {isFr ? (
              <>
                <span className="block">DES IDÉES FORTES</span>
                <span className="block text-gold-gradient">UNE PRODUCTION PRÉCISE</span>
              </>
            ) : (
              <>
                <span className="block">STRONG IDEAS</span>
                <span className="block text-gold-gradient">PRECISE PRODUCTION</span>
              </>
            )}
          </h1>

          <p className="text-base sm:text-lg text-muted max-w-2xl leading-relaxed">
            {isFr
              ? 'OVIZai réalise des films, des publicités et des univers visuels sur mesure, sans limitation de durée ni de format'
              : 'OVIZai creates custom films, commercials and visual worlds with no restriction on length or aspect ratio'}
          </p>
        </div>

        {/* Liste éditoriale verticale — Style Le Labo Noir, identité OVIZai */}
        <div className="border-t border-white/[0.1] divide-y divide-white/[0.08]">
          {FOUR_DISCIPLINES.map((item) => {
            const isOpen = activeId === item.id;
            return (
              <div
                key={item.id}
                className="group py-8 sm:py-10 transition-colors hover:bg-white/[0.015] -mx-4 px-4 sm:-mx-6 sm:px-6 rounded-xl"
              >
                <button
                  type="button"
                  onClick={() => toggleDiscipline(item.id)}
                  aria-expanded={isOpen}
                  className="w-full flex items-start justify-between gap-6 text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-lg"
                >
                  <div className="space-y-3 max-w-2xl min-w-0">
                    {/* Numéro & Titre */}
                    <div className="flex items-baseline gap-4 sm:gap-6">
                      <span className="mono text-sm sm:text-base text-gold/80 font-bold tracking-widest shrink-0">
                        {item.number}
                      </span>
                      <h2 className="font-display font-extrabold text-xl sm:text-2xl md:text-3xl text-fg tracking-wide uppercase group-hover:text-gold transition-colors">
                        {item.title[lang]}
                      </h2>
                    </div>

                    {/* Une courte phrase */}
                    <p className="text-sm sm:text-base text-muted/90 pl-8 sm:pl-12 leading-relaxed">
                      {item.phrase[lang]}
                    </p>

                    {/* Révélation discrète au clic ou hover */}
                    {isOpen && item.details && (
                      <div className="pt-3 pl-8 sm:pl-12 animate-fadeIn">
                        <p className="text-xs sm:text-sm text-gold/90 font-mono tracking-wide">
                          {item.details[lang]}
                        </p>
                      </div>
                    )}
                  </div>

                  <span
                    className="p-2 text-muted/50 group-hover:text-gold transition-colors shrink-0 mt-1"
                    aria-hidden="true"
                  >
                    {isOpen ? <Minus className="w-5 h-5 text-gold" /> : <Plus className="w-5 h-5" />}
                  </span>
                </button>
              </div>
            );
          })}
        </div>

        {/* Section de conclusion : Deux entrées éditoriales simples (sans boîtes arrondies, même langage que la liste) */}
        <div className="mt-16 sm:mt-24 pt-8 border-t border-white/[0.1] divide-y divide-white/[0.08]">
          {/* Entrée 1: Offre de lancement */}
          <Link
            href="/tarifs"
            className="group block py-8 -mx-4 px-4 sm:-mx-6 sm:px-6 rounded-xl hover:bg-white/[0.015] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          >
            <div className="flex items-baseline justify-between gap-6 mb-2">
              <span className="mono text-xs uppercase tracking-widest text-gold font-bold">
                {isFr ? 'OFFRE DE LANCEMENT' : 'LAUNCH OFFER'}
              </span>
              <span className="font-display font-bold text-base text-fg group-hover:text-gold transition-colors flex items-center gap-1.5">
                <span>530 USD</span>
                <span className="text-gold group-hover:translate-x-1 transition-transform">→</span>
              </span>
            </div>
            <p className="text-sm sm:text-base text-muted/90 leading-relaxed max-w-2xl">
              {isFr
                ? 'Un premier projet publicitaire pour tester la méthode et découvrir le studio'
                : 'A first commercial project to experience our methodology and studio speed'}
            </p>
          </Link>

          {/* Entrée 2: Projet sur mesure */}
          <Link
            href="/contact?offer=custom"
            className="group block py-8 -mx-4 px-4 sm:-mx-6 sm:px-6 rounded-xl hover:bg-white/[0.015] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          >
            <div className="flex items-baseline justify-between gap-6 mb-2">
              <span className="mono text-xs uppercase tracking-widest text-fg/90 font-bold group-hover:text-gold transition-colors">
                {isFr ? 'PROJET SUR MESURE' : 'CUSTOM PROJECT'}
              </span>
              <span className="text-muted group-hover:text-gold transition-colors flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider">
                <span>{isFr ? 'Sur devis' : 'Custom Quote'}</span>
                <span className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">↗</span>
              </span>
            </div>
            <p className="text-sm sm:text-base text-muted/90 leading-relaxed max-w-2xl">
              {isFr
                ? 'Films, campagnes et productions selon le projet'
                : 'Films, campaigns and productions tailored to the project'}
            </p>
          </Link>
        </div>
      </div>
    </section>
  );
}
