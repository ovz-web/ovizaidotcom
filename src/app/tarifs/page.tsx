import type { Metadata } from 'next';
import TarifsClient from './TarifsClient';

export const metadata: Metadata = {
  title: 'Tarifs & Offres — Production Vidéo IA | OVIZai',
  description: 'Grille tarifaire et formules de production vidéo IA OVIZai. Comparaison marché avec la production vidéo traditionnelle (5 000–30 000 €). Formules d’entrée Sprint Pilote dès 490 € / $530 USD.',
  keywords: ['Tarifs Vidéo IA', 'Prix Production Vidéo', 'Sprint Pilote Vidéo IA', 'OVIZai Tarifs', 'Vidéo de marque IA'],
  openGraph: {
    title: 'Tarifs & Formules de Production Vidéo IA — OVIZai',
    description: 'Le même rendu qu’une production vidéo traditionnelle à 5k–30k€, sans le tournage et livré sous 48h à 5 jours.',
    url: 'https://ovizai.com/tarifs',
    siteName: 'OVIZai',
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tarifs & Formules — OVIZai AI Video Studio',
    description: 'Production vidéo IA cinématographique. Formules d’entrée Sprint Pilote et campagnes sur-mesure.',
  },
};

export default function TarifsPage() {
  return <TarifsClient />;
}
