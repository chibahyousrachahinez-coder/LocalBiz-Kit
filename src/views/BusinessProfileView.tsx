import React, { useState } from 'react';
import { 
  Store, 
  Save, 
  CheckCircle2, 
  Plus, 
  X, 
  Sparkles, 
  Clock, 
  Phone, 
  Mail, 
  Globe, 
  Instagram, 
  Facebook,
  Check
} from 'lucide-react';
import { BusinessProfile, BusinessCategory, Tone } from '../types';

interface BusinessProfileViewProps {
  profile: BusinessProfile;
  onSave: (updated: BusinessProfile) => void;
  onShowToast: (msg: string, type?: 'success' | 'info') => void;
}

const CATEGORIES: BusinessCategory[] = [
  'Coffee Shop',
  'Restaurant',
  'Salon',
  'Barber',
  'Gym',
  'Dentist',
  'Real Estate',
  'Local Service'
];

export const BusinessProfileView: React.FC<BusinessProfileViewProps> = ({
  profile,
  onSave,
  onShowToast
}) => {
  const [formData, setFormData] = useState<BusinessProfile>(profile);
  const [newService, setNewService] = useState('');

  // 7 Checklist items for automatic profile completion
  const checklist = [
    { label: 'Business description', done: Boolean(formData.description && formData.description.length >= 20) },
    { label: 'Contact details', done: Boolean(formData.phone && formData.email) },
    { label: 'Website', done: Boolean(formData.website && formData.website.startsWith('http')) },
    { label: 'Social links', done: Boolean(formData.instagram || formData.facebook) },
    { label: 'Opening hours', done: Boolean(formData.openingHours && formData.openingHours.length >= 8) },
    { label: 'Services', done: Boolean(formData.services && formData.services.length >= 2) },
    { label: 'Call to action', done: Boolean(formData.callToAction && formData.callToAction.length >= 5) }
  ];

  const completedCount = checklist.filter(c => c.done).length;
  const completionPercentage = Math.round((completedCount / checklist.length) * 100);

  const handleAddService = () => {
    if (!newService.trim()) return;
    setFormData({
      ...formData,
      services: [...(formData.services || []), newService.trim()]
    });
    setNewService('');
  };

  const handleRemoveService = (index: number) => {
    setFormData({
      ...formData,
      services: formData.services.filter((_, i) => i !== index)
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onShowToast('Business profile updated successfully!', 'success');
  };

  return (
    <div id="business-profile-view" className="max-w-4xl mx-auto space-y-6 pb-16 md:pb-6">
      {/* Title */}
      <div className="bg-white p-6 rounded-xl border border-[#E7E6DF] shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1E252B] tracking-tight">Business Profile</h1>
          <p className="text-xs text-[#64748B] mt-1">
            Keep your business details accurate. These details automatically populate your copy generators, social hooks, and marketing assets.
          </p>
        </div>
        <button
          id="btn-save-profile-top"
          onClick={handleSubmit}
          className="px-4 py-2.5 text-xs font-semibold bg-[#0F2942] hover:bg-[#1C3B5E] text-white rounded-lg transition-all shadow-xs flex items-center justify-center gap-1.5"
        >
          <Save className="w-3.5 h-3.5" />
          <span>Save Changes</span>
        </button>
      </div>

      {/* Profile Completion Card */}
      <div className="bg-white p-6 rounded-xl border border-[#E2E0D8] shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-[#1E252B]">Profile Completion</h2>
              <span className="text-xs font-bold text-[#1E6B52] bg-[#EBF4EF] px-2 py-0.5 rounded-full">
                {completionPercentage}%
              </span>
            </div>
            <p className="text-xs text-[#64748B] mt-0.5">
              Complete all 7 elements so generated marketing assets have full context.
            </p>
          </div>
          <span className="text-xs font-medium text-[#64748B]">
            {completedCount} of {checklist.length} completed
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-[#E2E0D8] h-2 rounded-full overflow-hidden">
          <div 
            className="bg-[#1E6B52] h-full rounded-full transition-all duration-500"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>

        {/* Checklist */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 pt-2">
          {checklist.map((item, idx) => (
            <div 
              key={idx}
              className={`p-2 rounded-lg border text-xs flex items-center gap-2 ${
                item.done 
                  ? 'border-[#1E6B52]/20 bg-[#EBF4EF]/40 text-[#1E252B]' 
                  : 'border-[#E2E0D8] bg-[#FBFBF9] text-[#64748B]'
              }`}
            >
              <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${
                item.done ? 'bg-[#1E6B52] text-white' : 'border border-[#CBD5E1]'
              }`}>
                {item.done && <Check className="w-2.5 h-2.5" />}
              </div>
              <span className={item.done ? 'font-medium' : ''}>{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Core Identity */}
        <div className="bg-white p-6 rounded-xl border border-[#E2E0D8] shadow-2xs space-y-4">
          <h2 className="text-base font-bold text-[#1E252B] border-b border-[#E7E6DF] pb-3">Core Identity</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#1E252B] mb-1">
                Business Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3.5 py-2 text-xs rounded-lg border border-[#E2E0D8] focus:outline-hidden focus:ring-2 focus:ring-[#0F2942]/20 focus:border-[#0F2942]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1E252B] mb-1">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as BusinessCategory })}
                className="w-full px-3.5 py-2 text-xs rounded-lg border border-[#E2E0D8] focus:outline-hidden focus:ring-2 focus:ring-[#0F2942]/20 focus:border-[#0F2942] bg-white"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#1E252B] mb-1">
                Location / Neighborhood <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Shoreditch, London"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-3.5 py-2 text-xs rounded-lg border border-[#E2E0D8] focus:outline-hidden focus:ring-2 focus:ring-[#0F2942]/20 focus:border-[#0F2942]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1E252B] mb-1">
                Opening Hours
              </label>
              <input
                type="text"
                placeholder="e.g. Mon–Fri 7:30am–5:00pm | Sat–Sun 8:30am–4:30pm"
                value={formData.openingHours}
                onChange={(e) => setFormData({ ...formData, openingHours: e.target.value })}
                className="w-full px-3.5 py-2 text-xs rounded-lg border border-[#E2E0D8] focus:outline-hidden focus:ring-2 focus:ring-[#0F2942]/20 focus:border-[#0F2942]"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-[#1E252B]">
                Business Description
              </label>
              <span className="text-[11px] text-[#64748B]">
                {formData.description?.length || 0} characters
              </span>
            </div>
            <textarea
              rows={3}
              placeholder="What makes your business special for local clients?"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3.5 py-2 text-xs rounded-lg border border-[#E2E0D8] focus:outline-hidden focus:ring-2 focus:ring-[#0F2942]/20 focus:border-[#0F2942] leading-relaxed"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#1E252B] mb-1">
                Unique Selling Point (USP)
              </label>
              <input
                type="text"
                placeholder="e.g. Fresh roasts weekly, direct trade beans"
                value={formData.uniqueSellingPoint}
                onChange={(e) => setFormData({ ...formData, uniqueSellingPoint: e.target.value })}
                className="w-full px-3.5 py-2 text-xs rounded-lg border border-[#E2E0D8] focus:outline-hidden focus:ring-2 focus:ring-[#0F2942]/20 focus:border-[#0F2942]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1E252B] mb-1">
                Primary Call to Action (CTA)
              </label>
              <input
                type="text"
                placeholder="e.g. Visit our counter or order beans online"
                value={formData.callToAction}
                onChange={(e) => setFormData({ ...formData, callToAction: e.target.value })}
                className="w-full px-3.5 py-2 text-xs rounded-lg border border-[#E2E0D8] focus:outline-hidden focus:ring-2 focus:ring-[#0F2942]/20 focus:border-[#0F2942]"
              />
            </div>
          </div>
        </div>

        {/* Contact & Online Handles */}
        <div className="bg-white p-6 rounded-xl border border-[#E2E0D8] shadow-2xs space-y-4">
          <h2 className="text-base font-bold text-[#1E252B] border-b border-[#E7E6DF] pb-3">Contact & Online Handles</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#1E252B] mb-1">Phone Number</label>
              <div className="relative">
                <Phone className="w-3.5 h-3.5 text-[#64748B] absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="+44 20 7946 0912"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full pl-8 pr-3 py-2 text-xs rounded-lg border border-[#E2E0D8] focus:outline-hidden focus:ring-1 focus:ring-[#0F2942]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1E252B] mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-3.5 h-3.5 text-[#64748B] absolute left-3 top-2.5" />
                <input
                  type="email"
                  placeholder="hello@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-8 pr-3 py-2 text-xs rounded-lg border border-[#E2E0D8] focus:outline-hidden focus:ring-1 focus:ring-[#0F2942]"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#1E252B] mb-1">Website URL</label>
              <div className="relative">
                <Globe className="w-3.5 h-3.5 text-[#64748B] absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="https://..."
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  className="w-full pl-8 pr-3 py-2 text-xs rounded-lg border border-[#E2E0D8] focus:outline-hidden focus:ring-1 focus:ring-[#0F2942]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1E252B] mb-1">Instagram Handle</label>
              <div className="relative">
                <Instagram className="w-3.5 h-3.5 text-[#64748B] absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="@handle"
                  value={formData.instagram}
                  onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                  className="w-full pl-8 pr-3 py-2 text-xs rounded-lg border border-[#E2E0D8] focus:outline-hidden focus:ring-1 focus:ring-[#0F2942]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1E252B] mb-1">Facebook Page</label>
              <div className="relative">
                <Facebook className="w-3.5 h-3.5 text-[#64748B] absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="facebook.com/..."
                  value={formData.facebook}
                  onChange={(e) => setFormData({ ...formData, facebook: e.target.value })}
                  className="w-full pl-8 pr-3 py-2 text-xs rounded-lg border border-[#E2E0D8] focus:outline-hidden focus:ring-1 focus:ring-[#0F2942]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Services & Offerings Manager */}
        <div className="bg-white p-6 rounded-xl border border-[#E2E0D8] shadow-2xs space-y-4">
          <h2 className="text-base font-bold text-[#1E252B] border-b border-[#E7E6DF] pb-3">Services & Key Offerings</h2>
          <p className="text-xs text-[#64748B]">
            Add your primary services or signature menu items. These are included automatically when generating website copy and social features.
          </p>

          <div className="flex gap-2">
            <input
              type="text"
              placeholder="e.g. Single-Origin Pour Overs, Sourdough Buns, Beard Trim..."
              value={newService}
              onChange={(e) => setNewService(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddService();
                }
              }}
              className="flex-1 px-3.5 py-2 text-xs rounded-lg border border-[#E2E0D8] focus:outline-hidden focus:ring-1 focus:ring-[#0F2942]"
            />
            <button
              type="button"
              onClick={handleAddService}
              className="px-3 py-2 text-xs font-semibold bg-[#F4F4F0] hover:bg-[#EAE8E0] text-[#1E252B] border border-[#E2E0D8] rounded-lg transition-colors flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            {formData.services && formData.services.length > 0 ? (
              formData.services.map((srv, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#FBFBF9] border border-[#E2E0D8] text-xs font-medium text-[#1E252B]"
                >
                  {srv}
                  <button
                    type="button"
                    onClick={() => handleRemoveService(i)}
                    className="p-0.5 hover:text-red-500 rounded text-[#94A3B8]"
                    aria-label={`Remove ${srv}`}
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))
            ) : (
              <span className="text-xs text-[#94A3B8] italic">No services added yet. Add at least two.</span>
            )}
          </div>
        </div>

        {/* Save button bar */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            id="btn-save-profile-bottom"
            type="submit"
            className="px-6 py-2.5 text-xs font-semibold bg-[#0F2942] hover:bg-[#1C3B5E] text-white rounded-lg transition-all shadow-xs flex items-center gap-1.5"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Profile</span>
          </button>
        </div>
      </form>
    </div>
  );
};
