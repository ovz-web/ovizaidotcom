import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowLeft } from 'lucide-react';
import FilmGrain from '@/components/FilmGrain';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Politique de Confidentialité — OVIZai',
  description: 'Politique de protection des données personnelles et d’utilisation des cookies sur OVIZai',
  alternates: {
    canonical: 'https://ovizai.com/confidentialite',
    languages: {
      fr: 'https://ovizai.com/confidentialite',
      en: 'https://ovizai.com/confidentialite',
      'x-default': 'https://ovizai.com/confidentialite',
    },
  },
};

export default function ConfidentialitePage() {
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
            PROTECTION DES DONNÉES
          </p>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight text-fg mb-6">
            POLITIQUE DE CONFIDENTIALITÉ
          </h1>

          <div className="space-y-4 text-xs text-muted leading-relaxed">
            <section className="ovizai-card p-4 sm:p-5">
              <h2 className="mono text-xs sm:text-[13px] font-semibold text-gold mb-2 uppercase tracking-[0.2em]">
                1 // Collecte des Données
              </h2>
              <p className="mb-2">
                OVIZai collecte uniquement les données nécessaires au traitement de vos demandes
              </p>
              <ul className="space-y-1 text-fg/90 pl-2">
                <li>• Adresse e-mail</li>
                <li>• Nom ou organisation si renseigné</li>
                <li>• Détails du projet et enveloppe budgétaire estimée</li>
                <li>• Données de règlement sécurisées traitées par Stripe</li>
              </ul>
            </section>

            <section className="ovizai-card p-4 sm:p-5">
              <h2 className="mono text-xs sm:text-[13px] font-semibold text-gold mb-2 uppercase tracking-[0.2em]">
                2 // Utilisation des Données
              </h2>
              <div className="space-y-1">
                <p>Vos données sont exclusivement utilisées pour nos échanges professionnels</p>
                <p>Envoi de propositions commerciales et devis sous 24-48h</p>
                <p>Validation et activation de vos accès à la Masterclass</p>
                <p>Support direct et accompagnement technique</p>
                <p>Aucune donnée personnelle n’est cédée ni vendue à des tiers</p>
              </div>
            </section>

            <section className="ovizai-card p-4 sm:p-5">
              <h2 className="mono text-xs sm:text-[13px] font-semibold text-gold mb-2 uppercase tracking-[0.2em]">
                3 // Vos Droits RGPD
              </h2>
              <div className="space-y-1">
                <p>Vous disposez d’un droit d’accès, de rectification et de suppression de vos données</p>
                <p>
                  Pour exercer vos droits, contactez-nous à :{' '}
                  <a href="mailto:contact@ovizai.com" className="text-gold underline">
                    contact@ovizai.com
                  </a>
                </p>
              </div>
            </section>

            <section className="ovizai-card p-4 sm:p-5">
              <h2 className="mono text-xs sm:text-[13px] font-semibold text-gold mb-2 uppercase tracking-[0.2em]">
                4 // Stockage Local & Cookies
              </h2>
              <div className="space-y-1">
                <p>Le site utilise uniquement le stockage local strictement nécessaire à la navigation</p>
                <p>Mémorisation de votre choix de langue FR/EN et de votre devise</p>
                <p>Aucun cookie tiers à des fins publicitaires n’est déposé sur votre appareil</p>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer lang="fr" />
    </div>
  );
}
