import React, { useState } from 'react';
import { 
  Globe, 
  Copy, 
  Check, 
  Download, 
  RefreshCw, 
  Sparkles, 
  FileText, 
  CheckCircle2, 
  MapPin, 
  Clock, 
  Phone,
  ShieldCheck,
  Edit3,
  HelpCircle,
  Save
} from 'lucide-react';
import { BusinessProfile } from '../types';
import { generateWebsiteSections, WebsiteSectionsBundle } from '../lib/generators';

interface WebsiteCopyViewProps {
  businessProfile: BusinessProfile;
  onShowToast: (msg: string, type?: 'success' | 'info') => void;
}

export const WebsiteCopyView: React.FC<WebsiteCopyViewProps> = ({
  businessProfile,
  onShowToast
}) => {
  const [sections, setSections] = useState<WebsiteSectionsBundle>(() => generateWebsiteSections(businessProfile));
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'hero' | 'about' | 'services' | 'trust' | 'faqs' | 'contact'>('all');

  const handleRegenerate = () => {
    const updated = generateWebsiteSections(businessProfile);
    setSections(updated);
    onShowToast('Website copy refreshed with profile details!', 'success');
  };

  const handleCopySection = (title: string, text: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedSection(title);
    onShowToast(`Copied ${title} to clipboard!`, 'info');
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const getFullMarkdown = () => {
    return `# Website Copy for ${businessProfile.name}
Category: ${businessProfile.category} | Location: ${businessProfile.location}

---

## 1. Hero Section
**Headline:** ${sections.hero.headline}
**Subheadline:** ${sections.hero.subheadline}
**Primary CTA:** ${sections.hero.primaryCta}
**Secondary CTA:** ${sections.hero.secondaryCta}
**Trust Note:** ${sections.hero.trustBadge}

---

## 2. About Section
**Headline:** ${sections.about.headline}
${sections.about.story}

### Our Values
${sections.about.values.map(v => `- ${v}`).join('\n')}

---

## 3. Services / Signature Offerings
${sections.services.map(s => `### ${s.title}\n${s.description}\n*Price/Note:* ${s.priceOrNote}\n`).join('\n')}

---

## 4. Why Choose Us (Local Trust)
${sections.trust.map(t => `- **${t.title}:** ${t.description}`).join('\n')}

---

## 5. Frequently Asked Questions (FAQ)
${sections.faqs?.map(f => `### Q: ${f.question}\n**A:** ${f.answer}\n`).join('\n') || ''}

---

## 6. Contact & Visit
**Address:** ${sections.contact.address}
**Hours:** ${sections.contact.hours}
**Phone:** ${sections.contact.phone}
**Note:** ${sections.contact.directionsNote}
`;
  };

  const handleCopyFull = () => {
    const md = getFullMarkdown();
    navigator.clipboard?.writeText(md);
    setCopiedSection('full');
    onShowToast('Copied complete website copy to clipboard!', 'success');
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const handleExportFile = (format: 'md' | 'txt') => {
    const text = getFullMarkdown();
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${businessProfile.name.toLowerCase().replace(/\s+/g, '-')}-website-copy.${format}`;
    link.click();
    URL.revokeObjectURL(url);
    onShowToast(`Exported as .${format} file!`, 'success');
  };

  return (
    <div id="website-copy-view" className="space-y-6 max-w-5xl mx-auto pb-16 md:pb-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-[#E7E6DF] shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1E252B] tracking-tight">Website Copy Builder</h1>
          <p className="text-xs text-[#64748B] mt-1">
            Conversion-focused website copy structured for {businessProfile.name} in {businessProfile.location}.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            id="btn-toggle-edit-mode"
            onClick={() => {
              setIsEditing(!isEditing);
              if (isEditing) {
                onShowToast('Website copy customizations saved!', 'success');
              }
            }}
            className={`px-3 py-2 text-xs font-semibold rounded-lg border transition-all flex items-center gap-1.5 ${
              isEditing 
                ? 'bg-[#1E6B52] text-white border-[#1E6B52] shadow-xs' 
                : 'bg-white text-[#1E252B] hover:bg-[#F4F4F0] border-[#CBD5E1]'
            }`}
          >
            {isEditing ? <Save className="w-3.5 h-3.5" /> : <Edit3 className="w-3.5 h-3.5" />}
            <span>{isEditing ? 'Done Editing' : 'Edit Copy'}</span>
          </button>

          <button
            id="btn-regen-website"
            onClick={handleRegenerate}
            className="px-3 py-2 text-xs font-semibold bg-white hover:bg-[#F4F4F0] text-[#1E252B] border border-[#CBD5E1] rounded-lg transition-colors flex items-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5 text-[#64748B]" />
            <span>Reset to Profile</span>
          </button>

          <button
            id="btn-copy-full-website"
            onClick={handleCopyFull}
            className="px-4 py-2 text-xs font-semibold bg-[#0F2942] hover:bg-[#1C3B5E] text-white rounded-lg transition-all shadow-xs flex items-center gap-1.5"
          >
            {copiedSection === 'full' ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
            <span>Copy All Sections</span>
          </button>
        </div>
      </div>

      {/* Notice & Export bar */}
      <div className="bg-white p-4 rounded-xl border border-[#E2E0D8] shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs text-[#64748B]">
          <span className="w-2 h-2 rounded-full bg-[#1E6B52]" />
          <span>
            {isEditing 
              ? 'Editing active: modify any field below. Click "Done Editing" when finished.' 
              : '6 high-conversion website sections ready for Squarespace, WordPress, Wix, or custom builds.'}
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="text-[#64748B] font-medium hidden sm:inline">Export:</span>
          <button
            onClick={() => handleExportFile('md')}
            className="px-2.5 py-1 rounded-md bg-[#FBFBF9] hover:bg-[#F4F4F0] border border-[#E2E0D8] font-medium text-[#1E252B] flex items-center gap-1"
          >
            <Download className="w-3 h-3 text-[#64748B]" /> Markdown (.md)
          </button>
          <button
            onClick={() => handleExportFile('txt')}
            className="px-2.5 py-1 rounded-md bg-[#FBFBF9] hover:bg-[#F4F4F0] border border-[#E2E0D8] font-medium text-[#1E252B] flex items-center gap-1"
          >
            <Download className="w-3 h-3 text-[#64748B]" /> Plain Text (.txt)
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
        {[
          { id: 'all', label: 'All 6 Sections' },
          { id: 'hero', label: '1. Hero' },
          { id: 'about', label: '2. About & Story' },
          { id: 'services', label: '3. Services & Menu' },
          { id: 'trust', label: '4. Local Trust' },
          { id: 'faqs', label: '5. FAQ' },
          { id: 'contact', label: '6. Contact & Visit' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-3.5 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-colors ${
              activeTab === tab.id
                ? 'bg-[#0F2942] text-white shadow-2xs'
                : 'bg-white hover:bg-[#F4F4F0] text-[#64748B] border border-[#E2E0D8]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* SECTIONS CONTENT */}
      <div className="space-y-6">
        {/* SECTION 1: HERO */}
        {(activeTab === 'all' || activeTab === 'hero') && (
          <div className="bg-white p-6 rounded-xl border border-[#E2E0D8] shadow-2xs space-y-4 text-left">
            <div className="flex items-center justify-between border-b border-[#E7E6DF] pb-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-[#0F2942] text-white flex items-center justify-center font-bold text-xs">
                  1
                </span>
                <h2 className="text-base font-bold text-[#1E252B]">Hero Section</h2>
                <span className="text-[11px] text-[#64748B] hidden sm:inline">• Above the fold positioning</span>
              </div>
              <button
                onClick={() => handleCopySection('Hero Section', `Headline: ${sections.hero.headline}\nSubheadline: ${sections.hero.subheadline}\nPrimary CTA: ${sections.hero.primaryCta}\nSecondary CTA: ${sections.hero.secondaryCta}\nTrust Note: ${sections.hero.trustBadge}`)}
                className="px-2.5 py-1 text-xs font-semibold text-[#0F2942] hover:bg-[#F4F7FA] border border-[#CBD5E1] rounded-md flex items-center gap-1"
              >
                {copiedSection === 'Hero Section' ? <Check className="w-3.5 h-3.5 text-[#1E6B52]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>Copy Hero</span>
              </button>
            </div>

            <div className="p-5 rounded-xl bg-[#FBFBF9] border border-[#E7E6DF] space-y-4">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Main Headline</span>
                {isEditing ? (
                  <input
                    type="text"
                    value={sections.hero.headline}
                    onChange={(e) => setSections({
                      ...sections,
                      hero: { ...sections.hero, headline: e.target.value }
                    })}
                    className="w-full px-3 py-1.5 text-sm font-serif font-bold text-[#1E252B] bg-white rounded-md border border-[#CBD5E1]"
                  />
                ) : (
                  <h3 className="text-xl md:text-2xl font-bold font-serif text-[#1E252B] leading-tight">
                    {sections.hero.headline}
                  </h3>
                )}
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Subheadline</span>
                {isEditing ? (
                  <textarea
                    rows={2}
                    value={sections.hero.subheadline}
                    onChange={(e) => setSections({
                      ...sections,
                      hero: { ...sections.hero, subheadline: e.target.value }
                    })}
                    className="w-full px-3 py-1.5 text-xs text-[#64748B] bg-white rounded-md border border-[#CBD5E1]"
                  />
                ) : (
                  <p className="text-sm text-[#64748B] leading-relaxed max-w-2xl">
                    {sections.hero.subheadline}
                  </p>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider block">Primary CTA</span>
                  {isEditing ? (
                    <input
                      type="text"
                      value={sections.hero.primaryCta}
                      onChange={(e) => setSections({
                        ...sections,
                        hero: { ...sections.hero, primaryCta: e.target.value }
                      })}
                      className="px-3 py-1 text-xs bg-white rounded-md border border-[#CBD5E1]"
                    />
                  ) : (
                    <div className="px-4 py-2 rounded-lg bg-[#0F2942] text-white text-xs font-semibold">
                      {sections.hero.primaryCta}
                    </div>
                  )}
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider block">Secondary CTA</span>
                  {isEditing ? (
                    <input
                      type="text"
                      value={sections.hero.secondaryCta}
                      onChange={(e) => setSections({
                        ...sections,
                        hero: { ...sections.hero, secondaryCta: e.target.value }
                      })}
                      className="px-3 py-1 text-xs bg-white rounded-md border border-[#CBD5E1]"
                    />
                  ) : (
                    <div className="px-4 py-2 rounded-lg bg-white border border-[#CBD5E1] text-[#1E252B] text-xs font-semibold">
                      {sections.hero.secondaryCta}
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-2 flex items-center gap-2 text-xs text-[#1E6B52]">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                {isEditing ? (
                  <input
                    type="text"
                    value={sections.hero.trustBadge}
                    onChange={(e) => setSections({
                      ...sections,
                      hero: { ...sections.hero, trustBadge: e.target.value }
                    })}
                    className="flex-1 px-3 py-1 text-xs bg-white rounded-md border border-[#CBD5E1] text-[#1E6B52]"
                  />
                ) : (
                  <span>{sections.hero.trustBadge}</span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* SECTION 2: ABOUT */}
        {(activeTab === 'all' || activeTab === 'about') && (
          <div className="bg-white p-6 rounded-xl border border-[#E2E0D8] shadow-2xs space-y-4 text-left">
            <div className="flex items-center justify-between border-b border-[#E7E6DF] pb-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-[#0F2942] text-white flex items-center justify-center font-bold text-xs">
                  2
                </span>
                <h2 className="text-base font-bold text-[#1E252B]">About & Brand Story</h2>
              </div>
              <button
                onClick={() => handleCopySection('About Section', `Headline: ${sections.about.headline}\nStory: ${sections.about.story}\nValues:\n${sections.about.values.map(v => `- ${v}`).join('\n')}`)}
                className="px-2.5 py-1 text-xs font-semibold text-[#0F2942] hover:bg-[#F4F7FA] border border-[#CBD5E1] rounded-md flex items-center gap-1"
              >
                {copiedSection === 'About Section' ? <Check className="w-3.5 h-3.5 text-[#1E6B52]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>Copy About</span>
              </button>
            </div>

            <div className="p-5 rounded-xl bg-[#FBFBF9] border border-[#E7E6DF] space-y-4">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Section Headline</span>
                {isEditing ? (
                  <input
                    type="text"
                    value={sections.about.headline}
                    onChange={(e) => setSections({
                      ...sections,
                      about: { ...sections.about, headline: e.target.value }
                    })}
                    className="w-full px-3 py-1.5 text-base font-bold text-[#1E252B] bg-white rounded-md border border-[#CBD5E1]"
                  />
                ) : (
                  <h3 className="text-lg font-bold text-[#1E252B]">
                    {sections.about.headline}
                  </h3>
                )}
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Brand Story</span>
                {isEditing ? (
                  <textarea
                    rows={4}
                    value={sections.about.story}
                    onChange={(e) => setSections({
                      ...sections,
                      about: { ...sections.about, story: e.target.value }
                    })}
                    className="w-full px-3 py-1.5 text-xs text-[#1E252B] bg-white rounded-md border border-[#CBD5E1] leading-relaxed"
                  />
                ) : (
                  <p className="text-xs text-[#1E252B] leading-relaxed">
                    {sections.about.story}
                  </p>
                )}
              </div>

              <div className="pt-2 space-y-2">
                <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider block">Core Values & Commitments</span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {sections.about.values.map((v, i) => (
                    <div key={i} className="p-3 bg-white rounded-lg border border-[#E2E0D8] text-xs font-medium text-[#1E252B] flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1E6B52]" />
                      {isEditing ? (
                        <input
                          type="text"
                          value={v}
                          onChange={(e) => {
                            const newVals = [...sections.about.values];
                            newVals[i] = e.target.value;
                            setSections({
                              ...sections,
                              about: { ...sections.about, values: newVals }
                            });
                          }}
                          className="w-full px-2 py-0.5 text-xs bg-[#FBFBF9] rounded border border-[#CBD5E1]"
                        />
                      ) : (
                        <span>{v}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 3: SERVICES / MENU */}
        {(activeTab === 'all' || activeTab === 'services') && (
          <div className="bg-white p-6 rounded-xl border border-[#E2E0D8] shadow-2xs space-y-4 text-left">
            <div className="flex items-center justify-between border-b border-[#E7E6DF] pb-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-[#0F2942] text-white flex items-center justify-center font-bold text-xs">
                  3
                </span>
                <h2 className="text-base font-bold text-[#1E252B]">Services & Offerings</h2>
              </div>
              <button
                onClick={() => handleCopySection('Services Section', sections.services.map(s => `${s.title}: ${s.description} (${s.priceOrNote})`).join('\n\n'))}
                className="px-2.5 py-1 text-xs font-semibold text-[#0F2942] hover:bg-[#F4F7FA] border border-[#CBD5E1] rounded-md flex items-center gap-1"
              >
                {copiedSection === 'Services Section' ? <Check className="w-3.5 h-3.5 text-[#1E6B52]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>Copy Services</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {sections.services.map((srv, idx) => (
                <div key={idx} className="p-4 rounded-lg bg-[#FBFBF9] border border-[#E7E6DF] space-y-2 flex flex-col justify-between">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-[#1E6B52] uppercase tracking-wider">Option 0{idx + 1}</span>
                    {isEditing ? (
                      <input
                        type="text"
                        value={srv.title}
                        onChange={(e) => {
                          const newSrv = [...sections.services];
                          newSrv[idx] = { ...newSrv[idx], title: e.target.value };
                          setSections({ ...sections, services: newSrv });
                        }}
                        className="w-full px-2 py-1 text-xs font-bold text-[#1E252B] bg-white rounded border border-[#CBD5E1]"
                      />
                    ) : (
                      <h4 className="text-sm font-bold text-[#1E252B]">{srv.title}</h4>
                    )}

                    {isEditing ? (
                      <textarea
                        rows={3}
                        value={srv.description}
                        onChange={(e) => {
                          const newSrv = [...sections.services];
                          newSrv[idx] = { ...newSrv[idx], description: e.target.value };
                          setSections({ ...sections, services: newSrv });
                        }}
                        className="w-full px-2 py-1 text-xs text-[#64748B] bg-white rounded border border-[#CBD5E1]"
                      />
                    ) : (
                      <p className="text-xs text-[#64748B] leading-relaxed">{srv.description}</p>
                    )}
                  </div>
                  <div className="pt-3 border-t border-[#E7E6DF]">
                    {isEditing ? (
                      <input
                        type="text"
                        value={srv.priceOrNote}
                        onChange={(e) => {
                          const newSrv = [...sections.services];
                          newSrv[idx] = { ...newSrv[idx], priceOrNote: e.target.value };
                          setSections({ ...sections, services: newSrv });
                        }}
                        className="w-full px-2 py-1 text-xs font-semibold text-[#0F2942] bg-white rounded border border-[#CBD5E1]"
                      />
                    ) : (
                      <span className="text-xs font-semibold text-[#0F2942]">{srv.priceOrNote}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 4: LOCAL TRUST */}
        {(activeTab === 'all' || activeTab === 'trust') && (
          <div className="bg-white p-6 rounded-xl border border-[#E2E0D8] shadow-2xs space-y-4 text-left">
            <div className="flex items-center justify-between border-b border-[#E7E6DF] pb-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-[#0F2942] text-white flex items-center justify-center font-bold text-xs">
                  4
                </span>
                <h2 className="text-base font-bold text-[#1E252B]">Local Trust & Credibility</h2>
              </div>
              <button
                onClick={() => handleCopySection('Trust Section', sections.trust.map(t => `${t.title}: ${t.description}`).join('\n\n'))}
                className="px-2.5 py-1 text-xs font-semibold text-[#0F2942] hover:bg-[#F4F7FA] border border-[#CBD5E1] rounded-md flex items-center gap-1"
              >
                {copiedSection === 'Trust Section' ? <Check className="w-3.5 h-3.5 text-[#1E6B52]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>Copy Trust Points</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {sections.trust.map((item, idx) => (
                <div key={idx} className="p-3.5 rounded-lg bg-[#FBFBF9] border border-[#E7E6DF] space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-[#EBF4EF] text-[#1E6B52] flex items-center justify-center font-bold text-[10px]">
                      ✓
                    </div>
                    {isEditing ? (
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) => {
                          const newTrust = [...sections.trust];
                          newTrust[idx] = { ...newTrust[idx], title: e.target.value };
                          setSections({ ...sections, trust: newTrust });
                        }}
                        className="w-full px-2 py-0.5 text-xs font-bold text-[#1E252B] bg-white rounded border border-[#CBD5E1]"
                      />
                    ) : (
                      <h4 className="text-xs font-bold text-[#1E252B]">{item.title}</h4>
                    )}
                  </div>
                  {isEditing ? (
                    <textarea
                      rows={2}
                      value={item.description}
                      onChange={(e) => {
                        const newTrust = [...sections.trust];
                        newTrust[idx] = { ...newTrust[idx], description: e.target.value };
                        setSections({ ...sections, trust: newTrust });
                      }}
                      className="w-full px-2 py-1 text-xs text-[#64748B] bg-white rounded border border-[#CBD5E1]"
                    />
                  ) : (
                    <p className="text-xs text-[#64748B] pl-7 leading-relaxed">{item.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 5: FAQS (Frequently Asked Questions) */}
        {(activeTab === 'all' || activeTab === 'faqs') && (
          <div className="bg-white p-6 rounded-xl border border-[#E2E0D8] shadow-2xs space-y-4 text-left">
            <div className="flex items-center justify-between border-b border-[#E7E6DF] pb-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-[#0F2942] text-white flex items-center justify-center font-bold text-xs">
                  5
                </span>
                <h2 className="text-base font-bold text-[#1E252B]">Frequently Asked Questions (FAQ)</h2>
                <span className="text-[11px] text-[#64748B] hidden sm:inline">• Essential for conversion & SEO</span>
              </div>
              <button
                onClick={() => handleCopySection('FAQ Section', sections.faqs?.map(f => `Q: ${f.question}\nA: ${f.answer}`).join('\n\n') || '')}
                className="px-2.5 py-1 text-xs font-semibold text-[#0F2942] hover:bg-[#F4F7FA] border border-[#CBD5E1] rounded-md flex items-center gap-1"
              >
                {copiedSection === 'FAQ Section' ? <Check className="w-3.5 h-3.5 text-[#1E6B52]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>Copy FAQs</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sections.faqs?.map((faq, idx) => (
                <div key={idx} className="p-4 rounded-lg bg-[#FBFBF9] border border-[#E7E6DF] space-y-2">
                  <div className="flex items-start gap-2">
                    <HelpCircle className="w-4 h-4 text-[#0F2942] shrink-0 mt-0.5" />
                    {isEditing ? (
                      <input
                        type="text"
                        value={faq.question}
                        onChange={(e) => {
                          const newFaqs = [...(sections.faqs || [])];
                          newFaqs[idx] = { ...newFaqs[idx], question: e.target.value };
                          setSections({ ...sections, faqs: newFaqs });
                        }}
                        className="w-full px-2 py-1 text-xs font-bold text-[#1E252B] bg-white rounded border border-[#CBD5E1]"
                      />
                    ) : (
                      <h4 className="text-xs font-bold text-[#1E252B] leading-snug">{faq.question}</h4>
                    )}
                  </div>
                  {isEditing ? (
                    <textarea
                      rows={3}
                      value={faq.answer}
                      onChange={(e) => {
                        const newFaqs = [...(sections.faqs || [])];
                        newFaqs[idx] = { ...newFaqs[idx], answer: e.target.value };
                        setSections({ ...sections, faqs: newFaqs });
                      }}
                      className="w-full px-2 py-1 text-xs text-[#64748B] bg-white rounded border border-[#CBD5E1] pl-6"
                    />
                  ) : (
                    <p className="text-xs text-[#64748B] pl-6 leading-relaxed">{faq.answer}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 6: CONTACT & VISIT */}
        {(activeTab === 'all' || activeTab === 'contact') && (
          <div className="bg-white p-6 rounded-xl border border-[#E2E0D8] shadow-2xs space-y-4 text-left">
            <div className="flex items-center justify-between border-b border-[#E7E6DF] pb-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-[#0F2942] text-white flex items-center justify-center font-bold text-xs">
                  6
                </span>
                <h2 className="text-base font-bold text-[#1E252B]">Contact & Visit Us</h2>
              </div>
              <button
                onClick={() => handleCopySection('Contact Section', `Address: ${sections.contact.address}\nHours: ${sections.contact.hours}\nPhone: ${sections.contact.phone}\nDirections Note: ${sections.contact.directionsNote}`)}
                className="px-2.5 py-1 text-xs font-semibold text-[#0F2942] hover:bg-[#F4F4F0] border border-[#CBD5E1] rounded-md flex items-center gap-1"
              >
                {copiedSection === 'Contact Section' ? <Check className="w-3.5 h-3.5 text-[#1E6B52]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>Copy Contact</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-[#FBFBF9] p-4 rounded-lg border border-[#E7E6DF] text-xs">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#0F2942]" /> Location
                </span>
                {isEditing ? (
                  <input
                    type="text"
                    value={sections.contact.address}
                    onChange={(e) => setSections({
                      ...sections,
                      contact: { ...sections.contact, address: e.target.value }
                    })}
                    className="w-full px-2 py-1 text-xs font-semibold text-[#1E252B] bg-white rounded border border-[#CBD5E1]"
                  />
                ) : (
                  <p className="font-semibold text-[#1E252B]">{sections.contact.address}</p>
                )}
                {isEditing ? (
                  <input
                    type="text"
                    value={sections.contact.directionsNote}
                    onChange={(e) => setSections({
                      ...sections,
                      contact: { ...sections.contact, directionsNote: e.target.value }
                    })}
                    className="w-full px-2 py-1 text-[11px] text-[#64748B] bg-white rounded border border-[#CBD5E1]"
                  />
                ) : (
                  <p className="text-[11px] text-[#64748B]">{sections.contact.directionsNote}</p>
                )}
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[#0F2942]" /> Hours
                </span>
                {isEditing ? (
                  <input
                    type="text"
                    value={sections.contact.hours}
                    onChange={(e) => setSections({
                      ...sections,
                      contact: { ...sections.contact, hours: e.target.value }
                    })}
                    className="w-full px-2 py-1 text-xs font-semibold text-[#1E252B] bg-white rounded border border-[#CBD5E1]"
                  />
                ) : (
                  <p className="font-semibold text-[#1E252B]">{sections.contact.hours}</p>
                )}
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider flex items-center gap-1">
                  <Phone className="w-3 h-3 text-[#0F2942]" /> Direct Phone
                </span>
                {isEditing ? (
                  <input
                    type="text"
                    value={sections.contact.phone}
                    onChange={(e) => setSections({
                      ...sections,
                      contact: { ...sections.contact, phone: e.target.value }
                    })}
                    className="w-full px-2 py-1 text-xs font-semibold text-[#1E252B] bg-white rounded border border-[#CBD5E1]"
                  />
                ) : (
                  <p className="font-semibold text-[#1E252B]">{sections.contact.phone}</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
