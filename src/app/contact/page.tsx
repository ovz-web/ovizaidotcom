'use client';

import React, { Suspense, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import FilmGrain from '@/components/FilmGrain';
import TopBar from '@/components/TopBar';
import QualifiedContact from '@/components/QualifiedContact';
import Footer from '@/components/Footer';
import Toast from '@/components/Toast';
import { useLanguage } from '@/context/LanguageContext';
import { useCurrency } from '@/context/CurrencyContext';

function ContactPageContent() {
  const { lang, toggleLanguage } = useLanguage();
  const { currency, setCurrency } = useCurrency();
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const serviceId = searchParams.get('service');

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  const isFr = lang === 'fr';

  return (
    <div className="min-h-screen relative flex flex-col justify-[#bg] text-fg overflow-x-hidden">
      <FilmGrain />
      <TopBar
        lang={lang}
        onToggleLang={toggleLanguage}
        currency={currency}
        onSelectCurrency={setCurrency}
      />

      <main className="flex-grow relative z-10 pt-20 pb-12">
        <div className="max-w-3xl mx-auto px-4">
<Link
  href="/"
  className="inline-flex items-center gap-2 text-xs font-mono text-[#8C8375] hover:text-[#CAA243] transition-colors mb-6"
>
  <ArrowLeft className="w-3.5 h-3.5" />
  <span>{lang === 'fr' ? 'Retour Accueil' : 'Back Home'}</span>
</Link>

        </div>

        <QualifiedContact
          lang={lang}
          currency={currency}
          onSelectCurrency={setCurrency}
          initialServiceId={serviceId}
        />
      </main>

      <Footer lang={lang} onShowToast={showToast} />
      <Toast message={toastMessage} />
    </div>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-bg" />}>
      <ContactPageContent />
    </Suspense>
  );
}
