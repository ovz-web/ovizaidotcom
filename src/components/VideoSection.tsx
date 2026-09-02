'use client';

import React, { useState } from 'react';
import { Play, Sparkles, Youtube, Instagram } from 'lucide-react';
import { Language } from '@/types';
import { SOCIAL_LINKS } from '@/lib/videos';

interface VideoItem {
  id: string;
  youtubeId?: string; // YouTube Video ID (ex: "dQw4w9WgXcQ")
  title: { fr: string; en: string };
  category: { fr: string; en: string };
  description: { fr: string; en: string };
  badge: string;
}

interface VideoSectionProps {
  lang: Language;
  video1YoutubeId?: string;
  video2YoutubeId?: string;
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
      fr: 'Aperçu de nos réalisations visuelles, publicités narratives et univers de marque générés par IA.',
      en: 'Overview of our visual productions, narrative ads, and AI-generated brand visual universes.',
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
      fr: 'Extrait de nos méthodes de génération Midjourney v6, Runway Gen-3, Kling et post-production 4K.',
      en: 'Preview of our generation workflows in Midjourney v6, Runway Gen-3, Kling, and 4K post-production.',
    },
    badge: 'MASTERCLASS DEMO',
  },
];

export default function VideoSection({ lang, video1YoutubeId, video2YoutubeId }: VideoSectionProps) {
  const isFr = lang === 'fr';
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  const videos = DEFAULT_VIDEOS.map((vid, idx) => ({
    ...vid,
    youtubeId: idx === 0 ? (video1YoutubeId || vid.youtubeId) : (video2YoutubeId || vid.youtubeId),
  }));

  return (
    <section className="max-w-3xl mx-auto mb-10 px-4 relative z-10">
      {/* Section Header */}
      <div className="text-center mb-6">
        <p className="mono text-[10.5px] uppercase tracking-[0.25em] text-[#CAA243] font-mono font-bold mb-1 flex items-center justify-center gap-1.5">
          <Sparkles className="w-3 h-3 text-[#CAA243]" />
          <span>{isFr ? 'RÉALISATIONS & DÉMONSTRATIONS' : 'SHOWCASE & DEMO REELS'}</span>
        </p>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#ECE4D3] mb-1">
          {isFr ? 'APERÇU DE NOS RENDUS' : 'VISUAL PROOF & SHOWREEL'}
        </h2>
        <p className="text-xs text-[#9C9384] max-w-md mx-auto">
          {isFr
            ? 'Découvrez nos productions vidéo et la qualité de nos workflows en vidéo 4K.'
            : 'Discover our video productions and the quality of our 4K workflows.'}
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
              className="ovizai-card border border-white/[0.08] bg-[#0B0A08]/90 rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between"
            >
              {/* Video Player Box / Thumbnail Area */}
              <div className="relative aspect-video bg-black/80 flex items-center justify-center border-b border-white/[0.06] overflow-hidden group">
                {hasYoutube && isPlaying ? (
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
                    title={video.title[lang]}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full border-0"
                    loading="lazy"
                  />
                ) : (
                  <div
                    onClick={() => hasYoutube && setActiveVideoId(video.id)}
                    className={`w-full h-full flex flex-col items-center justify-center relative p-4 text-center cursor-pointer transition-all ${
                      hasYoutube ? 'hover:bg-[#CAA243]/[0.06]' : 'opacity-85'
                    }`}
                  >
                    {/* Background Glow */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />

                    {/* Play Button Icon */}
                    <div className="relative z-20 w-12 h-12 rounded-full bg-[#CAA243] text-black flex items-center justify-center shadow-[0_0_20px_rgba(202,162,67,0.4)] group-hover:scale-110 transition-transform mb-2">
                      <Play className="w-5 h-5 fill-black ml-0.5" />
                    </div>

                    {/* Category Tag */}
                    <span className="relative z-20 mono text-[9.5px] uppercase tracking-widest text-[#CAA243] font-bold">
                      {video.badge}
                    </span>

                    {!hasYoutube && (
                      <span className="relative z-20 mono text-[10px] text-[#9C9384] mt-1 bg-black/60 px-2.5 py-0.5 rounded border border-white/[0.08]">
                        {isFr ? 'Vidéo en cours d’intégration' : 'Video uploading soon'}
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Card Meta & Description */}
              <div className="p-4 sm:p-5 flex-grow flex flex-col justify-between">
                <div>
                  <p className="mono text-[9.5px] uppercase tracking-widest text-[#CAA243] font-bold mb-1">
                    {video.category[lang]}
                  </p>
                  <h3 className="text-sm font-bold text-[#ECE4D3] mb-1.5 leading-snug">
                    {video.title[lang]}
                  </h3>
                  <p className="text-xs text-[#9C9384] leading-relaxed">
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
          className="text-[#9C9384] hover:text-[#CAA243] transition-colors inline-flex items-center gap-1.5 min-h-[44px] px-2 py-1"
        >
          <Youtube className="w-3.5 h-3.5 text-[#CAA243]" />
          <span>{isFr ? 'Voir plus sur YouTube →' : 'See more on YouTube →'}</span>
        </a>
        <span className="text-[#9C9384] font-mono text-xs">•</span>
        <a
          href={SOCIAL_LINKS.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#9C9384] hover:text-[#CAA243] transition-colors inline-flex items-center gap-1.5 min-h-[44px] px-2 py-1"
        >
          <Instagram className="w-3.5 h-3.5 text-[#CAA243]" />
          <span>{isFr ? 'Voir plus sur Instagram →' : 'See more on Instagram →'}</span>
        </a>
      </div>
    </section>
  );
}
