/**
 * OVIZai Portfolio & Projects Architecture
 * Central data source for official studio portfolio work.
 * When published is false or array is empty, work section is cleanly omitted.
 */

export type ProjectType = 'client' | 'spec';

export interface PortfolioProject {
  id: string;
  title: { fr: string; en: string };
  sector: { fr: string; en: string };
  type: ProjectType;
  specLabel?: { fr: string; en: string };
  videoSrc?: string;
  posterSrc?: string;
  description: { fr: string; en: string };
  formats: string[]; // e.g. ['9:16', '16:9']
  year: number;
  published: boolean;
  featured?: boolean;
}

/**
 * Official projects registry.
 * Currently, pending the 3 new official films + food ad + product ad,
 * all projects are marked published: false (or registry empty) so that
 * NO outdated, speculative or empty players are rendered publicly.
 */
export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  // Future slot 01: Official Film 01 (Pending delivery)
  // Future slot 02: Official Film 02 (Pending delivery)
  // Future slot 03: Official Film 03 (Pending delivery)
  // Future slot 04: Food & Hospitality Ad (Pending delivery)
  // Future slot 05: Product Performance Ad (Pending delivery)
];

/**
 * Helper returning only published projects.
 * Used across Home, Services and Navigation.
 */
export function getPublishedProjects(): PortfolioProject[] {
  return PORTFOLIO_PROJECTS.filter((p) => p.published);
}

export function hasPublishedProjects(): boolean {
  return getPublishedProjects().length > 0;
}
