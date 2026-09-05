import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Masterclass Vidéo IA — Formation Cinéma & Post-Production 4K | OVIZai',
  description: 'Formation pratique à la création de films cinématographiques avec IA. 5 modules complets : concept art, animation, caméra virtuelle, sound design et mastering 4K. Accès à vie.',
  keywords: ['Masterclass Vidéo IA', 'Formation Cinéma IA', 'Cours Animation Virtuelle', 'Mastering 4K IA', 'OVIZai Masterclass'],
  openGraph: {
    title: 'Masterclass Vidéo IA — OVIZai Studio',
    description: '5 modules pratiques pour créer des films cinématographiques avec IA : concept art, animation, caméra virtuelle, sound design et mastering 4K. Accès à vie.',
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
