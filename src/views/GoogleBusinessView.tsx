import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Copy, 
  Check, 
  Sparkles, 
  Camera, 
  MessageSquareQuote, 
  FileText, 
  AlertCircle,
  HelpCircle,
  CheckCircle2,
  Share2,
  ExternalLink,
  Edit3
} from 'lucide-react';
import { BusinessProfile } from '../types';

interface GoogleBusinessViewProps {
  businessProfile: BusinessProfile;
  onSaveDescription: (desc: string) => void;
  onShowToast: (msg: string, type?: 'success' | 'info') => void;
}

export const GoogleBusinessView: React.FC<GoogleBusinessViewProps> = ({
  businessProfile,
  onSaveDescription,
  onShowToast
}) => {
  // Description optimizer state
  const [description, setDescription] = useState(
    businessProfile.description || 
    `${businessProfile.name} is a premier ${businessProfile.category.toLowerCase()} based in ${businessProfile.location}. We pride ourselves on exceptional quality, warm customer service, and dedication to our local community.`
  );
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Review reply state
  const [reviewType, setReviewType] = useState<'positive' | 'neutral' | 'negative'>('positive');
  const [customerReview, setCustomerReview] = useState('Loved the visit! Great vibes, exceptional service, and fantastic attention to detail.');
  const [replyText, setReplyText] = useState('');

  // GBP Update post state
  const [postType, setPostType] = useState<'What’s New' | 'Special Offer' | 'Holiday Hours'>('What’s New');
  const [postTopic, setPostTopic] = useState('Fresh roast tasting and weekend special');
  const [updateTitle, setUpdateTitle] = useState('Weekend Spotlight at ' + businessProfile.name);
  const [updateBody, setUpdateBody] = useState(
    `Visiting ${businessProfile.location} this weekend? Stop by ${businessProfile.name} for our freshly roasted seasonal batch. Bring a friend and enjoy warm neighborhood hospitality.`
  );
  const [updateCta, setUpdateCta] = useState('Learn more');

  // Reactively generate post suggestion when type or topic changes
  useEffect(() => {
    const loc = businessProfile.location.split(',')[0] || 'our neighborhood';
    const biz = businessProfile.name || 'our shop';
    if (postType === 'Special Offer') {
      setUpdateTitle(`Limited Neighborhood Offer at ${biz}`);
      setUpdateBody(`This week in ${loc}: Enjoy a special neighbor promotion on ${postTopic.toLowerCase()}. Mention this Google update in-store to redeem while supplies last.`);
      setUpdateCta('Call now');
    } else if (postType === 'Holiday Hours') {
      setUpdateTitle(`Special Operating Hours Update`);
      setUpdateBody(`Planning your visit to ${biz} in ${loc}? Here is our updated schedule for ${postTopic.toLowerCase()}: Open ${businessProfile.openingHours || 'daily'}. We look forward to seeing you.`);
      setUpdateCta('Call now');
    } else {
      setUpdateTitle(`What's New at ${biz}`);
      setUpdateBody(`Visiting ${loc} this week? Stop by ${biz} to check out our ${postTopic.toLowerCase()}. Crafted fresh with friendly neighborhood service every day.`);
      setUpdateCta('Learn more');
    }
  }, [postType, postTopic, businessProfile]);

  // Google Maps Q&A / FAQ Preparation items
  const [faqs, setFaqs] = useState([
    {
      q: `What are your most popular signature items or services?`,
      a: `At ${businessProfile.name}, our most requested offerings are ${businessProfile.services?.slice(0, 2).join(' and ') || 'our signature specialties'}, prepared with high quality local standards.`
    },
    {
      q: `Do you welcome walk-ins or are appointments/reservations required?`,
      a: `We gladly welcome walk-ins anytime during regular operating hours! For group bookings or specific requests, feel free to give us a call in advance.`
    },
    {
      q: `Where can customers park when visiting ${businessProfile.name}?`,
      a: `Convenient street parking is available along the block in ${businessProfile.location.split(',')[0]}, with easy pedestrian and public transit access nearby.`
    }
  ]);

  // Photo checklist items
  const [photoTasks, setPhotoTasks] = useState([
    { id: 'ext', name: 'Exterior Photo', desc: 'Clear street-level view showing entrance and signage so customers recognize you', done: true },
    { id: 'int', name: 'Interior Atmosphere', desc: 'Seating area, counter, and lighting ambiance showing clean, welcoming spaces', done: true },
    { id: 'team', name: 'Team / Staff in Action', desc: 'Authentic photos of friendly staff members providing customer service', done: false },
    { id: 'prod', name: 'Signature Products / Craft', desc: 'Well-lit closeups of menu items, styling work, or service results', done: true },
    { id: 'hours', name: 'Menu / Price Board / Hours', desc: 'Legible picture of storefront hours or signature menu board', done: true }
  ]);

  // Keyword recommendations
  const keywords = [
    `${businessProfile.category.toLowerCase()} in ${businessProfile.location.split(',')[0]}`,
    `best ${businessProfile.category.toLowerCase()}`,
    `local ${businessProfile.location.split(',')[0]}`,
    'friendly service',
    'specialty quality',
    'independent business'
  ];

  const handleInsertKeyword = (kw: string) => {
    if (description.length + kw.length + 2 > 750) {
      onShowToast('Cannot exceed 750 characters limit', 'info');
      return;
    }
    setDescription(prev => prev + ' ' + kw);
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedKey(id);
    onShowToast('Copied to clipboard!', 'info');
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleGenerateReply = (type: 'positive' | 'neutral' | 'negative') => {
    setReviewType(type);
    let sample = '';
    let response = '';

    if (type === 'positive') {
      sample = 'Loved the visit! Great vibes, exceptional service, and fantastic attention to detail.';
      response = `Thank you so much for the kind words! We work hard to create a warm and memorable experience for everyone in ${businessProfile.location}. We can’t wait to welcome you back again soon! — The team at ${businessProfile.name}`;
    } else if (type === 'neutral') {
      sample = 'Decent place. A bit busy during peak hours, but overall satisfactory.';
      response = `Thank you for taking the time to share your feedback! We appreciate you stopping by. Peak hours can get lively, and we’re continually finding ways to make visits smoother. We hope to see you again soon! — ${businessProfile.name}`;
    } else {
      sample = 'Had to wait longer than expected and my order was slightly delayed.';
      response = `Thank you for bringing this to our attention. We hold our service to high standards and apologize that your experience fell short of expectations. We would love the opportunity to make this right. Please contact us directly at ${businessProfile.email || businessProfile.phone || 'our store'} so we can take care of you. — Management, ${businessProfile.name}`;
    }
    setCustomerReview(sample);
    setReplyText(response);
  };

  // Initialize reply
  useEffect(() => {
    handleGenerateReply('positive');
  }, []);

  const togglePhotoTask = (id: string) => {
    setPhotoTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  return (
    <div id="google-business-view" className="space-y-6 max-w-5xl mx-auto pb-16 md:pb-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-[#E7E6DF] shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#1E6B52]" />
            <span className="text-[11px] font-bold text-[#1E6B52] uppercase tracking-wider">Local Search Content Kit</span>
          </div>
          <h1 className="text-2xl font-bold text-[#1E252B] tracking-tight">Google Business Profile Kit</h1>
          <p className="text-xs text-[#64748B] mt-1">
            Draft, optimize, and organize high-quality content for your Google Maps listing.
          </p>
        </div>

        <div className="text-xs text-[#64748B] bg-[#FBFBF9] border border-[#E2E0D8] px-3.5 py-2 rounded-lg flex items-center gap-2">
          <MapPin className="w-4 h-4 text-[#0F2942]" />
          <span>Listing: {businessProfile.name}</span>
        </div>
      </div>

      {/* Disclaimed Banner: Preparation Tool Notice */}
      <div className="p-4 rounded-xl bg-[#F4F7FA] border border-[#CBD5E1] text-xs text-[#334155] flex items-start gap-3">
        <div className="p-1 rounded-md bg-[#0F2942] text-white shrink-0 mt-0.5">
          <AlertCircle className="w-3.5 h-3.5" />
        </div>
        <div className="space-y-1">
          <span className="font-bold text-[#0F2942] block">Content Preparation Tool</span>
          <p className="text-[#475569] leading-relaxed">
            Use this workspace to draft descriptions, update posts, review replies, and FAQs. When ready, copy and paste your text directly into your official Google Business Profile manager. LocalBiz Kit operates independently and requires no direct API credentials.
          </p>
        </div>
      </div>

      {/* 1. Business Description Optimizer */}
      <div className="bg-white p-6 rounded-xl border border-[#E2E0D8] shadow-2xs space-y-4 text-left">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E7E6DF] pb-3">
          <div>
            <h2 className="text-base font-bold text-[#1E252B] flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#0F2942]" />
              <span>1. Business Description Optimizer</span>
            </h2>
            <p className="text-xs text-[#64748B] mt-0.5">
              Google limits descriptions to 750 characters. Front-load local search terms and your key specialties.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className={`text-xs font-bold ${
              description.length > 750 ? 'text-red-600' : 'text-[#1E6B52]'
            }`}>
              {description.length} / 750 chars
            </span>
            <button
              onClick={() => {
                onSaveDescription(description);
                onShowToast('Saved description to profile!', 'success');
              }}
              className="px-3 py-1.5 text-xs font-semibold bg-[#0F2942] text-white rounded-md hover:bg-[#1C3B5E] transition-colors"
            >
              Save to Profile
            </button>
            <button
              onClick={() => handleCopy(description, 'gbp_desc')}
              className="px-2.5 py-1.5 text-xs font-semibold text-[#0F2942] hover:bg-[#F4F7FA] border border-[#CBD5E1] rounded-md flex items-center gap-1"
            >
              {copiedKey === 'gbp_desc' ? <Check className="w-3.5 h-3.5 text-[#1E6B52]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>Copy</span>
            </button>
          </div>
        </div>

        {/* Textarea */}
        <div>
          <textarea
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-[#E2E0D8] focus:outline-hidden focus:ring-1 focus:ring-[#0F2942] leading-relaxed"
          />
        </div>

        {/* Keyword chips */}
        <div className="space-y-1.5 pt-1">
          <span className="text-[11px] font-semibold text-[#64748B]">Click to insert recommended local search terms:</span>
          <div className="flex flex-wrap gap-1.5">
            {keywords.map((kw, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleInsertKeyword(kw)}
                className="text-[11px] px-2 py-1 rounded bg-[#FBFBF9] hover:bg-[#F4F4F0] border border-[#E2E0D8] text-[#1E252B] transition-colors"
              >
                + {kw}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Google Update Post Generator */}
      <div className="bg-white p-6 rounded-xl border border-[#E2E0D8] shadow-2xs space-y-4 text-left">
        <div className="flex items-center justify-between border-b border-[#E7E6DF] pb-3">
          <div>
            <h2 className="text-base font-bold text-[#1E252B] flex items-center gap-2">
              <Share2 className="w-4 h-4 text-[#0F2942]" />
              <span>2. Google Business Update Post</span>
            </h2>
            <p className="text-xs text-[#64748B] mt-0.5">
              Weekly Google updates signal active operations to customers browsing Google Maps.
            </p>
          </div>

          <button
            onClick={() => handleCopy(`${updateTitle}\n\n${updateBody}\n\nCall to Action: ${updateCta}`, 'gbp_update')}
            className="px-2.5 py-1.5 text-xs font-semibold text-[#0F2942] hover:bg-[#F4F7FA] border border-[#CBD5E1] rounded-md flex items-center gap-1"
          >
            {copiedKey === 'gbp_update' ? <Check className="w-3.5 h-3.5 text-[#1E6B52]" /> : <Copy className="w-3.5 h-3.5" />}
            <span>Copy Post</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-semibold text-[#1E252B] mb-1">Post Type</label>
            <select
              value={postType}
              onChange={(e) => setPostType(e.target.value as any)}
              className="w-full p-2 text-xs rounded border border-[#E2E0D8] bg-white"
            >
              <option value="What’s New">What’s New</option>
              <option value="Special Offer">Special Offer</option>
              <option value="Holiday Hours">Holiday Hours</option>
            </select>
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-[#1E252B] mb-1">Topic or Announcement</label>
            <input
              type="text"
              value={postTopic}
              onChange={(e) => setPostTopic(e.target.value)}
              className="w-full p-2 text-xs rounded border border-[#E2E0D8]"
            />
          </div>
        </div>

        {/* Editable Preview box */}
        <div className="p-4 rounded-lg bg-[#FBFBF9] border border-[#E7E6DF] space-y-3">
          <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider block">Live Post Preview (Editable)</span>
          <div>
            <label className="block text-[11px] font-medium text-[#64748B] mb-1">Title</label>
            <input
              type="text"
              value={updateTitle}
              onChange={(e) => setUpdateTitle(e.target.value)}
              className="w-full p-1.5 text-xs font-bold text-[#1E252B] bg-white border border-[#CBD5E1] rounded"
            />
          </div>
          <div>
            <label className="block text-[11px] font-medium text-[#64748B] mb-1">Body Text</label>
            <textarea
              rows={3}
              value={updateBody}
              onChange={(e) => setUpdateBody(e.target.value)}
              className="w-full p-1.5 text-xs text-[#475569] bg-white border border-[#CBD5E1] rounded leading-relaxed"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-medium text-[#64748B]">Button Action:</span>
            <input
              type="text"
              value={updateCta}
              onChange={(e) => setUpdateCta(e.target.value)}
              className="px-2 py-0.5 text-xs bg-white border border-[#CBD5E1] rounded text-[#0F2942] font-semibold"
            />
          </div>
        </div>
      </div>

      {/* 3. Review Reply Assistant */}
      <div className="bg-white p-6 rounded-xl border border-[#E2E0D8] shadow-2xs space-y-4 text-left">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E7E6DF] pb-3">
          <div>
            <h2 className="text-base font-bold text-[#1E252B] flex items-center gap-2">
              <MessageSquareQuote className="w-4 h-4 text-[#0F2942]" />
              <span>3. Review Reply Assistant</span>
            </h2>
            <p className="text-xs text-[#64748B] mt-0.5">
              Speedy, empathetic responses reassure prospective customers who read your reviews.
            </p>
          </div>

          <div className="flex items-center gap-1.5 bg-[#F4F4F0] p-1 rounded-lg border border-[#E2E0D8] text-xs">
            <button
              onClick={() => handleGenerateReply('positive')}
              className={`px-3 py-1 rounded-md font-semibold transition-all ${
                reviewType === 'positive' ? 'bg-[#EBF4EF] text-[#1E6B52] shadow-2xs' : 'text-[#64748B]'
              }`}
            >
              5★ Positive
            </button>
            <button
              onClick={() => handleGenerateReply('neutral')}
              className={`px-3 py-1 rounded-md font-semibold transition-all ${
                reviewType === 'neutral' ? 'bg-[#FDF3EC] text-[#C26638] shadow-2xs' : 'text-[#64748B]'
              }`}
            >
              3★ Neutral
            </button>
            <button
              onClick={() => handleGenerateReply('negative')}
              className={`px-3 py-1 rounded-md font-semibold transition-all ${
                reviewType === 'negative' ? 'bg-red-50 text-red-700 shadow-2xs' : 'text-[#64748B]'
              }`}
            >
              1-2★ Critical
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-3.5 rounded-lg bg-[#FBFBF9] border border-[#E7E6DF] space-y-2">
            <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider block">Customer's Review</span>
            <textarea
              rows={3}
              value={customerReview}
              onChange={(e) => setCustomerReview(e.target.value)}
              className="w-full p-2 text-xs bg-white border border-[#CBD5E1] rounded leading-relaxed"
            />
          </div>

          <div className="p-3.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] space-y-2 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-[#0F2942] uppercase tracking-wider">
                  Recommended Response (Editable)
                </span>
                <button
                  onClick={() => handleCopy(replyText, 'reply')}
                  className="text-[11px] text-[#0F2942] font-semibold hover:underline flex items-center gap-1"
                >
                  {copiedKey === 'reply' ? <Check className="w-3 h-3 text-[#1E6B52]" /> : <Copy className="w-3 h-3" />}
                  Copy Reply
                </button>
              </div>
              <textarea
                rows={3}
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                className="w-full p-2 text-xs text-[#334155] bg-white border border-[#CBD5E1] rounded leading-relaxed mt-1"
              />
            </div>
            <span className="text-[10px] text-[#64748B] pt-2 border-t border-[#E2E8F0]">
              Strategy: {reviewType === 'negative' ? 'Acknowledge, apologize sincerely, offer direct offline resolution' : 'Warm, personal gratitude and invitation to return'}
            </span>
          </div>
        </div>
      </div>

      {/* 4. Google Maps Q&A / FAQ Preparation */}
      <div className="bg-white p-6 rounded-xl border border-[#E2E0D8] shadow-2xs space-y-4 text-left">
        <div className="flex items-center justify-between border-b border-[#E7E6DF] pb-3">
          <div>
            <h2 className="text-base font-bold text-[#1E252B] flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-[#0F2942]" />
              <span>4. Google Profile Q&A / FAQ Preparation</span>
            </h2>
            <p className="text-xs text-[#64748B] mt-0.5">
              Proactively post common questions and owner answers on your Google Maps listing to eliminate hesitation.
            </p>
          </div>
          <button
            onClick={() => handleCopy(faqs.map(f => `Q: ${f.q}\nA: ${f.a}`).join('\n\n'), 'all_gbp_faqs')}
            className="px-2.5 py-1.5 text-xs font-semibold text-[#0F2942] hover:bg-[#F4F7FA] border border-[#CBD5E1] rounded-md flex items-center gap-1"
          >
            {copiedKey === 'all_gbp_faqs' ? <Check className="w-3.5 h-3.5 text-[#1E6B52]" /> : <Copy className="w-3.5 h-3.5" />}
            <span>Copy All FAQs</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {faqs.map((faq, idx) => (
            <div key={idx} className="p-3.5 rounded-lg bg-[#FBFBF9] border border-[#E7E6DF] space-y-2 flex flex-col justify-between">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-[#0F2942] uppercase tracking-wider block">Question 0{idx + 1}</span>
                <input
                  type="text"
                  value={faq.q}
                  onChange={(e) => {
                    const next = [...faqs];
                    next[idx].q = e.target.value;
                    setFaqs(next);
                  }}
                  className="w-full p-1.5 text-xs font-bold text-[#1E252B] bg-white border border-[#CBD5E1] rounded"
                />
                <textarea
                  rows={3}
                  value={faq.a}
                  onChange={(e) => {
                    const next = [...faqs];
                    next[idx].a = e.target.value;
                    setFaqs(next);
                  }}
                  className="w-full p-1.5 text-xs text-[#475569] bg-white border border-[#CBD5E1] rounded leading-relaxed mt-1"
                />
              </div>
              <button
                onClick={() => handleCopy(`Q: ${faq.q}\nA: ${faq.a}`, `faq_${idx}`)}
                className="text-[11px] text-[#0F2942] font-semibold hover:underline flex items-center gap-1 pt-2 border-t border-[#E7E6DF]"
              >
                {copiedKey === `faq_${idx}` ? <Check className="w-3 h-3 text-[#1E6B52]" /> : <Copy className="w-3 h-3" />}
                Copy Q&A
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Google Maps Photo Checklist */}
      <div className="bg-white p-6 rounded-xl border border-[#E2E0D8] shadow-2xs space-y-4 text-left">
        <div className="flex items-center justify-between border-b border-[#E7E6DF] pb-3">
          <div>
            <h2 className="text-base font-bold text-[#1E252B] flex items-center gap-2">
              <Camera className="w-4 h-4 text-[#0F2942]" />
              <span>5. Essential Photos Checklist</span>
            </h2>
            <p className="text-xs text-[#64748B] mt-0.5">
              High-resolution storefront and product photos build instant trust and make it easy for local customers to visit.
            </p>
          </div>
          <span className="text-xs font-bold text-[#1E6B52]">
            {photoTasks.filter(t => t.done).length} of {photoTasks.length} covered
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {photoTasks.map((t) => (
            <div
              key={t.id}
              onClick={() => togglePhotoTask(t.id)}
              className={`p-3.5 rounded-lg border text-xs cursor-pointer transition-all flex items-start gap-3 ${
                t.done ? 'bg-[#EBF4EF]/40 border-[#1E6B52]/20' : 'bg-[#FBFBF9] border-[#E2E0D8] hover:border-[#CBD5E1]'
              }`}
            >
              <div className={`mt-0.5 w-4 h-4 rounded-md flex items-center justify-center shrink-0 ${
                t.done ? 'bg-[#1E6B52] text-white' : 'border border-[#CBD5E1] bg-white'
              }`}>
                {t.done && <Check className="w-3 h-3" />}
              </div>
              <div>
                <span className={`font-semibold block ${t.done ? 'text-[#1E252B]' : 'text-[#64748B]'}`}>
                  {t.name}
                </span>
                <span className="text-[11px] text-[#64748B] mt-0.5 block">{t.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
