'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Language } from '@/types';

interface PageHeaderProps {
  tag: string;
  title: React.ReactNode;
  subtitle: string;
  showDetailsHint?: boolean;
  lang?: Language;
}

export default function PageHeader({
  tag,
  title,
  subtitle,
  showDetailsHint = true,
  lang = 'fr',
}: PageHeaderProps) {
  const isFr = lang === 'fr';

  return (
    <div className="max-w-xl mx-auto px-4 text-center">
      {/* 1. Titre de la page (Tag / Eyebrow 0X // NOM) */}
      <p className="text-[8.5px] sm:text-[9.5px] uppercase tracking-[0.18em] sm:tracking-[0.22em] text-gold mb-0.5 font-mono font-bold">
        {tag}
      </p>

      {/* 2. Logo - Responsive & Scaled matching homepage */}
      <div className="relative flex items-center justify-center my-0.5 overflow-visible">
        <Link href="/" className="inline-block transition-opacity hover:opacity-80">
          <Image
            src="/logo.png"
            alt={isFr ? 'OVIZai — Logo Studio Cinéma & Vidéo IA 4K' : 'OVIZai — 4K AI Cinema & Video Studio Logo'}
            width={240}
            height={240}
            className="h-10 sm:h-20 md:h-24 w-auto object-contain mix-blend-screen"
            priority
          />
        </Link>
      </div>

      {/* 3. L'autre titre (Titre principal H1) */}
      <h1 className="text-sm sm:text-lg md:text-xl font-semibold tracking-tight text-fg text-center mb-0.5 sm:mb-1 leading-tight">
        {title}
      </h1>

      {/* 4. Sous-titre */}
      <p className="text-[10px] sm:text-xs text-muted max-w-xs sm:max-w-xl text-center mx-auto mb-1 leading-tight font-mono sm:whitespace-nowrap">
        {subtitle}
      </p>

      {/* 5. Mention Détails ↓ */}
      {showDetailsHint && (
        <div className="flex justify-end text-[8.5px] sm:text-[9.5px] tracking-wider text-muted font-mono px-1 mb-1">
          <span>{isFr ? 'Détails ↓' : 'Details ↓'}</span>
        </div>
      )}
    </div>
  );
}
