import React from 'react';
import { 
  Sparkles, 
  Calendar, 
  Tag, 
  MessageSquareQuote, 
  FileText, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Check, 
  TrendingUp,
  Store
} from 'lucide-react';
import { 
  BusinessProfile, 
  AppView, 
  ActivityLog, 
  ChecklistItem 
} from '../types';

interface DashboardViewProps {
  businessProfile: BusinessProfile;
  metrics: {
    marketingAssets: number;
    scheduledPosts: number;
    savedTemplates: number;
    profileCompletion: number;
  };
  activities: ActivityLog[];
  checklist: ChecklistItem[];
  onNavigate: (view: AppView) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  businessProfile,
  metrics,
  activities,
  checklist,
  onNavigate
}) => {
  // Presence checklist groups for the dashboard
  const gbComplete = checklist.filter(c => c.category === 'Google Business' && c.isCompleted).length;
  const gbTotal = checklist.filter(c => c.category === 'Google Business').length;

  const wsComplete = checklist.filter(c => c.category === 'Website' && c.isCompleted).length;
  const wsTotal = checklist.filter(c => c.category === 'Website').length;

  const smComplete = checklist.filter(c => c.category === 'Social Media' && c.isCompleted).length;
  const smTotal = checklist.filter(c => c.category === 'Social Media').length;

  const rvComplete = checklist.filter(c => c.category === 'Reviews' && c.isCompleted).length;
  const rvTotal = checklist.filter(c => c.category === 'Reviews').length;

  const hasPhoneAndEmail = Boolean(businessProfile.phone && businessProfile.email);

  // Suggested next steps logic based on actual data
  const suggestions = [
    {
      id: 'sug_desc',
      text: businessProfile.description ? 'Review and expand your search-friendly business description.' : 'Your business description is incomplete.',
      actionText: 'Update Description',
      route: 'business' as AppView,
      done: Boolean(businessProfile.description && businessProfile.description.length > 50)
    },
    {
      id: 'sug_content',
      text: metrics.scheduledPosts >= 3 ? 'Review scheduled posts for this coming week.' : "You haven't planned enough content for next week.",
      actionText: 'Plan My Week',
      route: 'calendar' as AppView,
      done: metrics.scheduledPosts >= 3
    },
    {
      id: 'sug_offers',
      text: 'Review active neighborhood promotional offers.',
      actionText: 'Create Offer',
      route: 'offers' as AppView,
      done: true
    },
    {
      id: 'sug_responses',
      text: 'Customer review reply templates prepared for rush hours.',
      actionText: 'View Responses',
      route: 'responses' as AppView,
      done: true
    }
  ];

  return (
    <div id="dashboard-view-root" className="space-y-6 max-w-6xl mx-auto pb-16 md:pb-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-[#E7E6DF] shadow-2xs">
        <div>
          <span className="text-[11px] font-bold text-[#1E6B52] uppercase tracking-wider block mb-1">
            {businessProfile.category} • {businessProfile.location}
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1E252B] tracking-tight">
            Good morning, {businessProfile.name || 'Harbor & Bean'}
          </h1>
          <p className="text-sm text-[#64748B] mt-1">
            Let's make your next customer interaction count.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            id="dash-edit-profile-btn"
            onClick={() => onNavigate('business')}
            className="px-3.5 py-2 text-xs font-semibold bg-[#FBFBF9] hover:bg-[#F4F4F0] text-[#1E252B] border border-[#E2E0D8] rounded-lg transition-colors flex items-center gap-1.5"
          >
            <Store className="w-3.5 h-3.5 text-[#64748B]" />
            <span>Edit Profile</span>
          </button>
          <button
            id="dash-create-btn"
            onClick={() => onNavigate('content')}
            className="px-4 py-2 text-xs font-semibold bg-[#0F2942] hover:bg-[#1C3B5E] text-white rounded-lg transition-all shadow-xs flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Create Content</span>
          </button>
        </div>
      </div>

      {/* Top 4 Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div 
          onClick={() => onNavigate('content')}
          className="cursor-pointer p-4 sm:p-5 rounded-xl bg-white border border-[#E2E0D8] shadow-2xs hover:border-[#CBD5E1] transition-all space-y-2"
        >
          <div className="flex items-center justify-between text-[#64748B]">
            <span className="text-xs font-medium">Marketing Assets</span>
            <FileText className="w-4 h-4 text-[#0F2942]" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-[#1E252B]">{metrics.marketingAssets}</div>
          <span className="text-[11px] text-[#1E6B52] font-medium flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> Ready to publish
          </span>
        </div>

        <div 
          onClick={() => onNavigate('calendar')}
          className="cursor-pointer p-4 sm:p-5 rounded-xl bg-white border border-[#E2E0D8] shadow-2xs hover:border-[#CBD5E1] transition-all space-y-2"
        >
          <div className="flex items-center justify-between text-[#64748B]">
            <span className="text-xs font-medium">Scheduled Posts</span>
            <Calendar className="w-4 h-4 text-[#0F2942]" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-[#1E252B]">{metrics.scheduledPosts}</div>
          <span className="text-[11px] text-[#64748B] font-medium">
            Next: Today at 09:30 AM
          </span>
        </div>

        <div 
          onClick={() => onNavigate('templates')}
          className="cursor-pointer p-4 sm:p-5 rounded-xl bg-white border border-[#E2E0D8] shadow-2xs hover:border-[#CBD5E1] transition-all space-y-2"
        >
          <div className="flex items-center justify-between text-[#64748B]">
            <span className="text-xs font-medium">Saved Templates</span>
            <Sparkles className="w-4 h-4 text-[#0F2942]" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-[#1E252B]">{metrics.savedTemplates}</div>
          <span className="text-[11px] text-[#64748B] font-medium">
            30+ in community library
          </span>
        </div>

        <div 
          onClick={() => onNavigate('business')}
          className="cursor-pointer p-4 sm:p-5 rounded-xl bg-white border border-[#E2E0D8] shadow-2xs hover:border-[#CBD5E1] transition-all space-y-2"
        >
          <div className="flex items-center justify-between text-[#64748B]">
            <span className="text-xs font-medium">Profile Completion</span>
            <CheckCircle2 className="w-4 h-4 text-[#1E6B52]" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-[#1E252B]">{metrics.profileCompletion}%</div>
          <div className="w-full bg-[#E2E0D8] h-1.5 rounded-full overflow-hidden">
            <div 
              className="bg-[#1E6B52] h-full rounded-full transition-all duration-500"
              style={{ width: `${metrics.profileCompletion}%` }}
            />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-xl border border-[#E2E0D8] shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-[#1E252B]">Quick Actions</h2>
            <p className="text-xs text-[#64748B] mt-0.5">Jump directly into everyday marketing tasks.</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          <button
            id="dash-qa-social"
            onClick={() => onNavigate('content')}
            className="p-3.5 rounded-lg border border-[#E2E0D8] hover:border-[#0F2942] hover:bg-[#F8FAFC] transition-all text-left space-y-2 group"
          >
            <div className="w-8 h-8 rounded-md bg-[#F4F7FA] text-[#0F2942] group-hover:bg-[#0F2942] group-hover:text-white transition-colors flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="block text-xs font-bold text-[#1E252B] group-hover:text-[#0F2942] transition-colors">
                Create Social Post
              </span>
              <span className="block text-[11px] text-[#64748B] mt-0.5">Captions & hooks</span>
            </div>
          </button>

          <button
            id="dash-qa-desc"
            onClick={() => onNavigate('business')}
            className="p-3.5 rounded-lg border border-[#E2E0D8] hover:border-[#0F2942] hover:bg-[#F8FAFC] transition-all text-left space-y-2 group"
          >
            <div className="w-8 h-8 rounded-md bg-[#F4F7FA] text-[#0F2942] group-hover:bg-[#0F2942] group-hover:text-white transition-colors flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <span className="block text-xs font-bold text-[#1E252B] group-hover:text-[#0F2942] transition-colors">
                Write Description
              </span>
              <span className="block text-[11px] text-[#64748B] mt-0.5">750 char optimizer</span>
            </div>
          </button>

          <button
            id="dash-qa-offer"
            onClick={() => onNavigate('offers')}
            className="p-3.5 rounded-lg border border-[#E2E0D8] hover:border-[#0F2942] hover:bg-[#F8FAFC] transition-all text-left space-y-2 group"
          >
            <div className="w-8 h-8 rounded-md bg-[#F4F7FA] text-[#0F2942] group-hover:bg-[#0F2942] group-hover:text-white transition-colors flex items-center justify-center">
              <Tag className="w-4 h-4" />
            </div>
            <div>
              <span className="block text-xs font-bold text-[#1E252B] group-hover:text-[#0F2942] transition-colors">
                Create Offer
              </span>
              <span className="block text-[11px] text-[#64748B] mt-0.5">Voucher & promo copy</span>
            </div>
          </button>

          <button
            id="dash-qa-reply"
            onClick={() => onNavigate('responses')}
            className="p-3.5 rounded-lg border border-[#E2E0D8] hover:border-[#0F2942] hover:bg-[#F8FAFC] transition-all text-left space-y-2 group"
          >
            <div className="w-8 h-8 rounded-md bg-[#F4F7FA] text-[#0F2942] group-hover:bg-[#0F2942] group-hover:text-white transition-colors flex items-center justify-center">
              <MessageSquareQuote className="w-4 h-4" />
            </div>
            <div>
              <span className="block text-xs font-bold text-[#1E252B] group-hover:text-[#0F2942] transition-colors">
                Write Customer Reply
              </span>
              <span className="block text-[11px] text-[#64748B] mt-0.5">Reviews & messages</span>
            </div>
          </button>

          <button
            id="dash-qa-calendar"
            onClick={() => onNavigate('calendar')}
            className="p-3.5 rounded-lg border border-[#E2E0D8] hover:border-[#0F2942] hover:bg-[#F8FAFC] transition-all text-left space-y-2 group"
          >
            <div className="w-8 h-8 rounded-md bg-[#F4F7FA] text-[#0F2942] group-hover:bg-[#0F2942] group-hover:text-white transition-colors flex items-center justify-center">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <span className="block text-xs font-bold text-[#1E252B] group-hover:text-[#0F2942] transition-colors">
                Plan My Week
              </span>
              <span className="block text-[11px] text-[#64748B] mt-0.5">7-day content schedule</span>
            </div>
          </button>
        </div>
      </div>

      {/* Suggested Next Steps & Online Presence Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Suggested Next Steps */}
        <div className="lg:col-span-6 bg-white p-6 rounded-xl border border-[#E2E0D8] shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-[#1E252B]">Suggested Next Steps</h2>
              <p className="text-xs text-[#64748B] mt-0.5">High-impact actions to tighten your presence.</p>
            </div>
            <span className="text-xs text-[#1E6B52] font-semibold bg-[#EBF4EF] px-2 py-0.5 rounded">Actionable</span>
          </div>

          <div className="space-y-2.5">
            {suggestions.map((sug) => (
              <div 
                key={sug.id}
                className="p-3.5 rounded-lg border border-[#E7E6DF] bg-[#FBFBF9] flex items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center gap-2.5">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                    sug.done ? 'bg-[#EBF4EF] text-[#1E6B52]' : 'bg-[#FDF3EC] text-[#C26638]'
                  }`}>
                    {sug.done ? <Check className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                  </div>
                  <span className="font-medium text-[#1E252B]">{sug.text}</span>
                </div>
                <button
                  id={`btn-fix-${sug.id}`}
                  onClick={() => onNavigate(sug.route)}
                  className="shrink-0 font-semibold text-[#0F2942] hover:text-[#1C3B5E] hover:underline flex items-center gap-1"
                >
                  Fix it →
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Your Online Presence */}
        <div className="lg:col-span-6 bg-white p-6 rounded-xl border border-[#E2E0D8] shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-[#1E252B]">Your Online Presence</h2>
              <p className="text-xs text-[#64748B] mt-0.5">Core touchpoints audited for local customers.</p>
            </div>
            <button
              onClick={() => onNavigate('checklist')}
              className="text-xs font-semibold text-[#0F2942] hover:underline"
            >
              Full Checklist →
            </button>
          </div>

          <div className="space-y-2.5">
            <div className="p-3 rounded-lg border border-[#E7E6DF] bg-[#FBFBF9] flex items-center justify-between text-xs">
              <div className="flex items-center gap-2.5">
                <span className="font-semibold text-[#1E252B]">Google Business</span>
                <span className="text-[#64748B]">({gbComplete}/{gbTotal} items)</span>
              </div>
              <span className={`px-2 py-0.5 rounded text-[11px] font-medium ${
                gbComplete >= 4 ? 'bg-[#EBF4EF] text-[#1E6B52]' : 'bg-[#FDF3EC] text-[#C26638]'
              }`}>
                {gbComplete >= 4 ? 'Complete' : 'Needs attention'}
              </span>
            </div>

            <div className="p-3 rounded-lg border border-[#E7E6DF] bg-[#FBFBF9] flex items-center justify-between text-xs">
              <div className="flex items-center gap-2.5">
                <span className="font-semibold text-[#1E252B]">Website</span>
                <span className="text-[#64748B]">({wsComplete}/{wsTotal} items)</span>
              </div>
              <span className={`px-2 py-0.5 rounded text-[11px] font-medium ${
                wsComplete >= 4 ? 'bg-[#EBF4EF] text-[#1E6B52]' : 'bg-[#FDF3EC] text-[#C26638]'
              }`}>
                {wsComplete >= 4 ? 'Complete' : 'Needs attention'}
              </span>
            </div>

            <div className="p-3 rounded-lg border border-[#E7E6DF] bg-[#FBFBF9] flex items-center justify-between text-xs">
              <div className="flex items-center gap-2.5">
                <span className="font-semibold text-[#1E252B]">Instagram</span>
                <span className="text-[#64748B]">({smComplete}/{smTotal} items)</span>
              </div>
              <span className={`px-2 py-0.5 rounded text-[11px] font-medium ${
                smComplete >= 3 ? 'bg-[#EBF4EF] text-[#1E6B52]' : 'bg-[#FDF3EC] text-[#C26638]'
              }`}>
                {smComplete >= 3 ? 'Complete' : 'Needs attention'}
              </span>
            </div>

            <div className="p-3 rounded-lg border border-[#E7E6DF] bg-[#FBFBF9] flex items-center justify-between text-xs">
              <div className="flex items-center gap-2.5">
                <span className="font-semibold text-[#1E252B]">Customer Reviews</span>
                <span className="text-[#64748B]">({rvComplete}/{rvTotal} items)</span>
              </div>
              <span className={`px-2 py-0.5 rounded text-[11px] font-medium ${
                rvComplete >= 2 ? 'bg-[#EBF4EF] text-[#1E6B52]' : 'bg-[#FDF3EC] text-[#C26638]'
              }`}>
                {rvComplete >= 2 ? 'Complete' : 'Needs attention'}
              </span>
            </div>

            <div className="p-3 rounded-lg border border-[#E7E6DF] bg-[#FBFBF9] flex items-center justify-between text-xs">
              <div className="flex items-center gap-2.5">
                <span className="font-semibold text-[#1E252B]">Contact Information</span>
                <span className="text-[#64748B]">{hasPhoneAndEmail ? 'Phone & Email listed' : 'Missing details'}</span>
              </div>
              <span className={`px-2 py-0.5 rounded text-[11px] font-medium ${
                hasPhoneAndEmail ? 'bg-[#EBF4EF] text-[#1E6B52]' : 'bg-[#FDF3EC] text-[#C26638]'
              }`}>
                {hasPhoneAndEmail ? 'Complete' : 'Needs attention'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-6 rounded-xl border border-[#E2E0D8] shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-[#1E252B]">Recent Activity</h2>
            <p className="text-xs text-[#64748B] mt-0.5">Your marketing workspace history and generated items.</p>
          </div>
        </div>

        <div className="divide-y divide-[#E7E6DF]">
          {activities.map((act) => (
            <div key={act.id} className="py-3 flex items-start justify-between gap-3 text-xs">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 w-6 h-6 rounded-full bg-[#F4F7FA] text-[#0F2942] flex items-center justify-center shrink-0">
                  <Clock className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="font-semibold text-[#1E252B] block">{act.title}</span>
                  <span className="text-[#64748B]">{act.description}</span>
                </div>
              </div>
              <span className="text-[11px] text-[#94A3B8] whitespace-nowrap shrink-0">{act.timestamp}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
