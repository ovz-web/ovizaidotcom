export type Language = 'fr' | 'en';
export type Currency = 'EUR' | 'USD' | 'CAD';

export interface Dictionary {
  [key: string]: any;
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
