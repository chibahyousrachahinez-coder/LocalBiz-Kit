import React, { useState } from 'react';
import { 
  Coffee, 
  Utensils, 
  Scissors, 
  Dumbbell, 
  Sparkles, 
  Home, 
  Wrench, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft 
} from 'lucide-react';
import { BusinessCategory, BusinessProfile } from '../types';

interface OnboardingModalProps {
  isOpen: boolean;
  onComplete: (profile: Partial<BusinessProfile>, focusAreas: string[]) => void;
  initialProfile: BusinessProfile;
}

const CATEGORIES: { name: BusinessCategory; icon: React.ReactNode; desc: string }[] = [
  { name: 'Coffee Shop', icon: <Coffee className="w-5 h-5 text-[#0F2942]" />, desc: 'Cafes, roasteries, espresso bars' },
  { name: 'Restaurant', icon: <Utensils className="w-5 h-5 text-[#0F2942]" />, desc: 'Bistros, bakeries, food spots' },
  { name: 'Salon', icon: <Sparkles className="w-5 h-5 text-[#0F2942]" />, desc: 'Hair, nails, skin, spa studios' },
  { name: 'Barber', icon: <Scissors className="w-5 h-5 text-[#0F2942]" />, desc: 'Barbershops and men’s grooming' },
  { name: 'Gym', icon: <Dumbbell className="w-5 h-5 text-[#0F2942]" />, desc: 'Fitness studios, trainers, crossfit' },
  { name: 'Dentist', icon: <Sparkles className="w-5 h-5 text-[#0F2942]" />, desc: 'Dental clinics and orthodontists' },
  { name: 'Real Estate', icon: <Home className="w-5 h-5 text-[#0F2942]" />, desc: 'Agents, brokers, property managers' },
  { name: 'Local Service', icon: <Wrench className="w-5 h-5 text-[#0F2942]" />, desc: 'Trades, repairs, local services' }
];

