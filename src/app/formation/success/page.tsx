'use client';

import React from 'react';
import Link from 'next/link';
import { CheckCircle2, Mail } from 'lucide-react';
import FilmGrain from '@/components/FilmGrain';
import TopBar from '@/components/TopBar';
import Footer from '@/components/Footer';
import { useLanguage } from '@/context/LanguageContext';

export default function FormationSuccessPage() {
  const { lang, toggleLanguage } = useLanguage();
  const isFr = lang === 'fr';

  return (
    <div className="min-h-[100dvh] relative flex flex-col justify-between overflow-x-hidden bg-bg text-fg">
      <FilmGrain />
      <TopBar lang={lang} onToggleLang={toggleLanguage} />

      <main
        id="main-content"
        className="flex-grow relative z-10 pb-16 px-4 flex items-center justify-center pt-24"
      >
        <div className="max-w-xl mx-auto w-full">
          <div className="bg-[#11100e] border border-gold/40 rounded-3xl p-8 sm:p-12 text-center space-y-6">
            <div className="w-16 h-16 bg-gold/10 border border-gold/40 rounded-full flex items-center justify-center mx-auto text-gold">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-gold mb-1 mono font-bold">
                {isFr ? 'ACCÈS VALIDÉ' : 'ACCESS GRANTED'}
              </p>
              <h1 className="text-2xl sm:text-3xl font-display font-bold text-fg mb-2">
                {isFr ? 'Transaction confirmée' : 'Transaction confirmed'}
              </h1>
              <p className="text-sm text-muted max-w-md mx-auto leading-relaxed">
                {isFr
                  ? 'Un e-mail de confirmation contenant vos accès vous a été adressé.'
                  : 'A confirmation email containing your access details has been dispatched.'}
              </p>
            </div>

            <div className="bg-black/60 border border-white/[0.08] rounded-xl p-5 text-left text-xs font-mono text-muted space-y-2">
              <div className="flex items-center gap-2 text-gold font-bold">
                <Mail className="w-4 h-4" />
                <span>SUPPORT DIRECT :</span>
              </div>
              <p>contact@ovizai.com</p>
            </div>

            <div>
              <Link
                href="/"
                className="inline-flex items-center justify-center bg-gold text-black font-bold px-8 py-3.5 rounded-full mono text-xs uppercase tracking-wider"
              >
                {isFr ? 'Retour à l’Accueil' : 'Return to Home'}
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer lang={lang} onToggleLang={toggleLanguage} />
    </div>
  );
}
