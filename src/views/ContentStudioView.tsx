import React, { useState } from 'react';
import { 
  Sparkles, 
  Copy, 
  Check, 
  Bookmark, 
  BookmarkCheck, 
  Edit3, 
  CopyPlus, 
  Trash2, 
  Image as ImageIcon, 
  Hash, 
  Search,
  Filter,
  RefreshCw,
  Plus,
  Calendar,
  Save
} from 'lucide-react';
import { 
  BusinessProfile, 
  ContentType, 
  Tone, 
  ContentGoal, 
  GeneratedContent,
  CalendarItem
} from '../types';
import { generateContentPiece } from '../lib/generators';

interface ContentStudioViewProps {
  businessProfile: BusinessProfile;
  contentList: GeneratedContent[];
  onSaveContent: (item: GeneratedContent) => void;
  onDeleteContent: (id: string) => void;
  onAddToCalendar?: (item: CalendarItem) => void;
  onShowToast: (msg: string, type?: 'success' | 'info') => void;
}

const CONTENT_TYPES: ContentType[] = [
  'Instagram Post',
  'Facebook Post',
  'Google Business Post',
  'Promotion',
  'Announcement',
  'Educational Post',
  'Behind the Scenes',
  'Customer Story'
];

const TONES: Tone[] = [
  'Friendly',
  'Professional',
  'Playful',
  'Premium',
  'Local/community'
];

const GOALS: ContentGoal[] = [
  'Get visits',
  'Get bookings',
  'Promote offer',
  'Build trust',
  'Get engagement'
];

// Suggested topic ideas per category to reduce cognitive load
const QUICK_TOPICS: Record<string, string[]> = {
  'Coffee Shop': [
    'New seasonal latte launch',
    'Weekend cinnamon buns drop',
    'Morning coffee dial-in ritual',
    'Meet the roaster',
    'Whole bean grinding guide',
    'Dog-friendly patio reminder'
  ],
  'Restaurant': [
    'Weekend chef special tasting',
    'Seasonal local farm vegetables',
    'Signature pasta dish story',
    'Wine pairing recommendation',
    'Sunday family lunch table'
  ],
  'Salon': [
    'Autumn hydration hair treatment',
    'Dimensional balayage transformation',
    'Scalp care routine for winter',
    'Stylist spotlight & favorite cut',
    'Weekend appointment openings'
  ],
  'Barber': [
    'Maintaining a sharp beard line',
    'Traditional hot towel shave ritual',
    'Best matte styling pomade',
    'Mid-week walk-in hours',
    'Classic taper fade showcase'
  ],
  'Gym': [
    '3 habits for morning workouts',
    'Coaching member transformation',
    'Mobility routine for desk workers',
    'Saturday team workout preview',
    '7-day free trial invite'
  ],
  'Dentist': [
    'Stress-free dental hygiene tips',
    'Modern clear aligner consultation',
    'Teeth whitening myths vs reality',
    'Meet our friendly clinic team',
    'Family checkup bookings reminder'
  ],
  'Real Estate': [
    'Neighborhood pricing snapshot',
    'Weekend open house walkthrough',
    '3 tips to prepare your home for sale',
    'Local park & school guide',
    'Recent buyer success story'
  ],
  'Local Service': [
    'Preventative seasonal maintenance',
    'Emergency repair response promise',
    'Why transparent estimates matter',
    'Customer testimonial & before/after',
    'Meet the technician on call'
  ]
};

