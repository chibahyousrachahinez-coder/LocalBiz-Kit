import React, { useState } from 'react';
import { 
  Library, 
  Search, 
  Copy, 
  Check, 
  Calendar, 
  Sparkles, 
  ArrowRight,
  Filter,
  BookmarkCheck
} from 'lucide-react';
import { BusinessProfile, MarketingTemplate, CalendarItem, AppView } from '../types';
import { PRESET_TEMPLATES } from '../data/templatesData';

interface TemplatesViewProps {
  businessProfile: BusinessProfile;
  onNavigateToContent: (initialTopic: string, initialCaption: string) => void;
  onAddToCalendar: (item: CalendarItem) => void;
  onShowToast: (msg: string, type?: 'success' | 'info') => void;
}

const CATEGORIES = [
  'All Categories',
  'Social Media',
  'Promotions',
  'Announcements',
  'Review Requests',
  'Event Invites',
  'Seasonal campaigns',
  'Collaborations / Partnerships'
];

export const TemplatesView: React.FC<TemplatesViewProps> = ({
  businessProfile,
  onNavigateToContent,
  onAddToCalendar,
  onShowToast
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All Categories');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const formatText = (text: string) => {
    return text
      .replace(/\[Business Name\]/g, businessProfile.name || 'Our Business')
      .replace(/\[Location\]/g, businessProfile.location || 'our town')
      .replace(/\[Item\/Dish\/Service\]/g, businessProfile.services?.[0] || 'our signature offering')
      .replace(/\[Phone\]/g, businessProfile.phone || 'our direct line')
      .replace(/\[Email\]/g, businessProfile.email || 'our email')
      .replace(/\[Website\]/g, businessProfile.website || 'our website')
      .replace(/\[Neighborhood\]/g, (businessProfile.location || 'neighborhood').split(',')[0]);
  };

  const handleCopy = (template: MarketingTemplate) => {
    const formatted = formatText(template.templateText);
    navigator.clipboard?.writeText(formatted);
    setCopiedId(template.id);
    onShowToast('Copied template to clipboard!', 'info');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleUseTemplate = (template: MarketingTemplate) => {
    const formatted = formatText(template.templateText);
    onNavigateToContent(template.title, formatted);
    onShowToast('Loaded template into Content Studio!', 'success');
  };

  const handleScheduleTemplate = (template: MarketingTemplate) => {
    const formatted = formatText(template.templateText);
    const newCalItem: CalendarItem = {
      id: 'cal_' + Date.now(),
      dayOfWeek: 'Wednesday',
      date: new Date().toISOString().split('T')[0],
      theme: template.category,
      contentType: 'Instagram Post',
      title: template.title,
      hook: template.title,
      caption: formatted,
      status: 'scheduled',
      time: '10:00 AM'
    };
    onAddToCalendar(newCalItem);
    onShowToast('Added template to Wednesday schedule on Content Calendar!', 'success');
  };

  const filteredTemplates = PRESET_TEMPLATES.filter(tpl => {
    const matchesCat = selectedCategory === 'All Categories' || tpl.category === selectedCategory;
    const matchesSearch = tpl.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tpl.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tpl.templateText.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div id="templates-view" className="space-y-6 max-w-6xl mx-auto pb-16 md:pb-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-[#E7E6DF] shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1E252B] tracking-tight">Marketing Template Library</h1>
          <p className="text-xs text-[#64748B] mt-1">
            Over 30 pre-written, field-tested marketing frameworks ready for {businessProfile.name}.
          </p>
        </div>

        <div className="text-xs text-[#1E6B52] bg-[#EBF4EF] border border-[#1E6B52]/20 px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-semibold">
          <Library className="w-3.5 h-3.5" />
          <span>{PRESET_TEMPLATES.length} Proven Templates</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-[#E2E0D8] shadow-2xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search className="w-3.5 h-3.5 text-[#64748B] absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search templates by keyword (e.g. coffee, review, holiday, weekend)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-2 text-xs rounded-lg border border-[#E2E0D8] focus:outline-hidden focus:ring-1 focus:ring-[#0F2942]"
            />
          </div>

          <span className="text-xs text-[#64748B] whitespace-nowrap">
            Showing {filteredTemplates.length} templates
          </span>
        </div>

        {/* Category Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto text-xs pt-1 pb-0.5">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-[#0F2942] text-white font-semibold shadow-2xs'
                  : 'bg-[#FBFBF9] hover:bg-[#F4F4F0] text-[#64748B] border border-[#E2E0D8]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTemplates.map((tpl) => {
          const previewText = formatText(tpl.templateText);

          return (
            <div
              key={tpl.id}
              className="bg-white p-5 rounded-xl border border-[#E2E0D8] shadow-2xs hover:border-[#CBD5E1] transition-all flex flex-col justify-between space-y-4 text-left group"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-[#1E6B52] uppercase tracking-wider bg-[#EBF4EF] px-2 py-0.5 rounded">
                    {tpl.category}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-[#1E252B] line-clamp-1">{tpl.title}</h3>
                <p className="text-xs text-[#64748B] line-clamp-1">{tpl.description}</p>

                <div className="p-3 bg-[#FBFBF9] rounded-lg border border-[#E7E6DF] text-xs text-[#334155] leading-relaxed line-clamp-5 whitespace-pre-line font-normal">
                  {previewText}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-[#E7E6DF] flex items-center justify-between gap-1">
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleCopy(tpl)}
                    className="p-1.5 text-[#64748B] hover:text-[#1E252B] hover:bg-[#F4F4F0] rounded-md transition-colors"
                    title="Copy text"
                  >
                    {copiedId === tpl.id ? <Check className="w-3.5 h-3.5 text-[#1E6B52]" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    onClick={() => handleScheduleTemplate(tpl)}
                    className="p-1.5 text-[#64748B] hover:text-[#1E252B] hover:bg-[#F4F4F0] rounded-md transition-colors"
                    title="Add to calendar"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  onClick={() => handleUseTemplate(tpl)}
                  className="px-3 py-1.5 text-xs font-semibold bg-[#0F2942] hover:bg-[#1C3B5E] text-white rounded-md transition-colors flex items-center gap-1"
                >
                  <span>Use Template</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="bg-white p-12 rounded-xl border border-[#E2E0D8] text-center text-xs text-[#64748B]">
          No templates match "{searchQuery}". Try selecting "All Categories" or another keyword.
        </div>
      )}
    </div>
  );
};
