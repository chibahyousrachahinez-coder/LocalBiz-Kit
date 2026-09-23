import {
  BusinessProfile,
  GeneratedContent,
  CalendarItem,
  Offer,
  CustomerResponseItem,
  ChecklistItem,
  ActivityLog
} from '../types';
import {
  DEMO_BUSINESS,
  DEMO_CONTENT_PIECES,
  DEMO_SAVED_TEMPLATES,
  DEMO_CUSTOMER_RESPONSES,
  DEMO_OFFERS,
  INITIAL_CHECKLIST,
  DEMO_CALENDAR_ITEMS,
  DEMO_ACTIVITIES
} from '../data/demoData';

const DB_NAME = 'localbiz_kit_db';
const DB_VERSION = 1;
const STORE_NAME = 'app_state';

// IndexedDB Helper
function openIndexedDB(): Promise<IDBDatabase | null> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      resolve(null);
      return;
    }
    try {
      const request = window.indexedDB.open(DB_NAME, DB_VERSION);
      request.onerror = () => resolve(null);
      request.onsuccess = () => resolve(request.result);
      request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME);
        }
      };
    } catch {
      resolve(null);
    }
  });
}

async function setInIndexedDB(key: string, value: unknown): Promise<void> {
  try {
    const db = await openIndexedDB();
    if (!db) return;
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    store.put(value, key);
  } catch (err) {
    console.warn('IndexedDB write failed, falling back to localStorage', err);
  }
}

async function getFromIndexedDB<T>(key: string): Promise<T | null> {
  try {
    const db = await openIndexedDB();
    if (!db) return null;
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(key);
      req.onsuccess = () => resolve(req.result !== undefined ? req.result : null);
      req.onerror = () => resolve(null);
    });
  } catch {
    return null;
  }
}

// LocalStorage helpers with automatic IndexedDB synchronization
function getLocalItem<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const data = localStorage.getItem(key);
    if (!data) return fallback;
    return JSON.parse(data) as T;
  } catch {
    return fallback;
  }
}

function setLocalItem<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    const str = JSON.stringify(value);
    localStorage.setItem(key, str);
    // Asynchronously update IndexedDB for seamless offline/persistence guarantees
    setInIndexedDB(key, value);
  } catch (err) {
    console.warn('Storage set failed', err);
  }
}

const KEYS = {
  PROFILE: 'localbiz_profile',
  CONTENT: 'localbiz_content',
  CALENDAR: 'localbiz_calendar',
  OFFERS: 'localbiz_offers',
  RESPONSES: 'localbiz_responses',
  CHECKLIST: 'localbiz_checklist',
  SAVED_TEMPLATES: 'localbiz_saved_templates',
  ACTIVITIES: 'localbiz_activities',
  ONBOARDED: 'localbiz_onboarded'
};

