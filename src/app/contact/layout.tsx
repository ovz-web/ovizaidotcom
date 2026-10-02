import type { Metadata } from 'next';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';

export const metadata: Metadata = {
  title: 'Contact — Démarrer un Projet | OVIZai',
  description: 'Partagez votre brief publicitaire en quelques lignes. Offre de lancement à 530 USD et projets sur-mesure sur devis.',
  keywords: ['Contact OVIZai', 'Brief Vidéo Publicitaire', 'Devis Publicité Courte', 'Studio Créatif OVIZai'],
  alternates: {
    canonical: 'https://www.ovizai.com/contact',
    languages: {
      fr: 'https://www.ovizai.com/contact',
      en: 'https://www.ovizai.com/contact',
      'x-default': 'https://www.ovizai.com/contact',
    },
  },
  openGraph: {
    title: 'Contact — Démarrer un Projet | OVIZai',
    description: 'Partagez votre brief publicitaire en quelques lignes. Offre de lancement à 530 USD et projets sur-mesure sur devis.',
    url: 'https://www.ovizai.com/contact',
    siteName: 'OVIZai',
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact — Démarrer un Projet | OVIZai',
    description: 'Partagez votre brief publicitaire. Offre de lancement 530 USD.',
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Accueil', url: 'https://www.ovizai.com' },
          { name: 'Contact', url: 'https://www.ovizai.com/contact' },
        ]}
      />
      {children}
    </>
  );
}
