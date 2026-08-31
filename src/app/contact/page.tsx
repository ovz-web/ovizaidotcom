'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import FilmGrain from '@/components/FilmGrain';
import TopBar from '@/components/TopBar';
import QualifiedContact from '@/components/QualifiedContact';
import Footer from '@/components/Footer';
import Toast from '@/components/Toast';
import { Language } from '@/types';

export default function ContactPage() {
  const [lang, setLang] = useState<Language>('fr');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const toggleLanguage = () => {
    setLang(prev => (prev === 'fr' ? 'en' : 'fr'));
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  const isFr = lang === 'fr';

  return (
    <div className="min-h-screen relative flex flex-col justify-between overflow-x-hidden bg-bg text-fg">
      <FilmGrain />
      <TopBar lang={lang} onToggleLang={toggleLanguage} />

      <main className="flex-grow relative z-10 pt-20 pb-12">
        <div className="max-w-3xl mx-auto px-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-[#8C8375] hover:text-[#CAA243] mb-4 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{isFr ? '← Retour Accueil' : '← Back Home'}</span>
          </Link>
        </div>

        <QualifiedContact lang={lang} onShowToast={showToast} />
      </main>

      <Footer lang={lang} onShowToast={showToast} />
      <Toast message={toastMessage} />
    </div>
  );
}
