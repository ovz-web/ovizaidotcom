'use client';

import React, { useState } from 'react';
import { Play, Sparkles, Youtube, Instagram } from 'lucide-react';
import { Language } from '@/types';
import { SOCIAL_LINKS } from '@/lib/videos';

interface VideoItem {
  id: string;
  youtubeId?: string;
  title: { fr: string; en: string };
  category: { fr: string; en: string };
  description: { fr: string; en: string };
  badge: string;
}

interface VideoSectionProps {
  lang: Language;
  video1YoutubeId?: string;
  video2YoutubeId?: string;
  customEyebrow?: string;
  customTitle?: string;
  customSubtitle?: string;
}

const DEFAULT_VIDEOS: VideoItem[] = [
  {
    id: 'showreel-main',
    youtubeId: '',
    title: {
      fr: 'Showreel Production & Films IA',
      en: 'AI Production & Film Showreel',
    },
    category: {
      fr: 'DIRECTION ARTISTIQUE & CINÉMA',
      en: 'ART DIRECTION & CINEMATOGRAPHY',
    },
    description: {
      fr: 'Aperçu de nos publicités et univers de marque',
      en: 'Overview of our commercials and brand visual universes',
    },
    badge: 'SHOWREEL 4K',
  },
  {
    id: 'masterclass-teaser',
    youtubeId: '',
    title: {
      fr: 'Teaser & Workflows Masterclass',
      en: 'Masterclass Teaser & Workflows',
    },
    category: {
      fr: 'FORMATION & PIPELINE IA',
      en: 'MASTERCLASS & AI PIPELINE',
    },
    description: {
      fr: 'Extrait de nos méthodes de génération et post-production 4K',
      en: 'Preview of our generation and 4K post-production workflows',
    },
    badge: 'MASTERCLASS DEMO',
  },
];

export default function VideoSection({
  lang,
  video1YoutubeId,
  video2YoutubeId,
  customEyebrow,
  customTitle,
  customSubtitle,
}: VideoSectionProps) {
  const isFr = lang === 'fr';
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  const videos = DEFAULT_VIDEOS.map((vid, idx) => ({
    ...vid,
    youtubeId: idx === 0 ? (video1YoutubeId || vid.youtubeId) : (video2YoutubeId || vid.youtubeId),
  }));

  return (
    <section className="max-w-xl mx-auto mb-10 px-4 relative z-10">
      {/* Section Header */}
      <div className="text-center mb-6">
        <p className="text-[10px] uppercase tracking-[0.25em] text-gold mb-1 font-mono font-bold flex items-center justify-center gap-1.5">
          <Sparkles className="w-3 h-3 text-gold" />
          <span>{customEyebrow || (isFr ? 'RÉALISATIONS & DÉMONSTRATIONS' : 'SHOWCASE & DEMO REELS')}</span>
        </p>
        <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-fg mb-1.5 leading-snug">
          {customTitle || (isFr ? 'APERÇU DE NOS RENDUS' : 'VISUAL PROOF & SHOWREEL')}
        </h2>
        <p className="text-xs text-muted max-w-md mx-auto leading-relaxed">
          {customSubtitle || (isFr
            ? 'Découvrez nos productions vidéo en 4K'
            : 'Discover our 4K video productions')}
        </p>
      </div>

      {/* 2 Video Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {videos.map((video) => {
          const hasYoutube = Boolean(video.youtubeId && video.youtubeId.trim().length > 0);
          const isPlaying = activeVideoId === video.id;

          return (
            <div
              key={video.id}
              className="ovizai-card border border-border bg-card/90 overflow-hidden flex flex-col justify-between"
            >
              {/* Video Media Container */}
              <div className="relative aspect-video bg-black overflow-hidden group">
                {hasYoutube && isPlaying ? (
                  <iframe
                    className="absolute inset-0 w-full h-full border-0"
                    src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
                    title={video.title[lang]}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <div
                    onClick={() => hasYoutube && setActiveVideoId(video.id)}
                    className={`w-full h-full flex flex-col items-center justify-center relative p-4 text-center cursor-pointer transition-all ${
                      hasYoutube ? 'hover:bg-gold/[0.06]' : 'opacity-85'
                    }`}
                  >
                    {/* Background Glow */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />

                    {/* Play Button Icon */}
                    <div className="relative z-20 w-12 h-12 rounded-full bg-gold text-black flex items-center justify-center shadow-gold group-hover:scale-110 transition-transform mb-2">
                      <Play className="w-5 h-5 fill-black ml-0.5" />
                    </div>

                    {/* Category Tag */}
                    <span className="relative z-20 mono text-[10px] uppercase tracking-[0.25em] text-gold font-bold">
                      {video.badge}
                    </span>

                    {!hasYoutube && (
                      <span className="relative z-20 mono text-[10px] text-muted mt-1 bg-black/60 px-2.5 py-0.5 rounded border border-border">
                        {isFr ? 'Vidéo en cours d’intégration' : 'Video uploading soon'}
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Card Meta & Description */}
              <div className="p-4 sm:p-5 flex-grow flex flex-col justify-between">
                <div>
                  <p className="mono text-[10px] uppercase tracking-[0.25em] text-gold font-bold mb-1">
                    {video.category[lang]}
                  </p>
                  <h3 className="mono text-xs sm:text-[13px] font-semibold text-fg mb-1.5 leading-snug">
                    {video.title[lang]}
                  </h3>
                  <p className="text-xs text-muted leading-relaxed">
                    {video.description[lang]}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Social Links under Video Grid */}
      <div className="mt-4 text-center flex items-center justify-center gap-4 flex-wrap text-xs font-mono">
        <a
          href={SOCIAL_LINKS.youtube}
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted hover:text-gold transition-colors inline-flex items-center gap-1.5 min-h-[44px] px-2 py-1"
        >
          <Youtube className="w-3.5 h-3.5 text-gold" />
          <span>{isFr ? 'Voir plus sur YouTube →' : 'See more on YouTube →'}</span>
        </a>
        <span className="text-muted font-mono text-xs">•</span>
        <a
          href={SOCIAL_LINKS.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted hover:text-gold transition-colors inline-flex items-center gap-1.5 min-h-[44px] px-2 py-1"
        >
          <Instagram className="w-3.5 h-3.5 text-gold" />
          <span>{isFr ? 'Voir plus sur Instagram →' : 'See more on Instagram →'}</span>
        </a>
      </div>
    </section>
  );
}