export const ContentStudioView: React.FC<ContentStudioViewProps> = ({
  businessProfile,
  contentList,
  onSaveContent,
  onDeleteContent,
  onAddToCalendar,
  onShowToast
}) => {
  // Form state
  const [contentType, setContentType] = useState<ContentType>('Instagram Post');
  const [topic, setTopic] = useState<string>('');
  const [tone, setTone] = useState<Tone>('Friendly');
  const [goal, setGoal] = useState<ContentGoal>('Get visits');

  // Active output state
  const [activeItem, setActiveItem] = useState<GeneratedContent | null>(() => {
    return contentList.length > 0 ? contentList[0] : null;
  });

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Search & filter state
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterType, setFilterType] = useState<string>('all');

  const topicsList = QUICK_TOPICS[businessProfile.category] || QUICK_TOPICS['Coffee Shop'];

  const handleGenerate = () => {
    const finalTopic = topic.trim() || topicsList[0] || 'Seasonal community special';
    const generated = generateContentPiece(
      businessProfile,
      contentType,
      finalTopic,
      tone,
      goal
    );
    setActiveItem(generated);
    setIsEditing(false);
    onShowToast('New marketing copy generated!', 'success');
  };

  const handleCopyFullPost = () => {
    if (!activeItem) return;
    const fullText = `${activeItem.hook}\n\n${activeItem.caption}\n\n${activeItem.cta}\n\n${activeItem.hashtags.join(' ')}`;
    navigator.clipboard?.writeText(fullText);
    setCopiedField('full');
    onShowToast('Copied full post to clipboard!', 'info');
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleCopyField = (text: string, fieldName: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedField(fieldName);
    onShowToast(`Copied ${fieldName} to clipboard!`, 'info');
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSaveToLibrary = () => {
    if (!activeItem) return;
    const updated = { ...activeItem, isSaved: true };
    setActiveItem(updated);
    onSaveContent(updated);
    onShowToast('Saved to your Content Library!', 'success');
  };

  const handleDuplicate = () => {
    if (!activeItem) return;
    const duplicated: GeneratedContent = {
      ...activeItem,
      id: 'gen_' + Date.now(),
      title: `${activeItem.title} (Copy)`,
      createdAt: new Date().toISOString()
    };
    setActiveItem(duplicated);
    onSaveContent(duplicated);
    onShowToast('Post duplicated and saved!', 'success');
  };

  const filteredList = contentList.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.caption.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || item.contentType === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div id="content-studio-view" className="space-y-6 max-w-6xl mx-auto pb-16 md:pb-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-[#E7E6DF] shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1E252B] tracking-tight">Content Studio</h1>
          <p className="text-xs text-[#64748B] mt-1">
            Generate realistic social captions, hooks, and posts customized for <strong className="text-[#1E252B]">{businessProfile.name}</strong> ({businessProfile.category}).
          </p>
        </div>
        <div className="text-xs text-[#64748B] bg-[#FBFBF9] border border-[#E2E0D8] px-3 py-1.5 rounded-lg flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#0F2942]" />
          <span>Tailored for {businessProfile.location}</span>
        </div>
      </div>

      {/* Generator & Preview Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Input Form Controls */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white p-6 rounded-xl border border-[#E2E0D8] shadow-2xs space-y-4">
            <h2 className="text-base font-bold text-[#1E252B] border-b border-[#E7E6DF] pb-3 flex items-center justify-between">
              <span>Post Setup</span>
              <span className="text-xs font-normal text-[#64748B]">Step 1 of 2</span>
            </h2>

            {/* Content Type Selector */}
            <div>
              <label className="block text-xs font-semibold text-[#1E252B] mb-1.5">
                Content Type
              </label>
              <select
                id="select-content-type"
                value={contentType}
                onChange={(e) => setContentType(e.target.value as ContentType)}
                className="w-full px-3.5 py-2 text-xs rounded-lg border border-[#E2E0D8] focus:outline-hidden focus:ring-2 focus:ring-[#0F2942]/20 focus:border-[#0F2942] bg-white text-[#1E252B]"
              >
                {CONTENT_TYPES.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            {/* Topic Input */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-[#1E252B]">
                  Topic or Subject
                </label>
                <span className="text-[10px] text-[#64748B]">What do you want to talk about?</span>
              </div>
              <input
                id="input-topic"
                type="text"
                placeholder="e.g. New seasonal latte launch"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full px-3.5 py-2 text-xs rounded-lg border border-[#E2E0D8] focus:outline-hidden focus:ring-2 focus:ring-[#0F2942]/20 focus:border-[#0F2942]"
              />

              {/* Quick Topic Chips */}
              <div className="mt-2.5">
                <span className="text-[10px] text-[#64748B] block mb-1">Quick ideas for {businessProfile.category}:</span>
                <div className="flex flex-wrap gap-1.5">
                  {topicsList.slice(0, 4).map((t, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setTopic(t)}
                      className={`text-[11px] px-2 py-1 rounded border transition-colors ${
                        topic === t 
                          ? 'border-[#0F2942] bg-[#F4F7FA] text-[#0F2942] font-semibold' 
                          : 'border-[#E2E0D8] bg-[#FBFBF9] hover:bg-[#F4F4F0] text-[#5A6578]'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Tone Selector */}
            <div>
              <label className="block text-xs font-semibold text-[#1E252B] mb-1.5">
                Brand Tone
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                {TONES.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTone(t)}
                    className={`px-2 py-1.5 text-xs rounded-md border text-center transition-all ${
                      tone === t
                        ? 'border-[#0F2942] bg-[#0F2942] text-white font-semibold'
                        : 'border-[#E2E0D8] bg-[#FBFBF9] hover:bg-[#F4F4F0] text-[#1E252B]'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Goal Selector */}
            <div>
              <label className="block text-xs font-semibold text-[#1E252B] mb-1.5">
                Post Goal
              </label>
              <select
                id="select-goal"
                value={goal}
                onChange={(e) => setGoal(e.target.value as ContentGoal)}
                className="w-full px-3.5 py-2 text-xs rounded-lg border border-[#E2E0D8] focus:outline-hidden focus:ring-2 focus:ring-[#0F2942]/20 focus:border-[#0F2942] bg-white text-[#1E252B]"
              >
                {GOALS.map((g) => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>

            {/* Create Content Button */}
            <div className="pt-2">
              <button
                id="btn-create-content"
                onClick={handleGenerate}
                className="w-full py-3 text-xs font-semibold bg-[#0F2942] hover:bg-[#1C3B5E] text-white rounded-lg shadow-sm transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Create Content</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right: Output Card & Structured Result */}
        <div className="lg:col-span-7 space-y-4">
          {activeItem ? (
            <div className="bg-white p-6 rounded-xl border border-[#E2E0D8] shadow-2xs space-y-5">
              {/* Output Actions Bar */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E7E6DF] pb-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#1E252B]">{activeItem.contentType}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[#F4F7FA] text-[#0F2942] font-semibold border border-[#E2E8F0]">
                    {activeItem.tone}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[#EBF4EF] text-[#1E6B52] font-medium">
                    {activeItem.goal}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  {onAddToCalendar && (
                    <button
                      id="btn-schedule-calendar"
                      onClick={() => {
                        const days: Array<'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday'> = [
                          'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
                        ];
                        const todayDayIndex = (new Date().getDay() + 6) % 7;
                        const nextDay = days[(todayDayIndex + 1) % 7];
                        const calItem: CalendarItem = {
                          id: 'cal_' + Date.now(),
                          dayOfWeek: nextDay,
                          date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
                          theme: activeItem.topic,
                          contentType: activeItem.contentType,
                          title: activeItem.title,
                          hook: activeItem.hook,
                          caption: `${activeItem.caption}\n\n${activeItem.cta}`,
                          status: 'scheduled',
                          time: '10:00 AM'
                        };
                        onAddToCalendar(calItem);
                        onShowToast(`Scheduled to Calendar for ${nextDay}!`, 'success');
                      }}
                      className="px-2.5 py-1.5 text-xs font-semibold text-[#0F2942] bg-white hover:bg-[#F4F4F0] border border-[#CBD5E1] rounded-md transition-colors flex items-center gap-1"
                      title="Add to Weekly Calendar"
                    >
                      <Calendar className="w-3.5 h-3.5 text-[#0F2942]" />
                      <span className="hidden sm:inline">Schedule</span>
                    </button>
                  )}

                  <button
                    id="btn-copy-full-post"
                    onClick={handleCopyFullPost}
                    className="px-2.5 py-1.5 text-xs font-semibold text-[#0F2942] bg-[#F4F7FA] hover:bg-[#EAEFF5] border border-[#CBD5E1] rounded-md transition-colors flex items-center gap-1"
                  >
                    {copiedField === 'full' ? <Check className="w-3.5 h-3.5 text-[#1E6B52]" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedField === 'full' ? 'Copied' : 'Copy All'}</span>
                  </button>

                  <button
                    id="btn-save-content-item"
                    onClick={handleSaveToLibrary}
                    className={`px-2.5 py-1.5 text-xs font-semibold rounded-md border transition-colors flex items-center gap-1 ${
                      activeItem.isSaved 
                        ? 'bg-[#EBF4EF] text-[#1E6B52] border-[#1E6B52]/30' 
                        : 'bg-white text-[#1E252B] border-[#E2E0D8] hover:bg-[#F4F4F0]'
                    }`}
                  >
                    {activeItem.isSaved ? <BookmarkCheck className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
                    <span>{activeItem.isSaved ? 'Saved' : 'Save'}</span>
                  </button>

                  <button
                    id="btn-edit-content-item"
                    onClick={() => {
                      if (isEditing) {
                        onSaveContent(activeItem);
                        onShowToast('Post changes saved!', 'success');
                      }
                      setIsEditing(!isEditing);
                    }}
                    className={`px-2.5 py-1.5 text-xs font-semibold rounded-md border transition-colors flex items-center gap-1 ${
                      isEditing 
                        ? 'bg-[#1E6B52] text-white border-[#1E6B52]' 
                        : 'text-[#64748B] hover:text-[#1E252B] hover:bg-[#F4F4F0] border-[#E2E0D8]'
                    }`}
                    title={isEditing ? 'Save and finish editing' : 'Edit text'}
                  >
                    {isEditing ? <Save className="w-3.5 h-3.5" /> : <Edit3 className="w-3.5 h-3.5" />}
                    <span>{isEditing ? 'Done' : 'Edit'}</span>
                  </button>

                  <button
                    id="btn-duplicate-content-item"
                    onClick={handleDuplicate}
                    className="p-1.5 text-[#64748B] hover:text-[#1E252B] hover:bg-[#F4F4F0] border border-[#E2E0D8] rounded-md transition-colors"
                    title="Duplicate"
                  >
                    <CopyPlus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Structured Output */}
              <div className="space-y-4 text-left">
                {/* 1. Hook */}
                <div className="p-3.5 rounded-lg bg-[#FBFBF9] border border-[#E7E6DF] space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-[#0F2942] uppercase tracking-wider">
                      The Hook (First 3 Seconds)
                    </span>
                    <button
                      onClick={() => handleCopyField(activeItem.hook, 'Hook')}
                      className="text-[11px] text-[#64748B] hover:text-[#1E252B] flex items-center gap-1"
                    >
                      {copiedField === 'Hook' ? <Check className="w-3 h-3 text-[#1E6B52]" /> : <Copy className="w-3 h-3" />}
                      Copy Hook
                    </button>
                  </div>
                  {isEditing ? (
                    <input
                      type="text"
                      value={activeItem.hook}
                      onChange={(e) => setActiveItem({ ...activeItem, hook: e.target.value })}
                      className="w-full px-2 py-1 text-xs border border-[#CBD5E1] rounded bg-white font-semibold text-[#1E252B]"
                    />
                  ) : (
                    <p className="text-sm font-semibold text-[#1E252B]">"{activeItem.hook}"</p>
                  )}
                </div>

                {/* 2. Caption */}
                <div className="p-3.5 rounded-lg bg-[#FBFBF9] border border-[#E7E6DF] space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">
                      Post Caption
                    </span>
                    <button
                      onClick={() => handleCopyField(activeItem.caption, 'Caption')}
                      className="text-[11px] text-[#64748B] hover:text-[#1E252B] flex items-center gap-1"
                    >
                      {copiedField === 'Caption' ? <Check className="w-3 h-3 text-[#1E6B52]" /> : <Copy className="w-3 h-3" />}
                      Copy Caption
                    </button>
                  </div>
                  {isEditing ? (
                    <textarea
                      rows={5}
                      value={activeItem.caption}
                      onChange={(e) => setActiveItem({ ...activeItem, caption: e.target.value })}
                      className="w-full px-2 py-1 text-xs border border-[#CBD5E1] rounded bg-white leading-relaxed text-[#1E252B]"
                    />
                  ) : (
                    <p className="text-xs text-[#334155] leading-relaxed whitespace-pre-line">
                      {activeItem.caption}
                    </p>
                  )}
                </div>

                {/* 3. Call to Action (CTA) */}
                <div className="p-3 rounded-lg bg-[#EBF4EF]/40 border border-[#1E6B52]/20 flex items-center justify-between gap-3 text-xs">
                  <div className="flex-1">
                    <span className="text-[10px] font-bold text-[#1E6B52] uppercase tracking-wider block">Call to Action (CTA)</span>
                    {isEditing ? (
                      <input
                        type="text"
                        value={activeItem.cta}
                        onChange={(e) => setActiveItem({ ...activeItem, cta: e.target.value })}
                        className="w-full px-2 py-1 text-xs border border-[#CBD5E1] rounded bg-white mt-1 font-semibold"
                      />
                    ) : (
                      <p className="font-semibold text-[#1E252B] mt-0.5">{activeItem.cta}</p>
                    )}
                  </div>
                  <button
                    onClick={() => handleCopyField(activeItem.cta, 'CTA')}
                    className="p-1 text-[#64748B] hover:text-[#1E252B] shrink-0"
                    title="Copy CTA"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* 4. Suggested Visual */}
                <div className="p-3.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] space-y-1 text-xs">
                  <div className="flex items-center gap-1.5 text-[#0F2942] font-semibold text-[11px]">
                    <ImageIcon className="w-3.5 h-3.5" />
                    <span>Suggested Visual</span>
                  </div>
                  <p className="text-[#64748B] leading-relaxed">{activeItem.suggestedVisual}</p>
                </div>

                {/* 5. Hashtags */}
                <div className="p-3 rounded-lg bg-[#FBFBF9] border border-[#E7E6DF] space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1 text-[11px] font-semibold text-[#64748B]">
                      <Hash className="w-3 h-3" /> Hashtags
                    </span>
                    <button
                      onClick={() => handleCopyField(activeItem.hashtags.join(' '), 'Hashtags')}
                      className="text-[10px] text-[#0F2942] hover:underline"
                    >
                      Copy All
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {activeItem.hashtags.map((tag, i) => (
                      <span key={i} className="text-[11px] font-medium text-[#0F2942] bg-[#EAE8E0]/40 px-2 py-0.5 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Empty State */
            <div className="bg-white p-12 rounded-xl border border-[#E2E0D8] text-center space-y-3">
              <div className="w-12 h-12 mx-auto rounded-full bg-[#F4F7FA] text-[#0F2942] flex items-center justify-center">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[#1E252B]">No content generated yet.</h3>
              <p className="text-xs text-[#64748B] max-w-sm mx-auto">
                Create your first post to start building your marketing library for {businessProfile.name}.
              </p>
              <button
                onClick={handleGenerate}
                className="px-4 py-2 text-xs font-semibold bg-[#0F2942] text-white rounded-lg hover:bg-[#1C3B5E] shadow-2xs"
              >
                Create Content
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Library of Past Generated Content */}
      <div className="bg-white p-6 rounded-xl border border-[#E2E0D8] shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E7E6DF] pb-4">
          <div>
            <h2 className="text-base font-bold text-[#1E252B]">Saved Content & Drafts</h2>
            <p className="text-xs text-[#64748B] mt-0.5">
              {filteredList.length} post{filteredList.length === 1 ? '' : 's'} in your local library.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-[#64748B] absolute left-2.5 top-2.5" />
              <input
                type="text"
                placeholder="Search posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1.5 text-xs rounded-lg border border-[#E2E0D8] focus:outline-hidden focus:ring-1 focus:ring-[#0F2942]"
              />
            </div>

            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-2.5 py-1.5 text-xs rounded-lg border border-[#E2E0D8] bg-white text-[#64748B]"
            >
              <option value="all">All Post Types</option>
              {CONTENT_TYPES.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
        </div>

        {filteredList.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredList.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  setActiveItem(item);
                  setIsEditing(false);
                }}
                className={`p-4 rounded-lg border text-left cursor-pointer transition-all space-y-2 relative group ${
                  activeItem?.id === item.id 
                    ? 'border-[#0F2942] bg-[#F8FAFC] ring-1 ring-[#0F2942]' 
                    : 'border-[#E2E0D8] bg-white hover:border-[#CBD5E1]'
                }`}
              >
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-semibold text-[#0F2942]">{item.contentType}</span>
                  <span className="text-[#94A3B8]">{new Date(item.createdAt).toLocaleDateString()}</span>
                </div>
                <h4 className="text-xs font-bold text-[#1E252B] line-clamp-1">{item.title}</h4>
                <p className="text-xs text-[#64748B] line-clamp-2 leading-relaxed italic">"{item.hook}"</p>
                <div className="pt-2 border-t border-[#E7E6DF] flex items-center justify-between text-[11px] text-[#64748B]">
                  <span>Goal: {item.goal}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteContent(item.id);
                      if (activeItem?.id === item.id) setActiveItem(null);
                      onShowToast('Post deleted from library', 'info');
                    }}
                    className="opacity-0 group-hover:opacity-100 p-1 hover:text-red-500 rounded transition-opacity"
                    title="Delete item"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center text-xs text-[#64748B]">
            No posts match your current search.
          </div>
        )}
      </div>
    </div>
  );
};
