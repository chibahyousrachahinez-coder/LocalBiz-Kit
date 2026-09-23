import React, { useState, useEffect } from 'react';
import { 
  AppView, 
  BusinessProfile, 
  GeneratedContent, 
  CalendarItem, 
  Offer, 
  CustomerResponse, 
  ChecklistItem, 
  ActivityLog, 
  Toast 
} from './types';
import { StorageService } from './lib/storage';
import { ToastContainer } from './components/ToastContainer';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { LandingPage } from './components/LandingPage';
import { OnboardingModal } from './components/OnboardingModal';

// Views
import { DashboardView } from './views/DashboardView';
import { BusinessProfileView } from './views/BusinessProfileView';
import { ContentStudioView } from './views/ContentStudioView';
import { CalendarView } from './views/CalendarView';
import { WebsiteCopyView } from './views/WebsiteCopyView';
import { GoogleBusinessView } from './views/GoogleBusinessView';
import { ResponsesView } from './views/ResponsesView';
import { OffersView } from './views/OffersView';
import { ChecklistView } from './views/ChecklistView';
import { TemplatesView } from './views/TemplatesView';
import { SettingsView } from './views/SettingsView';

export default function App() {
  // Navigation & UI State
  const [currentView, setCurrentView] = useState<AppView>(() => {
    // Check hash route if present
    const hash = window.location.hash.replace('#', '') as AppView;
    const validViews: AppView[] = [
      'landing', 'dashboard', 'business', 'content', 'calendar', 
      'website-copy', 'google-business', 'responses', 'offers', 
      'checklist', 'templates', 'settings'
    ];
    if (validViews.includes(hash)) return hash;
    return 'dashboard';
  });

  const [isOnboardingOpen, setIsOnboardingOpen] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Persistent Domain State
  const [businessProfile, setBusinessProfile] = useState<BusinessProfile>(() => StorageService.getProfile());
  const [contentList, setContentList] = useState<GeneratedContent[]>(() => StorageService.getContent());
  const [calendarItems, setCalendarItems] = useState<CalendarItem[]>(() => StorageService.getCalendar());
  const [offers, setOffers] = useState<Offer[]>(() => StorageService.getOffers());
  const [responses, setResponses] = useState<CustomerResponse[]>(() => StorageService.getResponses());
  const [checklist, setChecklist] = useState<ChecklistItem[]>(() => StorageService.getChecklist());
  const [activities, setActivities] = useState<ActivityLog[]>(() => StorageService.getActivities());

  // Listen to hash changes for smooth browser back/forward
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as AppView;
      const validViews: AppView[] = [
        'landing', 'dashboard', 'business', 'content', 'calendar', 
        'website-copy', 'google-business', 'responses', 'offers', 
        'checklist', 'templates', 'settings'
      ];
      if (validViews.includes(hash)) {
        setCurrentView(hash);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (view: AppView) => {
    setCurrentView(view);
    window.location.hash = view;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Toast Helper
  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = 'toast_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4);
    setToasts(prev => [...prev, { id, message, type }]);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Profile update
  const handleSaveProfile = (updated: BusinessProfile) => {
    setBusinessProfile(updated);
    StorageService.saveProfile(updated);
    addActivity('Updated Business Profile', `Saved changes for ${updated.name}`);
  };

  // Onboarding completion
  const handleCompleteOnboarding = (profileDelta: Partial<BusinessProfile>, focusAreas: string[]) => {
    const updated: BusinessProfile = {
      ...businessProfile,
      ...profileDelta,
      updatedAt: new Date().toISOString()
    };
    setBusinessProfile(updated);
    StorageService.saveProfile(updated);
    setIsOnboardingOpen(false);
    addActivity('Business Profile Configured', `Completed onboarding for ${updated.name}`);
    showToast(`Welcome to LocalBiz Kit, ${updated.name}! Your workspace is ready.`, 'success');
    navigateTo('dashboard');
  };

  // Content Handlers
  const handleSaveContent = (item: GeneratedContent) => {
    StorageService.saveContentItem(item);
    setContentList(StorageService.getContent());
    addActivity('Created Marketing Content', `Generated "${item.title}"`);
  };

  const handleDeleteContent = (id: string) => {
    StorageService.deleteContentItem(id);
    setContentList(StorageService.getContent());
  };

  // Calendar Handlers
  const handleSaveCalendarItem = (item: CalendarItem) => {
    StorageService.saveCalendarItem(item);
    setCalendarItems(StorageService.getCalendar());
    addActivity('Scheduled Calendar Post', `Added "${item.title}" to ${item.dayOfWeek}`);
  };

  const handleDeleteCalendarItem = (id: string) => {
    StorageService.deleteCalendarItem(id);
    setCalendarItems(StorageService.getCalendar());
  };

  const handleToggleCalendarStatus = (id: string) => {
    StorageService.toggleCalendarItemStatus(id);
    setCalendarItems(StorageService.getCalendar());
  };

  // Offers Handlers
  const handleSaveOffer = (offer: Offer) => {
    StorageService.saveOffer(offer);
    setOffers(StorageService.getOffers());
    addActivity('Created Promotional Offer', `Published offer "${offer.headline}"`);
  };

  const handleDeleteOffer = (id: string) => {
    StorageService.deleteOffer(id);
    setOffers(StorageService.getOffers());
  };

  // Customer Responses Handlers
  const handleSaveResponse = (item: CustomerResponse) => {
    StorageService.saveResponse(item);
    setResponses(StorageService.getResponses());
    addActivity('Saved Customer Response', `Added reply template "${item.title}"`);
  };

  const handleDeleteResponse = (id: string) => {
    StorageService.deleteResponse(id);
    setResponses(StorageService.getResponses());
  };

  // Checklist Handlers
  const handleToggleChecklistItem = (id: string) => {
    StorageService.toggleChecklistItem(id);
    setChecklist(StorageService.getChecklist());
  };

  // Activity logger helper
  const addActivity = (title: string, description: string, type: ActivityLog['type'] = 'content') => {
    StorageService.addActivity({
      title,
      description,
      type
    });
    setActivities(StorageService.getActivities());
  };

  // Reset to Demo Data
  const handleResetDemoData = () => {
    StorageService.resetToDemo();
    setBusinessProfile(StorageService.getProfile());
    setContentList(StorageService.getContent());
    setCalendarItems(StorageService.getCalendar());
    setOffers(StorageService.getOffers());
    setResponses(StorageService.getResponses());
    setChecklist(StorageService.getChecklist());
    setActivities(StorageService.getActivities());
  };

  // Clear All Storage
  const handleClearAllStorage = () => {
    StorageService.clearAll();
    setBusinessProfile(StorageService.getProfile());
    setContentList([]);
    setCalendarItems([]);
    setOffers([]);
    setResponses(StorageService.getResponses());
    setChecklist(StorageService.getChecklist());
    setActivities([]);
  };

  // Computed metrics
  const completedAuditCount = checklist.filter(c => c.isCompleted).length;
  const presenceScore = Math.round((completedAuditCount / checklist.length) * 100);

  // Profile completion %
  const profileFields = [
    Boolean(businessProfile.name),
    Boolean(businessProfile.category),
    Boolean(businessProfile.location),
    Boolean(businessProfile.description && businessProfile.description.length > 20),
    Boolean(businessProfile.phone && businessProfile.email),
    Boolean(businessProfile.website),
    Boolean(businessProfile.services && businessProfile.services.length >= 2)
  ];
  const profileCompletion = Math.round((profileFields.filter(Boolean).length / profileFields.length) * 100);

  const dashboardMetrics = {
    marketingAssets: contentList.length,
    scheduledPosts: calendarItems.filter(c => c.status === 'scheduled').length,
    savedTemplates: 32,
    profileCompletion
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBFBF9] text-[#1E252B] font-sans antialiased selection:bg-[#0F2942] selection:text-white">
      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />

      {/* Onboarding Modal */}
      <OnboardingModal
        isOpen={isOnboardingOpen}
        onComplete={handleCompleteOnboarding}
        initialProfile={businessProfile}
      />

      {/* RENDER VIEW: Landing Page vs Application Workspace */}
      {currentView === 'landing' ? (
        <LandingPage
          onStartOnboarding={() => setIsOnboardingOpen(true)}
          onEnterWorkspace={() => navigateTo('dashboard')}
          businessProfile={businessProfile}
        />
      ) : (
        <div className="flex-1 flex flex-col md:flex-row min-h-screen">
          {/* Sidebar Navigation */}
          <Sidebar
            currentView={currentView}
            onNavigate={navigateTo}
            isOpenMobile={isMobileMenuOpen}
            onCloseMobile={() => setIsMobileMenuOpen(false)}
            presenceScore={presenceScore}
          />

          {/* Main App Workspace Area */}
          <div className="flex-1 flex flex-col min-w-0">
            {/* Top Workspace Navbar */}
            <Navbar
              currentView={currentView}
              onNavigate={navigateTo}
              businessProfile={businessProfile}
              presenceScore={presenceScore}
              onOpenQuickCreate={() => navigateTo('content')}
              onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />

            {/* View Container */}
            <main className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto">
              {currentView === 'dashboard' && (
                <DashboardView
                  businessProfile={businessProfile}
                  metrics={dashboardMetrics}
                  activities={activities}
                  checklist={checklist}
                  onNavigate={navigateTo}
                />
              )}

              {currentView === 'business' && (
                <BusinessProfileView
                  profile={businessProfile}
                  onSave={handleSaveProfile}
                  onShowToast={showToast}
                />
              )}

              {currentView === 'content' && (
                <ContentStudioView
                  businessProfile={businessProfile}
                  contentList={contentList}
                  onSaveContent={handleSaveContent}
                  onDeleteContent={handleDeleteContent}
                  onAddToCalendar={handleSaveCalendarItem}
                  onShowToast={showToast}
                />
              )}

              {currentView === 'calendar' && (
                <CalendarView
                  calendarItems={calendarItems}
                  onSaveItem={handleSaveCalendarItem}
                  onDeleteItem={handleDeleteCalendarItem}
                  onToggleStatus={handleToggleCalendarStatus}
                  onShowToast={showToast}
                />
              )}

              {currentView === 'website-copy' && (
                <WebsiteCopyView
                  businessProfile={businessProfile}
                  onShowToast={showToast}
                />
              )}

              {currentView === 'google-business' && (
                <GoogleBusinessView
                  businessProfile={businessProfile}
                  onSaveDescription={(desc) => handleSaveProfile({ ...businessProfile, description: desc })}
                  onShowToast={showToast}
                />
              )}

              {currentView === 'responses' && (
                <ResponsesView
                  businessProfile={businessProfile}
                  responses={responses}
                  onSaveResponse={handleSaveResponse}
                  onDeleteResponse={handleDeleteResponse}
                  onShowToast={showToast}
                />
              )}

              {currentView === 'offers' && (
                <OffersView
                  businessProfile={businessProfile}
                  offers={offers}
                  onSaveOffer={handleSaveOffer}
                  onDeleteOffer={handleDeleteOffer}
                  onShowToast={showToast}
                />
              )}

              {currentView === 'checklist' && (
                <ChecklistView
                  checklist={checklist}
                  onToggleItem={handleToggleChecklistItem}
                  onNavigate={navigateTo}
                  onShowToast={showToast}
                />
              )}

              {currentView === 'templates' && (
                <TemplatesView
                  businessProfile={businessProfile}
                  onNavigateToContent={(topic, caption) => {
                    navigateTo('content');
                  }}
                  onAddToCalendar={(item) => {
                    handleSaveCalendarItem(item);
                  }}
                  onShowToast={showToast}
                />
              )}

              {currentView === 'settings' && (
                <SettingsView
                  businessProfile={businessProfile}
                  onResetData={handleResetDemoData}
                  onClearAll={handleClearAllStorage}
                  onShowToast={showToast}
                />
              )}
            </main>
          </div>
        </div>
      )}
    </div>
  );
}
