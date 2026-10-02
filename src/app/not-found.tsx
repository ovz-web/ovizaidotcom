import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import FilmGrain from '@/components/FilmGrain';

export const metadata = {
  title: '404 — Page Introuvable | OVIZai Studio',
  description: 'La page demandée n’existe pas ou a été déplacée.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <div className="min-h-[100dvh] relative flex flex-col justify-between overflow-x-hidden bg-bg text-fg">
      <FilmGrain />

      <header className="w-full px-4 sm:px-6 py-4 flex items-center justify-between border-b border-border/40 bg-black/60 backdrop-blur-md relative z-20">
        <Link href="/" className="flex items-center group py-1" aria-label="OVIZai — Accueil">
          <Image
            src="/logo.png"
            alt="OVIZai"
            width={100}
            height={52}
            className="h-6 sm:h-7 w-auto object-contain mix-blend-screen"
            priority
          />
        </Link>
        <span className="mono text-[10px] text-muted uppercase tracking-widest">
          ERROR 404
        </span>
      </header>

      <main className="flex-grow flex items-center justify-center relative z-10 px-4 py-12">
        <div className="max-w-md w-full ovizai-card p-6 sm:p-8 rounded-2xl border border-border text-center space-y-5">
          <div className="space-y-1">
            <span className="mono text-[11px] text-gold font-bold uppercase tracking-widest block">
              SÉQUENCE INTROUVABLE
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-fg font-mono tracking-tighter">
              404
            </h1>
          </div>

          <p className="text-sm text-muted leading-relaxed font-sans">
            La page recherchée n’existe pas ou a été déplacée — retournez à l’accueil pour découvrir nos services et notre offre de lancement
          </p>

          <div className="pt-2">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gold hover:bg-gold-bright text-black font-semibold mono text-xs uppercase tracking-wider transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Retour à l’accueil</span>
            </Link>
          </div>
        </div>
      </main>

      <footer className="w-full px-4 py-3 border-t border-white/[0.08] text-center relative z-20">
        <span className="mono text-[10px] text-muted">
          © 2026 OVIZai · Creative Ad Studio · Worldwide
        </span>
      </footer>
    </div>
  );
}
