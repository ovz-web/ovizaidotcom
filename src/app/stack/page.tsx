'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import FilmGrain from '@/components/FilmGrain';
import TopBar from '@/components/TopBar';
import AIPipeline from '@/components/AIPipeline';
import VideoSection from '@/components/VideoSection';
import TrustSection from '@/components/TrustSection';
import Footer from '@/components/Footer';
import Toast from '@/components/Toast';
import { useLanguage } from '@/context/LanguageContext';
import { useCurrency } from '@/context/CurrencyContext';
import { YOUTUBE_VIDEOS } from '@/lib/videos';

export default function StackPage() {
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

      <main className="flex-grow relative z-10 pt-16 sm:pt-20 pb-12">
        <div className="max-w-xl mx-auto px-4 mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-[#8C8375] hover:text-[#CAA243] transition-colors mb-6"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{isFr ? 'Retour Accueil' : 'Back Home'}</span>
          </Link>

          {/* 1. Client-Centric Intro Paragraph */}
          <div className="ovizai-card border border-white/[0.08] bg-[#0B0A08]/90 p-5 rounded-2xl mb-4">
            <span className="mono text-[10px] text-[#CAA243] uppercase tracking-widest font-bold block mb-1">
              {isFr ? 'DE VOTRE IDÉE À LA VIDÉO FINALE' : 'FROM YOUR IDEA TO FINAL VIDEO'}
            </span>
            <h1 className="text-base sm:text-lg font-bold text-[#ECE4D3] mb-2">
              {isFr ? 'Une méthode de production pensée pour votre résultat' : 'A production workflow engineered for your result'}
            </h1>
            <p className="text-xs text-[#9C9384] leading-relaxed">
              {isFr
                ? 'Nous combinons les meilleures technologies pour transformer vos intentions créatives en films haute définition, sans les contraintes de coût ou d’organisation d’un tournage traditionnel.'
                : 'We combine top generative technologies to turn your creative vision into high-definition films, free from the cost and logistics of traditional shoots.'}
            </p>
          </div>
        </div>

        {/* 2. 4-Step Production Method */}
        <AIPipeline
          lang={lang}
          customEyebrow={isFr ? '03 // NOTRE MÉTHODE DE PRODUCTION' : '03 // OUR PRODUCTION METHOD'}
          customTitle={isFr ? 'Le Processus de votre Idée au Rendu Final' : 'The Process from Idea to Final Master'}
          showConversionCard={false}
        />

        {/* 3. Video Showcase Section - Visual proof linking method to output */}
        <VideoSection
          lang={lang}
          video1YoutubeId={YOUTUBE_VIDEOS.homeShowreel1}
          video2YoutubeId={YOUTUBE_VIDEOS.homeShowreel2}
          customEyebrow={isFr ? 'PREUVE VISUELLE // WORKFLOWS 4K' : 'VISUAL PROOF // 4K WORKFLOWS'}
          customTitle={isFr ? 'Le résultat de cette méthode, en vidéo' : "This method's result, in video"}
          customSubtitle={isFr
            ? 'Découvrez des exemples de rendus créés grâce à ce pipeline en 4 étapes.'
            : 'Discover sample outputs created using this 4-step pipeline.'}
        />

        {/* 4. Trust & Commitments Section */}
        <TrustSection lang={lang} hideProcessStep={true} />

        {/* 5. Final Conversion Card */}
        <div className="max-w-xl mx-auto px-4 mt-2 mb-8">
          <div className="ovizai-card border border-[#CAA243]/30 bg-[#CAA243]/[0.03] p-5 rounded-2xl text-center">
            <span className="mono text-[10px] text-[#CAA243] uppercase tracking-widest font-bold block mb-1">
              {isFr ? 'UN PROCESSUS CLAIR, DES RÉSULTATS GARANTIS' : 'CLEAR PROCESS, GUARANTEED RESULTS'}
            </span>
            <h3 className="text-sm sm:text-base font-bold text-[#ECE4D3] mb-2">
              {isFr ? 'Prêt à donner vie à votre projet visuel ?' : 'Ready to bring your visual project to life?'}
            </h3>
            <p className="text-xs text-[#9C9384] max-w-md mx-auto mb-4 leading-relaxed">
              {isFr
                ? 'Profitez de la liberté de création du cinéma IA avec des délais garantis et des révisions incluses.'
                : 'Enjoy the creative freedom of AI cinema with guaranteed delivery times and included revisions.'}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/tarifs"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 bg-[#CAA243] hover:bg-[#f0c869] text-black font-bold px-5 py-2.5 rounded-xl mono text-xs uppercase tracking-wider transition-all cursor-pointer min-h-[44px]"
              >
                <span>{isFr ? 'Voir nos tarifs & formules →' : 'View pricing & packages →'}</span>
              </Link>
              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 bg-black/50 border border-white/[0.12] hover:border-[#CAA243] text-[#ECE4D3] hover:text-[#CAA243] px-5 py-2.5 rounded-xl mono text-xs uppercase tracking-wider transition-all cursor-pointer min-h-[44px]"
              >
                <span>{isFr ? 'Demander un devis 24h →' : 'Request 24h quote →'}</span>
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
