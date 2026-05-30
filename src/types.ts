export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
  subscription: 'free' | 'premium' | 'business';
  createdAt: string;
  token?: string;
}

export interface BrandColors {
  primary: string;
  secondary: string;
  accent: string;
  bgBg: string; // Background of sections
  bgCard: string; // Card backgrounds
  textPrimary: string;
  textSecondary: string;
}

export interface SectionItem {
  id: string;
  title: string;
  description: string;
  price?: string;
  icon?: string;
  answer?: string; // For FAQs
}

export interface Section {
  id: string;
  type: 'hero' | 'about' | 'services' | 'faq' | 'contact' | 'footer';
  heading: string;
  subheading?: string;
  body?: string;
  image?: string;
  items?: SectionItem[];
  buttonText?: string;
  buttonUrl?: string;
}

export interface SeoMetadata {
  title: string;
  description: string;
  keywords: string;
}

export interface Website {
  id: string;
  userId: string;
  name: string;
  industry: string;
  description: string;
  logoTheme: string; // text representation
  brandColors: BrandColors;
  sections: Section[];
  seo: SeoMetadata;
  domain?: string;
  sslEnabled?: boolean;
  published: boolean;
  views: number;
  clicks: number;
  createdAt: string;
}

export interface Subscription {
  id: string;
  userId: string;
  plan: 'free' | 'premium' | 'business';
  status: 'active' | 'inactive';
  amount: number;
  createdAt: string;
  expiresAt: string;
}

export interface AnalyticsRecord {
  id: string;
  websiteId: string;
  eventType: 'view' | 'click';
  timestamp: string;
  referrer: string;
  device: string;
}

export interface SystemStats {
  totalUsers: number;
  totalWebsites: number;
  totalPremium: number;
  totalViews: number;
}
