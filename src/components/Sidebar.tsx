import React from 'react';
import { 
  LayoutDashboard, 
  Sparkles, 
  Calendar, 
  Globe, 
  MapPin, 
  MessageSquareQuote, 
  Tag, 
  CheckSquare, 
  Library, 
  Store, 
  Settings,
  X
} from 'lucide-react';
import { AppView } from '../types';

interface SidebarProps {
  currentView: AppView;
  onNavigate: (view: AppView) => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
  presenceScore: number;
}

interface NavItem {
  id: AppView;
  label: string;
  icon: React.ReactNode;
  badge?: string;
  group?: 'core' | 'tools' | 'setup';
}

const NAV_ITEMS: NavItem[] = [
  // CORE
  { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" />, group: 'core' },
  { id: 'content', label: 'Content Studio', icon: <Sparkles className="w-4 h-4" />, badge: 'Popular', group: 'core' },
  { id: 'calendar', label: 'Content Calendar', icon: <Calendar className="w-4 h-4" />, group: 'core' },
  
  // TOOLS
  { id: 'website-copy', label: 'Website Copy', icon: <Globe className="w-4 h-4" />, group: 'tools' },
  { id: 'google-business', label: 'Google Business', icon: <MapPin className="w-4 h-4" />, group: 'tools' },
  { id: 'responses', label: 'Customer Responses', icon: <MessageSquareQuote className="w-4 h-4" />, group: 'tools' },
  { id: 'offers', label: 'Offer Builder', icon: <Tag className="w-4 h-4" />, group: 'tools' },
  
  // SETUP & ASSETS
  { id: 'checklist', label: 'Marketing Checklist', icon: <CheckSquare className="w-4 h-4" />, group: 'setup' },
  { id: 'templates', label: 'Template Library', icon: <Library className="w-4 h-4" />, badge: '30+', group: 'setup' },
  { id: 'business', label: 'Business Profile', icon: <Store className="w-4 h-4" />, group: 'setup' },
  { id: 'settings', label: 'Settings', icon: <Settings className="w-4 h-4" />, group: 'setup' }
];

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onNavigate,
  isOpenMobile,
  onCloseMobile,
  presenceScore
}) => {
  const handleItemClick = (id: AppView) => {
    onNavigate(id);
    onCloseMobile();
  };

  const renderNavGroup = (items: NavItem[], groupTitle?: string) => (
    <div className="space-y-1">
      {groupTitle && (
        <span className="px-3 text-[10px] font-bold tracking-wider text-[#64748B] uppercase block pt-3 pb-1">
          {groupTitle}
        </span>
      )}
      {items.map((item) => {
        const isActive = currentView === item.id;
        return (
          <button
            key={item.id}
            id={`nav-item-${item.id}`}
            onClick={() => handleItemClick(item.id)}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
              isActive
                ? 'bg-[#0F2942] text-white font-semibold shadow-2xs'
                : 'text-[#475569] hover:text-[#1E252B] hover:bg-[#F4F4F0]'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <span className={isActive ? 'text-white' : 'text-[#64748B]'}>{item.icon}</span>
              <span>{item.label}</span>
            </div>
            {item.badge && (
              <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                isActive ? 'bg-white/20 text-white' : 'bg-[#EBF4EF] text-[#1E6B52]'
              }`}>
                {item.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside 
        id="desktop-sidebar"
        className="hidden md:flex flex-col w-60 bg-white border-r border-[#E7E6DF] h-screen sticky top-0 shrink-0 select-none overflow-y-auto"
      >
        {/* Brand header */}
        <div className="p-4 border-b border-[#E7E6DF] flex items-center justify-between">
          <div 
            onClick={() => onNavigate('dashboard')}
            className="flex items-center gap-2.5 cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-[#0F2942] text-white flex items-center justify-center font-bold text-sm tracking-tight shadow-xs">
              LB
            </div>
            <div>
              <span className="font-bold text-sm text-[#1E252B] tracking-tight block">LOCALBIZ KIT</span>
              <span className="text-[10px] text-[#64748B] block leading-none">Small business marketing</span>
            </div>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="p-3 flex-1 space-y-4">
          {renderNavGroup(NAV_ITEMS.filter(i => i.group === 'core'))}
          {renderNavGroup(NAV_ITEMS.filter(i => i.group === 'tools'), 'Marketing Tools')}
          {renderNavGroup(NAV_ITEMS.filter(i => i.group === 'setup'), 'Checklist & Profile')}
        </nav>

        {/* Footer presence mini-card */}
        <div className="p-3 m-3 bg-[#FBFBF9] border border-[#E7E6DF] rounded-xl text-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-[#1E252B]">Online Presence</span>
            <span className="text-[11px] font-bold text-[#1E6B52]">{presenceScore}%</span>
          </div>
          <div className="w-full bg-[#E2E0D8] h-1.5 rounded-full overflow-hidden">
            <div 
              className="bg-[#1E6B52] h-full rounded-full transition-all duration-500"
              style={{ width: `${presenceScore}%` }}
            />
          </div>
          <button
            id="sidebar-improve-btn"
            onClick={() => onNavigate('checklist')}
            className="w-full text-center text-[11px] font-semibold text-[#0F2942] hover:underline block pt-1"
          >
            View Checklist & Fixes →
          </button>
        </div>
      </aside>

      {/* Mobile Drawer Overlay */}
      {isOpenMobile && (
        <div 
          id="mobile-sidebar-overlay"
          className="fixed inset-0 z-50 bg-[#0F2942]/50 backdrop-blur-xs md:hidden"
          onClick={onCloseMobile}
        >
          <div 
            id="mobile-sidebar"
            className="w-72 bg-white h-full shadow-2xl flex flex-col p-4 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-[#E7E6DF]">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#0F2942] text-white flex items-center justify-center font-bold text-xs">
                  LB
                </div>
                <span className="font-bold text-sm text-[#1E252B]">LOCALBIZ KIT</span>
              </div>
              <button 
                onClick={onCloseMobile} 
                className="p-1.5 text-[#64748B] hover:text-[#1E252B] rounded-md"
                aria-label="Close menu"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <nav className="py-4 space-y-4 flex-1">
              {renderNavGroup(NAV_ITEMS.filter(i => i.group === 'core'))}
              {renderNavGroup(NAV_ITEMS.filter(i => i.group === 'tools'), 'Marketing Tools')}
              {renderNavGroup(NAV_ITEMS.filter(i => i.group === 'setup'), 'Checklist & Profile')}
            </nav>

            <div className="pt-3 border-t border-[#E7E6DF]">
              <button
                onClick={() => handleItemClick('landing')}
                className="w-full py-2 text-xs font-semibold text-center text-[#64748B] hover:text-[#1E252B] bg-[#FBFBF9] rounded-lg border border-[#E2E0D8]"
              >
                Exit to Landing Page
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Bottom Navigation Bar (High-frequency tabs) */}
      <div 
        id="mobile-bottom-nav"
        className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-[#E7E6DF] px-2 py-1 flex items-center justify-around"
      >
        {[
          { id: 'dashboard' as AppView, label: 'Home', icon: <LayoutDashboard className="w-4 h-4" /> },
          { id: 'content' as AppView, label: 'Create', icon: <Sparkles className="w-4 h-4" /> },
          { id: 'calendar' as AppView, label: 'Calendar', icon: <Calendar className="w-4 h-4" /> },
          { id: 'checklist' as AppView, label: 'Checklist', icon: <CheckSquare className="w-4 h-4" /> },
          { id: 'business' as AppView, label: 'Profile', icon: <Store className="w-4 h-4" /> }
        ].map((tab) => {
          const isActive = currentView === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onNavigate(tab.id)}
              className={`flex flex-col items-center py-1 px-2.5 rounded-md transition-colors ${
                isActive ? 'text-[#0F2942] font-semibold' : 'text-[#64748B] hover:text-[#1E252B]'
              }`}
            >
              {tab.icon}
              <span className="text-[10px] mt-0.5">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </>
  );
};
