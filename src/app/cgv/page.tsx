import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowLeft } from 'lucide-react';
import FilmGrain from '@/components/FilmGrain';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Conditions Générales de Vente — OVIZai',
  description: 'Conditions Générales de Vente (CGV) des prestations et de la Masterclass OVIZai',
  alternates: {
    canonical: 'https://ovizai.com/cgv',
    languages: {
      fr: 'https://ovizai.com/cgv',
      en: 'https://ovizai.com/cgv',
      'x-default': 'https://ovizai.com/cgv',
    },
  },
};

export default function CGVPage() {
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
            className="inline-flex items-center gap-2 text-xs font-mono text-muted hover:text-gold transition-colors mb-6 min-h-[44px]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Retour Accueil</span>
          </Link>

          <p className="text-[10px] uppercase tracking-[0.25em] text-gold mb-1 font-mono font-bold">
            CADRE CONTRACTUEL
          </p>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight text-fg mb-6">
            CONDITIONS GÉNÉRALES DE VENTE
          </h1>

          <div className="space-y-4 text-xs text-muted leading-relaxed">
            <section className="ovizai-card p-4 sm:p-5">
              <h2 className="mono text-xs sm:text-[13px] font-semibold text-gold mb-2 uppercase tracking-[0.2em]">
                1 // Objet & Champ d’Application
              </h2>
              <div className="space-y-1">
                <p>Les présentes conditions régissent les relations contractuelles avec OVIZai Studio</p>
                <p>Elles s’appliquent à l’ensemble de nos formules de production vidéo IA</p>
                <p>Elles couvrent le Sprint Pilote et la Campagne de Marque</p>
                <p>Elles encadrent également toutes nos prestations sur-mesure</p>
                <p>Elles s’appliquent enfin à l’accès à la Masterclass Vidéo IA</p>
              </div>
            </section>

            <section className="ovizai-card p-4 sm:p-5">
              <h2 className="mono text-xs sm:text-[13px] font-semibold text-gold mb-2 uppercase tracking-[0.2em]">
                2 // Commandes & Délais de Livraison
              </h2>
              <div className="space-y-1">
                <p>Sprint Pilote 48-72h : 1 asset publicitaire court livré en 48 à 72h ouvrées</p>
                <p>Campagne de Marque : 3 vidéos cinématographiques livrées en 48 à 72h prioritaires</p>
                <p>Prestations sur-mesure : délais fixés contractuellement selon le devis validé</p>
              </div>
            </section>

            <section className="ovizai-card p-4 sm:p-5">
              <h2 className="mono text-xs sm:text-[13px] font-semibold text-gold mb-2 uppercase tracking-[0.2em]">
                3 // Tarifs & Règlement
              </h2>
              <div className="space-y-1">
                <p>Les tarifs sont indiqués en USD, EUR et CAD selon votre sélection</p>
                <p>Les paiements de la Masterclass sont traités de façon sécurisée via Stripe Checkout</p>
                <p>Pour les formules de production, le règlement s’effectue selon les modalités du devis</p>
              </div>
            </section>

            <section className="ovizai-card p-4 sm:p-5">
              <h2 className="mono text-xs sm:text-[13px] font-semibold text-gold mb-2 uppercase tracking-[0.2em]">
                4 // Droit de Rétractation & Renoncement Exprès
              </h2>
              <div className="space-y-1">
                <p>L’accès à la Masterclass constitue la fourniture d’un contenu numérique immédiat</p>
                <p>En validant votre commande, vous accédez au programme immédiatement</p>
                <p>Vous renoncez expressément à votre droit de rétractation conformément au Code de la consommation</p>
                <p>Pour les prestations vidéo personnalisées, le droit de rétractation ne s’applique pas une fois la production lancée</p>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer lang="fr" />
    </div>
  );
}
