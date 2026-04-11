import { jsPDF } from 'jspdf';

/**
 * Utility to generate and download a PDF from text content
 */
export const generatePDF = (
  content: string,
  filename: string = 'mente-academica-documento.pdf'
) => {
  const doc = new jsPDF();

  // Set basic settings
  const margin = 20;
  const pageWidth = doc.internal.pageSize.getWidth();
  const contentWidth = pageWidth - margin * 2;

  // Header
  doc.setFontSize(18);
  doc.setTextColor(0, 0, 0);
  doc.text('SIFU - Sistema Integrado de Fluxo Universitário', margin, 20);

  // Line separator
  doc.setDrawColor(200, 200, 200);
  doc.line(margin, 25, pageWidth - margin, 25);

  // Body Content
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');

  // Sanitize content (remove markdown characters for basic PDF)
  // Simple regex to clean common markdown patterns for basic PDF generation
  const cleanContent = content
    .replace(/[#*`]/g, '')
    .split('\n')
    .map((line) => line.trim());

  let yPosition = 35;
  const lineHeight = 7;

  cleanContent.forEach((line) => {
    if (line === '') {
      yPosition += lineHeight;
      return;
    }

    const lines = doc.splitTextToSize(line, contentWidth);

    // Check if we need a new page
    if (yPosition + lines.length * lineHeight > doc.internal.pageSize.getHeight() - margin) {
      doc.addPage();
      yPosition = 20;
    }

    doc.text(lines, margin, yPosition);
    yPosition += lines.length * lineHeight;
  });

  // Save the PDF
  doc.save(filename);
};
