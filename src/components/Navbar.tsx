import React from 'react';
import { 
  Store, 
  Plus, 
  ExternalLink, 
  Menu, 
  CheckCircle2,
  ChevronDown
} from 'lucide-react';
import { AppView, BusinessProfile } from '../types';

interface NavbarProps {
  currentView: AppView;
  onNavigate: (view: AppView) => void;
  businessProfile: BusinessProfile;
  presenceScore: number;
  onOpenQuickCreate: () => void;
  onToggleMobileMenu: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  businessProfile,
  presenceScore,
  onOpenQuickCreate,
  onToggleMobileMenu
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white border-b border-[#E7E6DF] h-14 px-4 sm:px-6 flex items-center justify-between">
      {/* Left: Mobile hamburger & current business badge */}
      <div className="flex items-center gap-3">
        <button
          id="btn-mobile-menu"
          onClick={onToggleMobileMenu}
          className="p-1.5 text-[#64748B] hover:text-[#1E252B] md:hidden rounded-md transition-colors"
          aria-label="Toggle navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2">
          <div 
            onClick={() => onNavigate('business')}
            className="cursor-pointer group flex items-center gap-2 px-2.5 py-1 rounded-lg hover:bg-[#F4F4F0] border border-transparent hover:border-[#E2E0D8] transition-all"
          >
            <div className="w-7 h-7 rounded-md bg-[#0F2942] text-white flex items-center justify-center font-bold text-xs">
              <Store className="w-4 h-4" />
            </div>
            <div className="text-left leading-none">
              <div className="flex items-center gap-1">
                <span className="text-xs font-bold text-[#1E252B] group-hover:text-[#0F2942] transition-colors">
                  {businessProfile.name || 'LocalBiz Kit'}
                </span>
                <ChevronDown className="w-3 h-3 text-[#64748B]" />
              </div>
              <span className="text-[10px] text-[#64748B] block mt-0.5">
                {businessProfile.category} • {businessProfile.location.split(',')[0]}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Right: Presence Score, Quick Actions, Landing link */}
      <div className="flex items-center gap-2.5">
        {/* Presence Score Pill */}
        <button
          id="navbar-score-pill"
          onClick={() => onNavigate('checklist')}
          className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#EBF4EF] border border-[#1E6B52]/20 text-[#1E6B52] text-xs font-semibold hover:bg-[#E2EFE7] transition-colors"
          title="Online Presence Score"
        >
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Presence: {presenceScore}%</span>
        </button>

        {/* Quick action button */}
        <button
          id="navbar-quick-create-btn"
          onClick={onOpenQuickCreate}
          className="px-3 py-1.5 text-xs font-semibold bg-[#0F2942] text-white hover:bg-[#1C3B5E] rounded-lg shadow-2xs transition-all flex items-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Create Content</span>
        </button>

        {/* View Landing page */}
        <button
          id="navbar-view-landing-btn"
          onClick={() => onNavigate('landing')}
          className="p-1.5 sm:px-2.5 sm:py-1.5 text-xs font-medium text-[#64748B] hover:text-[#1E252B] hover:bg-[#F4F4F0] rounded-lg border border-[#E2E0D8] transition-colors flex items-center gap-1"
          title="View product landing page"
        >
          <span className="hidden sm:inline">Landing Page</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </button>
      </div>
    </header>
  );
};
