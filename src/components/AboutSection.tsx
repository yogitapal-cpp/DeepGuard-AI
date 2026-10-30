import React from 'react';
import {
  ShieldCheck,
  Cpu,
  Binary,
  Layers,
  FileCheck2,
  GraduationCap,
  BookOpen,
  Scale,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-16">
      {/* Header */}
      <div className="pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 mb-1">
          <span>DeepGuard AI System Architecture</span>
          <span aria-hidden="true">·</span>
          <span>Academic &amp; Industrial Forensic Specification</span>
        </div>
        <h2 className="text-2xl font-bold text-white tracking-tight">
          About DeepGuard AI &amp; Forensic Methodologies
        </h2>
        <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
          DeepGuard AI is an advanced forensic verification architecture engineered to counter digital misinformation, generative AI manipulation, and fraudulent document forgery through multimodal neural auditing.
        </p>
      </div>

      {/* College Major Project Overview Card */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-950/40 via-slate-900/60 to-purple-950/30 border border-indigo-900/40 space-y-3">
        <div className="flex items-center gap-2.5 text-indigo-400 font-semibold text-sm">
          <GraduationCap className="w-5 h-5" />
          <span>Major Project Technical Profile</span>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          Developed as an integrated media intelligence framework for advanced computer vision and multimedia security.
          The platform operates on a modular architecture separating visual media forensic extraction, temporal optical flow tracking, neural OCR document layout anomaly analysis, and grounded multimodal AI explainability.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2 text-xs font-mono">
          <div className="p-2.5 rounded bg-slate-950/60 border border-slate-800">
            <span className="text-slate-500 block text-[10px]">CORE MODEL</span>
            <span className="text-slate-200">EfficientNet-B4</span>
          </div>
          <div className="p-2.5 rounded bg-slate-950/60 border border-slate-800">
            <span className="text-slate-500 block text-[10px]">REASONING CORE</span>
            <span className="text-slate-200">Gemini 3.8 Flash</span>
          </div>
          <div className="p-2.5 rounded bg-slate-950/60 border border-slate-800">
            <span className="text-slate-500 block text-[10px]">FRONTEND FRAMEWORK</span>
            <span className="text-slate-200">React 19 + Tailwind</span>
          </div>
          <div className="p-2.5 rounded bg-slate-950/60 border border-slate-800">
            <span className="text-slate-500 block text-[10px]">REPORT STANDARD</span>
            <span className="text-slate-200">C2PA / NIST Guidelines</span>
          </div>
        </div>
      </div>

      {/* Deep Dive into Core Techniques */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
          <Binary className="w-4 h-4 text-indigo-400" />
          <span>Forensic Verification Techniques</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Method 1 */}
          <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
            <h4 className="text-sm font-semibold text-white flex items-center gap-2">
              <span className="text-indigo-400 font-mono text-xs">01.</span>
              <span>EfficientNet Convolutional Deepfake Classification</span>
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Leverages compound scaling (depth, width, and resolution) pre-trained on FaceForensics++, DFDC, and synthetic generative datasets. Identifies micro-texture anomalies, unnatural skin pores, pupil corneal reflection asymmetries, and facial boundary blend masks.
            </p>
          </div>

          {/* Method 2 */}
          <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
            <h4 className="text-sm font-semibold text-white flex items-center gap-2">
              <span className="text-indigo-400 font-mono text-xs">02.</span>
              <span>Error Level Analysis (ELA) &amp; Frequency Residuals</span>
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              When an image is saved in JPEG format, each $8\times 8$ pixel block reaches an equilibrium compression state. When an attacker modifies or composites an image (copy-pasting text, modifying faces), the altered region compresses at a differing rate, creating bright residual peaks in the ELA map.
            </p>
          </div>

          {/* Method 3 */}
          <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
            <h4 className="text-sm font-semibold text-white flex items-center gap-2">
              <span className="text-indigo-400 font-mono text-xs">03.</span>
              <span>Temporal Biometric Flow &amp; Blink Dynamics</span>
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Deepfake videos commonly suffer from inter-frame jitter, irregular optical flow vectors around facial boundaries, and unnatural eyelid blink rates (human eyes blink 15–20 times per minute in physiological patterns). DeepGuard evaluates keyframe sequences sequentially to spot frame-level discontinuities.
            </p>
          </div>

          {/* Method 4 */}
          <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
            <h4 className="text-sm font-semibold text-white flex items-center gap-2">
              <span className="text-indigo-400 font-mono text-xs">04.</span>
              <span>Document OCR &amp; Typographic Layout Anomalies</span>
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Analyzes character kerning, baseline vertical alignment displacement, font family substitutions, and rubber stamp edge masking. Identifies when an official certificate or marksheet has had recipient names or grades altered digitally.
            </p>
          </div>
        </div>
      </div>

      {/* Ethical & Legal Guardrails */}
      <div className="p-6 rounded-xl bg-slate-900/40 border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <Scale className="w-4 h-4 text-amber-400" />
          <span>Ethical Transparency &amp; Legal Limitations</span>
        </h3>
        <div className="space-y-3 text-xs text-slate-400 leading-relaxed">
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <p>
              <strong className="text-slate-200">No False Certainty: </strong>
              DeepGuard AI presents confidence percentages as statistical probability scores based on trained benchmarks. It never presents uncertain predictions as absolute facts.
            </p>
          </div>
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <p>
              <strong className="text-slate-200">Non-Government Verification Disclaimer: </strong>
              Visual and structural inspection alone cannot verify legal authenticity or institutional validity. DeepGuard explicitly reminds users to consult issuing universities, government registries, or authorized cryptographic notary databases for binding verification.
            </p>
          </div>
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <p>
              <strong className="text-slate-200">Zero Involuntary Data Retention: </strong>
              Analyzed media and document payloads are parsed in runtime memory during the session and are not stored permanently without explicit user consent.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