const IMPROVEMENTS = [
  { id: 'Social media', label: 'Social media', desc: 'Consistent captions, post hooks & weekly planning' },
  { id: 'Website', label: 'Website', desc: 'Punchy hero copy, services list & FAQs' },
  { id: 'Google Business', label: 'Google Business', desc: 'Search-friendly descriptions, updates & photos' },
  { id: 'Customer communication', label: 'Customer communication', desc: 'Fast, professional replies to reviews & questions' },
  { id: 'Offers', label: 'Offers', desc: 'Clear seasonal promos and promotional copy' },
  { id: 'Everything', label: 'Everything', desc: 'Complete overhaul of our everyday digital presence' }
];

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  onComplete,
  initialProfile
}) => {
  const [step, setStep] = useState<number>(1);
  const [category, setCategory] = useState<BusinessCategory>(initialProfile.category || 'Coffee Shop');
  const [formData, setFormData] = useState({
    name: initialProfile.name || '',
    location: initialProfile.location || '',
    description: initialProfile.description || '',
    website: initialProfile.website || '',
    instagram: initialProfile.instagram || '',
    phone: initialProfile.phone || '',
    email: initialProfile.email || ''
  });
  const [selectedImprovements, setSelectedImprovements] = useState<string[]>(['Everything']);

  if (!isOpen) return null;

  const toggleImprovement = (id: string) => {
    if (id === 'Everything') {
      setSelectedImprovements(['Everything']);
      return;
    }
    const filtered = selectedImprovements.filter(x => x !== 'Everything');
    if (filtered.includes(id)) {
      const next = filtered.filter(x => x !== id);
      setSelectedImprovements(next.length === 0 ? ['Everything'] : next);
    } else {
      setSelectedImprovements([...filtered, id]);
    }
  };

  const handleFinish = () => {
    onComplete(
      {
        ...initialProfile,
        category,
        name: formData.name.trim() || 'My Business',
        location: formData.location.trim() || 'Downtown',
        description: formData.description.trim() || `Local ${category} serving quality experiences.`,
        website: formData.website.trim(),
        instagram: formData.instagram.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim()
      },
      selectedImprovements
    );
  };

  return (
    <div 
      id="onboarding-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0F2942]/60 backdrop-blur-xs"
    >
      <div 
        id="onboarding-modal-card"
        className="w-full max-w-xl bg-white rounded-xl border border-[#E2E0D8] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Progress header */}
        <div className="px-6 py-4 bg-[#FBFBF9] border-b border-[#E7E6DF] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-[#0F2942] tracking-wider uppercase">LocalBiz Kit Setup</span>
            <span className="text-xs text-[#64748B]">• Step {step} of 4</span>
          </div>
          <div className="flex gap-1.5">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  s === step ? 'w-6 bg-[#0F2942]' : s < step ? 'w-4 bg-[#1E6B52]' : 'w-2 bg-[#E2E0D8]'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Step content */}
        <div className="p-6 md:p-8 overflow-y-auto flex-1">
          {/* STEP 1: What type of business do you run? */}
          {step === 1 && (
            <div id="onboarding-step-1" className="space-y-5">
              <div>
                <h2 className="text-xl font-bold text-[#1E252B]">What type of business do you run?</h2>
                <p className="text-sm text-[#64748B] mt-1">
                  We customize your content prompts, captions, and templates based on your industry.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {CATEGORIES.map((cat) => {
                  const isSelected = category === cat.name;
                  return (
                    <button
                      key={cat.name}
                      id={`category-btn-${cat.name.toLowerCase().replace(/\s+/g, '-')}`}
                      onClick={() => setCategory(cat.name)}
                      className={`flex items-start gap-3 p-3.5 rounded-lg border text-left transition-all ${
                        isSelected
                          ? 'border-[#0F2942] bg-[#F4F7FA] ring-1 ring-[#0F2942]'
                          : 'border-[#E2E0D8] hover:border-[#CBD5E1] bg-white'
                      }`}
                    >
                      <div className="p-2 rounded-md bg-[#EAE8E0]/60 shrink-0">
                        {cat.icon}
                      </div>
                      <div>
                        <span className="block text-sm font-semibold text-[#1E252B]">{cat.name}</span>
                        <span className="block text-xs text-[#64748B] mt-0.5">{cat.desc}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2: Tell us about your business */}
          {step === 2 && (
            <div id="onboarding-step-2" className="space-y-4">
              <div>
                <h2 className="text-xl font-bold text-[#1E252B]">Tell us about your business.</h2>
                <p className="text-sm text-[#64748B] mt-1">
                  These details will be used to automatically personalize all your marketing assets.
                </p>
              </div>

              <div className="space-y-3.5 pt-1">
                <div>
                  <label className="block text-xs font-semibold text-[#1E252B] mb-1">
                    Business Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="input-business-name"
                    type="text"
                    required
                    placeholder="e.g. Harbor & Bean"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm rounded-lg border border-[#E2E0D8] focus:outline-hidden focus:ring-2 focus:ring-[#0F2942]/20 focus:border-[#0F2942] transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#1E252B] mb-1">
                      City or Neighborhood <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="input-business-location"
                      type="text"
                      placeholder="e.g. Shoreditch, London"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-3.5 py-2 text-sm rounded-lg border border-[#E2E0D8] focus:outline-hidden focus:ring-2 focus:ring-[#0F2942]/20 focus:border-[#0F2942] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#1E252B] mb-1">Phone Number</label>
                    <input
                      id="input-business-phone"
                      type="text"
                      placeholder="e.g. +44 20 7946 0912"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2 text-sm rounded-lg border border-[#E2E0D8] focus:outline-hidden focus:ring-2 focus:ring-[#0F2942]/20 focus:border-[#0F2942] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1E252B] mb-1">Short Business Description</label>
                  <textarea
                    id="input-business-desc"
                    rows={2}
                    placeholder="What do you make or do best for your customers?"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm rounded-lg border border-[#E2E0D8] focus:outline-hidden focus:ring-2 focus:ring-[#0F2942]/20 focus:border-[#0F2942] transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#1E252B] mb-1">Website</label>
                    <input
                      id="input-business-website"
                      type="text"
                      placeholder="https://..."
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                      className="w-full px-3 py-1.5 text-xs rounded-lg border border-[#E2E0D8] focus:outline-hidden focus:ring-1 focus:ring-[#0F2942]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#1E252B] mb-1">Instagram Handle</label>
                    <input
                      id="input-business-instagram"
                      type="text"
                      placeholder="@yourhandle"
                      value={formData.instagram}
                      onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                      className="w-full px-3 py-1.5 text-xs rounded-lg border border-[#E2E0D8] focus:outline-hidden focus:ring-1 focus:ring-[#0F2942]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#1E252B] mb-1">Email</label>
                    <input
                      id="input-business-email"
                      type="email"
                      placeholder="hello@..."
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-1.5 text-xs rounded-lg border border-[#E2E0D8] focus:outline-hidden focus:ring-1 focus:ring-[#0F2942]"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: What do you want to improve? */}
          {step === 3 && (
            <div id="onboarding-step-3" className="space-y-5">
              <div>
                <h2 className="text-xl font-bold text-[#1E252B]">What do you want to improve?</h2>
                <p className="text-sm text-[#64748B] mt-1">
                  Choose the areas you want to prioritize first. You can always change this later.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {IMPROVEMENTS.map((item) => {
                  const isChecked = selectedImprovements.includes(item.id);
                  return (
                    <button
                      key={item.id}
                      id={`improvement-${item.id.toLowerCase().replace(/\s+/g, '-')}`}
                      onClick={() => toggleImprovement(item.id)}
                      className={`flex items-start gap-3 p-3.5 rounded-lg border text-left transition-all ${
                        isChecked
                          ? 'border-[#0F2942] bg-[#F4F7FA] ring-1 ring-[#0F2942]'
                          : 'border-[#E2E0D8] hover:border-[#CBD5E1] bg-white'
                      }`}
                    >
                      <div className={`mt-0.5 w-4 h-4 rounded-sm border flex items-center justify-center shrink-0 ${
                        isChecked ? 'bg-[#0F2942] border-[#0F2942] text-white' : 'border-[#CBD5E1] bg-white'
                      }`}>
                        {isChecked && <CheckCircle2 className="w-3.5 h-3.5" />}
                      </div>
                      <div>
                        <span className="block text-sm font-semibold text-[#1E252B]">{item.label}</span>
                        <span className="block text-xs text-[#64748B] mt-0.5">{item.desc}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 4: Your business workspace is ready */}
          {step === 4 && (
            <div id="onboarding-step-4" className="text-center py-4 space-y-5">
              <div className="w-14 h-14 mx-auto rounded-full bg-[#EBF4EF] border border-[#1E6B52]/20 flex items-center justify-center text-[#1E6B52]">
                <CheckCircle2 className="w-7 h-7" />
              </div>

              <div>
                <h2 className="text-2xl font-bold text-[#1E252B]">Your business workspace is ready.</h2>
                <p className="text-sm text-[#64748B] max-w-md mx-auto mt-2">
                  We configured LocalBiz Kit for <strong className="text-[#1E252B]">{formData.name || 'your business'}</strong> ({category}).
                  Pre-tailored templates, marketing copy tools, and your action checklist are waiting.
                </p>
              </div>

              <div className="p-4 bg-[#FBFBF9] border border-[#E7E6DF] rounded-lg max-w-md mx-auto text-left space-y-2">
                <div className="flex items-center justify-between text-xs text-[#64748B]">
                  <span>Business Category:</span>
                  <span className="font-semibold text-[#1E252B]">{category}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-[#64748B]">
                  <span>Target Area:</span>
                  <span className="font-semibold text-[#1E252B]">{formData.location || 'Local'}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-[#64748B]">
                  <span>Focus:</span>
                  <span className="font-semibold text-[#1E252B]">{selectedImprovements.join(', ')}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="px-6 py-4 bg-[#FBFBF9] border-t border-[#E7E6DF] flex items-center justify-between">
          {step > 1 && step < 4 ? (
            <button
              id="onboarding-btn-back"
              onClick={() => setStep(step - 1)}
              className="px-4 py-2 text-xs font-semibold text-[#64748B] hover:text-[#1E252B] flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back
            </button>
          ) : <div />}

          {step < 4 ? (
            <button
              id="onboarding-btn-next"
              onClick={() => setStep(step + 1)}
              className="px-5 py-2.5 text-xs font-semibold bg-[#0F2942] text-white hover:bg-[#1C3B5E] rounded-lg flex items-center gap-2 shadow-xs transition-all"
            >
              Continue <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              id="onboarding-btn-finish"
              onClick={handleFinish}
              className="w-full sm:w-auto mx-auto px-6 py-3 text-sm font-semibold bg-[#0F2942] text-white hover:bg-[#1C3B5E] rounded-lg flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              Open My Workspace <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
