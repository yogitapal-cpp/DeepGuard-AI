export type VerdictType = 'REAL' | 'FAKE' | 'UNCERTAIN';
export type DocumentVerdictType = 'VERIFIED-LOOKING' | 'SUSPICIOUS' | 'UNCERTAIN';

export interface ImageVerificationResult {
  id: string;
  fileName: string;
  fileType: 'image';
  verdict: VerdictType;
  confidence: number;
  modelUsed: string;
  explanation: string;
  technicalDetails: {
    resolution: string;
    format: string;
    fileSizeFormatted: string;
    processingTimeMs: number;
  };
  indicators: {
    elaAnomalyScore: number;
    noiseConsistency: number;
    facialArtifacts: number;
    spectralDiscontinuity: number;
  };
  markers: string[];
  previewUrl: string;
  timestamp: string;
}

export interface VideoFramePrediction {
  frameIndex: number;
  timestampSec: number;
  verdict: VerdictType;
  confidence: number;
  suspiciousTags: string[];
  thumbnailUrl?: string;
}

export interface VideoVerificationResult {
  id: string;
  fileName: string;
  fileType: 'video';
  verdict: VerdictType;
  confidence: number;
  modelUsed: string;
  explanation: string;
  technicalDetails: {
    duration: string;
    fps: number;
    analyzedFrames: number;
    resolution: string;
    processingTimeMs: number;
  };
  frameTimeline: VideoFramePrediction[];
  suspiciousFrameCount: number;
  previewUrl: string;
  timestamp: string;
}

export interface SuspiciousDocumentRegion {
  id: string;
  label: string;
  x: number; // percentage
  y: number; // percentage
  width: number;
  height: number;
  severity: 'low' | 'medium' | 'high';
  reason: string;
}

export interface DocumentVerificationResult {
  id: string;
  fileName: string;
  fileType: 'document';
  verdict: DocumentVerdictType;
  confidence: number;
  documentType: string;
  summary: string;
  extractedFields: Record<string, string>;
  anomalyDetails: string[];
  suspiciousRegions: SuspiciousDocumentRegion[];
  legalDisclaimer: string;
  technicalDetails: {
    format: string;
    processingTimeMs: number;
    ocrEngine: string;
  };
  previewUrl: string;
  timestamp: string;
}

export type AnyVerificationReport =
  | ImageVerificationResult
  | VideoVerificationResult
  | DocumentVerificationResult;

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  contextReportId?: string;
}
