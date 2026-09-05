import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Devis & Contact — Projet Vidéo IA sur Mesure | OVIZai',
  description: 'Déposez votre brief de production vidéo IA en 3 étapes. Réponse et devis gratuit sous 24 à 48h ouvrées. Sprint Pilote, Standard, Premium.',
  keywords: ['Devis Production Vidéo IA', 'Contact OVIZai', 'Brief Vidéo IA', 'Production Cinématographique IA'],
  alternates: {
    canonical: 'https://ovizai.com/contact',
    languages: {
      fr: 'https://ovizai.com/contact',
      en: 'https://ovizai.com/contact',
      'x-default': 'https://ovizai.com/contact',
    },
  },
  openGraph: {
    title: 'Contact & Devis — OVIZai AI Video Studio',
    description: 'Brief qualifié en 3 étapes. Devis gratuit et réponse sous 24-48h pour votre projet vidéo IA cinématographique.',
    url: 'https://ovizai.com/contact',
    siteName: 'OVIZai',
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact & Devis — OVIZai',
    description: 'Déposez votre brief vidéo IA. Devis gratuit sous 24h.',
  },
};

import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Accueil', url: 'https://ovizai.com' },
          { name: 'Contact & Devis', url: 'https://ovizai.com/contact' },
        ]}
      />
      {children}
    </>
  );
}
