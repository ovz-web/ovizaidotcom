import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowLeft } from 'lucide-react';
import FilmGrain from '@/components/FilmGrain';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Mentions Légales — OVIZai',
  description: 'Informations légales et éditoriales du site OVIZai Studio',
};

export default function MentionsLegalesPage() {
  return (
    <div className="min-h-screen relative flex flex-col justify-between overflow-x-hidden bg-bg text-fg">
      <FilmGrain />

      <main
        className="flex-grow relative z-10 pb-16"
        style={{ paddingTop: 'calc(var(--topbar-height, 48px) + 16px)' }}
      >
        <div className="max-w-xl mx-auto px-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-muted hover:text-gold transition-colors mb-6 min-h-[48px]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Retour Accueil</span>
          </Link>

          <h1 className="text-xl font-bold tracking-tight text-fg mb-6 font-display">
            MENTIONS LÉGALES
          </h1>

          <div className="space-y-4 text-xs text-muted leading-relaxed">
            <section className="ovizai-card p-4 sm:p-5">
              <h2 className="mono text-xs sm:text-[13px] font-semibold text-gold mb-2 uppercase tracking-[0.2em]">
                1. Éditeur du Site
              </h2>
              <p>
                Le site OVIZai est accessible sur ovizai.com<br />
                Édité par l’équipe OVIZai Studio
              </p>
              <p className="mt-2">
                Contact par email à <a href="mailto:contact@ovizai.com" className="text-gold hover:underline">contact@ovizai.com</a>
              </p>
            </section>

            <section className="ovizai-card p-4 sm:p-5">
              <h2 className="mono text-xs sm:text-[13px] font-semibold text-gold mb-2 uppercase tracking-[0.2em]">
                2. Hébergement
              </h2>
              <p>
                Site hébergé par la société Vercel Inc<br />
                Adresse au 440 N Barranca Ave #4133 Covina CA 91723 USA<br />
                Plateforme en ligne sur <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">vercel.com</a>
              </p>
            </section>

            <section className="ovizai-card p-4 sm:p-5">
              <h2 className="mono text-xs sm:text-[13px] font-semibold text-gold mb-2 uppercase tracking-[0.2em]">
                3. Propriété Intellectuelle & Projets Conceptuels
              </h2>
              <p>
                Contenus et créations protégés par le droit d’auteur<br />
                Textes graphismes visuels et vidéos sous propriété intellectuelle exclusive
              </p>
              <p className="mt-2">
                Projets conceptuels et études de style présentés à titre de démonstration<br />
                Réalisations sans affiliation commerciale tierce sauf mention contraire
              </p>
            </section>

            <section className="ovizai-card p-4 sm:p-5">
              <h2 className="mono text-xs sm:text-[13px] font-semibold text-gold mb-2 uppercase tracking-[0.2em]">
                4. Données Personnelles
              </h2>
              <p>
                Gestion des données et respect de votre vie privée<br />
                Consultez notre <Link href="/confidentialite" className="text-gold hover:underline">Politique de Confidentialité</Link>
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer lang="fr" />
    </div>
  );
}
