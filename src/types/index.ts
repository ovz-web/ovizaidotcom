export type Language = 'fr' | 'en';
export type Currency = 'EUR' | 'USD' | 'CAD';

export interface Dictionary {
  [key: string]: any;
}

export interface CommandItem {
  id?: string;
  label?: { fr: string; en: string };
  action?: any;
  href?: string;
  key?: string;
  icon?: any;
  category?: string;
  [key: string]: any;
}

export interface PipelineTool {
  id?: string;
  name?: string;
  category?: string;
  role?: { fr: string; en: string };
  specs?: { fr: string; en: string };
  features?: { fr: string[]; en: string[] } | any;
  badge?: string;
  [key: string]: any;
}

export interface ServiceItem {
  id?: string;
  title?: { fr: string; en: string };
  subtitle?: { fr: string; en: string };
  description?: { fr: string; en: string };
  price?: any;
  features?: any;
  [key: string]: any;
}

export interface ModuleItem {
  id?: string;
  title?: { fr: string; en: string };
  description?: { fr: string; en: string };
  duration?: string;
  lessons?: any;
  [key: string]: any;
}

export interface LeadSubmission {
  name?: string;
  email?: string;
  project_type?: string;
  budget_range?: string;
  currency?: string;
  message?: string;
  source?: string;
  [key: string]: any;
}
