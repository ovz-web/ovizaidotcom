import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowLeft } from 'lucide-react';
import FilmGrain from '@/components/FilmGrain';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Conditions Générales de Vente — OVIZai',
  description: 'Conditions Générales de Vente (CGV) des prestations et de la Masterclass OVIZai.',
};

export default function CGVPage() {
  return (
    <div className="min-h-screen relative flex flex-col justify-between overflow-x-hidden bg-[#080808] text-[#ECE4D3]">
      <FilmGrain />

      <main
        className="flex-grow relative z-10 pb-16"
        style={{ paddingTop: 'calc(var(--topbar-height, 80px) + 16px)' }}
      >
        <div className="max-w-3xl mx-auto px-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-[#9C9384] hover:text-[#CAA243] transition-colors mb-8 min-h-[48px]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Retour Accueil</span>
          </Link>

          <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight text-[#ECE4D3] mb-6">
            CONDITIONS GÉNÉRALES DE VENTE (CGV)
          </h1>

          <div className="space-y-6 text-xs text-[#9C9384] leading-relaxed">
            <section className="ovizai-card p-5 border border-white/[0.08] bg-[#0B0A08]">
              <h2 className="mono text-xs sm:text-[13px] font-semibold text-[#CAA243] mb-2 uppercase tracking-[0.2em]">
                1. Objet & Champ d’Application
              </h2>
              <p>
                Les présentes Conditions Générales de Vente régissent les relations contractuelles entre OVIZai Studio et tout client souscrivant à une formule de production vidéo IA (Sprint Pilote, Standard, Premium) ou achetant l’accès à la Masterclass Vidéo IA.
              </p>
            </section>

            <section className="ovizai-card p-5 border border-white/[0.08] bg-[#0B0A08]">
              <h2 className="text-sm font-bold text-[#ECE4D3] mb-2 font-mono uppercase tracking-wider text-[#CAA243]">
                2. Commandes & Délais de Livraison
              </h2>
              <p>
                - <strong>Sprint Pilote 48-72h</strong> : 1 asset publicitaire court (15-30s), livré sous 48 à 72h ouvrées après validation du brief.<br />
                - <strong>Formule Standard</strong> : 1 vidéo cinématographique, livrée sous 3 à 5 jours ouvrés.<br />
                - <strong>Formule Premium</strong> : 3 vidéos déclinées, livrées sous 48 à 72h ouvrées prioritaires.
              </p>
            </section>

            <section className="ovizai-card p-5 border border-white/[0.08] bg-[#0B0A08]">
              <h2 className="text-sm font-bold text-[#ECE4D3] mb-2 font-mono uppercase tracking-wider text-[#CAA243]">
                3. Tarifs & Règlement
              </h2>
              <p>
                Les tarifs sont indiqués en USD, EUR et CAD selon la devise sélectionnée. Les paiements de la Masterclass sont traités de façon sécurisée via Stripe Checkout. Pour les prestations de production, le règlement s’effectue sur devis ou à la livraison selon les modalités de la formule retenue.
              </p>
            </section>

            <section className="ovizai-card p-5 border border-white/[0.08] bg-[#0B0A08]">
              <h2 className="text-sm font-bold text-[#ECE4D3] mb-2 font-mono uppercase tracking-wider text-[#CAA243]">
                4. Droit de Rétractation & Renoncement Exprès (Contenus Numériques)
              </h2>
              <p>
                Conformément à l’article L.221-28 13° du Code de la consommation (et règles internationales applicables), l’accès à la Masterclass Vidéo IA OVIZai constitue la fourniture d’un contenu numérique non fourni sur un support matériel dont l’exécution commence immédiatement après validation du paiement.
              </p>
              <p className="mt-2">
                En validant votre commande via Stripe Checkout, vous acceptez expressément que l’accès au programme soit fourni immédiatement et vous <strong>renoncez expressément à votre droit de rétractation</strong>. Pour les prestations sur-mesure de production vidéo (Sprint Pilote, Standard, Premium), le droit de rétractation ne s’applique pas aux services personnalisés dont l’exécution a démarré avec l’accord préalable du client.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer lang="fr" />
    </div>
  );
}
