'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Play, Film } from 'lucide-react';
import { Language } from '@/types';

export interface VideoItem {
  youtubeId?: string;
  src?: string;
  webmSrc?: string;
  poster?: string;
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
  const hasLocalVideo = Boolean(video.src && video.src.trim().length > 0);
  const hasYoutubeId = Boolean(video.youtubeId && video.youtubeId.trim().length > 0);
  const hasVideo = hasLocalVideo || hasYoutubeId;

  const thumbnailUrl = video.poster || (hasYoutubeId ? `https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg` : '');

  const jsonLd = hasVideo
    ? {
        '@context': 'https://schema.org',
        '@type': 'VideoObject',
        name: video.title[lang],
        description: video.description[lang],
        thumbnailUrl: thumbnailUrl.startsWith('http') ? thumbnailUrl : `https://ovizai.com${thumbnailUrl}`,
        uploadDate: video.uploadDate,
        embedUrl: hasYoutubeId
          ? `https://www.youtube-nocookie.com/embed/${video.youtubeId}`
          : `https://ovizai.com${video.src}`,
        contentUrl: hasLocalVideo ? `https://ovizai.com${video.src}` : undefined,
        publisher: { '@type': 'Organization', name: 'OVIZai', logo: 'https://ovizai.com/logo.png' },
      }
    : null;

  return (
    <div className="ovizai-card overflow-hidden border border-border bg-card/90 rounded-2xl flex flex-col justify-between shadow-xl">
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}

      {/* Video Facade / Player Area */}
      <div className="relative aspect-video bg-black/90 overflow-hidden group">
        {hasVideo && isPlaying ? (
          hasLocalVideo ? (
            <video
              className="absolute inset-0 w-full h-full object-cover"
              poster={thumbnailUrl}
              controls
              autoPlay
              muted
              playsInline
              preload="metadata"
            >
              {video.webmSrc && <source src={video.webmSrc} type="video/webm" />}
              {video.src && <source src={video.src} type="video/mp4" />}
              <p className="sr-only">
                {video.title[lang]} — {video.description[lang]}
              </p>
            </video>
          ) : (
            <iframe
              className="absolute inset-0 w-full h-full border-0"
              src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
              title={video.title[lang]}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
          )
        ) : (
          <button
            type="button"
            onClick={() => hasVideo && setIsPlaying(true)}
            aria-label={isFr ? `Lire la vidéo : ${video.title.fr}` : `Play video: ${video.title.en}`}
            className={`absolute inset-0 w-full h-full min-h-[48px] group cursor-pointer flex flex-col items-center justify-center p-4 text-center transition-all overflow-hidden ${
              hasVideo ? 'hover:bg-black/20' : 'opacity-90'
            }`}
          >
            {hasVideo && thumbnailUrl && (
              <Image
                src={thumbnailUrl}
                alt={video.title[lang]}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                priority={false}
              />
            )}
            {/* Ambient Dark Overlay */}
            <span className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20 group-hover:bg-black/20 transition-colors" />

            {/* Centered Play Button */}
            <span className="relative z-10 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gold flex items-center justify-center shadow-card group-hover:scale-105 transition-transform mb-1">
              <Play className="w-5 h-5 sm:w-6 sm:h-6 text-black ml-0.5" fill="black" />
            </span>

            {/* Badge */}
            {video.badge && (
              <span className="relative z-10 mono text-[10px] uppercase tracking-[0.25em] text-gold font-bold mt-1">
                {video.badge[lang]}
              </span>
            )}

            {!hasVideo && (
              <span className="relative z-10 mono text-[10px] text-muted mt-1.5 bg-black/70 px-2.5 py-0.5 rounded border border-border">
                {isFr ? 'Vidéo en cours d’intégration' : 'Video uploading soon'}
              </span>
            )}
          </button>
        )}
      </div>

      {/* Video Title & Meta Details */}
      <div className="p-4 sm:p-5">
        <div className="flex items-center gap-2 mb-1">
          <Film className="w-3.5 h-3.5 text-gold flex-shrink-0" />
          <h3 className="mono text-xs sm:text-[13px] font-semibold text-fg leading-snug truncate">
            {video.title[lang]}
          </h3>
        </div>
        {!compact && (
          <div className="text-xs text-muted mt-1 leading-relaxed space-y-0.5">
            {video.description[lang].split('\n').map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
        )}

        {/* Accessible Text Description / Transcript Toggle */}
        <div className="mt-3 pt-2 border-t border-white/[0.06]">
          <details className="text-[11px] font-mono group/details cursor-pointer">
            <summary className="hover:text-fg text-muted/70 transition-colors select-none focus:outline-none list-none flex items-center gap-1.5">
              <span className="text-gold text-[10px]">▸</span>
              <span>{isFr ? 'Transcription & Description audio' : 'Transcript & Audio description'}</span>
            </summary>
            <p className="mt-2 p-2.5 bg-black/40 rounded-lg border border-border text-[11px] text-muted leading-relaxed font-sans">
              {isFr
                ? `Extrait de réalisation cinématique OVIZai : « ${video.title.fr} ». Direction artistique générative haute définition, esthétique Paris 1990, textures 35mm grainées, contrastes profonds et lumières dorées. ${video.description.fr.replace(/\n/g, ' ')}`
                : `OVIZai cinematic showcase excerpt: "${video.title.en}". High-definition generative art direction, Paris 1990 aesthetic, 35mm silver film grain, deep contrast and amber highlights. ${video.description.en.replace(/\n/g, ' ')}`}
            </p>
          </details>
        </div>
      </div>
    </div>
  );
}

