'use client';

import React, { useState } from 'react';
import { Palette, Film, Cpu, Music2, GraduationCap, Check } from 'lucide-react';
import { Language } from '@/types';
import ListMenuCard, { ListMenuItem } from '@/components/ListMenuCard';

interface MasterclassSectionProps {
  lang: Language;
}

interface ModuleData {
  id: string;
  num: string;
  icon: React.ComponentType<{ className?: string }>;
  title: { fr: string; en: string };
  subtitle: { fr: string; en: string };
  overview: { fr: string[]; en: string[] };
  tools: string[];
  deliverables: { fr: string[]; en: string[] };
}

const MODULES: ModuleData[] = [
  {
    id: 'mod-01',
    num: '01',
    icon: Palette,
    title: {
      fr: 'Ingénierie de Prompts & Direction Visuelle 8K',
      en: 'Prompt Engineering & 8K Visual Direction',
    },
    subtitle: {
      fr: 'Création d’images cinématiques & cohérence de personnages',
      en: 'Cinematic image conception & character consistency',
    },
    overview: {
      fr: [
        'Grammaire avancée des prompts pour un rendu photographique réaliste',
        'Gestion précise de la lumière naturelle, clair-obscur et optiques cinéma (anamorphique, 35mm)',
        'Techniques de seeds et de multi-prompts pour figer un personnage sur plusieurs plans',
      ],
      en: [
        'Advanced prompt syntax for raw photographic cinematic realism',
        'Precise control of volumetric light, chiaroscuro and cine lenses (anamorphic, 35mm)',
        'Seed management and multi-prompt strategies to lock characters across multiple shots',
      ],
    },
    tools: ['Midjourney v6.1', 'Flux.1 Dev & Schnell', 'Magnific AI'],
    deliverables: {
      fr: ['Bible de prompts certifiés cinéma', 'Guide des optiques & ratios cinéma', 'Presets d’éclairages de studio'],
      en: ['Certified cinema prompt bible', 'Optics & aspect ratio cheat-sheet', 'Studio lighting preset bank'],
    },
  },
  {
    id: 'mod-02',
    num: '02',
    icon: Film,
    title: {
      fr: 'Cinéma Génératif & Caméra Virtuelle 3D',
      en: 'Generative Cinema & 3D Virtual Camera',
    },
    subtitle: {
      fr: 'Animation physique, dynamique & mouvements de caméra',
      en: 'Physics motion dynamics & 3D virtual camera control',
    },
    overview: {
      fr: [
        'Contrôle des trajectoires de caméra : travelling, panoramique, plongée et plans drones',
        'Paramétrage des vitesses et interpolation fluide pour éliminer les déformations',
        'Gestion de la physique des mouvements : drapés, eau, fumée et expressions faciales',
      ],
      en: [
        'Camera trajectory control: dollies, pans, crane shots and immersive drone paths',
        'Speed curve mapping and smooth interpolation to prevent generative warping',
        'Realistic physical dynamics: fluid simulations, cloth, smoke and facial micro-motions',
      ],
    },
    tools: ['Runway Gen-3 Alpha', 'Kling AI 1.5', 'Luma Dream Machine'],
    deliverables: {
      fr: ['Fiches de mouvements de caméra 3D', 'Workflow d’extension temporelle', 'Matrice d’animation des fluides'],
      en: ['3D camera motion cheat-sheet', 'Temporal shot extension workflow', 'Fluid & cloth animation matrix'],
    },
  },
  {
    id: 'mod-03',
    num: '03',
    icon: Cpu,
    title: {
      fr: 'Post-Production & Upscaling Neuronal 4K/8K',
      en: 'Post-Production & Neural 4K/8K Upscaling',
    },
    subtitle: {
      fr: 'Suppression du bruit génératif & étalonnage ACES',
      en: 'Artifact removal & ACES cinematic color grading',
    },
    overview: {
      fr: [
        'Nettoyage des artefacts génératifs et correction des micros-défauts d’animation',
        'Upscaling neuronal 4K et 8K avec préservation des textures organiques et du grain',
        'Conformation 24 fps cinéma et application de LUTs d’étalonnage professionnelles',
      ],
      en: [
        'Generative artifact cleanup and animation micro-defect fixes',
        'Neural 4K and 8K upscaling preserving organic skin textures and fine grain',
        '24 fps cinema conformation and proprietary film emulation LUTs',
      ],
    },
    tools: ['Topaz Video AI v5', 'DaVinci Resolve Studio', 'ProRes 422 HQ'],
    deliverables: {
      fr: ['Pack de 5 LUTs OVIZai Film Look', 'Profils d’upscaling Topaz prêts à l’emploi', 'Modèle de timeline DaVinci'],
      en: ['5 proprietary OVIZai Film Look LUTs', 'Ready-to-use Topaz export profiles', 'Pre-configured DaVinci timeline template'],
    },
  },
  {
    id: 'mod-04',
    num: '04',
    icon: Music2,
    title: {
      fr: 'Sound Design & Doublage Voix IA Multilingue',
      en: 'Sound Design & Multilingual AI Voice Dubbing',
    },
    subtitle: {
      fr: 'Bandes-son spatialisées, effets sonores & synchronisation',
      en: 'Spatial soundscapes, sound effects & beat sync',
    },
    overview: {
      fr: [
        'Composition de bandes-son cinématiques et génération audio calée sur les intentions du film',
        'Sound design spatialisé : bruitages réalistes, impacts et ambiances immersives',
        'Synthèse vocale hyperréaliste et clonage de voix avec synchronisation labiale',
      ],
      en: [
        'Cinematic score composition and mood-tailored generation',
        'Spatial sound design: realistic foley, impacts, and ambient atmospheres',
        'Hyperrealistic multilingual voice cloning and accurate lip-sync integration',
      ],
    },
    tools: ['ElevenLabs Voice', 'Suno / Udio', 'Sound Design Library'],
    deliverables: {
      fr: ['Banque de SFX cinéma OVIZai (100+ sons)', 'Guide de synchronisation labiale', 'Presets vocaux haute clarté'],
      en: ['100+ OVIZai cinema SFX sound pack', 'Lip-sync accuracy guide', 'High-clarity vocal master presets'],
    },
  },
  {
    id: 'mod-05',
    num: '05',
    icon: GraduationCap,
    title: {
      fr: 'Monétisation & Workflow Client Pro',
      en: 'Monetization & Professional Client Pipeline',
    },
    subtitle: {
      fr: 'Contrats commerciaux, cession de droits & livrables',
      en: 'Commercial quoting, copyright frameworks & master delivery',
    },
    overview: {
      fr: [
        'Structure tarifaire et modèle de devis pour vendre vos productions à des marques et agences',
        'Cadre légal de la propriété intellectuelle et des droits de diffusion commerciale sur les images IA',
        'Workflow complet de livraison client : exports multi-formats, validation et archivage',
      ],
      en: [
        'Pricing architecture and quote templates to pitch brands and agencies',
        'Legal frameworks covering AI copyright, commercial rights, and client assignment',
        'Complete client handoff pipeline: multi-format master exports, validation rounds, and archiving',
      ],
    },
    tools: ['Commercial Contract Templates', 'Pricing Calculator', 'DCP / ProRes'],
    deliverables: {
      fr: ['Modèle de devis et contrat de cession de droits', 'Grille de calcul de rentabilité', 'Checklist de livraison master'],
      en: ['Contract & copyright assignment templates', 'Production margin & pricing calculator', 'Master delivery QA checklist'],
    },
  },
];

