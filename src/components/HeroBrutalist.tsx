'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Play } from 'lucide-react';
import { Language } from '@/types';

interface HeroBrutalistProps {
  lang: Language;
}

export default function HeroBrutalist({ lang }: HeroBrutalistProps) {
  const isFr = lang === 'fr';

  return (
    <section className="relative z-10 max-w-xl mx-auto px-4 text-center">
      {/* Eyebrow — Positionnement clair dès la première seconde */}
      <p className="text-[8.5px] sm:text-[9.5px] uppercase tracking-[0.18em] sm:tracking-[0.22em] text-gold mb-0.5 font-mono font-bold">
        {isFr ? 'STUDIO DE CRÉATION PUBLICITAIRE · MARQUES & RESTAURANTS' : 'ADVERTISING CREATIVE STUDIO · BRANDS & VENUES'}
      </p>

      {/* Hero Logo - Responsive & Scaled */}
      <div className="relative flex items-center justify-center my-0.5 overflow-visible">
        <Image
          src="/logo.png"
          alt={isFr ? 'OVIZai — Logo Studio Créatif Publicitaire' : 'OVIZai — Creative Advertising Studio Logo'}
          width={240}
          height={240}
          className="h-[clamp(110px,22dvh,160px)] sm:h-[clamp(140px,18dvh,220px)] w-auto object-contain mix-blend-screen"
          priority
        />
      </div>

      {/* Main Title — Ce qu'OVIZai crée */}
      <h1 className="text-sm sm:text-lg md:text-xl font-semibold tracking-tight text-fg text-center mb-0.5 sm:mb-1 leading-tight">
        {isFr ? (
          <>
            PUBLICITÉS COURTES <span className="text-gold-gradient">À FORTE QUALITÉ VISUELLE</span>
          </>
        ) : (
          <>
            SHORT-FORM ADS <span className="text-gold-gradient">WITH HIGH VISUAL IMPACT</span>
          </>
        )}
      </h1>

      {/* Subtitle — Proposition de valeur en 1 phrase */}
      <p className="text-[10px] sm:text-xs text-muted max-w-xs sm:max-w-xl text-center mx-auto mb-2 leading-tight font-mono">
        {isFr
          ? 'Direction créative humaine et outils génératifs pour sublimer vos produits et établissements.'
          : 'Human creative direction and generative tools to elevate your products and venues.'}
      </p>

      {/* Action CTAs — Parcours commercial évident */}
      <div className="flex flex-row items-center justify-center gap-2 mb-1">
        <Link
          href="/tarifs"
          className="inline-flex items-center justify-center gap-1.5 bg-gold hover:bg-gold-bright text-black font-bold px-3.5 py-1.5 rounded-lg mono text-[10.5px] sm:text-xs uppercase tracking-wider transition-all hover:scale-[1.01] cursor-pointer min-h-[34px]"
        >
          <span>{isFr ? 'Offre de Lancement (530 $) →' : 'Launch Offer ($530) →'}</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-black" />
        </Link>

        <Link
          href="/services#portfolio"
          className="inline-flex items-center justify-center gap-1.5 bg-black/60 border border-white/[0.12] hover:border-gold/60 text-fg hover:text-gold-bright font-medium px-3 py-1.5 rounded-lg mono text-[10.5px] sm:text-xs uppercase tracking-wider transition-all min-h-[34px]"
        >
          <Play className="w-3 h-3 text-gold fill-gold" />
          <span>{isFr ? 'Voir les réalisations' : 'View Ad Concepts'}</span>
        </Link>
      </div>

      {/* Spacer matching Détails ↓ to guarantee identical box position */}
      <div className="hidden sm:flex w-full justify-end text-[8.5px] sm:text-[9.5px] tracking-wider font-mono px-1 mb-0.5 invisible select-none" aria-hidden="true">
        <span>&nbsp;</span>
      </div>
    </section>
  );
}