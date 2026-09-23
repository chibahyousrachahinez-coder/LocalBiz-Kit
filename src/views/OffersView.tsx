import React, { useState } from 'react';
import { 
  Tag, 
  Copy, 
  Check, 
  Plus, 
  Trash2, 
  Sparkles, 
  Clock, 
  Store, 
  BookmarkCheck, 
  Share2,
  Calendar,
  Edit3,
  Save
} from 'lucide-react';
import { BusinessProfile, Offer, OfferType } from '../types';
import { generateOfferPackage } from '../lib/generators';

interface OffersViewProps {
  businessProfile: BusinessProfile;
  offers: Offer[];
  onSaveOffer: (offer: Offer) => void;
  onDeleteOffer: (id: string) => void;
  onShowToast: (msg: string, type?: 'success' | 'info') => void;
}

const OFFER_TYPES: OfferType[] = [
  'First-time customer welcome',
  'Slow day boost',
  'Bundle / package',
  'VIP / loyalty perk',
  'Seasonal special',
  'Limited-time event'
];

export const OffersView: React.FC<OffersViewProps> = ({
  businessProfile,
  offers,
  onSaveOffer,
  onDeleteOffer,
  onShowToast
}) => {
  const [offerType, setOfferType] = useState<OfferType>('First-time customer welcome');
  const [offerTitle, setOfferTitle] = useState('First Visit Treat: Complimentary Pastry with Any Drink');
  const [terms, setTerms] = useState('One per new customer. Valid in-store upon showing post or mentioning the neighborhood offer.');
  const [expiry, setExpiry] = useState('Valid for the next 14 days');
  const [isEditingActive, setIsEditingActive] = useState<boolean>(false);
  
  // Active offer output
  const [activeOffer, setActiveOffer] = useState<Offer>(() => {
    if (offers.length > 0) return offers[0];
    return generateOfferPackage(
      businessProfile,
      'First-time customer welcome',
      'Complimentary pastry with your first coffee',
      'One per customer on first visit'
    );
  });

  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleGenerate = () => {
    const generated = generateOfferPackage(
      businessProfile,
      offerType,
      offerTitle,
      terms
    );
    setActiveOffer(generated);
    onShowToast('New promotional offer crafted!', 'success');
  };

  const handleSaveActive = () => {
    onSaveOffer(activeOffer);
    onShowToast('Offer saved to your active campaigns!', 'success');
  };

  const handleCopy = (text: string, fieldId: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedField(fieldId);
    onShowToast('Copied to clipboard!', 'info');
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleCopyAllKit = () => {
    const fullText = `OFFER: ${activeOffer.headline}
TYPE: ${activeOffer.type}
VALIDITY: ${activeOffer.validity}

DETAILS:
${activeOffer.details}

TERMS & CONDITIONS:
${activeOffer.terms}

SOCIAL MEDIA PROMO:
${activeOffer.socialCopy}

IN-STORE / COUNTER CHALKBOARD:
${activeOffer.inStoreSign}
`;
    navigator.clipboard?.writeText(fullText);
    setCopiedField('all_kit');
    onShowToast('Copied complete promotional kit!', 'success');
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div id="offers-view" className="space-y-6 max-w-6xl mx-auto pb-16 md:pb-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-[#E7E6DF] shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1E252B] tracking-tight">Local Offer Builder</h1>
          <p className="text-xs text-[#64748B] mt-1">
            Design clear promotions that protect brand dignity, attract neighborhood regulars, and avoid spammy tactics.
          </p>
        </div>

        <div className="text-xs text-[#1E6B52] bg-[#EBF4EF] border border-[#1E6B52]/20 px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-semibold">
          <Tag className="w-3.5 h-3.5" />
          <span>{offers.length} Active Campaigns</span>
        </div>
      </div>

      {/* Generator & Preview Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Generator Controls */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white p-6 rounded-xl border border-[#E2E0D8] shadow-2xs space-y-4 text-left">
            <h2 className="text-base font-bold text-[#1E252B] border-b border-[#E7E6DF] pb-3">Offer Setup</h2>

            <div>
              <label className="block text-xs font-semibold text-[#1E252B] mb-1.5">Promotion Type</label>
              <select
                value={offerType}
                onChange={(e) => {
                  const val = e.target.value as OfferType;
                  setOfferType(val);
                  if (val === 'Slow day boost') {
                    setOfferTitle('Midweek Treat: Free beverage upgrade on Tuesdays & Wednesdays');
                  } else if (val === 'VIP / loyalty perk') {
                    setOfferTitle('Neighborhood Regulars Perk: Double loyalty credits this week');
                  } else if (val === 'Bundle / package') {
                    setOfferTitle('Signature Morning Bundle: Fresh Roast + House Treat');
                  }
                }}
                className="w-full px-3 py-2 text-xs rounded-lg border border-[#E2E0D8] bg-white text-[#1E252B]"
              >
                {OFFER_TYPES.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1E252B] mb-1.5">Offer Title / Perk</label>
              <input
                type="text"
                value={offerTitle}
                onChange={(e) => setOfferTitle(e.target.value)}
                placeholder="e.g. Complimentary coffee with any pastry purchase"
                className="w-full px-3 py-2 text-xs rounded-lg border border-[#E2E0D8]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1E252B] mb-1.5">Fair Terms / Limitations</label>
              <input
                type="text"
                value={terms}
                onChange={(e) => setTerms(e.target.value)}
                placeholder="e.g. One per person. Valid in-store."
                className="w-full px-3 py-2 text-xs rounded-lg border border-[#E2E0D8]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1E252B] mb-1.5">Validity Window</label>
              <input
                type="text"
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
                placeholder="e.g. Valid this month"
                className="w-full px-3 py-2 text-xs rounded-lg border border-[#E2E0D8]"
              />
            </div>

            <button
              id="btn-craft-offer"
              onClick={handleGenerate}
              className="w-full py-2.5 text-xs font-semibold bg-[#0F2942] hover:bg-[#1C3B5E] text-white rounded-lg shadow-sm transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Generate Promotion Assets</span>
            </button>
          </div>
        </div>

        {/* Output Presentation */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white p-6 rounded-xl border border-[#E2E0D8] shadow-2xs space-y-4 text-left">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E7E6DF] pb-4">
              <div>
                <span className="text-[10px] font-bold text-[#1E6B52] uppercase tracking-wider bg-[#EBF4EF] px-2 py-0.5 rounded">
                  {activeOffer.type}
                </span>
                {isEditingActive ? (
                  <input
                    type="text"
                    value={activeOffer.headline}
                    onChange={(e) => setActiveOffer({ ...activeOffer, headline: e.target.value })}
                    className="w-full p-1 text-sm font-bold text-[#1E252B] bg-white border border-[#CBD5E1] rounded mt-1"
                  />
                ) : (
                  <h3 className="text-base font-bold text-[#1E252B] mt-1">{activeOffer.headline}</h3>
                )}
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setIsEditingActive(!isEditingActive)}
                  className={`px-2.5 py-1.5 text-xs font-semibold rounded-md border transition-colors flex items-center gap-1 ${
                    isEditingActive 
                      ? 'bg-[#1E6B52] text-white border-[#1E6B52]' 
                      : 'bg-white text-[#1E252B] hover:bg-[#F4F4F0] border-[#CBD5E1]'
                  }`}
                >
                  {isEditingActive ? <Save className="w-3.5 h-3.5" /> : <Edit3 className="w-3.5 h-3.5" />}
                  <span>{isEditingActive ? 'Done Editing' : 'Edit Text'}</span>
                </button>
                <button
                  onClick={handleSaveActive}
                  className="px-2.5 py-1.5 text-xs font-semibold bg-[#0F2942] text-white hover:bg-[#1C3B5E] rounded-md transition-colors flex items-center gap-1"
                >
                  <BookmarkCheck className="w-3.5 h-3.5" />
                  <span>Save Campaign</span>
                </button>
                <button
                  onClick={handleCopyAllKit}
                  className="px-2.5 py-1.5 text-xs font-semibold text-[#0F2942] hover:bg-[#F4F7FA] border border-[#CBD5E1] rounded-md transition-colors flex items-center gap-1"
                >
                  {copiedField === 'all_kit' ? <Check className="w-3.5 h-3.5 text-[#1E6B52]" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>Copy All</span>
                </button>
              </div>
            </div>

            {/* Offer Details */}
            <div className="space-y-3.5 text-xs">
              {/* 1. Value details */}
              <div className="p-3.5 rounded-lg bg-[#FBFBF9] border border-[#E7E6DF] space-y-1">
                <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider block">Campaign Details</span>
                {isEditingActive ? (
                  <textarea
                    rows={2}
                    value={activeOffer.details}
                    onChange={(e) => setActiveOffer({ ...activeOffer, details: e.target.value })}
                    className="w-full p-1.5 text-xs text-[#334155] bg-white border border-[#CBD5E1] rounded"
                  />
                ) : (
                  <p className="text-[#334155] leading-relaxed">{activeOffer.details}</p>
                )}
                <div className="flex items-center gap-2 pt-1">
                  <span className="text-[11px] text-[#1E6B52] font-semibold">Duration:</span>
                  {isEditingActive ? (
                    <input
                      type="text"
                      value={activeOffer.validity}
                      onChange={(e) => setActiveOffer({ ...activeOffer, validity: e.target.value })}
                      className="p-1 text-xs text-[#1E6B52] bg-white border border-[#CBD5E1] rounded"
                    />
                  ) : (
                    <span className="text-[11px] text-[#1E6B52] font-semibold">{activeOffer.validity}</span>
                  )}
                </div>
              </div>

              {/* 2. Terms */}
              <div className="p-3 rounded-lg bg-[#FBFBF9] border border-[#E7E6DF] space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Fair Terms & Conditions</span>
                  <button
                    onClick={() => handleCopy(activeOffer.terms, 'terms')}
                    className="text-[10px] text-[#0F2942] hover:underline"
                  >
                    {copiedField === 'terms' ? 'Copied' : 'Copy'}
                  </button>
                </div>
                {isEditingActive ? (
                  <input
                    type="text"
                    value={activeOffer.terms}
                    onChange={(e) => setActiveOffer({ ...activeOffer, terms: e.target.value })}
                    className="w-full p-1 text-xs text-[#64748B] bg-white border border-[#CBD5E1] rounded italic"
                  />
                ) : (
                  <p className="text-[#64748B] leading-relaxed italic">{activeOffer.terms}</p>
                )}
              </div>

              {/* 3. Social media promo copy */}
              <div className="p-3.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-[#0F2942] uppercase tracking-wider flex items-center gap-1">
                    <Share2 className="w-3 h-3" /> Social Media Announcement Copy
                  </span>
                  <button
                    onClick={() => handleCopy(activeOffer.socialCopy, 'social')}
                    className="text-[10px] text-[#0F2942] hover:underline flex items-center gap-0.5"
                  >
                    {copiedField === 'social' ? 'Copied' : 'Copy Social Text'}
                  </button>
                </div>
                {isEditingActive ? (
                  <textarea
                    rows={4}
                    value={activeOffer.socialCopy}
                    onChange={(e) => setActiveOffer({ ...activeOffer, socialCopy: e.target.value })}
                    className="w-full p-2 text-xs text-[#334155] bg-white border border-[#CBD5E1] rounded leading-relaxed whitespace-pre-line"
                  />
                ) : (
                  <p className="text-[#334155] leading-relaxed whitespace-pre-line">{activeOffer.socialCopy}</p>
                )}
              </div>

              {/* 4. In-store chalk sign */}
              <div className="p-3.5 rounded-lg bg-[#1E252B] text-white space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider flex items-center gap-1">
                    <Store className="w-3 h-3" /> In-Store Counter / Chalkboard Display
                  </span>
                  <button
                    onClick={() => handleCopy(activeOffer.inStoreSign, 'sign')}
                    className="text-[10px] text-[#CBD5E1] hover:text-white"
                  >
                    {copiedField === 'sign' ? 'Copied' : 'Copy Sign Text'}
                  </button>
                </div>
                {isEditingActive ? (
                  <textarea
                    rows={5}
                    value={activeOffer.inStoreSign}
                    onChange={(e) => setActiveOffer({ ...activeOffer, inStoreSign: e.target.value })}
                    className="w-full p-2 text-xs font-mono text-[#1E252B] bg-white border border-[#CBD5E1] rounded leading-relaxed whitespace-pre-line mt-1"
                  />
                ) : (
                  <p className="text-xs font-mono text-[#E2E8F0] whitespace-pre-line pt-1">
                    {activeOffer.inStoreSign}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Saved Offers Library */}
      <div className="bg-white p-6 rounded-xl border border-[#E2E0D8] shadow-2xs space-y-4 text-left">
        <h2 className="text-base font-bold text-[#1E252B]">Saved Local Offers</h2>
        {offers.length === 0 ? (
          <div className="p-8 text-center bg-[#FBFBF9] border border-dashed border-[#CBD5E1] rounded-lg space-y-2">
            <Tag className="w-8 h-8 text-[#94A3B8] mx-auto" />
            <p className="text-xs font-semibold text-[#1E252B]">No saved offers yet</p>
            <p className="text-xs text-[#64748B]">Use the builder above to craft your first neighborhood promotion, then click "Save Campaign".</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {offers.map((off) => (
              <div
                key={off.id}
                onClick={() => setActiveOffer(off)}
                className={`p-4 rounded-lg border text-left cursor-pointer transition-all space-y-2 relative group ${
                  activeOffer.id === off.id 
                    ? 'border-[#0F2942] bg-[#F8FAFC]' 
                    : 'border-[#E2E0D8] bg-white hover:border-[#CBD5E1]'
                }`}
              >
                <div className="flex items-center justify-between text-[10px]">
                  <span className="font-bold text-[#1E6B52] bg-[#EBF4EF] px-2 py-0.5 rounded">{off.type}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteOffer(off.id);
                      onShowToast('Offer removed', 'info');
                    }}
                    className="opacity-0 group-hover:opacity-100 p-1 hover:text-red-500 rounded transition-opacity"
                    title="Delete offer"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
                <h4 className="text-xs font-bold text-[#1E252B] line-clamp-1">{off.headline}</h4>
                <p className="text-xs text-[#64748B] line-clamp-2 leading-relaxed">{off.details}</p>
                <div className="pt-2 border-t border-[#E7E6DF] flex items-center justify-between text-[11px] text-[#64748B]">
                  <span>{off.validity}</span>
                  <span className="text-[#0F2942] font-medium group-hover:underline">View Kit →</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
