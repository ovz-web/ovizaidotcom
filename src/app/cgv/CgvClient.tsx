'use client';

import React, { useState } from 'react';
import FilmGrain from '@/components/FilmGrain';
import TopBar from '@/components/TopBar';
import PageHeader from '@/components/PageHeader';
import Footer from '@/components/Footer';
import Toast from '@/components/Toast';
import { useLanguage } from '@/context/LanguageContext';
import { useCurrency } from '@/context/CurrencyContext';

export default function CgvClient() {
  const { lang, toggleLanguage } = useLanguage();
  const { currency, setCurrency } = useCurrency();
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const isFr = lang === 'fr';

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  return (
    <div className="min-h-screen relative flex flex-col justify-between overflow-x-hidden bg-bg text-fg">
      <FilmGrain />

      <TopBar
        lang={lang}
        onToggleLang={toggleLanguage}
        currency={currency}
        onSelectCurrency={setCurrency}
      />

      <main
        className="flex-grow relative z-10 pb-16"
        style={{ paddingTop: 'calc(var(--topbar-height, 48px) + 16px)' }}
      >
        <PageHeader
          lang={lang}
          eyebrow={isFr ? 'CADRE CONTRACTUEL' : 'LEGAL FRAMEWORK'}
          title={isFr ? 'CONDITIONS GÉNÉRALES DE VENTE' : 'TERMS OF SERVICE'}
          subtitle={
            isFr
              ? 'Modalités applicables aux prestations de production vidéo IA et à la Masterclass OVIZai'
              : 'Terms applicable to AI video production services and the OVIZai Masterclass'
          }
        />

        <div className="max-w-xl mx-auto px-4 space-y-4 text-xs text-muted leading-relaxed">
          <section className="ovizai-card p-4 sm:p-5">
            <h2 className="mono text-xs sm:text-[13px] font-semibold text-gold mb-2 uppercase tracking-[0.2em]">
              {isFr ? '1 // Objet & Champ d’Application' : '1 // Scope & Purpose'}
            </h2>
            <div className="space-y-1">
              <p>
                {isFr
                  ? 'Les présentes conditions régissent les relations contractuelles avec OVIZai Studio'
                  : 'These terms govern all contractual relations with OVIZai Studio'}
              </p>
              <p>
                {isFr
                  ? 'Elles s’appliquent à l’ensemble de nos formules de production vidéo IA'
                  : 'They apply to all our AI video production packages and services'}
              </p>
              <p>
                {isFr
                  ? 'Elles couvrent le Sprint Pilote et la Campagne de Marque'
                  : 'They cover the Pilot Sprint and Brand Campaign packages'}
              </p>
              <p>
                {isFr
                  ? 'Elles encadrent également toutes nos prestations sur-mesure'
                  : 'They also govern all custom and enterprise production briefs'}
              </p>
              <p>
                {isFr
                  ? 'Elles s’appliquent enfin à l’accès à la Masterclass Vidéo IA'
                  : 'They additionally apply to access to the AI Video Masterclass'}
              </p>
            </div>
          </section>

          <section className="ovizai-card p-4 sm:p-5">
            <h2 className="mono text-xs sm:text-[13px] font-semibold text-gold mb-2 uppercase tracking-[0.2em]">
              {isFr ? '2 // Commandes & Délais de Livraison' : '2 // Orders & Delivery Timelines'}
            </h2>
            <div className="space-y-1">
              <p>
                {isFr
                  ? 'Sprint Pilote 48-72h : 1 asset publicitaire court livré en 48 à 72h ouvrées'
                  : 'Pilot Sprint 48-72h: 1 short commercial asset delivered within 48 to 72 business hours'}
              </p>
              <p>
                {isFr
                  ? 'Campagne de Marque : 3 vidéos cinématographiques livrées en 48 à 72h prioritaires'
                  : 'Brand Campaign: 3 cinematic videos delivered within 48 to 72 priority business hours'}
              </p>
              <p>
                {isFr
                  ? 'Prestations sur-mesure : délais fixés contractuellement selon le devis validé'
                  : 'Custom projects: timelines established in writing according to the validated quote'}
              </p>
            </div>
          </section>

          <section className="ovizai-card p-4 sm:p-5">
            <h2 className="mono text-xs sm:text-[13px] font-semibold text-gold mb-2 uppercase tracking-[0.2em]">
              {isFr ? '3 // Tarifs & Règlement' : '3 // Pricing & Payment Terms'}
            </h2>
            <div className="space-y-1">
              <p>
                {isFr
                  ? 'Les tarifs sont indiqués en USD, EUR et CAD selon votre sélection'
                  : 'Rates are specified in USD, EUR and CAD depending on your selection'}
              </p>
              <p>
                {isFr
                  ? 'Les paiements de la Masterclass sont traités de façon sécurisée via Stripe Checkout'
                  : 'Masterclass course orders are processed securely via Stripe Checkout'}
              </p>
              <p>
                {isFr
                  ? 'Pour les formules de production, le règlement s’effectue selon les modalités du devis'
                  : 'Production packages are settled according to terms stipulated in the formal brief quote'}
              </p>
            </div>
          </section>

          <section className="ovizai-card p-4 sm:p-5">
            <h2 className="mono text-xs sm:text-[13px] font-semibold text-gold mb-2 uppercase tracking-[0.2em]">
              {isFr ? '4 // Droit de Rétractation & Renoncement Exprès' : '4 // Right of Withdrawal & Waiver'}
            </h2>
            <div className="space-y-1">
              <p>
                {isFr
                  ? 'L’accès à la Masterclass constitue la fourniture d’un contenu numérique immédiat'
                  : 'Access to the Masterclass constitutes digital content delivered immediately'}
              </p>
              <p>
                {isFr
                  ? 'En validant votre commande, vous accédez au programme immédiatement'
                  : 'Upon order validation, access to course materials is granted without delay'}
              </p>
              <p>
                {isFr
                  ? 'Vous renoncez expressément à votre droit de rétractation conformément au Code de la consommation'
                  : 'You expressly waive the standard withdrawal period pursuant to digital consumer protection statutes'}
              </p>
              <p>
                {isFr
                  ? 'Pour les prestations vidéo personnalisées, le droit de rétractation ne s’applique pas une fois la production lancée'
                  : 'For custom video commissions, withdrawal rights do not apply once production pipeline is initiated'}
              </p>
            </div>
          </section>
        </div>
      </main>

      <Footer lang={lang} onShowToast={showToast} />
      <Toast message={toastMessage} />
    </div>
  );
}
