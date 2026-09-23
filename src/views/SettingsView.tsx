import React, { useState } from 'react';
import { 
  Settings, 
  Download, 
  RotateCcw, 
  Trash2, 
  ShieldCheck, 
  Info, 
  FileJson, 
  FileText,
  AlertTriangle,
  BookOpen
} from 'lucide-react';
import { BusinessProfile } from '../types';
import { StorageService } from '../lib/storage';
import { Modal } from '../components/Modal';
import { QUICK_START_GUIDE_TEXT } from '../data/guideContent';

interface SettingsViewProps {
  businessProfile: BusinessProfile;
  onResetData: () => void;
  onClearAll: () => void;
  onShowToast: (msg: string, type?: 'success' | 'info') => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  businessProfile,
  onResetData,
  onClearAll,
  onShowToast
}) => {
  const [confirmClearOpen, setConfirmClearOpen] = useState(false);
  const [confirmResetDemoOpen, setConfirmResetDemoOpen] = useState(false);

  const handleExportJSON = () => {
    const raw = StorageService.exportAllData();
    const blob = new Blob([raw], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `localbizkit-${businessProfile.name.toLowerCase().replace(/\s+/g, '-')}-backup.json`;
    a.click();
    URL.revokeObjectURL(url);
    onShowToast('Exported complete JSON workspace backup!', 'success');
  };

  const handleExportSummaryTXT = () => {
    const data = JSON.parse(StorageService.exportAllData());
    const text = `LOCALBIZ KIT - COMPLETE MARKETING EXPORT
===========================================
Business: ${data.profile?.name}
Category: ${data.profile?.category}
Location: ${data.profile?.location}
Website: ${data.profile?.website}
Phone: ${data.profile?.phone}
Email: ${data.profile?.email}

DESCRIPTION:
${data.profile?.description}

SERVICES / OFFERINGS:
${data.profile?.services?.map((s: string) => `- ${s}`).join('\n')}

ACTIVE OFFERS (${data.offers?.length || 0}):
${data.offers?.map((o: any) => `* ${o.headline} (${o.type})\n  Details: ${o.details}\n  Terms: ${o.terms}`).join('\n\n')}

SCHEDULED POSTS (${data.calendar?.length || 0}):
${data.calendar?.map((c: any) => `* [${c.dayOfWeek}] ${c.title}\n  Hook: ${c.hook}\n  Caption: ${c.caption}`).join('\n\n')}

SAVED CONTENT ITEMS (${data.content?.length || 0}):
${data.content?.map((g: any) => `* ${g.title} (${g.contentType})\n  Hook: ${g.hook}\n  Caption: ${g.caption}`).join('\n\n')}
`;
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `localbizkit-${businessProfile.name.toLowerCase().replace(/\s+/g, '-')}-summary.txt`;
    a.click();
    URL.revokeObjectURL(url);
    onShowToast('Exported complete plain text report!', 'success');
  };

  const handleDownloadGuide = () => {
    const blob = new Blob([QUICK_START_GUIDE_TEXT], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'LocalBiz-Kit-Quick-Start-Guide.md';
    a.click();
    URL.revokeObjectURL(url);
    onShowToast('Downloaded Customer Quick Start Guide!', 'success');
  };

  return (
    <div id="settings-view-root" className="space-y-6 max-w-4xl mx-auto pb-16 md:pb-6 text-left">
      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-[#E7E6DF] shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1E252B] tracking-tight">Settings & Workspace Data</h1>
          <p className="text-xs text-[#64748B] mt-1">
            Manage your local marketing workspace, backup your content, and configure preferences.
          </p>
        </div>
      </div>

      {/* Export & Data Portability */}
      <div className="bg-white p-6 rounded-xl border border-[#E2E0D8] shadow-2xs space-y-4">
        <h2 className="text-base font-bold text-[#1E252B] border-b border-[#E7E6DF] pb-3 flex items-center gap-2">
          <Download className="w-4 h-4 text-[#0F2942]" />
          <span>Export All Business Content</span>
        </h2>
        <p className="text-xs text-[#64748B]">
          Export your entire marketing library, calendar, business profiles, and promotional campaigns at any time. No vendor lock-in.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <button
            id="btn-export-json"
            onClick={handleExportJSON}
            className="p-4 rounded-lg border border-[#E2E0D8] hover:border-[#0F2942] hover:bg-[#F8FAFC] transition-all flex items-start gap-3 group text-left"
          >
            <div className="w-8 h-8 rounded-md bg-[#F4F7FA] text-[#0F2942] group-hover:bg-[#0F2942] group-hover:text-white transition-colors flex items-center justify-center shrink-0">
              <FileJson className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-[#1E252B] group-hover:text-[#0F2942] block">
                Export JSON Backup
              </span>
              <span className="text-[11px] text-[#64748B] mt-0.5 block">
                Complete data backup for re-importing or programmatic usage.
              </span>
            </div>
          </button>

          <button
            id="btn-export-txt"
            onClick={handleExportSummaryTXT}
            className="p-4 rounded-lg border border-[#E2E0D8] hover:border-[#0F2942] hover:bg-[#F8FAFC] transition-all flex items-start gap-3 group text-left"
          >
            <div className="w-8 h-8 rounded-md bg-[#F4F7FA] text-[#0F2942] group-hover:bg-[#0F2942] group-hover:text-white transition-colors flex items-center justify-center shrink-0">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-[#1E252B] group-hover:text-[#0F2942] block">
                Export Text Document (.txt)
              </span>
              <span className="text-[11px] text-[#64748B] mt-0.5 block">
                Human-readable compiled document with all your captions & offers.
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* Customer Quick Start Guide & Documentation */}
      <div className="bg-white p-6 rounded-xl border border-[#E2E0D8] shadow-2xs space-y-4">
        <h2 className="text-base font-bold text-[#1E252B] border-b border-[#E7E6DF] pb-3 flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-[#0F2942]" />
          <span>Customer Documentation & Quick Start Guide</span>
        </h2>
        <p className="text-xs text-[#64748B]">
          Learn how to get the most out of LocalBiz Kit. Download the full 20-section customer handbook covering every tool, weekly rhythm, and backup practices.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <button
            id="btn-download-guide"
            onClick={handleDownloadGuide}
            className="p-4 rounded-lg border border-[#E2E0D8] hover:border-[#0F2942] hover:bg-[#F8FAFC] transition-all flex items-start gap-3 group text-left"
          >
            <div className="w-8 h-8 rounded-md bg-[#F4F7FA] text-[#0F2942] group-hover:bg-[#0F2942] group-hover:text-white transition-colors flex items-center justify-center shrink-0">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-[#1E252B] group-hover:text-[#0F2942] block">
                Download Quick Start Guide (.md)
              </span>
              <span className="text-[11px] text-[#64748B] mt-0.5 block">
                Complete 20-section handbook ready to read offline or in any editor.
              </span>
            </div>
          </button>

          <a
            href="mailto:lamapinygirlofmyschool@gmail.com?subject=LocalBiz%20Kit%20Customer%20Support"
            className="p-4 rounded-lg border border-[#E2E0D8] hover:border-[#0F2942] hover:bg-[#F8FAFC] transition-all flex items-start gap-3 group text-left"
          >
            <div className="w-8 h-8 rounded-md bg-[#F4F7FA] text-[#0F2942] group-hover:bg-[#0F2942] group-hover:text-white transition-colors flex items-center justify-center shrink-0">
              <Info className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-[#1E252B] group-hover:text-[#0F2942] block">
                Email Customer Support
              </span>
              <span className="text-[11px] text-[#64748B] mt-0.5 block">
                Direct assistance from the product team. Replies within 24–48 hours.
              </span>
            </div>
          </a>
        </div>
      </div>

      {/* Preferences & Privacy */}
      <div className="bg-white p-6 rounded-xl border border-[#E2E0D8] shadow-2xs space-y-4">
        <h2 className="text-base font-bold text-[#1E252B] border-b border-[#E7E6DF] pb-3 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#1E6B52]" />
          <span>Local-First Privacy Architecture</span>
        </h2>
        <div className="text-xs text-[#64748B] space-y-2 leading-relaxed">
          <p>
            LocalBiz Kit stores your marketing assets directly inside your browser storage (IndexedDB & LocalStorage). Your customer responses, campaigns, and drafts are private to your device.
          </p>
          <div className="p-3 bg-[#FBFBF9] rounded-lg border border-[#E7E6DF] flex items-center gap-2 text-[#1E252B]">
            <span className="w-2 h-2 rounded-full bg-[#1E6B52]" />
            <span className="font-medium">Offline Capable: You can write copy and manage your calendar even without internet connectivity.</span>
          </div>
        </div>
      </div>

      {/* Reset & Storage Controls */}
      <div className="bg-white p-6 rounded-xl border border-[#E2E0D8] shadow-2xs space-y-4">
        <h2 className="text-base font-bold text-[#1E252B] border-b border-[#E7E6DF] pb-3 flex items-center gap-2">
          <RotateCcw className="w-4 h-4 text-[#C26638]" />
          <span>Data Reset & Clear Storage</span>
        </h2>

        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-lg border border-[#E7E6DF] bg-[#FBFBF9]">
            <div>
              <span className="text-xs font-bold text-[#1E252B] block">Restore Demo Workspace</span>
              <span className="text-[11px] text-[#64748B] block mt-0.5">
                Resets to "Harbor & Bean" specialty coffee shop sample data with realistic examples.
              </span>
            </div>
            <button
              onClick={() => setConfirmResetDemoOpen(true)}
              className="shrink-0 px-3 py-1.5 text-xs font-semibold bg-white hover:bg-[#F4F4F0] text-[#1E252B] border border-[#CBD5E1] rounded-md transition-colors"
            >
              Reset to Demo
            </button>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-lg border border-red-200 bg-red-50/40">
            <div>
              <span className="text-xs font-bold text-red-900 block">Clear All Local Storage</span>
              <span className="text-[11px] text-red-700 block mt-0.5">
                Permanently wipes all profiles, calendar posts, and saved content from this browser.
              </span>
            </div>
            <button
              onClick={() => setConfirmClearOpen(true)}
              className="shrink-0 px-3 py-1.5 text-xs font-semibold bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors"
            >
              Clear Storage
            </button>
          </div>
        </div>
      </div>

      {/* About LocalBiz Kit */}
      <div className="bg-white p-6 rounded-xl border border-[#E2E0D8] shadow-2xs space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#0F2942] text-white flex items-center justify-center font-bold text-xs">
            LB
          </div>
          <div>
            <h3 className="text-xs font-bold text-[#1E252B]">LOCALBIZ KIT</h3>
            <span className="text-[10px] text-[#64748B]">v1.0.0 Production Release</span>
          </div>
        </div>
        <p className="text-xs text-[#64748B] italic">
          "Your small business. A stronger online presence."
        </p>
        <p className="text-xs text-[#64748B] leading-relaxed">
          Crafted for independent coffee shops, restaurants, salons, barbers, gyms, dentists, real estate agents, and neighborhood local services who want clean, conversion-focused marketing without digital agency fees or overwhelming dashboards.
        </p>
      </div>

      {/* Reset confirmation modals */}
      <Modal
        isOpen={confirmResetDemoOpen}
        onClose={() => setConfirmResetDemoOpen(false)}
        title="Restore Sample Demo Workspace?"
        subtitle="This will replace your current workspace with the preloaded Harbor & Bean sample business."
      >
        <div className="space-y-4 text-xs">
          <p className="text-[#64748B]">
            All current drafts will be overwritten with the standard high-conversion demo business.
          </p>
          <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#E7E6DF]">
            <button
              onClick={() => setConfirmResetDemoOpen(false)}
              className="px-3 py-2 text-xs font-semibold text-[#64748B] hover:text-[#1E252B]"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onResetData();
                setConfirmResetDemoOpen(false);
                onShowToast('Workspace reset to Harbor & Bean demo!', 'info');
              }}
              className="px-4 py-2 text-xs font-semibold bg-[#0F2942] text-white rounded-lg hover:bg-[#1C3B5E]"
            >
              Confirm Restore
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={confirmClearOpen}
        onClose={() => setConfirmClearOpen(false)}
        title="Clear All Local Storage?"
        subtitle="This action cannot be undone."
      >
        <div className="space-y-4 text-xs">
          <div className="p-3 bg-red-50 text-red-800 rounded-lg flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0 text-red-600" />
            <span>Are you sure? All saved marketing copy and calendar items will be deleted permanently.</span>
          </div>
          <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#E7E6DF]">
            <button
              onClick={() => setConfirmClearOpen(false)}
              className="px-3 py-2 text-xs font-semibold text-[#64748B] hover:text-[#1E252B]"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onClearAll();
                setConfirmClearOpen(false);
                onShowToast('All local storage cleared', 'info');
              }}
              className="px-4 py-2 text-xs font-semibold bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Yes, Clear Everything
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
