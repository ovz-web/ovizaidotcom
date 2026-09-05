import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Méthode de Production & Pipeline IA Cinématographique | OVIZai',
  description: 'Pipeline de production vidéo IA complet : direction artistique, animation de caméra virtuelle, upscaling et étalonnage cinématographique. Workflow 4K garanti.',
  keywords: ['Méthode Vidéo IA', 'Pipeline Production IA', 'Animation Caméra Virtuelle', 'Étalonnage 4K', 'OVIZai Production'],
  openGraph: {
    title: 'Méthode de Production & Pipeline IA — OVIZai',
    description: 'Direction artistique + animation + caméra virtuelle + upscaling + étalonnage professionnel. Le pipeline complet de production vidéo IA cinématographique.',
    url: 'https://ovizai.com/stack',
    siteName: 'OVIZai',
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Méthode de Production & Pipeline IA — OVIZai',
    description: 'Concept art, animation, caméra virtuelle, upscaling et mastering cinéma. Pipeline vidéo IA 4K complet.',
  },
};

export default function StackLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
