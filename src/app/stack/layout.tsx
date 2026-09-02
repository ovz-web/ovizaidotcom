import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Stack Technique & Pipeline IA — Midjourney, Runway, Kling, DaVinci | OVIZai',
  description: 'Pipeline de production vidéo IA complet : Midjourney v6.1, Runway Gen-3 Alpha, Kling AI 1.5, Topaz Video AI 5 et DaVinci Resolve Studio 19. Workflow cinématographique 4K.',
  keywords: ['Stack IA Vidéo', 'Pipeline Midjourney Runway', 'Kling AI Production', 'DaVinci Resolve Studio', 'OVIZai Stack'],
  openGraph: {
    title: 'Stack Technique & Pipeline IA — OVIZai',
    description: 'Midjourney v6.1 + Runway Gen-3 + Kling AI + Topaz + DaVinci Resolve. Le pipeline complet de production vidéo IA cinématographique.',
    url: 'https://ovizai.com/stack',
    siteName: 'OVIZai',
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tech Stack & Pipeline IA — OVIZai',
    description: 'Midjourney v6.1, Runway Gen-3, Kling AI, Topaz, DaVinci Resolve. Pipeline vidéo IA 4K complet.',
  },
};

export default function StackLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
