import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Masterclass Vidéo IA — Formation Complète Midjourney, Runway, Kling | OVIZai',
  description: 'Formation pratique à la création de films cinématographiques avec IA. 5 modules : Midjourney v6.1, Runway Gen-3, Kling AI, Topaz Video AI, DaVinci Resolve. Accès à vie.',
  keywords: ['Masterclass Vidéo IA', 'Formation Midjourney', 'Cours Runway Gen-3', 'Formation Kling AI', 'OVIZai Masterclass'],
  openGraph: {
    title: 'Masterclass Vidéo IA — OVIZai Studio',
    description: '5 modules pratiques pour créer des films cinématographiques avec IA. Midjourney, Runway, Kling, Topaz, DaVinci Resolve. Accès à vie.',
    url: 'https://ovizai.com/formation',
    siteName: 'OVIZai',
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Masterclass Vidéo IA — OVIZai',
    description: '5 modules pratiques, accès à vie. Créez des films IA cinématographiques 4K.',
  },
};

export default function FormationLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
