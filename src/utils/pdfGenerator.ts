import jsPDF from 'jspdf';
import { AnyVerificationReport } from '../types';

export function generateVerificationPdf(report: AnyVerificationReport): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  let currentY = 18;

  // Background Dark Header Banner
  doc.setFillColor(11, 15, 25);
  doc.rect(0, 0, pageWidth, 42, 'F');

  // Accent Line
  doc.setFillColor(99, 102, 241);
  doc.rect(0, 42, pageWidth, 2, 'F');

  // Title
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.text('DEEPGUARD AI', 16, currentY);

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(156, 163, 175);
  doc.text('Digital Media Forensics & Document Verification Protocol', 16, currentY + 6);

  // Report ID & Date in top right
  doc.setFontSize(8.5);
  doc.setTextColor(209, 213, 219);
  doc.text(`REPORT ID: ${report.id.toUpperCase()}`, pageWidth - 16, currentY, { align: 'right' });
  doc.text(`ISSUED: ${new Date(report.timestamp).toUTCString()}`, pageWidth - 16, currentY + 5, { align: 'right' });
  doc.text('STANDARD: NIST & C2PA Media Integrity Framework', pageWidth - 16, currentY + 10, { align: 'right' });

  currentY = 56;

  // Verification Verdict Box
  const isSuspiciousOrFake = report.verdict === 'FAKE' || report.verdict === 'SUSPICIOUS';
  const isUncertain = report.verdict === 'UNCERTAIN';

  if (isSuspiciousOrFake) {
    doc.setFillColor(254, 242, 242);
    doc.setDrawColor(239, 68, 68);
    doc.setTextColor(185, 28, 28);
  } else if (isUncertain) {
    doc.setFillColor(255, 251, 235);
    doc.setDrawColor(245, 158, 11);
    doc.setTextColor(180, 83, 9);
  } else {
    doc.setFillColor(240, 253, 244);
    doc.setDrawColor(34, 197, 94);
    doc.setTextColor(21, 128, 61);
  }

  doc.roundedRect(16, currentY, pageWidth - 32, 24, 3, 3, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text(`VERDICT: ${report.verdict}`, 22, currentY + 11);

  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.text(`CONFIDENCE: ${report.confidence}%`, pageWidth - 22, currentY + 11, { align: 'right' });

  doc.setFontSize(8.5);
  doc.setTextColor(107, 114, 128);
  doc.text(
    `Inspection Engine: ${report.fileType === 'document' ? report.technicalDetails.ocrEngine : report.modelUsed}`,
    22,
    currentY + 19
  );

  currentY += 34;

  // File Details Section
  doc.setTextColor(17, 24, 39);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text('1. File Specifications', 16, currentY);

  currentY += 6;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(55, 65, 81);

  const fileSpecs: [string, string][] = [
    ['Target File Name:', report.fileName],
    ['Inspection Category:', report.fileType.toUpperCase()],
    [
      'Resolution / Format:',
      report.fileType === 'image'
        ? `${report.technicalDetails.resolution} (${report.technicalDetails.format})`
        : report.fileType === 'video'
        ? `${report.technicalDetails.resolution} · ${report.technicalDetails.fps} FPS · ${report.technicalDetails.duration}`
        : `${report.documentType} (${report.technicalDetails.format})`,
    ],
    ['Computation Latency:', `${report.technicalDetails.processingTimeMs} ms`],
  ];

  fileSpecs.forEach(([label, value]) => {
    doc.setFont('helvetica', 'bold');
    doc.text(label, 18, currentY);
    doc.setFont('helvetica', 'normal');
    doc.text(value, 68, currentY);
    currentY += 6;
  });

  currentY += 6;

  // Analysis Summary
  doc.setTextColor(17, 24, 39);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text('2. Algorithmic Forensic Findings', 16, currentY);

  currentY += 6;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(55, 65, 81);

  const findingSummary = report.fileType === 'document' ? report.summary : report.explanation;
  const splitText = doc.splitTextToSize(findingSummary, pageWidth - 36);
  doc.text(splitText, 18, currentY);
  currentY += splitText.length * 5.2 + 4;

  // Specific indicators
  if (report.fileType === 'image') {
    doc.setFont('helvetica', 'bold');
    doc.text('Forensic Indicator Metrics:', 18, currentY);
    currentY += 6;
    doc.setFont('helvetica', 'normal');
    doc.text(`• Error Level Analysis (ELA) Anomaly: ${report.indicators.elaAnomalyScore}/100`, 22, currentY);
    currentY += 5;
    doc.text(`• Sensor Noise Consistency: ${report.indicators.noiseConsistency}%`, 22, currentY);
    currentY += 5;
    doc.text(`• Facial Morph & Boundary Artifacts: ${report.indicators.facialArtifacts}/100`, 22, currentY);
    currentY += 5;
    doc.text(`• High-Frequency Fourier Discontinuity: ${report.indicators.spectralDiscontinuity}/100`, 22, currentY);
    currentY += 8;

    if (report.markers.length > 0) {
      doc.setFont('helvetica', 'bold');
      doc.text('Observed Signal Markers:', 18, currentY);
      currentY += 5;
      doc.setFont('helvetica', 'normal');
      report.markers.forEach((m) => {
        doc.text(`- ${m}`, 22, currentY);
        currentY += 5;
      });
    }
  } else if (report.fileType === 'video') {
    doc.setFont('helvetica', 'bold');
    doc.text(`Keyframe Temporal Timeline (${report.technicalDetails.analyzedFrames} frames sampled):`, 18, currentY);
    currentY += 6;
    doc.setFont('helvetica', 'normal');
    report.frameTimeline.slice(0, 8).forEach((f) => {
      doc.text(
        `Frame #${f.frameIndex} (${f.timestampSec}s) — ${f.verdict} (${f.confidence}%): ${f.suspiciousTags.join(', ')}`,
        22,
        currentY
      );
      currentY += 5;
    });
    currentY += 4;
  } else if (report.fileType === 'document') {
    if (report.suspiciousRegions.length > 0) {
      doc.setFont('helvetica', 'bold');
      doc.text('Flagged Document Regions:', 18, currentY);
      currentY += 6;
      doc.setFont('helvetica', 'normal');
      report.suspiciousRegions.forEach((r) => {
        doc.text(`[${r.severity.toUpperCase()}] ${r.label}: ${r.reason}`, 22, currentY);
        currentY += 5;
      });
      currentY += 4;
    }

    if (report.anomalyDetails.length > 0) {
      doc.setFont('helvetica', 'bold');
      doc.text('Structural & Font Integrity Observations:', 18, currentY);
      currentY += 5;
      doc.setFont('helvetica', 'normal');
      report.anomalyDetails.forEach((a) => {
        doc.text(`• ${a}`, 22, currentY);
        currentY += 5;
      });
      currentY += 4;
    }
  }

  // Legal Disclaimer & Footer
  currentY = Math.max(currentY + 6, 245);
  doc.setDrawColor(229, 231, 235);
  doc.line(16, currentY, pageWidth - 16, currentY);
  currentY += 5;

  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(107, 114, 128);
  doc.text('LEGAL NOTICE & VERIFICATION LIMITATIONS:', 16, currentY);
  currentY += 4;
  doc.setFont('helvetica', 'normal');
  const disclaimer =
    'DeepGuard AI provides algorithmic forensic analysis and heuristic likelihood assessments. Automated visual inspection alone CANNOT establish whether an official certificate, identity card, or legal instrument is genuinely issued, certified, or legally binding. DeepGuard does not verify against government or national databases. This report does not constitute a certified legal notarization.';
  const disclaimerLines = doc.splitTextToSize(disclaimer, pageWidth - 32);
  doc.text(disclaimerLines, 16, currentY);

  doc.save(`DeepGuard_Verification_Report_${report.id}.pdf`);
}