export const StorageService = {
  initStorage(): void {
    if (typeof window === 'undefined') return;
    if (!localStorage.getItem(KEYS.PROFILE)) {
      setLocalItem(KEYS.PROFILE, DEMO_BUSINESS);
    }
    if (!localStorage.getItem(KEYS.CONTENT)) {
      setLocalItem(KEYS.CONTENT, DEMO_CONTENT_PIECES);
    }
    if (!localStorage.getItem(KEYS.CALENDAR)) {
      setLocalItem(KEYS.CALENDAR, DEMO_CALENDAR_ITEMS);
    }
    if (!localStorage.getItem(KEYS.OFFERS)) {
      setLocalItem(KEYS.OFFERS, DEMO_OFFERS);
    }
    if (!localStorage.getItem(KEYS.RESPONSES)) {
      setLocalItem(KEYS.RESPONSES, DEMO_CUSTOMER_RESPONSES);
    }
    if (!localStorage.getItem(KEYS.CHECKLIST)) {
      setLocalItem(KEYS.CHECKLIST, INITIAL_CHECKLIST);
    }
    if (!localStorage.getItem(KEYS.SAVED_TEMPLATES)) {
      setLocalItem(KEYS.SAVED_TEMPLATES, DEMO_SAVED_TEMPLATES);
    }
    if (!localStorage.getItem(KEYS.ACTIVITIES)) {
      setLocalItem(KEYS.ACTIVITIES, DEMO_ACTIVITIES);
    }
    if (localStorage.getItem(KEYS.ONBOARDED) === null) {
      setLocalItem(KEYS.ONBOARDED, true); // Seeded as onboarded for demo
    }
  },

  getBusinessProfile(): BusinessProfile {
    return getLocalItem(KEYS.PROFILE, DEMO_BUSINESS);
  },

  saveBusinessProfile(profile: BusinessProfile): void {
    setLocalItem(KEYS.PROFILE, { ...profile, updatedAt: new Date().toISOString() });
    this.addActivity({
      title: 'Updated Business Profile',
      description: `Saved details for ${profile.name}`,
      type: 'profile'
    });
  },

  getContentList(): GeneratedContent[] {
    return getLocalItem(KEYS.CONTENT, DEMO_CONTENT_PIECES);
  },

  saveContentItem(item: GeneratedContent): GeneratedContent[] {
    const list = this.getContentList();
    const idx = list.findIndex(c => c.id === item.id);
    let updated: GeneratedContent[];
    if (idx >= 0) {
      updated = [...list];
      updated[idx] = item;
    } else {
      updated = [item, ...list];
    }
    setLocalItem(KEYS.CONTENT, updated);
    this.addActivity({
      title: 'Created Marketing Copy',
      description: `Drafted: "${item.title || item.topic}"`,
      type: 'content'
    });
    return updated;
  },

  deleteContentItem(id: string): GeneratedContent[] {
    const list = this.getContentList();
    const updated = list.filter(c => c.id !== id);
    setLocalItem(KEYS.CONTENT, updated);
    return updated;
  },

  getCalendarItems(): CalendarItem[] {
    return getLocalItem(KEYS.CALENDAR, DEMO_CALENDAR_ITEMS);
  },

  saveCalendarItem(item: CalendarItem): CalendarItem[] {
    const list = this.getCalendarItems();
    const idx = list.findIndex(c => c.id === item.id);
    let updated: CalendarItem[];
    if (idx >= 0) {
      updated = [...list];
      updated[idx] = item;
    } else {
      updated = [...list, item];
    }
    setLocalItem(KEYS.CALENDAR, updated);
    this.addActivity({
      title: 'Updated Content Calendar',
      description: `Scheduled "${item.title}" for ${item.dayOfWeek}`,
      type: 'calendar'
    });
    return updated;
  },

  deleteCalendarItem(id: string): CalendarItem[] {
    const list = this.getCalendarItems();
    const updated = list.filter(c => c.id !== id);
    setLocalItem(KEYS.CALENDAR, updated);
    return updated;
  },

  toggleCalendarItemStatus(id: string): CalendarItem[] {
    const list = this.getCalendarItems();
    const updated: CalendarItem[] = list.map(item => {
      if (item.id === id) {
        const nextStatus: 'draft' | 'scheduled' | 'published' = item.status === 'published' ? 'scheduled' : 'published';
        return { ...item, status: nextStatus };
      }
      return item;
    });
    setLocalItem(KEYS.CALENDAR, updated);
    return updated;
  },

  getProfile(): BusinessProfile {
    return this.getBusinessProfile();
  },

  saveProfile(profile: BusinessProfile): void {
    this.saveBusinessProfile(profile);
  },

  getContent(): GeneratedContent[] {
    return this.getContentList();
  },

  getCalendar(): CalendarItem[] {
    return this.getCalendarItems();
  },

  getOffers(): Offer[] {
    return getLocalItem(KEYS.OFFERS, DEMO_OFFERS);
  },

  saveOffer(offer: Offer): Offer[] {
    const list = this.getOffers();
    const idx = list.findIndex(o => o.id === offer.id);
    let updated: Offer[];
    if (idx >= 0) {
      updated = [...list];
      updated[idx] = offer;
    } else {
      updated = [offer, ...list];
    }
    setLocalItem(KEYS.OFFERS, updated);
    this.addActivity({
      title: 'Created Promotion Offer',
      description: `Saved offer: "${offer.name}"`,
      type: 'offer'
    });
    return updated;
  },

  deleteOffer(id: string): Offer[] {
    const list = this.getOffers();
    const updated = list.filter(o => o.id !== id);
    setLocalItem(KEYS.OFFERS, updated);
    return updated;
  },

  getResponses(): CustomerResponseItem[] {
    return getLocalItem(KEYS.RESPONSES, DEMO_CUSTOMER_RESPONSES);
  },

  saveResponse(resp: CustomerResponseItem): CustomerResponseItem[] {
    const list = this.getResponses();
    const idx = list.findIndex(r => r.id === resp.id);
    let updated: CustomerResponseItem[];
    if (idx >= 0) {
      updated = [...list];
      updated[idx] = resp;
    } else {
      updated = [resp, ...list];
    }
    setLocalItem(KEYS.RESPONSES, updated);
    this.addActivity({
      title: 'Added Customer Response',
      description: `Prepared reply template for "${resp.category}"`,
      type: 'response'
    });
    return updated;
  },

  deleteResponse(id: string): CustomerResponseItem[] {
    const list = this.getResponses();
    const updated = list.filter(r => r.id !== id);
    setLocalItem(KEYS.RESPONSES, updated);
    return updated;
  },

  getChecklist(): ChecklistItem[] {
    return getLocalItem(KEYS.CHECKLIST, INITIAL_CHECKLIST);
  },

  toggleChecklistItem(id: string): ChecklistItem[] {
    const list = this.getChecklist();
    const updated = list.map(item => item.id === id ? { ...item, isCompleted: !item.isCompleted } : item);
    setLocalItem(KEYS.CHECKLIST, updated);
    return updated;
  },

  getSavedTemplateIds(): string[] {
    return getLocalItem(KEYS.SAVED_TEMPLATES, DEMO_SAVED_TEMPLATES);
  },

  toggleSaveTemplate(id: string): string[] {
    const list = this.getSavedTemplateIds();
    let updated: string[];
    if (list.includes(id)) {
      updated = list.filter(item => item !== id);
    } else {
      updated = [...list, id];
    }
    setLocalItem(KEYS.SAVED_TEMPLATES, updated);
    return updated;
  },

  getActivities(): ActivityLog[] {
    return getLocalItem(KEYS.ACTIVITIES, DEMO_ACTIVITIES);
  },

  addActivity(act: { title: string; description: string; type: ActivityLog['type'] }): void {
    const current = this.getActivities();
    const newAct: ActivityLog = {
      id: 'act_' + Date.now(),
      title: act.title,
      description: act.description,
      timestamp: 'Just now',
      type: act.type
    };
    setLocalItem(KEYS.ACTIVITIES, [newAct, ...current.slice(0, 19)]);
  },

  isOnboarded(): boolean {
    return getLocalItem(KEYS.ONBOARDED, true);
  },

  setOnboarded(val: boolean): void {
    setLocalItem(KEYS.ONBOARDED, val);
  },

  exportAllData(): string {
    const bundle = {
      profile: this.getBusinessProfile(),
      content: this.getContentList(),
      calendar: this.getCalendarItems(),
      offers: this.getOffers(),
      responses: this.getResponses(),
      checklist: this.getChecklist(),
      savedTemplates: this.getSavedTemplateIds(),
      exportedAt: new Date().toISOString(),
      version: '1.0'
    };
    return JSON.stringify(bundle, null, 2);
  },

  importAllData(jsonString: string): boolean {
    try {
      const data = JSON.parse(jsonString);
      if (data.profile) setLocalItem(KEYS.PROFILE, data.profile);
      if (Array.isArray(data.content)) setLocalItem(KEYS.CONTENT, data.content);
      if (Array.isArray(data.calendar)) setLocalItem(KEYS.CALENDAR, data.calendar);
      if (Array.isArray(data.offers)) setLocalItem(KEYS.OFFERS, data.offers);
      if (Array.isArray(data.responses)) setLocalItem(KEYS.RESPONSES, data.responses);
      if (Array.isArray(data.checklist)) setLocalItem(KEYS.CHECKLIST, data.checklist);
      if (Array.isArray(data.savedTemplates)) setLocalItem(KEYS.SAVED_TEMPLATES, data.savedTemplates);
      return true;
    } catch (err) {
      console.error('Import failed', err);
      return false;
    }
  },

  resetToDemo(): void {
    setLocalItem(KEYS.PROFILE, DEMO_BUSINESS);
    setLocalItem(KEYS.CONTENT, DEMO_CONTENT_PIECES);
    setLocalItem(KEYS.CALENDAR, DEMO_CALENDAR_ITEMS);
    setLocalItem(KEYS.OFFERS, DEMO_OFFERS);
    setLocalItem(KEYS.RESPONSES, DEMO_CUSTOMER_RESPONSES);
    setLocalItem(KEYS.CHECKLIST, INITIAL_CHECKLIST);
    setLocalItem(KEYS.SAVED_TEMPLATES, DEMO_SAVED_TEMPLATES);
    setLocalItem(KEYS.ACTIVITIES, DEMO_ACTIVITIES);
    setLocalItem(KEYS.ONBOARDED, true);
  },

  clearAll(): void {
    if (typeof window === 'undefined') return;
    localStorage.clear();
    openIndexedDB().then(db => {
      if (db) {
        try {
          const tx = db.transaction(STORE_NAME, 'readwrite');
          tx.objectStore(STORE_NAME).clear();
        } catch (err) {
          console.warn('Failed to clear IndexedDB store', err);
        }
      }
    });
  }
};
