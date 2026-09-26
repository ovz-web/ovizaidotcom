import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Brief & Contact — Studio Publicitaire OVIZai',
  description: 'Déposez votre brief publicitaire en 3 étapes. Offre de lancement à 530 USD et projets sur-mesure sur devis sous 24h ouvrées.',
  keywords: ['Devis Publicité Courte', 'Contact OVIZai', 'Brief Vidéo Publicitaire', 'Studio Créatif OVIZai', 'Offre de Lancement 530'],
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
