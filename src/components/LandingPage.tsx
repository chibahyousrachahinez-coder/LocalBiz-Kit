import React, { useState } from 'react';
import { 
  Check, 
  ArrowRight, 
  Sparkles, 
  Calendar, 
  MessageSquareQuote, 
  CheckCircle2, 
  Copy, 
  Share2, 
  Store,
  ChevronRight,
  ShieldCheck,
  Zap,
  Globe,
  Star
} from 'lucide-react';
import { BusinessProfile } from '../types';

interface LandingPageProps {
  onStartOnboarding: () => void;
  onEnterWorkspace: () => void;
  businessProfile: BusinessProfile;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onStartOnboarding,
  onEnterWorkspace,
  businessProfile
}) => {
  const [activePreviewTab, setActivePreviewTab] = useState<'create' | 'plan' | 'respond' | 'improve'>('create');
  const [copiedPreview, setCopiedPreview] = useState(false);

  const handleCopySample = () => {
    navigator.clipboard?.writeText(
      "Your next coffee break just got a little warmer.\n\nMeet our Cardamom Spiced Oat Latte. Available this week at Harbor & Bean."
    );
    setCopiedPreview(true);
    setTimeout(() => setCopiedPreview(false), 2000);
  };

  const scrollToIncluded = () => {
    const el = document.getElementById('solution-section');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div id="landing-page-root" className="min-h-screen bg-[#FBFBF9] text-[#1E252B]">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-[#FBFBF9]/90 backdrop-blur-md border-b border-[#E7E6DF]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#0F2942] flex items-center justify-center text-white font-bold text-sm tracking-tight shadow-xs">
              LB
            </div>
            <div>
              <span className="font-bold text-base tracking-tight text-[#1E252B]">LOCALBIZ KIT</span>
              <span className="hidden sm:inline-block ml-2 text-xs text-[#64748B] border-l border-[#E2E0D8] pl-2">
                Your small business. A stronger online presence.
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              id="landing-nav-enter-btn"
              onClick={onEnterWorkspace}
              className="text-xs font-semibold text-[#0F2942] hover:text-[#1C3B5E] px-3 py-2 rounded-md transition-colors"
            >
              Open Workspace
            </button>
            <button
              id="landing-nav-start-btn"
              onClick={onStartOnboarding}
              className="px-4 py-2 text-xs font-semibold bg-[#0F2942] text-white hover:bg-[#1C3B5E] rounded-lg transition-all shadow-xs flex items-center gap-1.5"
            >
              Get Started <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-12 pb-16 md:pt-20 md:pb-24 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto">
          {/* Small Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EBF4EF] border border-[#1E6B52]/20 text-[#1E6B52] text-xs font-semibold tracking-wide mb-6">
            <Store className="w-3.5 h-3.5" />
            <span>For local businesses</span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-[3.25rem] font-bold text-[#1E252B] tracking-tight leading-[1.15]">
            Make your business look better online — without becoming a marketing expert.
          </h1>

          {/* Supporting text */}
          <p className="mt-5 text-base sm:text-lg text-[#5A6578] max-w-2xl mx-auto leading-relaxed">
            Create professional business descriptions, social content, offers, customer messages and website copy from one simple workspace.
          </p>

          {/* Action buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              id="hero-primary-btn"
              onClick={onStartOnboarding}
              className="w-full sm:w-auto px-7 py-3.5 text-sm font-semibold bg-[#0F2942] text-white hover:bg-[#1C3B5E] rounded-lg shadow-sm transition-all flex items-center justify-center gap-2"
            >
              Build My Business Presence <ArrowRight className="w-4 h-4" />
            </button>
            <button
              id="hero-secondary-btn"
              onClick={scrollToIncluded}
              className="w-full sm:w-auto px-6 py-3.5 text-sm font-semibold bg-white text-[#1E252B] hover:bg-[#F4F4F0] border border-[#E2E0D8] rounded-lg transition-all"
            >
              See What's Included
            </button>
          </div>

          <div className="mt-4 flex items-center justify-center gap-4 text-xs text-[#64748B]">
            <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-[#1E6B52]" /> Built for independent shops</span>
            <span>•</span>
            <span>No subscription lock-in</span>
            <span>•</span>
            <span>Offline-ready workspace</span>
          </div>
        </div>

        {/* Hero Visual: Realistic Application Preview (NOT stock photo) */}
        <div className="mt-12 md:mt-16 rounded-xl border border-[#E2E0D8] bg-white shadow-xl overflow-hidden max-w-5xl mx-auto">
          {/* Mock App Window Header */}
          <div className="bg-[#F4F4F0] border-b border-[#E7E6DF] px-4 py-3 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#E2E0D8]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#E2E0D8]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#E2E0D8]" />
              </div>
              <span className="text-xs font-semibold text-[#1E252B] ml-2 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#1E6B52]" />
                LocalBiz Kit Workspace — {businessProfile.name} ({businessProfile.location})
              </span>
            </div>

            {/* Preview switcher tabs */}
            <div className="flex items-center gap-1 bg-[#EAE8E0] p-0.5 rounded-md text-xs font-medium text-[#64748B]">
              {(['create', 'plan', 'respond', 'improve'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActivePreviewTab(tab)}
                  className={`px-2.5 py-1 rounded capitalize transition-all ${
                    activePreviewTab === tab
                      ? 'bg-white text-[#0F2942] font-semibold shadow-2xs'
                      : 'hover:text-[#1E252B]'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Preview Content */}
          <div className="p-6 md:p-8 bg-white min-h-[320px]">
            {activePreviewTab === 'create' && (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                <div className="md:col-span-5 space-y-4 text-left border-b md:border-b-0 md:border-r border-[#E7E6DF] pb-4 md:pb-0 md:pr-6">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#0F2942] uppercase tracking-wider">Content Studio</span>
                    <span className="text-xs px-2 py-0.5 bg-[#EBF4EF] text-[#1E6B52] rounded font-medium">Ready</span>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-[#1E252B] block">Post Type</label>
                    <div className="text-xs px-3 py-2 bg-[#FBFBF9] border border-[#E2E0D8] rounded-md font-medium text-[#1E252B]">
                      Instagram Post • Friendly Tone
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-[#1E252B] block">Topic</label>
                    <div className="text-xs px-3 py-2 bg-[#FBFBF9] border border-[#E2E0D8] rounded-md text-[#5A6578]">
                      New seasonal cardamom spiced latte launch
                    </div>
                  </div>
                  <div className="p-3 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0] text-xs text-[#64748B] space-y-1">
                    <span className="font-semibold text-[#0F2942] block">Local Keyword Hook:</span>
                    <span>Includes neighborhood mention for Shoreditch & specialty roast notes.</span>
                  </div>
                </div>

                <div className="md:col-span-7 text-left space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#64748B]">Generated Post Copy</span>
                    <button
                      onClick={handleCopySample}
                      className="text-xs text-[#0F2942] hover:text-[#1C3B5E] font-medium flex items-center gap-1"
                    >
                      {copiedPreview ? <Check className="w-3 h-3 text-[#1E6B52]" /> : <Copy className="w-3 h-3" />}
                      {copiedPreview ? 'Copied' : 'Copy Copy'}
                    </button>
                  </div>
                  <div className="p-4 rounded-lg bg-[#FBFBF9] border border-[#E7E6DF] space-y-3">
                    <div>
                      <span className="text-[11px] font-bold text-[#0F2942] tracking-wider uppercase block mb-1">Hook</span>
                      <p className="text-sm font-semibold text-[#1E252B]">"Your next coffee break just got a little warmer."</p>
                    </div>
                    <div>
                      <span className="text-[11px] font-bold text-[#64748B] tracking-wider uppercase block mb-1">Caption</span>
                      <p className="text-xs text-[#5A6578] leading-relaxed">
                        Meet our new Cardamom Spiced Oat Latte. Crafted with freshly ground green cardamom, homemade Madagascar vanilla syrup, and our house-roasted Guatemala espresso. Warm, comforting, and not too sweet. Available all week at the counter.
                      </p>
                    </div>
                    <div className="pt-2 border-t border-[#E7E6DF] flex items-center justify-between text-xs">
                      <span className="text-[#1E6B52] font-semibold">CTA: Visit us this week and try it.</span>
                      <span className="text-[#64748B]">#LondonCoffee #Shoreditch</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activePreviewTab === 'plan' && (
              <div className="space-y-4 text-left">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#0F2942] uppercase tracking-wider">Weekly Marketing Calendar</span>
                  <span className="text-xs text-[#64748B]">Week of Sep 21 – 27</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { day: 'Mon', theme: 'Educational', title: 'Home Brew Water Temp Tip', status: 'Scheduled' },
                    { day: 'Tue', theme: 'Product', title: 'Single-Origin Colombian Roast', status: 'Scheduled' },
                    { day: 'Wed', theme: 'Behind the Scenes', title: 'Morning Calibration Routine', status: 'Draft' },
                    { day: 'Fri', theme: 'Promotion', title: 'Weekend Pastry Bundle', status: 'Draft' }
                  ].map((item, i) => (
                    <div key={i} className="p-3 rounded-lg border border-[#E7E6DF] bg-[#FBFBF9] space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-[#0F2942]">{item.day}</span>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${
                          item.status === 'Scheduled' ? 'bg-[#EBF4EF] text-[#1E6B52]' : 'bg-[#EAE8E0] text-[#64748B]'
                        }`}>
                          {item.status}
                        </span>
                      </div>
                      <span className="text-[11px] font-medium text-[#64748B] block">{item.theme}</span>
                      <p className="text-xs font-semibold text-[#1E252B] line-clamp-2">{item.title}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activePreviewTab === 'respond' && (
              <div className="space-y-4 text-left">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#0F2942] uppercase tracking-wider">Customer Response Generator</span>
                  <span className="text-xs text-[#1E6B52] font-medium">Google Review Reply</span>
                </div>
                <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-xs">
                  <span className="font-semibold text-[#1E252B] block mb-1">Customer Review:</span>
                  <p className="text-[#5A6578] italic">"I loved the coffee but had to wait quite a while during the morning rush."</p>
                </div>
                <div className="p-4 bg-[#FBFBF9] border border-[#E7E6DF] rounded-lg space-y-2">
                  <span className="text-[11px] font-bold text-[#0F2942] uppercase tracking-wider block">Suggested Response (Warm & Professional)</span>
                  <p className="text-xs text-[#1E252B] leading-relaxed">
                    "Thank you for visiting us and for the honest feedback. We're glad you enjoyed the coffee, and we appreciate your patience. We're always working to make the experience faster while keeping the quality you expect..."
                  </p>
                </div>
              </div>
            )}

            {activePreviewTab === 'improve' && (
              <div className="space-y-4 text-left">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#0F2942] uppercase tracking-wider">Online Presence Audit</span>
                  <span className="text-xs font-bold text-[#1E6B52]">Score: 68/100</span>
                </div>
                <div className="space-y-2">
                  {[
                    { title: 'Google Business description optimized with local keywords', done: true },
                    { title: 'Storefront and menu photos updated for this season', done: true },
                    { title: 'Clear hero headline and primary CTA on website', done: false },
                    { title: 'Review response template prepared for peak rushes', done: true }
                  ].map((chk, i) => (
                    <div key={i} className="flex items-center justify-between p-2.5 rounded-lg border border-[#E7E6DF] bg-[#FBFBF9] text-xs">
                      <span className="text-[#1E252B] font-medium">{chk.title}</span>
                      <span className={`px-2 py-0.5 rounded text-[11px] font-medium ${
                        chk.done ? 'bg-[#EBF4EF] text-[#1E6B52]' : 'bg-[#FDF3EC] text-[#C26638]'
                      }`}>
                        {chk.done ? 'Complete' : 'Needs attention'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section id="problem-section" className="py-16 md:py-20 bg-[#F4F4F0] border-y border-[#E7E6DF] px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#C26638] block mb-2">The Real Challenge</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1E252B] tracking-tight">
              Your business is good. Your online presence should show it.
            </h2>
            <p className="mt-3 text-sm text-[#64748B]">
              You're great at running your shop, your salon, or your service. But communicating it online takes mental energy you don't have.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                title: "Your Instagram looks inconsistent.",
                desc: "You post three days in a row, then disappear for a month because you don't know what to write."
              },
              {
                title: "Your Google Business profile isn't optimized.",
                desc: "Searchers in your neighborhood look for your service, but find incomplete hours or outdated descriptions."
              },
              {
                title: "You don't know what to post.",
                desc: "Staring at a blank caption box every morning wastes time and feels frustrating."
              },
              {
                title: "Writing website copy takes too long.",
                desc: "Explaining what you do clearly and writing high-converting headlines is hard when you're busy."
              },
              {
                title: "Customers ask the same questions repeatedly.",
                desc: "Hours, prices, parking, bookings — answering manually on DMs every day takes hours."
              },
              {
                title: "You have promotions but don't know how to communicate them.",
                desc: "You launch a special or new service, but the messaging feels clunky or goes unseen."
              }
            ].map((prob, i) => (
              <div 
                key={i} 
                className="p-5 rounded-xl bg-white border border-[#E2E0D8] shadow-2xs hover:border-[#CBD5E1] transition-all space-y-2 text-left"
              >
                <div className="w-7 h-7 rounded-full bg-[#FDF3EC] border border-[#C26638]/20 flex items-center justify-center text-[#C26638] text-xs font-bold">
                  {i + 1}
                </div>
                <h3 className="text-sm font-bold text-[#1E252B]">{prob.title}</h3>
                <p className="text-xs text-[#64748B] leading-relaxed">{prob.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section id="solution-section" className="py-16 md:py-24 px-4 sm:px-6 max-w-5xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-[#1E6B52] block mb-2">The Solution</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1E252B] tracking-tight">
            One workspace for your everyday marketing.
          </h2>
          <p className="mt-3 text-sm text-[#64748B]">
            Everything is structured around the four core jobs local business owners need to get done.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* CREATE */}
          <div className="p-6 rounded-xl border border-[#E2E0D8] bg-white shadow-2xs space-y-3 text-left">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#F4F7FA] border border-[#0F2942]/10 flex items-center justify-center text-[#0F2942]">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#0F2942]">Area 01</span>
                <h3 className="text-base font-bold text-[#1E252B]">CREATE</h3>
              </div>
            </div>
            <p className="text-xs font-semibold text-[#1E6B52]">Generate marketing assets.</p>
            <p className="text-xs text-[#64748B] leading-relaxed">
              Create professional business descriptions, high-converting social posts, promotional offers, and structured website section copy tailored specifically to your business type.
            </p>
            <ul className="text-xs text-[#5A6578] space-y-1.5 pt-2 border-t border-[#E7E6DF]">
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#1E6B52]" /> Instagram & Facebook Captions + Hooks</li>
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#1E6B52]" /> Website Hero, About, & FAQ Builder</li>
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#1E6B52]" /> 30+ Field-tested Marketing Templates</li>
            </ul>
          </div>

          {/* PLAN */}
          <div className="p-6 rounded-xl border border-[#E2E0D8] bg-white shadow-2xs space-y-3 text-left">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#F4F7FA] border border-[#0F2942]/10 flex items-center justify-center text-[#0F2942]">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#0F2942]">Area 02</span>
                <h3 className="text-base font-bold text-[#1E252B]">PLAN</h3>
              </div>
            </div>
            <p className="text-xs font-semibold text-[#1E6B52]">Organize upcoming content.</p>
            <p className="text-xs text-[#64748B] leading-relaxed">
              Use a structured 7-day thematic calendar so you never scramble on Monday morning. Easily schedule, edit, and mark posts as published right in your browser.
            </p>
            <ul className="text-xs text-[#5A6578] space-y-1.5 pt-2 border-t border-[#E7E6DF]">
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#1E6B52]" /> Weekly & Monthly content rhythm</li>
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#1E6B52]" /> Day themes (Educational, Behind Scenes, Promo)</li>
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#1E6B52]" /> Status tracking (Draft, Scheduled, Published)</li>
            </ul>
          </div>

          {/* RESPOND */}
          <div className="p-6 rounded-xl border border-[#E2E0D8] bg-white shadow-2xs space-y-3 text-left">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#F4F7FA] border border-[#0F2942]/10 flex items-center justify-center text-[#0F2942]">
                <MessageSquareQuote className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#0F2942]">Area 03</span>
                <h3 className="text-base font-bold text-[#1E252B]">RESPOND</h3>
              </div>
            </div>
            <p className="text-xs font-semibold text-[#1E6B52]">Prepare professional customer messages.</p>
            <p className="text-xs text-[#64748B] leading-relaxed">
              Reply thoughtfully to positive and critical Google reviews, answer frequent price or hours questions in 1-click, and handle complaints with composure.
            </p>
            <ul className="text-xs text-[#5A6578] space-y-1.5 pt-2 border-t border-[#E7E6DF]">
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#1E6B52]" /> 10 Common customer situation templates</li>
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#1E6B52]" /> Multi-tone Google review response generator</li>
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#1E6B52]" /> Copy-ready DM and SMS replies</li>
            </ul>
          </div>

          {/* IMPROVE */}
          <div className="p-6 rounded-xl border border-[#E2E0D8] bg-white shadow-2xs space-y-3 text-left">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#F4F7FA] border border-[#0F2942]/10 flex items-center justify-center text-[#0F2942]">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#0F2942]">Area 04</span>
                <h3 className="text-base font-bold text-[#1E252B]">IMPROVE</h3>
              </div>
            </div>
            <p className="text-xs font-semibold text-[#1E6B52]">Identify areas that need attention.</p>
            <p className="text-xs text-[#64748B] leading-relaxed">
              A clear, practical 21-item marketing checklist covering Google Business Profile, Website essentials, Social media hygiene, and Review collection systems.
            </p>
            <ul className="text-xs text-[#5A6578] space-y-1.5 pt-2 border-t border-[#E7E6DF]">
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#1E6B52]" /> Online presence organization score</li>
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#1E6B52]" /> Direct 1-click links to fix incomplete items</li>
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#1E6B52]" /> Profile completion tracker</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Target Business Types Grid */}
      <section className="py-14 bg-[#F4F4F0] border-t border-[#E7E6DF] px-4 sm:px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h3 className="text-lg font-bold text-[#1E252B]">Tailored specifically for your industry</h3>
          <p className="text-xs text-[#64748B] mt-1 mb-8">
            Vocabulary, hooks, and content suggestions adapt dynamically to your specific business type:
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-medium text-[#1E252B]">
            {[
              '☕ Coffee Shops & Roasteries',
              '🍽️ Restaurants & Bistros',
              '💇‍♀️ Salons & Spas',
              '✂️ Barbershops',
              '🏋️ Gyms & Studios',
              '🦷 Dental Clinics',
              '🏡 Real Estate Agents',
              '🔧 Local Services & Trades'
            ].map((type, i) => (
              <div key={i} className="p-3 bg-white rounded-lg border border-[#E2E0D8] shadow-2xs">
                {type}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 px-4 sm:px-6 max-w-4xl mx-auto text-center">
        <div className="p-8 md:p-12 rounded-2xl bg-[#0F2942] text-white space-y-6 shadow-xl">
          <span className="text-xs font-bold uppercase tracking-wider text-[#10B981]">Start Today</span>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight">
            Stop guessing what to post. Build a professional presence in minutes.
          </h2>
          <p className="text-sm text-[#CBD5E1] max-w-xl mx-auto leading-relaxed">
            LocalBiz Kit gives you the exact words, formats, and checklists to make your business look like the high-standard local business it is.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              id="cta-bottom-start-btn"
              onClick={onStartOnboarding}
              className="w-full sm:w-auto px-8 py-3.5 text-sm font-semibold bg-white text-[#0F2942] hover:bg-[#F4F4F0] rounded-lg shadow-sm transition-all flex items-center justify-center gap-2"
            >
              Build My Business Presence <ArrowRight className="w-4 h-4" />
            </button>
            <button
              id="cta-bottom-demo-btn"
              onClick={onEnterWorkspace}
              className="w-full sm:w-auto px-6 py-3.5 text-sm font-semibold bg-transparent text-white border border-[#CBD5E1]/30 hover:bg-white/10 rounded-lg transition-all"
            >
              Explore Sample Business (Harbor & Bean)
            </button>
          </div>
          <p className="text-[11px] text-[#94A3B8]">
            LocalBiz Kit helps you organize and improve your online presence. No complex software setup required.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-[#FBFBF9] border-t border-[#E7E6DF] text-xs text-[#64748B] text-center px-4">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#1E252B]">LOCALBIZ KIT</span>
            <span>— "Your small business. A stronger online presence."</span>
          </div>
          <div>
            <span>Crafted for independent local business owners.</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
