'use client';

import React, { useState } from 'react';
import { Play, Film } from 'lucide-react';
import { Language } from '@/types';

export interface VideoItem {
  youtubeId: string;
  title: { fr: string; en: string };
  description: { fr: string; en: string };
  uploadDate: string; // ISO 8601, ex: "2026-09-01"
  relatedServiceId?: string;
  badge?: { fr: string; en: string };
}

interface VideoShowcaseProps {
  video: VideoItem;
  lang: Language;
  compact?: boolean;
}

export default function VideoShowcase({ video, lang, compact = false }: VideoShowcaseProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const isFr = lang === 'fr';
  const hasId = Boolean(video.youtubeId && video.youtubeId.trim().length > 0);
  const thumbnailUrl = hasId ? `https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg` : '';

  const jsonLd = hasId
    ? {
        '@context': 'https://schema.org',
        '@type': 'VideoObject',
        name: video.title[lang],
        description: video.description[lang],
        thumbnailUrl,
        uploadDate: video.uploadDate,
        embedUrl: `https://www.youtube-nocookie.com/embed/${video.youtubeId}`,
        publisher: { '@type': 'Organization', name: 'OVIZai', logo: 'https://ovizai.com/logo.png' },
      }
    : null;

  return (
    <div className="ovizai-card overflow-hidden border border-white/[0.08] bg-[#0B0A08]/90 rounded-2xl flex flex-col justify-between shadow-xl">
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}

      {/* Video Facade / Player Area */}
      <div className="relative aspect-video bg-black/90 overflow-hidden group">
        {hasId && isPlaying ? (
          <iframe
            className="absolute inset-0 w-full h-full border-0"
            src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
            title={video.title[lang]}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
        ) : (
          <button
            type="button"
            onClick={() => hasId && setIsPlaying(true)}
            aria-label={isFr ? `Lire la vidéo : ${video.title.fr}` : `Play video: ${video.title.en}`}
            className={`absolute inset-0 w-full h-full min-h-[48px] group cursor-pointer flex flex-col items-center justify-center p-4 text-center transition-all ${
              hasId ? 'hover:bg-black/20' : 'opacity-90'
            }`}
            style={
              hasId && thumbnailUrl
                ? { backgroundImage: `url(${thumbnailUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }
                : undefined
            }
          >
            {/* Ambient Dark Overlay */}
            <span className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20 group-hover:bg-black/20 transition-colors" />

            {/* Centered Play Button */}
            <span className="relative z-10 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#CAA243] flex items-center justify-center shadow-[0_0_24px_rgba(202,162,67,0.4)] group-hover:scale-105 transition-transform mb-1">
              <Play className="w-5 h-5 sm:w-6 sm:h-6 text-black ml-0.5" fill="black" />
            </span>

            {/* Badge */}
            {video.badge && (
              <span className="relative z-10 mono text-[9.5px] uppercase tracking-widest text-[#CAA243] font-bold mt-1">
                {video.badge[lang]}
              </span>
            )}

            {!hasId && (
              <span className="relative z-10 mono text-[10px] text-[#9C9384] mt-1.5 bg-black/70 px-2.5 py-0.5 rounded border border-white/[0.08]">
                {isFr ? 'Vidéo en cours d’intégration' : 'Video uploading soon'}
              </span>
            )}
          </button>
        )}
      </div>

      {/* Video Title & Meta Details */}
      <div className="p-4 sm:p-5">
        <div className="flex items-center gap-2 mb-1">
          <Film className="w-3.5 h-3.5 text-[#CAA243] flex-shrink-0" />
          <h3 className="text-sm font-bold text-[#ECE4D3] leading-snug truncate">
            {video.title[lang]}
          </h3>
        </div>
        {!compact && (
          <p className="text-xs text-[#9C9384] mt-1 leading-relaxed">
            {video.description[lang]}
          </p>
        )}
      </div>
    </div>
  );
}
