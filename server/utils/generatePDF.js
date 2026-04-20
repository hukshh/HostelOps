import PDFDocument from "pdfkit";

/**
 * PDF generation scaffold.
 *
 * This module provides helper functions for generating PDF documents
 * (payment receipts, leave passes, monthly reports).
 *
 * Full implementations will be added in Phase 4 (Payments) and Phase 5 (Leave).
 *
 * @param {Object} options
 * @param {string} options.title     – PDF document title
 * @param {Object} options.data      – Data to render in the PDF
 * @returns {Promise<Buffer>}        – PDF file as a Buffer
 */
export const generatePDF = async ({ title, data }) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: 50 });
    const chunks = [];

    doc.on("data", (chunk) => chunks.push(chunk));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);

    // ── Header ──────────────────────────────────────────
    doc
      .fontSize(22)
      .font("Helvetica-Bold")
      .text("HostelOps", { align: "center" })
      .moveDown(0.3);

    doc
      .fontSize(14)
      .font("Helvetica")
      .text(title, { align: "center" })
      .moveDown(1);

    doc
      .moveTo(50, doc.y)
      .lineTo(550, doc.y)
      .stroke()
      .moveDown(1);

    // ── Body (placeholder — extend per use-case) ────────
    if (data && typeof data === "object") {
      Object.entries(data).forEach(([key, value]) => {
        doc
          .fontSize(12)
          .font("Helvetica-Bold")
          .text(`${key}: `, { continued: true })
          .font("Helvetica")
          .text(String(value));
        doc.moveDown(0.5);
      });
    }

    // ── Footer ──────────────────────────────────────────
    doc.moveDown(2);
    doc
      .fontSize(10)
      .fillColor("#888888")
      .text(`Generated on ${new Date().toLocaleString()}`, { align: "center" });

    doc.end();
  });
};
