export type Language = 'fr' | 'en';
export type Currency = 'EUR' | 'USD' | 'CAD';

export interface Dictionary {
  tagline: string;
  heroTitle1: string;
  heroTitle2: string;
  heroDesc: string;
  ctaServices: string;
  ctaMasterclass: string;
  backHome: string;
  servicesTitle: string;
  servicesSubtitle: string;
  quoteCta: string;
  masterclassTitle: string;
  masterclassSubtitle: string;
  formationAccess: string;
  contactTitle: string;
  contactSubtitle: string;
  formName: string;
  formEmail: string;
  formProject: string;
  formBudget: string;
  formMessage: string;
  formSubmit: string;
  formSending: string;
  formSuccess: string;
  formError: string;
  navServices: string;
  navMasterclass: string;
  navArsenal: string;
  navContact: string;
  footerRights: string;
}

export interface LeadSubmission {
  name?: string;
  email: string;
  project_type?: string;
  budget_range?: string;
  currency?: string;
  message?: string;
  source?: string;
}
