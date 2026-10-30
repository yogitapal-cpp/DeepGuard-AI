import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Navbar } from './components/Navbar';
import { OverviewSection } from './components/OverviewSection';
import { ImageVerificationSection } from './components/ImageVerificationSection';
import { VideoVerificationSection } from './components/VideoVerificationSection';
import { DocumentVerificationSection } from './components/DocumentVerificationSection';
import { ChatbotSection } from './components/ChatbotSection';
import { HistorySection } from './components/HistorySection';
import { AboutSection } from './components/AboutSection';
import { AnyVerificationReport, ImageVerificationResult, VideoVerificationResult, DocumentVerificationResult } from './types';

import deepfakeFaceSample from './assets/images/deepfake_face_sample_1793283902198.jpg';
import authenticDiplomaSample from './assets/images/authentic_id_document_1793283901465.jpg';
import tamperedCertificateSample from './assets/images/tampered_certificate_1793283901977.jpg';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [activeReport, setActiveReport] = useState<AnyVerificationReport | null>(null);
  const [history, setHistory] = useState<AnyVerificationReport[]>([]);

  // Pre-seed history with calibrated benchmark examples for initial demonstration
  useEffect(() => {
    const initialSeed: AnyVerificationReport[] = [
      {
        id: 'IMG-SYNTH-941',
        fileName: 'synthetic_portrait_midjourney.jpg',
        fileType: 'image',
        verdict: 'FAKE',
        confidence: 94.8,
        modelUsed: 'EfficientNet-B4 + Forensic Ensemble v2.8',
        explanation: 'High-frequency spectral irregularities, smoothed skin micro-textures, and unnatural iris reflections detected.',
        technicalDetails: {
          resolution: '1024 × 1024',
          format: 'JPEG',
          fileSizeFormatted: '482.1 KB',
          processingTimeMs: 620,
        },
        indicators: {
          elaAnomalyScore: 78.5,
          noiseConsistency: 34,
          facialArtifacts: 86.4,
          spectralDiscontinuity: 82.1,
        },
        markers: ['Synthetic generative generator signature tags', 'Missing hardware sensor Bayer CFA pattern'],
        previewUrl: deepfakeFaceSample,
        timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
      },
      {
        id: 'DOC-BERK-204',
        fileName: 'berkeley_graduation_diploma.jpg',
        fileType: 'document',
        verdict: 'VERIFIED-LOOKING',
        confidence: 91.2,
        documentType: 'University Diploma Certificate',
        summary: 'No significant suspicious indicators detected. Typographic baseline alignments and gold embossed seal boundaries verified.',
        extractedFields: {
          'Institution': 'University of California, Berkeley',
          'Candidate Name': 'Sarah Elizabeth Chen',
          'Degree': 'Bachelor of Arts in English Literature',
          'Conferral Date': 'May 14, 2024',
        },
        anomalyDetails: [
          'Uniform font glyph anti-aliasing and kerning',
          'Guilloche security border pattern intact',
          'Consistent paper fiber texture',
        ],
        suspiciousRegions: [],
        legalDisclaimer:
          'IMPORTANT LEGAL NOTICE: DeepGuard AI provides algorithmic forensic assistance only. Visual and structural analysis alone cannot establish legal validity.',
        technicalDetails: {
          format: 'image/jpeg',
          processingTimeMs: 780,
          ocrEngine: 'Neural OCR & Structural Font Analyzer v3.1',
        },
        previewUrl: authenticDiplomaSample,
        timestamp: new Date(Date.now() - 3600000 * 5).toISOString(),
      },
    ];

    setHistory(initialSeed);
  }, []);

  const handleAnalysisComplete = (newReport: AnyVerificationReport) => {
    setActiveReport(newReport);
    setHistory((prev) => [newReport, ...prev.filter((r) => r.id !== newReport.id)]);
  };

  const handleOpenReportFromHistory = (report: AnyVerificationReport) => {
    setActiveReport(report);
    if (report.fileType === 'image') setActiveTab('image');
    else if (report.fileType === 'video') setActiveTab('video');
    else if (report.fileType === 'document') setActiveTab('document');
  };

  const handleDeleteReport = (id: string) => {
    setHistory((prev) => prev.filter((r) => r.id !== id));
    if (activeReport?.id === id) {
      setActiveReport(null);
    }
  };

  const handleClearHistory = () => {
    setHistory([]);
    setActiveReport(null);
  };

  const handleOpenChatWithReport = (report: AnyVerificationReport) => {
    setActiveReport(report);
    setActiveTab('chatbot');
  };

  // One-click benchmark loader
  const handleLoadSample = (sampleType: 'deepfake_image' | 'authentic_doc' | 'tampered_doc' | 'video') => {
    if (sampleType === 'deepfake_image') {
      const sampleReport: ImageVerificationResult = {
        id: `IMG-${Date.now().toString(36).toUpperCase()}`,
        fileName: 'diffusion_synthetic_face.jpg',
        fileType: 'image',
        verdict: 'FAKE',
        confidence: 95.2,
        modelUsed: 'EfficientNet-B4 + Forensic Ensemble v2.8',
        explanation: 'Generative AI diffusion anomalies detected: iris corneal reflections show asymmetric specular highlights and high-frequency Fourier energy lacks natural sensor noise distribution.',
        technicalDetails: {
          resolution: '1024 × 1024',
          format: 'JPEG',
          fileSizeFormatted: '412.5 KB',
          processingTimeMs: 680,
        },
        indicators: {
          elaAnomalyScore: 81.2,
          noiseConsistency: 38,
          facialArtifacts: 88.5,
          spectralDiscontinuity: 84.6,
        },
        markers: [
          'High frequency Fourier spectral discontinuity',
          'Pupil reflection asymmetry (left vs right eye)',
          'Skin pore micro-smoothing characteristic of diffusion networks',
        ],
        previewUrl: deepfakeFaceSample,
        timestamp: new Date().toISOString(),
      };
      setActiveReport(sampleReport);
      setHistory((prev) => [sampleReport, ...prev]);
      setActiveTab('image');
    } else if (sampleType === 'authentic_doc') {
      const sampleReport: DocumentVerificationResult = {
        id: `DOC-${Date.now().toString(36).toUpperCase()}`,
        fileName: 'authentic_university_diploma.jpg',
        fileType: 'document',
        verdict: 'VERIFIED-LOOKING',
        confidence: 92.4,
        documentType: 'University Degree Certificate',
        summary: 'No significant suspicious indicators detected. Typographic kerning, uniform baseline margins, and intact gold security seal verified.',
        extractedFields: {
          'Issuing Authority': 'University of California, Berkeley',
          'Recipient Name': 'Sarah Elizabeth Chen',
          'Degree Awarded': 'Bachelor of Arts in English Literature',
          'Issue Date': 'May 14, 2024',
          'Signatories': 'Carol T. Christ, Chancellor · Gary S. May, Dean',
        },
        anomalyDetails: [
          'Uniform font glyph anti-aliasing and kerning consistency',
          'Intact security border and gold seal rosette',
          'Consistent paper fiber texture and compression quantization',
        ],
        suspiciousRegions: [],
        legalDisclaimer:
          'IMPORTANT LEGAL NOTICE: DeepGuard AI provides algorithmic forensic assistance only. Visual and structural analysis alone cannot establish whether an official document is legally valid or genuinely issued. This system does NOT query government or institutional databases.',
        technicalDetails: {
          format: 'image/jpeg',
          processingTimeMs: 810,
          ocrEngine: 'Neural OCR & Structural Font Analyzer v3.1',
        },
        previewUrl: authenticDiplomaSample,
        timestamp: new Date().toISOString(),
      };
      setActiveReport(sampleReport);
      setHistory((prev) => [sampleReport, ...prev]);
      setActiveTab('document');
    } else if (sampleType === 'tampered_doc') {
      const sampleReport: DocumentVerificationResult = {
        id: `DOC-${Date.now().toString(36).toUpperCase()}`,
        fileName: 'tampered_employment_certificate.jpg',
        fileType: 'document',
        verdict: 'SUSPICIOUS',
        confidence: 94.6,
        documentType: 'Certificate of Employment & Income Verification',
        summary: 'Potential signs of manipulation detected: typographic baseline displacement on the employee and salary fields accompanied by localized JPEG re-compression blocking.',
        extractedFields: {
          'Document Title': 'Certificate of Employment & Income Verification',
          'Employee Name': '[ALTERED FIELD: Robert Vance]',
          'Employee ID': 'EMP-89210-X',
          'Stated Hire Date': 'October 12, 2024',
        },
        anomalyDetails: [
          'Font substitution detected on Employee Name line (kerning mismatch)',
          'Localized JPEG Error Level delta > 44% on salary block',
          'Digital rubber stamp overlay shows hard alpha clipping edges',
        ],
        suspiciousRegions: [
          {
            id: 'sr-1',
            label: 'Altered Recipient Field',
            x: 22,
            y: 42,
            width: 56,
            height: 9,
            severity: 'high',
            reason: 'Inconsistent font glyph anti-aliasing and pixel resolution delta compared to the surrounding certificate text.',
          },
          {
            id: 'sr-2',
            label: 'Stamp Mask Border',
            x: 64,
            y: 57,
            width: 22,
            height: 22,
            severity: 'medium',
            reason: 'Sharp digital mask border clipping over underlying texture fibers.',
          },
        ],
        legalDisclaimer:
          'IMPORTANT LEGAL NOTICE: DeepGuard AI provides algorithmic forensic assistance only. Visual and structural analysis alone cannot establish whether an official document is legally valid or genuinely issued. This system does NOT query government or institutional databases.',
        technicalDetails: {
          format: 'image/jpeg',
          processingTimeMs: 790,
          ocrEngine: 'Neural OCR & Structural Font Analyzer v3.1',
        },
        previewUrl: tamperedCertificateSample,
        timestamp: new Date().toISOString(),
      };
      setActiveReport(sampleReport);
      setHistory((prev) => [sampleReport, ...prev]);
      setActiveTab('document');
    } else if (sampleType === 'video') {
      const sampleReport: VideoVerificationResult = {
        id: `VID-${Date.now().toString(36).toUpperCase()}`,
        fileName: 'sample_deepfake_face_swap.mp4',
        fileType: 'video',
        verdict: 'FAKE',
        confidence: 93.8,
        modelUsed: 'EfficientNet-Temporal-GRU Biometric Engine',
        explanation: 'Temporal analysis detected recurrent facial boundary distortions across frames 4 through 9 with unnatural eyelid blink frequency.',
        technicalDetails: {
          duration: '8.4s',
          fps: 30,
          analyzedFrames: 12,
          resolution: '1920 × 1080 (FHD)',
          processingTimeMs: 1420,
        },
        frameTimeline: Array.from({ length: 12 }, (_, i) => {
          const isSuspicious = i >= 3 && i <= 8;
          return {
            frameIndex: i + 1,
            timestampSec: Math.round(i * 0.7 * 10) / 10,
            verdict: isSuspicious ? 'FAKE' : 'REAL',
            confidence: isSuspicious ? 92 : 88,
            suspiciousTags: isSuspicious
              ? ['Facial warp boundary jitter', 'Inconsistent eyelid blink interval']
              : ['Consistent biometric landmarks'],
          };
        }),
        suspiciousFrameCount: 6,
        previewUrl: '',
        timestamp: new Date().toISOString(),
      };
      setActiveReport(sampleReport);
      setHistory((prev) => [sampleReport, ...prev]);
      setActiveTab('video');
    }
  };

  // Universal file drop router
  const handleUniversalFileUpload = (file: File) => {
    if (file.type.startsWith('video/')) {
      setActiveTab('video');
    } else if (file.type === 'application/pdf' || file.name.toLowerCase().includes('doc') || file.name.toLowerCase().includes('cert')) {
      setActiveTab('document');
    } else {
      setActiveTab('image');
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-950 text-slate-100">
      {/* Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        historyCount={history.length}
        hasActiveReport={Boolean(activeReport)}
      />

      {/* Main Content Viewport */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Bar Contract compliant Navbar */}
        <Navbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          activeReport={activeReport}
          onNewScan={() => setActiveTab('overview')}
        />

        {/* Scrollable Viewport Frame */}
        <main className="flex-1 overflow-y-auto px-6 py-6">
          {activeTab === 'overview' && (
            <OverviewSection
              onSelectTab={setActiveTab}
              onLoadSample={handleLoadSample}
              onFileUpload={handleUniversalFileUpload}
            />
          )}

          {activeTab === 'image' && (
            <ImageVerificationSection
              initialReport={activeReport?.fileType === 'image' ? (activeReport as ImageVerificationResult) : null}
              onAnalysisComplete={handleAnalysisComplete}
              onOpenChatWithReport={handleOpenChatWithReport}
            />
          )}

          {activeTab === 'video' && (
            <VideoVerificationSection
              initialReport={activeReport?.fileType === 'video' ? (activeReport as VideoVerificationResult) : null}
              onAnalysisComplete={handleAnalysisComplete}
              onOpenChatWithReport={handleOpenChatWithReport}
            />
          )}

          {activeTab === 'document' && (
            <DocumentVerificationSection
              initialReport={activeReport?.fileType === 'document' ? (activeReport as DocumentVerificationResult) : null}
              onAnalysisComplete={handleAnalysisComplete}
              onOpenChatWithReport={handleOpenChatWithReport}
            />
          )}

          {activeTab === 'chatbot' && (
            <ChatbotSection
              activeReport={activeReport}
              onClearReportContext={() => setActiveReport(null)}
            />
          )}

          {activeTab === 'history' && (
            <HistorySection
              history={history}
              onOpenReport={handleOpenReportFromHistory}
              onDeleteReport={handleDeleteReport}
              onClearHistory={handleClearHistory}
              onNewScan={() => setActiveTab('overview')}
            />
          )}

          {activeTab === 'about' && <AboutSection />}
        </main>
      </div>
    </div>
  );
}
