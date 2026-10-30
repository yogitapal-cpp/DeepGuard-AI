import React from 'react';
import {
  History,
  Trash2,
  ExternalLink,
  Download,
  ShieldCheck,
  AlertTriangle,
  HelpCircle,
  FileText,
  Image as ImageIcon,
  Film,
  Lock,
} from 'lucide-react';
import { AnyVerificationReport } from '../types';
import { generateVerificationPdf } from '../utils/pdfGenerator';

interface HistorySectionProps {
  history: AnyVerificationReport[];
  onOpenReport: (report: AnyVerificationReport) => void;
  onDeleteReport: (id: string) => void;
  onClearHistory: () => void;
  onNewScan: () => void;
}

export const HistorySection: React.FC<HistorySectionProps> = ({
  history,
  onOpenReport,
  onDeleteReport,
  onClearHistory,
  onNewScan,
}) => {
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <History className="w-5 h-5 text-indigo-400" />
            <span>Verification Audit Log &amp; History</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Review previous authenticity assessments, re-inspect visual artifacts, or export verified PDF records.
          </p>
        </div>

        {history.length > 0 && (
          <button
            onClick={onClearHistory}
            className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-rose-950/60 border border-slate-800 hover:border-rose-800 text-slate-400 hover:text-rose-300 text-xs font-medium flex items-center gap-1.5 transition-colors self-start sm:self-auto"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Log</span>
          </button>
        )}
      </div>

      {/* Privacy Notice */}
      <div className="p-3.5 rounded-xl bg-slate-900/40 border border-slate-800 flex items-center gap-3 text-xs text-slate-400">
        <Lock className="w-4 h-4 text-indigo-400 shrink-0" />
        <span>
          <strong className="text-slate-300">Confidentiality Protocol:</strong> In compliance with sensitive document privacy standards, media payloads are stored only in local session memory and are never uploaded to long-term public clouds.
        </span>
      </div>

      {/* History Table / Empty State */}
      {history.length > 0 ? (
        <div className="rounded-2xl bg-slate-900/60 border border-slate-800 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950/80 text-slate-400 font-mono text-[11px] uppercase tracking-wider border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">File Name &amp; Category</th>
                  <th className="py-3 px-4">Classification</th>
                  <th className="py-3 px-4 text-right">Confidence</th>
                  <th className="py-3 px-4">Timestamp</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {history.map((record) => {
                  const isFakeOrSuspicious =
                    record.verdict === 'FAKE' || record.verdict === 'SUSPICIOUS';
                  const isUncertain = record.verdict === 'UNCERTAIN';

                  return (
                    <tr
                      key={record.id}
                      className="hover:bg-slate-800/30 transition-colors group"
                    >
                      {/* Name & Type */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0 text-slate-400">
                            {record.fileType === 'image' ? (
                              <ImageIcon className="w-4 h-4 text-indigo-400" />
                            ) : record.fileType === 'video' ? (
                              <Film className="w-4 h-4 text-cyan-400" />
                            ) : (
                              <FileText className="w-4 h-4 text-purple-400" />
                            )}
                          </div>
                          <div>
                            <span className="font-semibold text-white block max-w-xs truncate">
                              {record.fileName}
                            </span>
                            <span className="text-[11px] text-slate-500 font-mono capitalize">
                              {record.fileType} · ID: {record.id}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Classification */}
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-mono font-semibold border ${
                            isFakeOrSuspicious
                              ? 'bg-rose-950/60 text-rose-300 border-rose-800'
                              : isUncertain
                              ? 'bg-amber-950/60 text-amber-300 border-amber-800'
                              : 'bg-emerald-950/60 text-emerald-300 border-emerald-800'
                          }`}
                        >
                          {isFakeOrSuspicious ? (
                            <AlertTriangle className="w-3 h-3" />
                          ) : isUncertain ? (
                            <HelpCircle className="w-3 h-3" />
                          ) : (
                            <ShieldCheck className="w-3 h-3" />
                          )}
                          <span>{record.verdict}</span>
                        </span>
                      </td>

                      {/* Confidence */}
                      <td className="py-3.5 px-4 text-right font-mono text-white tabular-nums font-semibold">
                        {record.confidence}%
                      </td>

                      {/* Timestamp */}
                      <td className="py-3.5 px-4 font-mono text-slate-400 text-[11px]">
                        {new Date(record.timestamp).toLocaleString()}
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => onOpenReport(record)}
                            title="Re-open report"
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => generateVerificationPdf(record)}
                            title="Download PDF"
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                          >
                            <Download className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => onDeleteReport(record.id)}
                            title="Delete entry"
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-950 text-slate-400 hover:text-rose-400 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="p-12 rounded-2xl bg-slate-900/40 border border-slate-800 text-center flex flex-col items-center justify-center space-y-3">
          <History className="w-10 h-10 text-slate-600 mb-1" />
          <h4 className="text-base font-semibold text-white">No Verification Records</h4>
          <p className="text-xs text-slate-400 max-w-sm">
            Run an image, video, or document scan to build a persistent verification audit trail.
          </p>
          <button
            onClick={onNewScan}
            className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/20 transition-all active:scale-95"
          >
            Start First Inspection
          </button>
        </div>
      )}
    </div>
  );
};
