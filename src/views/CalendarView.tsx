import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  Plus, 
  Check, 
  Clock, 
  Trash2, 
  Edit3, 
  CheckCircle2, 
  Tag, 
  Share2,
  CalendarDays
} from 'lucide-react';
import { CalendarItem, ContentType } from '../types';
import { Modal } from '../components/Modal';

interface CalendarViewProps {
  calendarItems: CalendarItem[];
  onSaveItem: (item: CalendarItem) => void;
  onDeleteItem: (id: string) => void;
  onToggleStatus: (id: string) => void;
  onShowToast: (msg: string, type?: 'success' | 'info') => void;
}

const DAY_THEMES = [
  { day: 'Monday', theme: 'Educational', desc: 'Share a helpful tip or technique' },
  { day: 'Tuesday', theme: 'Product', desc: 'Spotlight a signature item or craft' },
  { day: 'Wednesday', theme: 'Behind the scenes', desc: 'Show your team, prep, or routine' },
  { day: 'Thursday', theme: 'Customer story', desc: 'Highlight a loyal regular or review' },
  { day: 'Friday', theme: 'Promotion', desc: 'Weekend offer, special, or bundle' },
  { day: 'Saturday', theme: 'Community', desc: 'Local neighborhood love & atmosphere' },
  { day: 'Sunday', theme: 'Rest / optional post', desc: 'Slow thoughts or weekly wrap-up' }
];

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

