export type BusinessCategory = 
  | 'Coffee Shop'
  | 'Restaurant'
  | 'Salon'
  | 'Barber'
  | 'Gym'
  | 'Dentist'
  | 'Real Estate'
  | 'Local Service';

export type Tone = 
  | 'Friendly'
  | 'Professional'
  | 'Playful'
  | 'Premium'
  | 'Local/community';

export type ContentGoal = 
  | 'Get visits'
  | 'Get bookings'
  | 'Promote offer'
  | 'Build trust'
  | 'Get engagement';

export type ContentType = 
  | 'Instagram Post'
  | 'Facebook Post'
  | 'Google Business Post'
  | 'Promotion'
  | 'Announcement'
  | 'Educational Post'
  | 'Behind the Scenes'
  | 'Customer Story';

export type WebsiteSectionType = 
  | 'hero'
  | 'about'
  | 'services'
  | 'why_choose_us'
  | 'faq'
  | 'cta'
  | 'contact';

export interface BusinessProfile {
  id: string;
  name: string;
  category: BusinessCategory;
  location: string;
  description: string;
  website: string;
  instagram: string;
  facebook: string;
  phone: string;
  email: string;
  openingHours: string;
  services: string[];
  callToAction: string;
  uniqueSellingPoint: string;
  targetCustomer: string;
  preferredTone: Tone;
  updatedAt: string;
}

export interface GeneratedContent {
  id: string;
  title: string;
  contentType: ContentType;
  topic: string;
  tone: Tone;
  goal: ContentGoal;
  hook: string;
  caption: string;
  cta: string;
  suggestedVisual: string;
  hashtags: string[];
  createdAt: string;
  scheduledDate?: string;
  isSaved: boolean;
}

export interface CalendarItem {
  id: string;
  dayOfWeek: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  date: string;
  theme: string;
  contentType: ContentType;
  title: string;
  hook: string;
  caption: string;
  status: 'draft' | 'scheduled' | 'published';
  time?: string;
}

export type OfferType = 
  | 'First-time customer welcome'
  | 'Slow day boost'
  | 'Bundle / package'
  | 'VIP / loyalty perk'
  | 'Seasonal special'
  | 'Limited-time event';

export interface Offer {
  id: string;
  name: string;
  type: OfferType;
  headline: string;
  details: string;
  terms: string;
  validity: string;
  socialCopy: string;
  inStoreSign: string;
  productOrService?: string;
  originalPrice?: string;
  offerPrice?: string;
  startDate?: string;
  endDate?: string;
  targetCustomer?: string;
  callToAction?: string;
  shortDescription?: string;
  instagramCaption?: string;
  storyText?: string;
  websiteBannerCopy?: string;
  status: 'active' | 'scheduled' | 'expired';
  createdAt: string;
}

export interface CustomerResponse {
  id: string;
  category: 'Review Reply' | 'Direct Message' | 'Email';
  scenario: string;
  title: string;
  content: string;
  tone: string;
  isCustom?: boolean;
}

// Backward compatibility alias
export type CustomerResponseItem = CustomerResponse;

export interface MarketingTemplate {
  id: string;
  title: string;
  category: string;
  description: string;
  templateText: string;
  useCase?: string;
}

// Backward compatibility alias
export interface TemplateItem {
  id: string;
  title: string;
  category: 'Social Media' | 'Website' | 'Google Business' | 'Customer Messages' | 'Offers' | 'Reviews' | string;
  description: string;
  useCase?: string;
  content?: string;
  templateText?: string;
  isSaved?: boolean;
}

export interface ChecklistItem {
  id: string;
  category: 'Google Business' | 'Website' | 'Social Media' | 'Reviews';
  title: string;
  description: string;
  isCompleted: boolean;
  actionRoute?: string;
}

export interface ActivityLog {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  type?: 'content' | 'offer' | 'profile' | 'calendar' | 'response';
}

export type AppView = 
  | 'landing'
  | 'dashboard'
  | 'business'
  | 'content'
  | 'calendar'
  | 'website-copy'
  | 'google-business'
  | 'responses'
  | 'offers'
  | 'checklist'
  | 'templates'
  | 'settings';

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
}

export type ToastNotification = Toast;
