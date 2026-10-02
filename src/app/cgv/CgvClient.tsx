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
          ? 'Les présentes conditions régissent l’ensemble des prestations de création publicitaire et services de production proposés par OVIZai Studio.'
          : 'These terms govern all advertising creation and production services provided by OVIZai Studio.',
        isFr
          ? 'Elles s’appliquent à notre Offre de Lancement (530 USD), aux productions sur-mesure sur devis, ainsi qu’aux partenariats agences en marque blanche.'
          : 'They apply to our introductory Launch Offer ($530 USD), custom productions on quote, and white-label agency partnerships.',
      ],
    },
    {
      id: 'turnaround',
      title: isFr ? '2 // Commandes & Délais d’Exécution' : '2 // Orders & Turnaround Times',
      content: [
        isFr
          ? 'Offre de Lancement (530 USD) : première version livrée sous 5 jours ouvrables. Ce délai commence après réception de l’ensemble des éléments nécessaires et validation conjointe du planning.'
          : 'Launch Offer ($530 USD): first cut delivered within 5 business days. This timeframe begins once all required assets are received and the production schedule is agreed upon.',
        isFr
          ? 'Projets plus complexes ou formats additionnels : calendrier de production personnalisé validé au devis sous 24h ouvrées.'
          : 'Complex custom productions or additional formats: dedicated production schedule confirmed in written quote within 24 business hours.',
      ],
    },
    {
      id: 'revisions',
      title: isFr ? '3 // Série de Corrections & Validation' : '3 // Revision Round & Approval Pipeline',
      content: [
        isFr
          ? 'L’Offre de Lancement inclut 1 série de corrections sur la première version livrée (ajustements de cadrage, rythme, étalonnage et sound design).'
          : 'The Launch Offer includes 1 revision round on the delivered initial cut (framing, pacing, color grading, and sound design adjustments).',
        isFr
          ? 'Une prévisualisation rythmée est soumise au client pour recueillir ses retours avant tout export définitif du master.'
          : 'A paced preview cut is submitted for client feedback prior to final master export.',
        isFr
          ? 'Toute modification substantielle du concept validé ou demande d’itérations supplémentaires fera l’objet d’un devis complémentaire préalable.'
          : 'Any major change to the approved concept or additional revision requests beyond the included round will require a separate quote.',
      ],
    },
    {
      id: 'payment',
      title: isFr ? '4 // Tarifs & Modalités de Paiement' : '4 // Rates & Payment Terms',
      content: [
        isFr
          ? 'Les tarifs sont libellés en USD (devise contractuelle de référence).'
          : 'Rates are expressed in USD (contractual baseline currency).',
        isFr
          ? 'Offre de Lancement (530 USD) : acompte de 265 USD exigible à la commande pour engager la production, et solde de 265 USD exigible avant livraison du master final.'
          : 'Launch Offer ($530 USD): $265 USD deposit required upfront to launch production, and $265 USD balance due prior to final master delivery.',
        isFr
          ? 'Projets sur devis : acompte (généralement 50 %) à la commande, solde à la livraison du master final.'
          : 'Custom quote projects: deposit (typically 50%) upon kickoff, balance upon final master delivery.',
      ],
    },
    {
      id: 'rights',
      title: isFr ? '5 // Cession des Droits & Propriété Intellectuelle' : '5 // Intellectual Property & Rights Transfer',
      content: [
        isFr
          ? 'Dès le règlement intégral du solde, OVIZai concède au client les droits et licences d’exploitation commerciale applicables, tels que définis et spécifiés au devis ou contrat de production.'
          : 'Upon receipt of full payment, OVIZai grants the client the applicable commercial exploitation rights and licenses as defined and specified in the production quote or agreement.',
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

      <Footer lang={lang} onToggleLang={toggleLanguage} onShowToast={showToast} />
      <Toast message={toastMessage} />
    </div>
  );
}
