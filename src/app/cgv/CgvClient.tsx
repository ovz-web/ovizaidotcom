'use client';

import React, { useState } from 'react';
import FilmGrain from '@/components/FilmGrain';
import TopBar from '@/components/TopBar';
import PageHeader from '@/components/PageHeader';
import ListMenuCard, { ListMenuItem } from '@/components/ListMenuCard';
import Footer from '@/components/Footer';
import Toast from '@/components/Toast';
import { useLanguage } from '@/context/LanguageContext';
import { useCurrency } from '@/context/CurrencyContext';

export default function CgvClient() {
  const { lang, toggleLanguage } = useLanguage();
  const { currency, setCurrency } = useCurrency();
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [openSection, setOpenSection] = useState<string | null>(null);

  const isFr = lang === 'fr';

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  const toggleSection = (id: string) => {
    setOpenSection((prev) => (prev === id ? null : id));
  };

  const cgvSections = [
    {
      id: 'scope',
      title: isFr ? '1 // Objet & Champ d’Application' : '1 // Scope & Purpose',
      content: [
        isFr
          ? 'Les présentes conditions régissent l’ensemble des prestations de production vidéo IA et services créatifs proposés par OVIZai Studio.'
          : 'These terms govern all AI video production and creative services provided by OVIZai Studio.',
        isFr
          ? 'Elles s’appliquent à nos formules de production (Sprint Pilote 48-72h, Campagne de Marque), aux productions sur-mesure, aux interventions en marque blanche pour les agences, ainsi qu’à l’accès à la Masterclass Vidéo IA.'
          : 'They apply to our studio packages (48-72h Pilot Sprint, Brand Campaign), custom commissions, white-label agency partnerships, and the AI Video Masterclass.',
      ],
    },
    {
      id: 'turnaround',
      title: isFr ? '2 // Commandes & Délais d’Exécution' : '2 // Orders & Turnaround Times',
      content: [
        isFr
          ? 'Sprint Pilote : livraison garantie sous 48 à 72 heures ouvrées à compter de la validation du brief créatif.'
          : 'Pilot Sprint: guaranteed delivery within 48 to 72 business hours following creative brief sign-off.',
        isFr
          ? 'Campagne de Marque (3 films) : livraison prioritaire sous 48 à 72 heures ouvrées avec direction artistique dédiée.'
          : 'Brand Campaign (3 films): priority delivery within 48 to 72 business hours with dedicated art direction.',
        isFr
          ? 'Projets d’envergure sur-mesure (séries, clips 4K) : calendrier de production personnalisé validé au devis sous 24h.'
          : 'Scale custom productions (series, 4K clips): tailored delivery schedule confirmed in written quote within 24h.',
      ],
    },
    {
      id: 'revisions',
      title: isFr ? '3 // Rounds de Révision & Processus de Validation' : '3 // Revision Rounds & Approval Pipeline',
      content: [
        isFr
          ? 'Chaque formule inclut des rounds de révision complets spécifiés au devis (1 round inclus pour le Sprint Pilote, 3 rounds inclus pour la Campagne de Marque).'
          : 'Each package includes dedicated revision rounds specified in the quote (1 round for Pilot Sprint, 3 rounds for Brand Campaign).',
        isFr
          ? 'Une prévisualisation rythmée en basse résolution est soumise au client pour ajuster le cadrage, les raccords et l’étalonnage avant tout export définitif 4K.'
          : 'A paced low-res preview cut is submitted for client feedback to fine-tune framing, cuts, and color grading prior to final 4K master delivery.',
        isFr
          ? 'Toute modification substantielle du brief initial ou demande d’itérations additionnelles hors forfait fera l’objet d’un devis complémentaire préalable.'
          : 'Any major change to the initial brief or additional iteration requests beyond included rounds will be subject to a separate estimate.',
      ],
    },
    {
      id: 'payment',
      title: isFr ? '4 // Tarifs & Conditions de Paiement' : '4 // Rates & Payment Terms',
      content: [
        isFr
          ? 'Les tarifs sont libellés en USD, EUR ou CAD selon la sélection de facturation.'
          : 'Rates are expressed in USD, EUR, or CAD depending on client billing selection.',
        isFr
          ? 'Prestations de production : acompte de 50 % exigible à la commande pour engager le pipeline de calcul GPU, solde de 50 % à la livraison finale du master 4K.'
          : 'Production services: 50% deposit required at contract kickoff to initiate GPU pipeline, 50% balance upon final 4K master delivery.',
        isFr
          ? 'Masterclass Vidéo IA : règlement comptant en paiement unique sécurisé via Stripe Checkout (carte bancaire internationale).'
          : 'AI Video Masterclass: upfront one-time payment processed securely via Stripe Checkout (international cards).',
      ],
    },
    {
      id: 'rights',
      title: isFr ? '5 // Cession des Droits & Propriété Intellectuelle' : '5 // Intellectual Property & Rights Transfer',
      content: [
        isFr
          ? 'Dès le règlement intégral des factures, OVIZai cède au client 100 % des droits patrimoniaux et d’exploitation commerciale sur les masters livrés (diffusion web, réseaux sociaux, TV, cinéma sans limite géographique ni temporelle).'
          : 'Upon receipt of full payment, OVIZai grants the client 100% of commercial exploitation rights for delivered master files (web, social media, broadcast, cinema worldwide in perpetuity).',
        isFr
          ? 'Sauf accord contraire écrit ou clause de marque blanche stricte, OVIZai se réserve le droit de mentionner la réalisation à titre de référence dans son portfolio professionnel.'
          : 'Unless agreed otherwise in writing or governed by a strict white-label clause, OVIZai reserves the right to showcase the work as a portfolio reference.',
      ],
    },
    {
      id: 'whitelabel-nda',
      title: isFr ? '6 // Marque Blanche (White-Label) & Confidentialité (NDA)' : '6 // White-Label Agency Partner & NDA',
      content: [
        isFr
          ? 'Pour les agences de communication et médias partenaires, OVIZai intervient en marque blanche (white-label) intégrale : livrables neutres sans filigrane ni mention OVIZai, communication indirecte avec vos clients finaux.'
          : 'For creative and media agency partners, OVIZai operates in full white-label mode: unbranded neutral master deliverables, zero public disclosure, direct delivery ready for your end clients.',
        isFr
          ? 'Un accord de non-divulgation (NDA) bilatéral strict protège systématiquement vos concepts, assets de marque et lancements confidentiels avant leur diffusion publique.'
          : 'A strict bilateral Non-Disclosure Agreement (NDA) systematically protects your concepts, brand assets, and upcoming releases prior to official launch.',
      ],
    },
    {
      id: 'legal-framework',
      title: isFr ? '7 // Rétractation, Droit Applicable & Juridiction' : '7 // Cancellation, Governing Law & Jurisdiction',
      content: [
        isFr
          ? 'Masterclass : conformément à la réglementation relative aux contenus numériques fournis immédiatement, l’utilisateur renonce expressément à son droit de rétractation lors de l’achat pour accéder immédiatement aux bibles de prompts et vidéos.'
          : 'Masterclass: in accordance with consumer regulations on digital content supplied immediately, the customer expressly waives any right of cancellation to access course assets instantly upon checkout.',
        isFr
          ? 'Productions vidéo personnalisées : les prestations sur-mesure débutant dès validation du brief ne donnent lieu à aucun droit de rétractation une fois la génération engagée.'
          : 'Custom video services: custom commissions initiating upon brief validation cannot be cancelled once generation and direction pipeline is active.',
        isFr
          ? 'Droit applicable : les présentes stipulations sont soumises aux lois en vigueur applicables au siège d’exploitation d’OVIZai Studio (dispositions relatives au droit canadien et québécois ou au droit français et européen selon l’entité contractante, à faire valider par votre conseil juridique).'
          : 'Governing law: these terms are governed by the applicable laws of OVIZai Studio’s registered operating jurisdiction (Canadian/Quebec law or French/European law depending on the contracting party, to be reviewed by qualified legal counsel).',
      ],
    },
  ];

  const items: ListMenuItem[] = cgvSections.map((sec) => {
    const isOpen = openSection === sec.id;
    return {
      id: sec.id,
      title: sec.title,
      trailing: isOpen ? '↑' : '↓',
      onClick: () => toggleSection(sec.id),
      expanded: isOpen,
      expandedContent: (
        <div className="space-y-1.5 text-xs text-muted leading-relaxed pt-1">
          {sec.content.map((p, idx) => (
            <p key={idx}>{p}</p>
          ))}
        </div>
      ),
    };
  });

  return (
    <div className="min-h-[100dvh] relative flex flex-col justify-between overflow-x-hidden bg-bg text-fg">
      <FilmGrain />

      <TopBar
        lang={lang}
        onToggleLang={toggleLanguage}
        currency={currency}
        onSelectCurrency={setCurrency}
      />

      <main
        className="flex-grow relative z-10 pt-[calc(var(--topbar-height,44px)+6px)] sm:pt-[calc(var(--topbar-height,44px)+8px)]"
      >
        <PageHeader
          tag={isFr ? 'CADRE CONTRACTUEL' : 'LEGAL FRAMEWORK'}
          title={
            isFr ? (
              <>
                CONDITIONS GÉNÉRALES <span className="text-gold-gradient">DE VENTE & SERVICES</span>
              </>
            ) : (
              <>
                TERMS OF SERVICE & <span className="text-gold-gradient">STUDIO AGREEMENT</span>
              </>
            )
          }
          subtitle={
            isFr
              ? 'Conditions de nos prestations et de la formation'
              : 'Terms for our services and masterclass'
          }
          showDetailsHint={true}
          lang={lang}
        />

        <div className="max-w-xl mx-auto px-4 mb-1 sm:mb-2">
          <ListMenuCard items={items} />
        </div>
      </main>

      <Footer lang={lang} onShowToast={showToast} />
      <Toast message={toastMessage} />
    </div>
  );
}
