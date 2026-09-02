import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowLeft } from 'lucide-react';
import FilmGrain from '@/components/FilmGrain';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Mentions Légales — OVIZai',
  description: 'Informations légales et éditoriales du site OVIZai Studio.',
};

export default function MentionsLegalesPage() {
  return (
    <div className="min-h-screen relative flex flex-col justify-between overflow-x-hidden bg-[#080808] text-[#ECE4D3]">
      <FilmGrain />

      <main className="flex-grow relative z-10 pt-16 sm:pt-20 pb-16">
        <div className="max-w-3xl mx-auto px-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-[#9C9384] hover:text-[#CAA243] transition-colors mb-8 min-h-[48px]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Retour Accueil</span>
          </Link>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#ECE4D3] mb-6">
            MENTIONS LÉGALES
          </h1>

          <div className="space-y-6 text-xs text-[#9C9384] leading-relaxed">
            <section className="ovizai-card p-5 border border-white/[0.08] bg-[#0B0A08]">
              <h2 className="text-sm font-bold text-[#ECE4D3] mb-2 font-mono uppercase tracking-wider text-[#CAA243]">
                1. Éditeur du Site
              </h2>
              <p>
                Le site <strong>OVIZai</strong> (accessible à l’adresse <a href="https://ovizai.com" className="text-[#CAA243] underline">https://ovizai.com</a>) est édité par l’équipe OVIZai Studio.
              </p>
              <p className="mt-2">
                <strong>Contact E-mail :</strong> <a href="mailto:contact@ovizai.com" className="text-[#CAA243] underline">contact@ovizai.com</a>
              </p>
            </section>

            <section className="ovizai-card p-5 border border-white/[0.08] bg-[#0B0A08]">
              <h2 className="text-sm font-bold text-[#ECE4D3] mb-2 font-mono uppercase tracking-wider text-[#CAA243]">
                2. Hébergement
              </h2>
              <p>
                Le site est hébergé par la société <strong>Vercel Inc.</strong><br />
                Adresse : 440 N Barranca Ave #4133, Covina, CA 91723, USA.<br />
                Site web : <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-[#CAA243] underline">https://vercel.com</a>
              </p>
            </section>

            <section className="ovizai-card p-5 border border-white/[0.08] bg-[#0B0A08]">
              <h2 className="text-sm font-bold text-[#ECE4D3] mb-2 font-mono uppercase tracking-wider text-[#CAA243]">
                3. Propriété Intellectuelle & Projets Conceptuels
              </h2>
              <p>
                L’ensemble des contenus (textes, éléments graphiques, créations visuelles, vidéos et structures) présents sur le site sont protégés par le droit d’auteur et la propriété intellectuelle.
              </p>
              <p className="mt-2">
                OVIZai présente sur ce site des <strong>projets conceptuels et études visuelles (SPEC PROJECTS)</strong> réalisés à titre de démonstration de direction artistique et de capacités créatives. Sauf mention contraire explicite, ces réalisations conceptuelles ne constituent pas des campagnes commerciales commanditées par des marques tierces.
              </p>
            </section>

            <section className="ovizai-card p-5 border border-white/[0.08] bg-[#0B0A08]">
              <h2 className="text-sm font-bold text-[#ECE4D3] mb-2 font-mono uppercase tracking-wider text-[#CAA243]">
                4. Données Personnelles
              </h2>
              <p>
                Pour en savoir plus sur la collecte et le traitement de vos données personnelles, veuillez consulter notre <Link href="/confidentialite" className="text-[#CAA243] underline">Politique de Confidentialité</Link>.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer lang="fr" />
    </div>
  );
}
