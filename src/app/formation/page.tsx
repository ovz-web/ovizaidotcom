'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import FilmGrain from '@/components/FilmGrain';
import TopBar from '@/components/TopBar';
import Footer from '@/components/Footer';
import { useLanguage } from '@/context/LanguageContext';
import { FORMATION_OFFER } from '@/lib/formation';

export default function FormationPage() {
  const { lang, toggleLanguage } = useLanguage();
  const isFr = lang === 'fr';

  return (
    <div className="min-h-[100dvh] relative flex flex-col justify-between overflow-x-hidden bg-bg text-fg">
      <FilmGrain />
      <TopBar lang={lang} onToggleLang={toggleLanguage} />

      <main id="main-content" className="flex-grow flex items-center justify-center relative z-10 px-4 sm:px-6 py-20 sm:py-28">
        <div className="max-w-2xl mx-auto space-y-10 text-center sm:text-left">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/[0.08] bg-white/[0.02]">
            <span className="mono text-xs uppercase tracking-[0.2em] text-gold font-bold">
              {FORMATION_OFFER.title[lang]}
            </span>
          </div>

          {/* Headline */}
          <div className="space-y-4">
            <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-fg uppercase tracking-tight leading-[1.08]">
              {isFr ? (
                <>
                  <span className="block">LA MÉTHODE DERRIÈRE</span>
                  <span className="block text-gold-gradient">NOS PRODUCTIONS</span>
                </>
              ) : (
                <>
                  <span className="block">THE METHODOLOGY BEHIND</span>
                  <span className="block text-gold-gradient">OUR PRODUCTIONS</span>
                </>
              )}
            </h1>

            <p className="text-base sm:text-lg text-muted/90 max-w-xl leading-relaxed">
              {isFr
                ? 'Une transmission directe de nos processus de création : de la direction artistique au montage et au sound design final'
                : 'A direct transmission of our creative workflow: from art direction to editing and final sound design'}
            </p>
          </div>

          {/* Points clés éditoriaux */}
          <div className="border-t border-white/[0.08] pt-8 space-y-4 text-left">
            {FORMATION_OFFER.outcomes[lang].map((outcome, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <span className="mono text-xs text-gold/80 font-bold tracking-widest pt-1 shrink-0">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <p className="text-sm sm:text-base text-fg/90 leading-relaxed">{outcome}</p>
              </div>
            ))}
          </div>

          {/* Statut & Action — Épure éditoriale avec filet fin */}
          <div className="border-t border-white/[0.08] pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <span className="mono text-xs uppercase tracking-widest text-gold font-bold block mb-1">
                {isFr ? 'STATUT' : 'STATUS'}
              </span>
              <p className="text-sm text-fg/90">
                {isFr ? 'Playbook en cours de finalisation' : 'Playbook currently in final preparation'}
              </p>
            </div>

            <Link
              href="/contact?topic=formation"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gold hover:bg-gold-bright text-black font-semibold text-xs mono uppercase tracking-wider transition-all shrink-0"
            >
              <span>{isFr ? 'ÊTRE PRÉVENU DE L’OUVERTURE' : 'BE NOTIFIED ON LAUNCH'}</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-black" />
            </Link>
          </div>

          <div className="pt-2 text-center sm:text-left">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs mono uppercase tracking-wider text-muted hover:text-gold transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{isFr ? 'Retour à l’accueil' : 'Back to home'}</span>
            </Link>
          </div>
        </div>
      </main>

      <Footer lang={lang} onToggleLang={toggleLanguage} />
    </div>
  );
}
