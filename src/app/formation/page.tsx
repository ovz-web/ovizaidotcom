'use client';

import React, { useState } from 'react';
import FilmGrain from '@/components/FilmGrain';
import TopBar from '@/components/TopBar';
import MasterclassSection from '@/components/MasterclassSection';
import AIPipeline from '@/components/AIPipeline';
import Footer from '@/components/Footer';
import Toast from '@/components/Toast';
import { Language } from '@/types';

export default function FormationPage() {
  const [lang, setLang] = useState<Language>('fr');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const toggleLanguage = () => {
    setLang(prev => (prev === 'fr' ? 'en' : 'fr'));
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  return (
    <div className="min-h-screen relative flex flex-col justify-between overflow-x-hidden bg-bg text-fg">
      <FilmGrain />
      <TopBar lang={lang} onToggleLang={toggleLanguage} />

      <main className="flex-grow relative z-10 pt-8 pb-12">
        {/* The 5 Masterclass Modules */}
        <MasterclassSection lang={lang} />

        {/* 06 // STACK TECHNIQUE & OUTILS DE LA MASTERCLASS */}
        <div id="stack">
          <AIPipeline
            lang={lang}
            customEyebrow={lang === 'fr' ? '06 // STACK TECHNIQUE & OUTILS DE LA MASTERCLASS' : '06 // MASTERCLASS TOOLSET & STACK'}
            customTitle={lang === 'fr' ? 'Moteurs Génératifs, Lip-Sync & Post-Production 4K' : 'Generative Engines, Lip-Sync & 4K Post-Production'}
          />
        </div>
      </main>

      <Footer lang={lang} onShowToast={showToast} />
      <Toast message={toastMessage} />
    </div>
  );
}
