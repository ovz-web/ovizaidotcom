import type { Metadata } from 'next';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';

export const metadata: Metadata = {
  title: 'Expertises & Studio — Films, Image & Publicité | OVIZai',
  description: 'Découvrez les expertises OVIZai : films & publicité, produit & marque, musique & culture, et creative production — de l’idée au master final',
  keywords: [
    'Films Publicitaires',
    'Produit et Marque',
    'Musique et Culture',
    'Creative Production',
    'Studio Créatif OVIZai',
  ],
  alternates: {
    canonical: 'https://www.ovizai.com/services',
    languages: {
      fr: 'https://www.ovizai.com/services',
      en: 'https://www.ovizai.com/services',
      'x-default': 'https://www.ovizai.com/services',
    },
  },
  openGraph: {
    title: 'Expertises & Studio — Films, Image & Publicité | OVIZai',
    description: 'Découvrez les expertises OVIZai : films & publicité, produit & marque, musique & culture, et creative production — de l’idée au master final',
    url: 'https://www.ovizai.com/services',
    siteName: 'OVIZai',
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Expertises & Studio — OVIZai Creative Studio',
    description: 'Commercial films, brand & product visuals, music & culture, and custom creative production',
  },
};

const serviceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Studio Créatif, Film & Image',
  serviceType: 'Film & Creative Production',
  provider: {
    '@type': 'Organization',
    name: 'OVIZai',
    url: 'https://www.ovizai.com',
  },
  areaServed: 'Worldwide',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Expertises OVIZai',
    itemListElement: [
      {
        '@type': 'Offer',
        name: 'Films & Publicité',
        description: 'Des films conçus autour d’une idée forte, du concept au master final',
      },
      {
        '@type': 'Offer',
        name: 'Produit & Marque',
        description: 'Lancements, campagnes et univers visuels pensés autour de votre produit',
      },
      {
        '@type': 'Offer',
        name: 'Musique & Culture',
        description: 'Clips, séquences visuelles et projets pour artistes et univers culturels',
      },
      {
        '@type': 'Offer',
        name: 'Creative Production',
        description: 'Production sur mesure et marque blanche pour agences et studios',
      },
      {
        '@type': 'Offer',
        price: '530',
        priceCurrency: 'USD',
        name: 'Offre de Lancement',
        description: 'Un projet publicitaire de 10–15 secondes pour découvrir le studio',
      },
    ],
  },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Accueil', url: 'https://www.ovizai.com' },
          { name: 'Services', url: 'https://www.ovizai.com/services' },
        ]}
      />
      {children}
    </>
  );
}
