import React from 'react';
import {
  ShieldCheck,
  Image as ImageIcon,
  Video as VideoIcon,
  FileText,
  Bot,
  History,
  Info,
  Activity,
  Cpu,
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  historyCount: number;
  hasActiveReport: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  historyCount,
  hasActiveReport,
}) => {
  const navItems = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'image', label: 'Image Verification', icon: ImageIcon },
    { id: 'video', label: 'Video Verification', icon: VideoIcon },
    { id: 'document', label: 'Document Verification', icon: FileText },
    { id: 'chatbot', label: 'AI Forensic Chatbot', icon: Bot, badge: hasActiveReport ? 'Context Loaded' : undefined },
    { id: 'history', label: 'Verification History', icon: History, count: historyCount },
    { id: 'about', label: 'About & Methodology', icon: Info },
  ];

  return (
    <aside className="w-64 bg-slate-950/80 border-r border-slate-800/80 flex flex-col justify-between shrink-0 select-none">
      <div className="p-5">
        {/* Brand Header */}
        <div className="flex items-center gap-3 px-2 py-1 mb-6">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-500 via-purple-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <ShieldCheck className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="font-bold text-base tracking-tight text-white flex items-center gap-1.5">
              DeepGuard <span className="text-xs font-semibold px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">AI</span>
            </div>
            <p className="text-[11px] text-slate-400">Forensic Media Intelligence</p>
          </div>
        </div>

        {/* Navigation list */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                  isActive
                    ? 'bg-gradient-to-r from-indigo-600/30 to-purple-600/20 text-white border border-indigo-500/30 shadow-sm shadow-indigo-500/10'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                <div className="flex items-center gap-3 truncate">
                  <Icon
                    className={`w-4 h-4 shrink-0 transition-colors ${
                      isActive ? 'text-indigo-400' : 'text-slate-400 group-hover:text-slate-300'
                    }`}
                  />
                  <span className="truncate">{item.label}</span>
                </div>
                {item.count !== undefined && item.count > 0 && (
                  <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                    {item.count}
                  </span>
                )}
                {item.badge && (
                  <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    Live
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Engine Status Footer */}
      <div className="p-4 m-3 rounded-xl bg-slate-900/70 border border-slate-800/80 text-xs">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5 text-slate-300 font-medium">
            <Cpu className="w-3.5 h-3.5 text-indigo-400" />
            <span>Forensic Stack</span>
          </div>
          <span className="text-[10px] font-mono text-emerald-400">ACTIVE</span>
        </div>
        <p className="text-[11px] text-slate-400 leading-relaxed">
          EfficientNet-B4 Neural Core + Gemini 3.8 Flash Multimodal Reasoning Engine.
        </p>
      </div>
    </aside>
  );
};
