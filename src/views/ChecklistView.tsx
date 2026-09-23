import React, { useState } from 'react';
import { 
  CheckSquare, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  Check, 
  TrendingUp,
  MapPin,
  Globe,
  Star,
  Camera
} from 'lucide-react';
import { ChecklistItem, AppView } from '../types';

interface ChecklistViewProps {
  checklist: ChecklistItem[];
  onToggleItem: (id: string) => void;
  onNavigate: (view: AppView) => void;
  onShowToast: (msg: string, type?: 'success' | 'info') => void;
}

export const ChecklistView: React.FC<ChecklistViewProps> = ({
  checklist,
  onToggleItem,
  onNavigate,
  onShowToast
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const completedCount = checklist.filter(c => c.isCompleted).length;
  const totalCount = checklist.length;
  const presenceScore = Math.round((completedCount / totalCount) * 100);

  const categories = [
    { id: 'all', label: 'All Audits', icon: <CheckSquare className="w-3.5 h-3.5" /> },
    { id: 'Google Business', label: '1. Foundation & Google', icon: <MapPin className="w-3.5 h-3.5" /> },
    { id: 'Website', label: '2. Website & Conversion', icon: <Globe className="w-3.5 h-3.5" /> },
    { id: 'Social Media', label: '3. Weekly Content', icon: <Sparkles className="w-3.5 h-3.5" /> },
    { id: 'Reviews', label: '4. Reputation & Reviews', icon: <Star className="w-3.5 h-3.5" /> }
  ];

  // Missing high impact recommendations
  const incompleteItems = checklist.filter(c => !c.isCompleted);

  const getScoreBadge = (score: number) => {
    if (score >= 85) {
      return {
        label: 'Strong Local Presence',
        color: 'text-[#1E6B52] bg-[#EBF4EF] border-[#1E6B52]/20',
        desc: 'Your business is primed for high-intent neighborhood discovery.'
      };
    } else if (score >= 65) {
      return {
        label: 'Good Momentum',
        color: 'text-[#0F2942] bg-[#F4F7FA] border-[#0F2942]/20',
        desc: 'You have solid foundations. Completing remaining items will drive more walk-ins.'
      };
    }
    return {
      label: 'Needs Attention',
      color: 'text-[#C26638] bg-[#FDF3EC] border-[#C26638]/20',
      desc: 'Important customer touchpoints are missing. Follow the steps below to fix them.'
    };
  };

  const badge = getScoreBadge(presenceScore);

  const filteredItems = checklist.filter(item => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });

  return (
    <div id="checklist-view-root" className="space-y-6 max-w-5xl mx-auto pb-16 md:pb-6">
      {/* Header & Score Card */}
      <div className="bg-white p-6 rounded-xl border border-[#E7E6DF] shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${badge.color}`}>
              {badge.label}
            </span>
          </div>
          <h1 className="text-2xl font-bold text-[#1E252B] tracking-tight">Marketing Presence Audit</h1>
          <p className="text-xs text-[#64748B] max-w-lg leading-relaxed">
            {badge.desc}
          </p>
        </div>

        {/* Big Score Dial / Metric */}
        <div className="flex items-center gap-4 bg-[#FBFBF9] p-4 rounded-xl border border-[#E2E0D8] shrink-0">
          <div className="text-center">
            <span className="text-3xl font-extrabold text-[#1E252B] tracking-tight block">
              {presenceScore}%
            </span>
            <span className="text-[10px] text-[#64748B] uppercase font-bold tracking-wider">Presence Score</span>
          </div>
          <div className="h-10 w-px bg-[#E2E0D8]" />
          <div className="text-xs text-[#64748B]">
            <p className="font-semibold text-[#1E252B]">{completedCount} of {totalCount} items</p>
            <p className="text-[11px] text-[#1E6B52] font-medium">{incompleteItems.length} fixes left</p>
          </div>
        </div>
      </div>

      {/* Actionable Recommendations (Prioritized fixes) */}
      {incompleteItems.length > 0 && (
        <div className="bg-white p-6 rounded-xl border border-[#E2E0D8] shadow-2xs space-y-4 text-left">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-[#1E252B] flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-[#C26638]" />
                <span>Highest-Impact Recommendations</span>
              </h2>
              <p className="text-xs text-[#64748B] mt-0.5">Focus on these to quickly improve local conversion.</p>
            </div>
            <span className="text-xs text-[#C26638] font-bold bg-[#FDF3EC] px-2 py-0.5 rounded">Priority</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {incompleteItems.slice(0, 4).map((item) => (
              <div 
                key={item.id}
                className="p-3.5 rounded-lg border border-[#E7E6DF] bg-[#FBFBF9] flex items-center justify-between gap-3 text-xs"
              >
                <div>
                  <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider block">
                    {item.category}
                  </span>
                  <span className="font-semibold text-[#1E252B] mt-0.5 block">{item.title}</span>
                </div>
                <button
                  onClick={() => {
                    if (item.category === 'Google Business') onNavigate('google-business');
                    else if (item.category === 'Website') onNavigate('website-copy');
                    else if (item.category === 'Social Media') onNavigate('content');
                    else if (item.category === 'Reviews') onNavigate('responses');
                    else onNavigate('business');
                  }}
                  className="shrink-0 px-2.5 py-1 text-[11px] font-semibold text-[#0F2942] bg-white hover:bg-[#F4F4F0] border border-[#CBD5E1] rounded transition-colors"
                >
                  Fix Now →
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Category Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto text-xs pb-1">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-3 py-2 rounded-lg font-medium whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeCategory === cat.id
                ? 'bg-[#0F2942] text-white font-semibold shadow-2xs'
                : 'bg-white hover:bg-[#F4F4F0] text-[#64748B] border border-[#E2E0D8]'
            }`}
          >
            {cat.icon}
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Audit Checklist Table / Cards */}
      <div className="bg-white p-6 rounded-xl border border-[#E2E0D8] shadow-2xs space-y-3 text-left">
        <div className="flex items-center justify-between border-b border-[#E7E6DF] pb-3">
          <span className="text-xs font-bold text-[#1E252B]">
            Showing {filteredItems.length} Checklist Tasks
          </span>
          <span className="text-xs text-[#64748B]">Click any task to toggle status</span>
        </div>

        <div className="divide-y divide-[#E7E6DF]">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                onToggleItem(item.id);
                onShowToast(`Updated: ${item.title}`, 'info');
              }}
              className={`py-3.5 px-3 rounded-lg flex items-start justify-between gap-3 cursor-pointer transition-all ${
                item.isCompleted ? 'hover:bg-[#FBFBF9]' : 'hover:bg-[#F8FAFC]'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`mt-0.5 w-5 h-5 rounded-md flex items-center justify-center shrink-0 transition-colors ${
                  item.isCompleted ? 'bg-[#1E6B52] text-white' : 'border-2 border-[#CBD5E1] bg-white'
                }`}>
                  {item.isCompleted && <Check className="w-3.5 h-3.5" />}
                </div>

                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-bold ${
                      item.isCompleted ? 'text-[#64748B] line-through' : 'text-[#1E252B]'
                    }`}>
                      {item.title}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-[#F4F7FA] text-[#0F2942] font-semibold">
                      {item.category}
                    </span>
                  </div>
                  <p className="text-xs text-[#64748B] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="shrink-0 flex items-center gap-2">
                <span className={`text-[11px] font-semibold px-2 py-0.5 rounded ${
                  item.isCompleted ? 'text-[#1E6B52] bg-[#EBF4EF]' : 'text-[#64748B] bg-[#F4F4F0]'
                }`}>
                  {item.isCompleted ? 'Completed' : 'Pending'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
