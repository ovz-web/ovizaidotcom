'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, ArrowLeft, Mail, BookOpen } from 'lucide-react';
import FilmGrain from '@/components/FilmGrain';
import TopBar from '@/components/TopBar';
import Footer from '@/components/Footer';
import Toast from '@/components/Toast';
import { useLanguage } from '@/context/LanguageContext';
import { useCurrency } from '@/context/CurrencyContext';

export default function FormationSuccessPage() {
  const { lang, toggleLanguage } = useLanguage();
  const { currency, setCurrency } = useCurrency();
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  const isFr = lang === 'fr';

  return (
    <div className="min-h-screen relative flex flex-col justify-between overflow-x-hidden bg-bg text-fg">
      <FilmGrain />
      <TopBar
        lang={lang}
        onToggleLang={toggleLanguage}
        currency={currency}
        onSelectCurrency={setCurrency}
      />

      <main
        className="flex-grow relative z-10 pb-16 px-4"
        style={{ paddingTop: 'calc(var(--topbar-height, 48px) + 16px)' }}
      >
        <div className="relative max-w-6xl mx-auto mb-4 sm:mb-6">
          {/* Back Home Link */}
          <div className="flex justify-start sm:absolute sm:left-4 lg:left-6 sm:top-0 mb-3 sm:mb-0 z-20">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-border hover:border-gold/50 text-xs font-mono text-fg hover:text-gold-bright transition-all min-h-[36px] cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-gold" />
              <span>{isFr ? 'Retour Accueil' : 'Back Home'}</span>
            </Link>
          </div>
        </div>

        <div className="max-w-xl mx-auto">

          {/* Success Card */}
          <div className="ovizai-card border border-border-strong bg-card/95 backdrop-blur-md rounded-2xl p-6 sm:p-10 text-center space-y-6">
            <div className="w-16 h-16 bg-gold/10 border border-border-gold rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8 text-gold" />
            </div>

            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-gold mb-1 font-mono font-bold">
                {isFr ? 'PAIEMENT CONFIRMÉ & ACCÈS VALIDÉ' : 'PAYMENT CONFIRMED & ACCESS GRANTED'}
              </p>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight text-fg text-center mb-1.5 leading-snug">
                {isFr ? 'Bienvenue dans la Masterclass' : 'Welcome to the Masterclass'}
              </h1>
              <div className="text-xs sm:text-sm text-muted max-w-md mx-auto leading-relaxed space-y-1">
                {isFr ? (
                  <>
                    <p>Votre transaction Stripe a été traitée avec succès</p>
                    <p>Votre accès à vie au programme est officiellement activé</p>
                  </>
                ) : (
                  <>
                    <p>Your Stripe transaction was processed successfully</p>
                    <p>Your lifetime access to the program is officially active</p>
                  </>
                )}
              </div>
            </div>

            {/* Email Instructions Card */}
            <div className="bg-black/60 border border-border rounded-xl p-5 text-left space-y-3 max-w-lg mx-auto">
              <div className="flex items-center gap-2 text-gold font-mono text-xs font-bold uppercase">
                <Mail className="w-4 h-4 text-gold" />
                <span>{isFr ? 'Accès par e-mail en cours d’envoi' : 'Email access dispatching'}</span>
              </div>
              <div className="text-xs text-fg leading-relaxed space-y-1 font-sans">
                {isFr ? (
                  <>
                    <p>Un e-mail contenant vos accès personnels a été envoyé à votre adresse</p>
                    <p>Accédez directement aux 5 modules vidéo 4K et aux prompts certifiés</p>
                  </>
                ) : (
                  <>
                    <p>A confirmation email containing your personal access has been sent</p>
                    <p>Access all 5 4K video modules and certified prompt libraries</p>
                  </>
                )}
              </div>
              <div className="pt-2 border-t border-border flex items-center justify-between text-[11px] text-muted font-mono">
                <span>{isFr ? 'Support direct :' : 'Direct Support:'}</span>
                <a
                  href="mailto:contact@ovizai.com"
                  className="text-gold hover:underline"
                >
                  contact@ovizai.com
                </a>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Link
                href="/formation"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold-bright text-black font-bold px-6 py-3 rounded-xl mono text-xs uppercase tracking-wider transition-all cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-black" />
                <span>{isFr ? 'Consulter le Programme & Outils' : 'View Masterclass Curriculum'}</span>
              </Link>
              <Link
                href="/"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-black/40 hover:bg-white/[0.04] text-fg border border-border px-6 py-3 rounded-xl mono text-xs uppercase tracking-wider transition-all cursor-pointer"
              >
                <span>{isFr ? 'Retour à l’Accueil' : 'Return to Home'}</span>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer lang={lang} onShowToast={showToast} />
      <Toast message={toastMessage} />
    </div>
  );
}
