'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, CheckCircle2 } from 'lucide-react';
import { Language } from '@/types';

interface ProductionMethodProps {
  lang: Language;
}

export default function ProductionMethod({ lang }: ProductionMethodProps) {
  const isFr = lang === 'fr';
  const [showDetails, setShowDetails] = useState(false);

  const steps = [
    {
      num: '01',
      title: isFr ? 'BRIEF' : 'BRIEF',
      lead: isFr
        ? 'Nous définissons le produit, le message et l’objectif.'
        : 'We define the product, the core message, and your campaign objective.',
      details: isFr
        ? 'Vous partagez vos éléments (produit, identité, logo, ton) et vos intentions. Nous cadrons le format et le calendrier de livraison.'
        : 'You share your brand assets (product, logo, style, tone) and goals. We lock in the format, schedule and delivery timeline.',
    },
    {
      num: '02',
      title: isFr ? 'DIRECTION' : 'DIRECTION',
      lead: isFr
        ? 'OVIZai développe le concept et la direction visuelle.'
        : 'OVIZai develops the creative concept and visual direction.',
      details: isFr
        ? 'Storyboard, intentions de plans, composition visuelle et ambiance sonore validés en amont pour garantir la cohérence du film.'
        : 'Storyboard, shot intentions, visual framing and sonic moodboard aligned upfront to guarantee film cohesion.',
    },
    {
      num: '03',
      title: isFr ? 'PRODUCTION' : 'PRODUCTION',
      lead: isFr
        ? 'Nous produisons, montons et finalisons la publicité.'
        : 'We produce, edit, design sound, and master the final commercial.',
      details: isFr
        ? 'Génération visuelle haute fidélité, animation, étalonnage couleur cinéma, sound design immersif et intégration de votre logo final.'
        : 'High-fidelity visual generation, animation, cinematic color grading, immersive sound design, and clean end-card branding.',
    },
  ];

  return (
    <section id="methode" className="py-16 sm:py-24 px-4 sm:px-6 max-w-5xl mx-auto border-t border-white/[0.06]">
      {/* Section Heading */}
      <div className="text-center mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 mb-3">
          <span className="mono text-xs sm:text-sm uppercase tracking-[0.2em] text-gold font-bold">
            {isFr ? '03 // LA MÉTHODE' : '03 // THE METHOD'}
          </span>
        </div>
        <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-fg tracking-tight uppercase leading-tight mb-4">
          {isFr ? 'DE L’IDÉE AU FILM FINALISÉ' : 'FROM CONCEPT TO FINAL FILM'}
        </h2>
        <p className="text-base sm:text-lg text-muted max-w-xl mx-auto">
          {isFr
            ? 'Trois étapes limpides · Une direction créative rigoureuse'
            : 'Three clear steps · Rigorous creative direction'}
        </p>
      </div>

      {/* 3 Steps Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-8">
        {steps.map((step) => (
          <div
            key={step.num}
            className="bg-[#11100e] border border-white/[0.08] rounded-2xl p-6 sm:p-8 flex flex-col justify-between"
          >
            <div>
              <div className="mono text-sm font-bold text-gold tracking-widest mb-4">
                {step.num}
              </div>
              <h3 className="font-display font-bold text-xl sm:text-2xl text-fg uppercase tracking-tight mb-3">
                {step.title}
              </h3>
              <p className="text-base text-fg/90 font-medium leading-snug mb-3">
                {step.lead}
              </p>
              {showDetails && (
                <p className="text-sm text-muted leading-relaxed pt-2 border-t border-white/[0.06] animate-fadeIn">
                  {step.details}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Progressive Disclosure Toggle */}
      <div className="text-center">
        <button
          type="button"
          onClick={() => setShowDetails(!showDetails)}
          className="inline-flex items-center gap-2 text-xs sm:text-sm mono uppercase tracking-wider text-muted hover:text-gold transition-colors py-2 px-4 rounded-full border border-white/[0.08] hover:border-gold/40 cursor-pointer"
          aria-expanded={showDetails}
        >
          <span>
            {showDetails
              ? (isFr ? 'Masquer les détails' : 'Hide details')
              : (isFr ? 'Voir les détails de production' : 'View production details')}
          </span>
          {showDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>
    </section>
  );
}
