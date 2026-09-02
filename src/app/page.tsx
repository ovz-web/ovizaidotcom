'use client';

import React, { useState, useEffect } from 'react';
import FilmGrain from '@/components/FilmGrain';
import TopBar from '@/components/TopBar';
import HeroBrutalist from '@/components/HeroBrutalist';
import VideoSection from '@/components/VideoSection';
import CommandMenu from '@/components/CommandMenu';
import HeroActions from '@/components/HeroActions';
import TrustSection from '@/components/TrustSection';
import NewsletterForm from '@/components/NewsletterForm';
import Toast from '@/components/Toast';
import Footer from '@/components/Footer';
import { useLanguage } from '@/context/LanguageContext';
import { useCurrency } from '@/context/CurrencyContext';
import { YOUTUBE_VIDEOS } from '@/lib/videos';

export default function Home() {
  const { lang, toggleLanguage } = useLanguage();
  const { currency, setCurrency } = useCurrency();
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => {
      setToastMessage(null);
    }, 2400);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  return (
    <div className="min-h-screen relative flex flex-col justify-between overflow-x-hidden bg-bg text-fg">
      {/* 35mm Silver Film Grain Filter */}
      <FilmGrain />

      {/* 1. Single 100% Fixed Persistent TopBar */}
      <TopBar
        lang={lang}
        onToggleLang={toggleLanguage}
        currency={currency}
        onSelectCurrency={setCurrency}
      />

      {/* Main Content Area */}
      <main className="flex-grow relative z-10 pt-16 sm:pt-20">
        {/* 2. Minimalist Hero Section */}
        <HeroBrutalist lang={lang} />

        {/* 3. Showreel & Visual Proof Video Section */}
        <VideoSection
          lang={lang}
          video1YoutubeId={YOUTUBE_VIDEOS.homeShowreel1}
          video2YoutubeId={YOUTUBE_VIDEOS.homeShowreel2}
        />

        {/* 4. Central Bento Command Card Hub */}
        <CommandMenu lang={lang} onShowToast={showToast} />

        {/* 5. Primary CTA Action Button */}
        <HeroActions lang={lang} />

        {/* 6. Factual Trust & Method Section */}
        <TrustSection lang={lang} />

        {/* 7. Newsletter & Free Prompts Capture */}
        <NewsletterForm lang={lang} onShowToast={showToast} />
      </main>

      {/* 8. Footer with social links & legal */}
      <Footer lang={lang} onShowToast={showToast} />

      {/* Gold Toast Notification Bar */}
      <Toast message={toastMessage} />
    </div>
  );
}
