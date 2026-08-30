export type Language = 'fr' | 'en';

export interface CommandItem {
  id: string;
  title: {
    fr: string;
    en: string;
  };
  sub: {
    fr: string;
    en: string;
  };
  key: string;
  action: {
    fr: string;
    en: string;
  };
  icon: 'video' | 'art' | 'workflow' | 'contact';
  type: 'contact' | 'scroll' | 'link';
  target?: string;
  mailtoSubject?: string;
}

export interface PipelineTool {
  id: string;
  name: string;
  category: string;
  version: string;
  desc: {
    fr: string;
    en: string;
  };
  badge: string;
  features: {
    fr: string[];
    en: string[];
  };
}

export interface LeadSubmission {
  email: string;
}
