import React from 'react';
import { PlusCircle, FileCheck } from 'lucide-react';
import { AnyVerificationReport } from '../types';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  activeReport: AnyVerificationReport | null;
  onNewScan: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  activeReport,
  onNewScan,
}) => {
  return (
    <header className="h-16 px-6 border-b border-slate-800/80 bg-slate-950/70 backdrop-blur-md flex items-center justify-between gap-8 shrink-0 z-20">
      {/* Zone 1: Single element Breadcrumb / Context Wordmark */}
      <div className="flex items-center gap-3 text-sm whitespace-nowrap shrink-0">
        <span className="font-semibold text-slate-100">DeepGuard Console</span>
        <span className="text-slate-600">/</span>
        <span className="text-slate-400 capitalize">
          {activeTab === 'overview'
            ? 'System Overview'
            : activeTab === 'image'
            ? 'Image Authenticity'
            : activeTab === 'video'
            ? 'Video Deepfakes'
            : activeTab === 'document'
            ? 'Document Integrity'
            : activeTab === 'chatbot'
            ? 'Forensic Assistant'
            : activeTab === 'history'
            ? 'Audit Logs'
            : 'Methodology'}
        </span>
        {activeReport && (
          <span className="hidden lg:inline-flex items-center gap-1.5 px-2 py-0.5 text-xs font-mono rounded bg-slate-900 border border-slate-700 text-slate-300">
            <FileCheck className="w-3 h-3 text-indigo-400" />
            <span className="max-w-[140px] truncate">{activeReport.fileName}</span>
          </span>
        )}
      </div>

      {/* Zone 2: Clean single-line text navigation links */}
      <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-400">
        <button
          onClick={() => setActiveTab('image')}
          className={`hover:text-slate-100 transition-colors whitespace-nowrap shrink-0 ${
            activeTab === 'image' ? 'text-indigo-400' : ''
          }`}
        >
          Image Detection
        </button>
        <button
          onClick={() => setActiveTab('video')}
          className={`hover:text-slate-100 transition-colors whitespace-nowrap shrink-0 ${
            activeTab === 'video' ? 'text-indigo-400' : ''
          }`}
        >
          Video Deepfakes
        </button>
        <button
          onClick={() => setActiveTab('document')}
          className={`hover:text-slate-100 transition-colors whitespace-nowrap shrink-0 ${
            activeTab === 'document' ? 'text-indigo-400' : ''
          }`}
        >
          Document Verifier
        </button>
        <button
          onClick={() => setActiveTab('chatbot')}
          className={`hover:text-slate-100 transition-colors whitespace-nowrap shrink-0 ${
            activeTab === 'chatbot' ? 'text-indigo-400' : ''
          }`}
        >
          Forensic AI Chat
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`hover:text-slate-100 transition-colors whitespace-nowrap shrink-0 ${
            activeTab === 'history' ? 'text-indigo-400' : ''
          }`}
        >
          History
        </button>
      </nav>

      {/* Zone 3: Actions */}
      <div className="flex items-center gap-2.5 shrink-0">
        <a
          href="/api/download-zip"
          download="deepguard-ai.zip"
          title="Download entire code as ZIP to run in VS Code"
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-indigo-500/50 rounded-lg shadow-sm transition-all whitespace-nowrap shrink-0 active:scale-95"
        >
          <svg className="w-3.5 h-3.5 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          <span>Download Code (.ZIP)</span>
        </a>
        <button
          onClick={onNewScan}
          className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg hover:from-indigo-500 hover:to-purple-500 shadow-md shadow-indigo-600/20 transition-all whitespace-nowrap shrink-0 active:scale-95"
        >
          <PlusCircle className="w-3.5 h-3.5" />
          <span>New Inspection</span>
        </button>
      </div>
    </header>
  );
};
