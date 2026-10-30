import React, { useRef } from 'react';
import {
  Upload,
  Image as ImageIcon,
  Video as VideoIcon,
  FileCheck2,
  ArrowRight,
  Sparkles,
  Layers,
  SearchCheck,
  ScanEye,
} from 'lucide-react';
import heroBanner from '../assets/images/forensic_scanner_hero_1793283903804.jpg';
import deepfakeSample from '../assets/images/deepfake_face_sample_1793283902198.jpg';
import diplomaSample from '../assets/images/authentic_id_document_1793283901465.jpg';
import certificateSample from '../assets/images/tampered_certificate_1793283901977.jpg';

interface OverviewSectionProps {
  onSelectTab: (tab: string) => void;
  onLoadSample: (sampleType: 'deepfake_image' | 'authentic_doc' | 'tampered_doc' | 'video') => void;
  onFileUpload: (file: File) => void;
}

export const OverviewSection: React.FC<OverviewSectionProps> = ({
  onSelectTab,
  onLoadSample,
  onFileUpload,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileUpload(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* Hero Showcase Split */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-indigo-950/40 border border-slate-800 p-8 lg:p-10 shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-5">
            <div className="flex items-center gap-2 text-xs font-mono text-indigo-400">
              <span>DeepGuard AI Platform</span>
              <span aria-hidden="true">·</span>
              <span>EfficientNet-B4 + Forensic Pipeline</span>
              <span aria-hidden="true">·</span>
              <span>Real-time Auditing</span>
            </div>

            <h1 className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight text-balance">
              Intelligent Media &amp; Document Verification System
            </h1>

            <p className="text-slate-300 text-sm lg:text-base leading-relaxed max-w-xl">
              Inspect images, videos, and official documents for synthetic generative artifacts, deepfake face-swapping,
              localized font alterations, and structural tampering with explainable confidence scoring.
            </p>

            {/* Quick action buttons */}
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={() => onSelectTab('image')}
                className="px-4 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs flex items-center gap-2 transition-all shadow-lg shadow-indigo-600/20 active:scale-95"
              >
                <ImageIcon className="w-4 h-4" />
                <span>Verify Image</span>
              </button>
              <button
                onClick={() => onSelectTab('video')}
                className="px-4 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-medium text-xs flex items-center gap-2 transition-all active:scale-95"
              >
                <VideoIcon className="w-4 h-4" />
                <span>Verify Video</span>
              </button>
              <button
                onClick={() => onSelectTab('document')}
                className="px-4 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-medium text-xs flex items-center gap-2 transition-all active:scale-95"
              >
                <FileCheck2 className="w-4 h-4" />
                <span>Verify Document</span>
              </button>
            </div>
          </div>

          {/* Forensic Image Visual */}
          <div className="lg:col-span-5 relative group">
            <div className="relative rounded-xl overflow-hidden border border-slate-700 shadow-2xl bg-slate-900 aspect-video lg:aspect-[4/3]">
              <img
                src={heroBanner}
                alt="DeepGuard AI Forensic Scanner"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-4">
                <div className="flex items-center justify-between w-full text-xs font-mono text-slate-300">
                  <span>Biometric Mesh &amp; Spectrogram</span>
                  <span className="text-emerald-400">NOMINAL</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Universal Upload Dropzone */}
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className="cursor-pointer border-2 border-dashed border-slate-700/80 hover:border-indigo-500/80 rounded-2xl bg-slate-900/40 hover:bg-slate-900/70 p-8 text-center transition-all duration-200 group"
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,video/*,application/pdf"
          className="hidden"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              onFileUpload(e.target.files[0]);
            }
          }}
        />
        <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
          <Upload className="w-6 h-6" />
        </div>
        <h3 className="text-base font-semibold text-white mb-1">
          Drop any Image, Video, or Document here to begin inspection
        </h3>
        <p className="text-xs text-slate-400 max-w-md mx-auto">
          Supports PNG, JPG, JPEG, WEBP, MP4, MOV, and PDF files. DeepGuard auto-routes your file to the correct forensic pipeline.
        </p>
      </div>

      {/* One-Click Preloaded Test Benchmark Samples */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight">Interactive Benchmark Test Suite</h2>
            <p className="text-xs text-slate-400">
              Instantly test DeepGuard with calibrated ground-truth media and documents:
            </p>
          </div>
          <span className="text-xs font-mono text-slate-500">4 pre-calibrated cases</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Sample 1: Deepfake Face */}
          <div
            onClick={() => onLoadSample('deepfake_image')}
            className="cursor-pointer rounded-xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/50 p-4 transition-all duration-200 hover:-translate-y-0.5 group flex flex-col justify-between"
          >
            <div>
              <div className="aspect-square rounded-lg overflow-hidden mb-3 bg-slate-950 border border-slate-800 relative">
                <img
                  src={deepfakeSample}
                  alt="Synthetic face sample"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-2 left-2 text-[10px] font-mono px-2 py-0.5 rounded bg-rose-950/80 text-rose-300 border border-rose-800">
                  Synthetic Target
                </span>
              </div>
              <h4 className="text-sm font-semibold text-white group-hover:text-indigo-400 transition-colors">
                AI Face Generation
              </h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Diffusion-generated portrait with frequency boundary artifacts and iris reflection asymmetry.
              </p>
            </div>
            <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-indigo-400 font-medium">
              <span>Run Image Scan</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Sample 2: Authentic Certificate */}
          <div
            onClick={() => onLoadSample('authentic_doc')}
            className="cursor-pointer rounded-xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/50 p-4 transition-all duration-200 hover:-translate-y-0.5 group flex flex-col justify-between"
          >
            <div>
              <div className="aspect-square rounded-lg overflow-hidden mb-3 bg-slate-950 border border-slate-800 relative">
                <img
                  src={diplomaSample}
                  alt="Authentic Diploma Certificate"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-2 left-2 text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-800">
                  Authentic Control
                </span>
              </div>
              <h4 className="text-sm font-semibold text-white group-hover:text-emerald-400 transition-colors">
                University Diploma
              </h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Genuine academic credential with uniform font kerning, consistent guilloche margins, and intact gold seal.
              </p>
            </div>
            <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-emerald-400 font-medium">
              <span>Verify Document</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Sample 3: Tampered Document */}
          <div
            onClick={() => onLoadSample('tampered_doc')}
            className="cursor-pointer rounded-xl bg-slate-900/60 border border-slate-800 hover:border-rose-500/50 p-4 transition-all duration-200 hover:-translate-y-0.5 group flex flex-col justify-between"
          >
            <div>
              <div className="aspect-square rounded-lg overflow-hidden mb-3 bg-slate-950 border border-slate-800 relative">
                <img
                  src={certificateSample}
                  alt="Tampered Employment Certificate"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-2 left-2 text-[10px] font-mono px-2 py-0.5 rounded bg-rose-950/80 text-rose-300 border border-rose-800">
                  Tampered Sample
                </span>
              </div>
              <h4 className="text-sm font-semibold text-white group-hover:text-rose-400 transition-colors">
                Employment Certificate
              </h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Altered candidate name and date fields with mismatched font anti-aliasing and stamp edge clipping.
              </p>
            </div>
            <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-rose-400 font-medium">
              <span>Inspect Forgery</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Sample 4: Video Deepfake */}
          <div
            onClick={() => onLoadSample('video')}
            className="cursor-pointer rounded-xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/50 p-4 transition-all duration-200 hover:-translate-y-0.5 group flex flex-col justify-between"
          >
            <div>
              <div className="aspect-square rounded-lg overflow-hidden mb-3 bg-slate-950 border border-slate-800 relative flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
                  <VideoIcon className="w-6 h-6" />
                </div>
                <span className="absolute top-2 left-2 text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-950/80 text-indigo-300 border border-indigo-800">
                  Video Stream
                </span>
              </div>
              <h4 className="text-sm font-semibold text-white group-hover:text-indigo-400 transition-colors">
                Deepfake Video Stream
              </h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Temporal sequence analysis checking inter-frame eye blinking, facial warp boundaries, and optical flow vectors.
              </p>
            </div>
            <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-indigo-400 font-medium">
              <span>Scrub Timeline</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>

      {/* Forensic Capabilities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-colors">
          <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-4">
            <ScanEye className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white mb-2">EfficientNet Image Pipeline</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Multi-stage spatial and frequency decomposition using discrete cosine transform (DCT), Laplacian filter variance, and trained convolutional neural nets to detect generative anomalies.
          </p>
        </div>

        <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-colors">
          <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-4">
            <SearchCheck className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white mb-2">Document Anomaly Locator</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            OCR text extraction, typographic kerning consistency checking, baseline displacement analysis, and localized Error Level Analysis (ELA) to flag tampered signatures and altered numbers.
          </p>
        </div>

        <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-colors">
          <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-4">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white mb-2">AI Verification Assistant</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Interactive reasoning model (Gemini 3.8 Flash) connected to forensic metrics to explain confidence intervals, highlight suspicious regions, and provide verified next steps.
          </p>
        </div>
      </div>

      {/* Verification Pipeline Architecture */}
      <div className="p-6 rounded-xl bg-slate-900/30 border border-slate-800">
        <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4 flex items-center gap-2">
          <Layers className="w-4 h-4 text-indigo-400" />
          <span>DeepGuard 4-Stage Forensic Pipeline Architecture</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-lg bg-slate-950/60 border border-slate-800/80">
            <div className="text-xs font-mono text-indigo-400 mb-1">Stage 01</div>
            <div className="text-sm font-bold text-white mb-1">Ingestion &amp; Metadata</div>
            <p className="text-xs text-slate-400">EXIF extraction, C2PA provenance parsing, header quantization table inspection.</p>
          </div>
          <div className="p-4 rounded-lg bg-slate-950/60 border border-slate-800/80">
            <div className="text-xs font-mono text-indigo-400 mb-1">Stage 02</div>
            <div className="text-sm font-bold text-white mb-1">Frequency &amp; ELA</div>
            <p className="text-xs text-slate-400">Error Level Analysis simulation to locate compression gradient discontinuities.</p>
          </div>
          <div className="p-4 rounded-lg bg-slate-950/60 border border-slate-800/80">
            <div className="text-xs font-mono text-indigo-400 mb-1">Stage 03</div>
            <div className="text-sm font-bold text-white mb-1">Neural Feature Map</div>
            <p className="text-xs text-slate-400">EfficientNet-B4 CNN extraction trained on FaceForensics++ and synthetic benchmarks.</p>
          </div>
          <div className="p-4 rounded-lg bg-slate-950/60 border border-slate-800/80">
            <div className="text-xs font-mono text-indigo-400 mb-1">Stage 04</div>
            <div className="text-sm font-bold text-white mb-1">Report &amp; AI Counsel</div>
            <p className="text-xs text-slate-400">Probability calibration, downloadable PDF audit trail, and interactive AI consultation.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
