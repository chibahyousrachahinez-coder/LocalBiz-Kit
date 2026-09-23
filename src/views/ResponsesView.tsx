import React, { useState } from 'react';
import { 
  MessageSquareQuote, 
  Copy, 
  Check, 
  Plus, 
  Edit3, 
  Trash2, 
  Search, 
  Mail, 
  MessageCircle, 
  Star,
  BookmarkCheck,
  Sparkles
} from 'lucide-react';
import { BusinessProfile, CustomerResponse } from '../types';
import { Modal } from '../components/Modal';

interface ResponsesViewProps {
  businessProfile: BusinessProfile;
  responses: CustomerResponse[];
  onSaveResponse: (item: CustomerResponse) => void;
  onDeleteResponse: (id: string) => void;
  onShowToast: (msg: string, type?: 'success' | 'info') => void;
}

export const ResponsesView: React.FC<ResponsesViewProps> = ({
  businessProfile,
  responses,
  onSaveResponse,
  onDeleteResponse,
  onShowToast
}) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'Review Reply' | 'Direct Message' | 'Email'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Add/Edit modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<CustomerResponse | null>(null);
  const [formCategory, setFormCategory] = useState<CustomerResponse['category']>('Review Reply');
  const [formScenario, setFormScenario] = useState('');
  const [formTitle, setFormTitle] = useState('');
  const [formContent, setFormContent] = useState('');
  const [formTone, setFormTone] = useState('Professional & Warm');

  const handleCopy = (text: string, id: string) => {
    // Replace any remaining template variables
    const formatted = text
      .replace(/\[Business Name\]/g, businessProfile.name)
      .replace(/\[Location\]/g, businessProfile.location)
      .replace(/\[Phone\]/g, businessProfile.phone || 'our phone number')
      .replace(/\[Email\]/g, businessProfile.email || 'our email');

    navigator.clipboard?.writeText(formatted);
    setCopiedId(id);
    onShowToast('Copied response to clipboard!', 'info');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const openAddModal = () => {
    setEditingItem(null);
    setFormCategory(activeCategory === 'all' ? 'Review Reply' : activeCategory);
    setFormScenario('Custom Customer Scenario');
    setFormTitle('New Customer Response');
    setFormContent(`Hi there! Thank you for reaching out to ${businessProfile.name}. We’d be delighted to assist you with...`);
    setFormTone('Professional & Warm');
    setModalOpen(true);
  };

  const openEditModal = (item: CustomerResponse) => {
    setEditingItem(item);
    setFormCategory(item.category);
    setFormScenario(item.scenario);
    setFormTitle(item.title);
    setFormContent(item.content);
    setFormTone(item.tone);
    setModalOpen(true);
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    const item: CustomerResponse = {
      id: editingItem ? editingItem.id : 'resp_' + Date.now(),
      category: formCategory,
      scenario: formScenario.trim() || 'General Inquiry',
      title: formTitle.trim() || 'Customer Response',
      content: formContent.trim(),
      tone: formTone,
      isCustom: true
    };
    onSaveResponse(item);
    setModalOpen(false);
    onShowToast(editingItem ? 'Response updated!' : 'Custom response saved!', 'success');
  };

  const filteredResponses = responses.filter(r => {
    const matchesCat = activeCategory === 'all' || r.category === activeCategory;
    const matchesSearch = r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          r.scenario.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          r.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div id="responses-view" className="space-y-6 max-w-5xl mx-auto pb-16 md:pb-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-[#E7E6DF] shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1E252B] tracking-tight">Customer Response Library</h1>
          <p className="text-xs text-[#64748B] mt-1">
            Pre-built, field-tested answers for reviews, Instagram/Facebook direct messages, and client emails.
          </p>
        </div>

        <button
          id="btn-add-custom-response"
          onClick={openAddModal}
          className="px-3.5 py-2 text-xs font-semibold bg-[#0F2942] hover:bg-[#1C3B5E] text-white rounded-lg transition-all shadow-xs flex items-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Response</span>
        </button>
      </div>

      {/* Category Tabs & Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-[#E2E0D8] shadow-2xs">
        {/* Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
          {[
            { id: 'all', label: 'All Responses', icon: <MessageSquareQuote className="w-3.5 h-3.5" /> },
            { id: 'Review Reply', label: '1. Review Replies', icon: <Star className="w-3.5 h-3.5" /> },
            { id: 'Direct Message', label: '2. Direct Messages (DM)', icon: <MessageCircle className="w-3.5 h-3.5" /> },
            { id: 'Email', label: '3. Email Templates', icon: <Mail className="w-3.5 h-3.5" /> }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                activeCategory === tab.id
                  ? 'bg-[#0F2942] text-white font-semibold shadow-2xs'
                  : 'bg-[#FBFBF9] hover:bg-[#F4F4F0] text-[#64748B] border border-[#E2E0D8]'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative shrink-0 sm:w-64">
          <Search className="w-3.5 h-3.5 text-[#64748B] absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search replies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-[#E2E0D8] focus:outline-hidden focus:ring-1 focus:ring-[#0F2942]"
          />
        </div>
      </div>

      {/* Responses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredResponses.map((item) => {
          const formattedContent = item.content
            .replace(/\[Business Name\]/g, businessProfile.name)
            .replace(/\[Location\]/g, businessProfile.location)
            .replace(/\[Phone\]/g, businessProfile.phone || 'our store phone')
            .replace(/\[Email\]/g, businessProfile.email || 'our store email');

          return (
            <div
              key={item.id}
              className="bg-white p-5 rounded-xl border border-[#E2E0D8] shadow-2xs hover:border-[#CBD5E1] transition-all flex flex-col justify-between space-y-4 text-left"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-[#1E6B52] uppercase tracking-wider bg-[#EBF4EF] px-2 py-0.5 rounded">
                    {item.category}
                  </span>
                  <span className="text-[10px] text-[#64748B] font-medium bg-[#F4F7FA] px-2 py-0.5 rounded border border-[#E2E8F0]">
                    {item.tone}
                  </span>
                </div>

                <div className="space-y-0.5">
                  <h3 className="text-sm font-bold text-[#1E252B]">{item.title}</h3>
                  <span className="text-[11px] text-[#64748B] block">Scenario: {item.scenario}</span>
                </div>

                <div className="p-3 bg-[#FBFBF9] rounded-lg border border-[#E7E6DF] text-xs text-[#334155] leading-relaxed whitespace-pre-line">
                  {formattedContent}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-[#E7E6DF] flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => openEditModal(item)}
                    className="p-1.5 text-[#64748B] hover:text-[#1E252B] hover:bg-[#F4F4F0] rounded-md transition-colors"
                    title="Edit response"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  {item.isCustom && (
                    <button
                      onClick={() => {
                        onDeleteResponse(item.id);
                        onShowToast('Custom response deleted', 'info');
                      }}
                      className="p-1.5 text-[#64748B] hover:text-red-500 hover:bg-[#F4F4F0] rounded-md transition-colors"
                      title="Delete response"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <button
                  onClick={() => handleCopy(item.content, item.id)}
                  className="px-3 py-1.5 text-xs font-semibold text-[#0F2942] bg-[#F4F7FA] hover:bg-[#EAEFF5] border border-[#CBD5E1] rounded-md transition-colors flex items-center gap-1.5"
                >
                  {copiedId === item.id ? <Check className="w-3.5 h-3.5 text-[#1E6B52]" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedId === item.id ? 'Copied' : 'Copy Response'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredResponses.length === 0 && (
        <div className="bg-white p-12 rounded-xl border border-[#E2E0D8] text-center text-xs text-[#64748B]">
          No responses match your search. Click "New Response" to add one.
        </div>
      )}

      {/* Add / Edit Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingItem ? 'Edit Customer Response' : 'Create Customer Response'}
        subtitle="Save reusable customer communication templates for your staff."
      >
        <form onSubmit={handleSaveModal} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#1E252B] mb-1">Category</label>
              <select
                value={formCategory}
                onChange={(e) => setFormCategory(e.target.value as any)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-[#E2E0D8] bg-white text-[#1E252B]"
              >
                <option value="Review Reply">Review Reply</option>
                <option value="Direct Message">Direct Message</option>
                <option value="Email">Email</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#1E252B] mb-1">Tone</label>
              <input
                type="text"
                value={formTone}
                onChange={(e) => setFormTone(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-[#E2E0D8]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#1E252B] mb-1">Response Title</label>
            <input
              type="text"
              required
              value={formTitle}
              onChange={(e) => setFormTitle(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-[#E2E0D8]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#1E252B] mb-1">Scenario / Situation</label>
            <input
              type="text"
              required
              value={formScenario}
              onChange={(e) => setFormScenario(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-[#E2E0D8]"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-[#1E252B]">Response Body</label>
              <span className="text-[10px] text-[#64748B]">Tip: Use [Business Name] for placeholders</span>
            </div>
            <textarea
              rows={5}
              required
              value={formContent}
              onChange={(e) => setFormContent(e.target.value)}
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
              {editingItem ? 'Save Changes' : 'Save Response'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