export const CalendarView: React.FC<CalendarViewProps> = ({
  calendarItems,
  onSaveItem,
  onDeleteItem,
  onToggleStatus,
  onShowToast
}) => {
  const [activeTab, setActiveTab] = useState<'weekly' | 'all'>('weekly');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [editingItem, setEditingItem] = useState<CalendarItem | null>(null);

  // Form fields for modal
  const [formDay, setFormDay] = useState<CalendarItem['dayOfWeek']>('Monday');
  const [formTheme, setFormTheme] = useState<string>('Educational');
  const [formType, setFormType] = useState<ContentType>('Educational Post');
  const [formTitle, setFormTitle] = useState<string>('');
  const [formHook, setFormHook] = useState<string>('');
  const [formCaption, setFormCaption] = useState<string>('');
  const [formTime, setFormTime] = useState<string>('09:00 AM');

  const openAddModal = (day: CalendarItem['dayOfWeek'], theme: string) => {
    setEditingItem(null);
    setFormDay(day);
    setFormTheme(theme);
    setFormType('Instagram Post');
    setFormTitle(`${day} ${theme} Post`);
    setFormHook('');
    setFormCaption('');
    setFormTime('09:00 AM');
    setModalOpen(true);
  };

  const openEditModal = (item: CalendarItem) => {
    setEditingItem(item);
    setFormDay(item.dayOfWeek);
    setFormTheme(item.theme);
    setFormType(item.contentType);
    setFormTitle(item.title);
    setFormHook(item.hook);
    setFormCaption(item.caption);
    setFormTime(item.time || '09:00 AM');
    setModalOpen(true);
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    const item: CalendarItem = {
      id: editingItem ? editingItem.id : 'cal_' + Date.now(),
      dayOfWeek: formDay,
      date: editingItem ? editingItem.date : new Date().toISOString().split('T')[0],
      theme: formTheme,
      contentType: formType,
      title: formTitle.trim() || `${formDay} Post`,
      hook: formHook.trim(),
      caption: formCaption.trim(),
      status: editingItem ? editingItem.status : 'scheduled',
      time: formTime
    };
    onSaveItem(item);
    setModalOpen(false);
    onShowToast(editingItem ? 'Calendar item updated!' : 'New post scheduled on calendar!', 'success');
  };

  const filteredItems = calendarItems.filter(item => {
    if (filterStatus === 'all') return true;
    return item.status === filterStatus;
  });

  return (
    <div id="calendar-view-root" className="space-y-6 max-w-6xl mx-auto pb-16 md:pb-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-[#E7E6DF] shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1E252B] tracking-tight">Content Calendar</h1>
          <p className="text-xs text-[#64748B] mt-1">
            Organize upcoming content with a proven weekly rhythm. Never scramble on Monday morning.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* View tabs */}
          <div className="flex items-center bg-[#F4F4F0] p-1 rounded-lg border border-[#E2E0D8] text-xs">
            <button
              onClick={() => setActiveTab('weekly')}
              className={`px-3 py-1.5 rounded-md font-semibold transition-all ${
                activeTab === 'weekly' ? 'bg-white text-[#0F2942] shadow-2xs' : 'text-[#64748B] hover:text-[#1E252B]'
              }`}
            >
              Weekly Themes
            </button>
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 rounded-md font-semibold transition-all ${
                activeTab === 'all' ? 'bg-white text-[#0F2942] shadow-2xs' : 'text-[#64748B] hover:text-[#1E252B]'
              }`}
            >
              All Posts ({calendarItems.length})
            </button>
          </div>

          <button
            id="btn-add-calendar-post"
            onClick={() => openAddModal('Monday', 'Educational')}
            className="px-3.5 py-2 text-xs font-semibold bg-[#0F2942] hover:bg-[#1C3B5E] text-white rounded-lg transition-all shadow-xs flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Schedule Post</span>
          </button>
        </div>
      </div>

      {/* Filter Status Bar */}
      <div className="flex items-center justify-between bg-white p-3.5 rounded-xl border border-[#E2E0D8] text-xs">
        <span className="text-[#64748B] font-medium hidden sm:inline">Filter by post status:</span>
        <div className="flex items-center gap-1.5">
          {(['all', 'scheduled', 'draft', 'published'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-2.5 py-1 rounded-md capitalize text-xs transition-colors ${
                filterStatus === st 
                  ? 'bg-[#0F2942] text-white font-semibold' 
                  : 'bg-[#FBFBF9] hover:bg-[#F4F4F0] text-[#64748B] border border-[#E2E0D8]'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
        <span className="text-xs text-[#1E6B52] font-semibold">
          {calendarItems.filter(c => c.status === 'published').length} published this month
        </span>
      </div>

      {/* WEEKLY THEME VIEW (The core feature requested in prompt) */}
      {activeTab === 'weekly' ? (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-7 gap-3">
            {DAY_THEMES.map((themeObj) => {
              const dayItems = filteredItems.filter(
                item => item.dayOfWeek.toLowerCase() === themeObj.day.toLowerCase()
              );

              return (
                <div 
                  key={themeObj.day}
                  className="bg-white rounded-xl border border-[#E2E0D8] shadow-2xs flex flex-col min-h-[300px]"
                >
                  {/* Day Column Header */}
                  <div className="p-3 border-b border-[#E7E6DF] bg-[#FBFBF9] rounded-t-xl text-left space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#0F2942]">{themeObj.day}</span>
                      <button
                        onClick={() => openAddModal(themeObj.day as CalendarItem['dayOfWeek'], themeObj.theme)}
                        className="p-1 hover:bg-[#EAE8E0] rounded text-[#64748B] hover:text-[#1E252B] transition-colors"
                        title={`Add post for ${themeObj.day}`}
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <span className="inline-block text-[10px] font-semibold text-[#1E6B52] uppercase tracking-wider bg-[#EBF4EF] px-1.5 py-0.5 rounded">
                      {themeObj.theme}
                    </span>
                    <p className="text-[10px] text-[#64748B] line-clamp-1">{themeObj.desc}</p>
                  </div>

                  {/* Day Post Cards */}
                  <div className="p-2 space-y-2 flex-1 overflow-y-auto">
                    {dayItems.length > 0 ? (
                      dayItems.map((item) => {
                        const isPublished = item.status === 'published';
                        return (
                          <div
                            key={item.id}
                            className={`p-2.5 rounded-lg border text-left space-y-2 transition-all group ${
                              isPublished
                                ? 'bg-[#FBFBF9] border-[#E2E0D8] opacity-80'
                                : 'bg-white border-[#E2E0D8] hover:border-[#0F2942]'
                            }`}
                          >
                            <div className="flex items-center justify-between text-[10px]">
                              <span className="font-semibold text-[#64748B]">{item.time || '09:00 AM'}</span>
                              <button
                                onClick={() => {
                                  onToggleStatus(item.id);
                                  onShowToast(`Post marked as ${isPublished ? 'scheduled' : 'published'}!`, 'info');
                                }}
                                className={`px-1.5 py-0.5 rounded font-bold transition-colors ${
                                  isPublished
                                    ? 'bg-[#EBF4EF] text-[#1E6B52] hover:bg-emerald-100'
                                    : 'bg-[#F4F7FA] text-[#0F2942] hover:bg-blue-100'
                                }`}
                              >
                                {item.status}
                              </button>
                            </div>

                            <p className="text-xs font-bold text-[#1E252B] line-clamp-2 leading-tight">
                              {item.title}
                            </p>

                            {item.hook && (
                              <p className="text-[11px] text-[#64748B] line-clamp-2 italic">
                                "{item.hook}"
                              </p>
                            )}

                            {/* Actions on hover */}
                            <div className="pt-1 border-t border-[#E7E6DF] flex items-center justify-end gap-1 text-[11px] text-[#64748B]">
                              <button
                                onClick={() => openEditModal(item)}
                                className="p-1 hover:text-[#0F2942] rounded"
                                title="Edit post"
                              >
                                <Edit3 className="w-3 h-3" />
                              </button>
                              <button
                                onClick={() => {
                                  onDeleteItem(item.id);
                                  onShowToast('Post removed from calendar', 'info');
                                }}
                                className="p-1 hover:text-red-500 rounded"
                                title="Delete post"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="h-full flex flex-col items-center justify-center p-4 text-center text-xs text-[#94A3B8]">
                        <span className="text-[11px] block">No posts scheduled</span>
                        <button
                          onClick={() => openAddModal(themeObj.day as CalendarItem['dayOfWeek'], themeObj.theme)}
                          className="mt-2 text-[10px] text-[#0F2942] hover:underline font-semibold"
                        >
                          + Add draft
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* List / All items view */
        <div className="bg-white p-6 rounded-xl border border-[#E2E0D8] shadow-2xs divide-y divide-[#E7E6DF]">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <div key={item.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-left">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-bold text-[#0F2942]">{item.dayOfWeek}</span>
                    <span className="text-[#64748B]">• {item.time || '09:00 AM'}</span>
                    <span className="px-2 py-0.5 rounded bg-[#F4F7FA] text-[#0F2942] font-semibold text-[10px]">
                      {item.theme}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-[#EBF4EF] text-[#1E6B52] font-semibold text-[10px]">
                      {item.contentType}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-[#1E252B]">{item.title}</h4>
                  {item.hook && <p className="text-xs text-[#64748B] italic">"{item.hook}"</p>}
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => onToggleStatus(item.id)}
                    className={`px-2.5 py-1 text-xs rounded-md font-semibold transition-colors ${
                      item.status === 'published'
                        ? 'bg-[#EBF4EF] text-[#1E6B52]'
                        : 'bg-[#F4F4F0] text-[#64748B] hover:text-[#1E252B]'
                    }`}
                  >
                    {item.status === 'published' ? '✓ Published' : 'Mark Published'}
                  </button>
                  <button
                    onClick={() => openEditModal(item)}
                    className="p-1.5 text-[#64748B] hover:text-[#1E252B] border border-[#E2E0D8] rounded-md"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => {
                      onDeleteItem(item.id);
                      onShowToast('Post deleted', 'info');
                    }}
                    className="p-1.5 text-[#64748B] hover:text-red-500 border border-[#E2E0D8] rounded-md"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="py-12 text-center text-xs text-[#64748B]">
              No posts found for this status.
            </div>
          )}
        </div>
      )}

      {/* Add / Edit Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingItem ? 'Edit Calendar Post' : 'Schedule Content Post'}
        subtitle="Keep your social media presence active and organized."
      >
        <form onSubmit={handleSaveModal} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#1E252B] mb-1">Day of Week</label>
              <select
                value={formDay}
                onChange={(e) => setFormDay(e.target.value as CalendarItem['dayOfWeek'])}
                className="w-full px-3 py-2 text-xs rounded-lg border border-[#E2E0D8] bg-white text-[#1E252B]"
              >
                {DAY_THEMES.map(t => (
                  <option key={t.day} value={t.day}>{t.day} ({t.theme})</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#1E252B] mb-1">Preferred Time</label>
              <input
                type="text"
                placeholder="e.g. 09:00 AM"
                value={formTime}
                onChange={(e) => setFormTime(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-[#E2E0D8]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#1E252B] mb-1">Post Title</label>
            <input
              type="text"
              required
              placeholder="e.g. Seasonal Coffee Bean Tasting"
              value={formTitle}
              onChange={(e) => setFormTitle(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-[#E2E0D8]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#1E252B] mb-1">Opening Hook</label>
            <input
              type="text"
              placeholder="e.g. The secret to a richer morning brew."
              value={formHook}
              onChange={(e) => setFormHook(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-[#E2E0D8]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#1E252B] mb-1">Caption Details</label>
            <textarea
              rows={3}
              placeholder="Short notes or full draft for the post..."
              value={formCaption}
              onChange={(e) => setFormCaption(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-[#E2E0D8] leading-relaxed"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#E7E6DF]">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="px-3 py-2 text-xs font-semibold text-[#64748B] hover:text-[#1E252B]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-semibold bg-[#0F2942] hover:bg-[#1C3B5E] text-white rounded-lg shadow-2xs"
            >
              {editingItem ? 'Save Changes' : 'Add to Calendar'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
