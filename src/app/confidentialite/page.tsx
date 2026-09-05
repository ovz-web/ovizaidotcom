import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowLeft } from 'lucide-react';
import FilmGrain from '@/components/FilmGrain';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Politique de Confidentialité — OVIZai',
  description: 'Politique de protection des données personnelles et d’utilisation des cookies sur OVIZai.',
};

export default function ConfidentialitePage() {
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
            POLITIQUE DE CONFIDENTIALITÉ
          </h1>

          <div className="space-y-6 text-xs text-[#9C9384] leading-relaxed">
            <section className="ovizai-card p-5 border border-white/[0.08] bg-[#0B0A08]">
              <h2 className="text-sm font-bold text-[#ECE4D3] mb-2 font-mono uppercase tracking-wider text-[#CAA243]">
                1. Collecte des Données
              </h2>
              <p>
                OVIZai collecte uniquement les données personnelles nécessaires au traitement de vos demandes de devis et à la gestion de vos achats de Masterclass :
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-[#ECE4D3]/90">
                <li>Adresse e-mail</li>
                <li>Nom / Organisation (si fourni)</li>
                <li>Détails du projet & enveloppe budgétaire estimée</li>
                <li>Données de règlement anonymisées traitées par Stripe</li>
              </ul>
            </section>

            <section className="ovizai-card p-5 border border-white/[0.08] bg-[#0B0A08]">
              <h2 className="text-sm font-bold text-[#ECE4D3] mb-2 font-mono uppercase tracking-wider text-[#CAA243]">
                2. Utilisation des Données
              </h2>
              <p>
                Vos données sont exclusivement utilisées pour :
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-[#ECE4D3]/90">
                <li>Vous transmettre nos propositions commerciales et devis sous 24-48h</li>
                <li>Valider votre accès aux modules de la Masterclass</li>
                <li>Assurer le support client et le suivi technique</li>
              </ul>
              <p className="mt-2">
                Aucune donnée personnelle n’est vendue, cédée ou louée à des tiers.
              </p>
            </section>

            <section className="ovizai-card p-5 border border-white/[0.08] bg-[#0B0A08]">
              <h2 className="text-sm font-bold text-[#ECE4D3] mb-2 font-mono uppercase tracking-wider text-[#CAA243]">
                3. Vos Droits (RGPD)
              </h2>
              <p>
                Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez d’un droit d’accès, de rectification, de suppression et de portabilité de vos données.
              </p>
              <p className="mt-2">
                Pour exercer vos droits, contactez-nous à : <a href="mailto:contact@ovizai.com" className="text-[#CAA243] underline">contact@ovizai.com</a>.
              </p>
            </section>

            <section className="ovizai-card p-5 border border-white/[0.08] bg-[#0B0A08]">
              <h2 className="text-sm font-bold text-[#ECE4D3] mb-2 font-mono uppercase tracking-wider text-[#CAA243]">
                4. Cookies & Stockage Local
              </h2>
              <p>
                Le site OVIZai utilise uniquement le stockage local strictement nécessaire au fonctionnement de l’application (mémorisation de votre choix de langue FR/EN et de votre devise de facturation USD/EUR/CAD). Aucun cookie tiers à des fins publicitaires n’est déposé.
              </p>
              <p className="mt-2">
                Nous utilisons Vercel Analytics et Speed Insights pour mesurer la fréquentation et les performances du site. Ces outils ne déposent aucun cookie et ne collectent aucune donnée personnelle identifiable.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer lang="fr" />
    </div>
  );
}
