import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Prestations & Services — Production Vidéo IA Cinématographique | OVIZai',
  description: 'Films publicitaires IA, clips musicaux, direction artistique et univers visuels cinématographiques haute fidélité. Livraison 48h à 5 jours.',
  keywords: ['Production Vidéo IA', 'Films Publicitaires IA', 'Direction Artistique IA', 'Clips Musicaux IA', 'OVIZai Services'],
  openGraph: {
    title: 'Prestations & Services — OVIZai AI Video Studio',
    description: 'Films IA cinématographiques 4K pour marques et artistes. Direction artistique, clips, publicités et univers visuels.',
    url: 'https://ovizai.com/services',
    siteName: 'OVIZai',
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Services Production Vidéo IA — OVIZai',
    description: 'Films, clips, publicités IA cinématographiques 4K. Livraison sous 48h à 5 jours.',
  },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
