'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, ArrowLeft, Mail, ShieldCheck, Sparkles, BookOpen } from 'lucide-react';
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

      <main className="flex-grow relative z-10 pt-16 sm:pt-20 pb-16 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Back Home Link */}
          <Link
            href="/"
            className="font-mono text-xs text-[#8C8375] hover:text-[#CAA243] transition-colors inline-flex items-center gap-2 mb-6"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{isFr ? 'Retour Accueil' : 'Back Home'}</span>
          </Link>

          {/* Success Card */}
          <div className="border border-[#CAA243]/50 bg-[#0B0A08]/95 backdrop-blur-md rounded-2xl p-6 sm:p-10 shadow-[0_0_40px_rgba(202,162,67,0.15)] text-center space-y-6">
            <div className="w-16 h-16 bg-[#CAA243]/10 border border-[#CAA243] rounded-full flex items-center justify-center mx-auto shadow-[0_0_25px_rgba(202,162,67,0.2)]">
              <CheckCircle2 className="w-8 h-8 text-[#CAA243]" />
            </div>

            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-[#CAA243] mb-1 font-mono font-bold">
                {isFr ? 'PAIEMENT CONFIRMÉ & ACCÈS VALIDÉ' : 'PAYMENT CONFIRMED & ACCESS GRANTED'}
              </p>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight text-[#ECE4D3] text-center mb-1.5 leading-snug">
                {isFr ? 'Bienvenue dans la Masterclass' : 'Welcome to the Masterclass'}
              </h1>
              <p className="text-xs sm:text-sm text-[#8c8375] max-w-md mx-auto leading-relaxed">
                {isFr
                  ? 'Votre transaction Stripe a été traitée avec succès. Votre accès à vie au programme est officiellement activé.'
                  : 'Your Stripe payment was successfully processed. Your lifetime access to the masterclass is officially active.'}
              </p>
            </div>

            {/* Email Instructions Card */}
            <div className="bg-black/60 border border-white/[0.08] rounded-xl p-5 text-left space-y-3 max-w-lg mx-auto">
              <div className="flex items-center gap-2 text-[#CAA243] font-mono text-xs font-bold uppercase">
                <Mail className="w-4 h-4 text-[#CAA243]" />
                <span>{isFr ? 'Accès par e-mail en cours d’envoi' : 'Email access dispatching'}</span>
              </div>
              <p className="text-xs text-[#ECE4D3] leading-relaxed">
                {isFr
                  ? 'Un e-mail de confirmation contenant vos accès personnels, les liens vers les 5 modules vidéo 4K et les ressources privées a été envoyé à votre adresse e-mail.'
                  : 'A confirmation email containing your personal login credentials, access links to all 5 4K video modules, and private resources has been dispatched to your inbox.'}
              </p>
              <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-[#8c8375] font-mono">
                <span>{isFr ? 'Support direct :' : 'Direct Support:'}</span>
                <a
                  href="mailto:contact@ovizai.com"
                  className="text-[#CAA243] hover:underline"
                >
                  contact@ovizai.com
                </a>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Link
                href="/formation"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#CAA243] hover:bg-[#f0c869] text-black font-bold px-6 py-3 rounded-xl mono text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(202,162,67,0.3)] cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-black" />
                <span>{isFr ? 'Consulter le Programme & Outils' : 'View Masterclass Curriculum'}</span>
              </Link>
              <Link
                href="/"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-black/40 hover:bg-white/[0.04] text-[#ECE4D3] border border-white/[0.1] px-6 py-3 rounded-xl mono text-xs uppercase tracking-wider transition-all cursor-pointer"
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