export default function MasterclassSection({ lang }: MasterclassSectionProps) {
  const isFr = lang === 'fr';
  const [openModule, setOpenModule] = useState<string | null>(null);

  const toggleModule = (id: string) => {
    setOpenModule((prev) => (prev === id ? null : id));
  };

  const items: ListMenuItem[] = MODULES.map((mod) => {
    const isOpen = openModule === mod.id;

    return {
      id: mod.id,
      icon: mod.icon,
      title: `${mod.num} // ${isFr ? mod.title.fr : mod.title.en}`,
      subtitle: isFr ? mod.subtitle.fr : mod.subtitle.en,
      trailing: isOpen ? (isFr ? 'Fermer ↑' : 'Close ↑') : (isFr ? 'Détails ↓' : 'Details ↓'),
      onClick: () => toggleModule(mod.id),
      expanded: isOpen,
      expandedContent: (
        <div className="space-y-4 pt-1">
          <div>
            <h4 className="mono text-[10px] uppercase text-gold font-bold tracking-[0.2em] mb-2">
              {isFr ? 'Programme & Compétences Clés' : 'Curriculum & Key Skills'}
            </h4>
            <div className="space-y-1.5 text-xs text-fg/90 leading-relaxed">
              {(isFr ? mod.overview.fr : mod.overview.en).map((line, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <span className="text-gold font-mono text-[11px] mt-0.5">•</span>
                  <span>{line}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mono text-[10px] uppercase text-gold font-bold tracking-[0.2em] mb-2">
              {isFr ? 'Moteurs & Outils Étudiés' : 'Engines & Tools Studied'}
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {mod.tools.map((tool) => (
                <span
                  key={tool}
                  className="mono text-[10.5px] font-semibold px-2.5 py-1 rounded-md bg-black/60 border border-white/[0.08] text-fg"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-white/[0.06]">
            <h4 className="mono text-[10px] uppercase text-gold font-bold tracking-[0.2em] mb-2">
              {isFr ? 'Livrables Pratiques Inclus' : 'Included Practical Deliverables'}
            </h4>
            <div className="space-y-1 text-xs text-muted">
              {(isFr ? mod.deliverables.fr : mod.deliverables.en).map((deliv, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                  <span className="text-fg/80">{deliv}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
    };
  });

  return (
    <div className="max-w-xl mx-auto px-4 mb-8">
      <div className="mb-3">
        <span className="mono text-[10px] uppercase tracking-[0.25em] text-gold font-bold block mb-1">
          {isFr ? 'PROGRAMME DE FORMATION' : 'TRAINING CURRICULUM'}
        </span>
        <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-fg leading-snug">
          {isFr ? '5 Modules Pratiques & Méthode 4K' : '5 Practical Modules & 4K Method'}
        </h2>
        <p className="text-xs text-muted mt-1">
          {isFr
            ? 'Cliquez sur un module pour afficher les compétences, outils et livrables inclus'
            : 'Click on a module to view covered skills, tools and deliverables'}
        </p>
      </div>

      <ListMenuCard items={items} />
    </div>
  );
}
