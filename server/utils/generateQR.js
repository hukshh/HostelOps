import QRCode from "qrcode";

/**
 * QR code generation scaffold.
 *
 * Generates QR code images for:
 *   - Daily attendance tokens (JWT embedded in QR)
 *   - Leave pass verification codes
 *
 * Full implementations will be added in Phase 5 (Attendance & Leave).
 *
 * @param {string} data – The data/URL to encode in the QR code
 * @returns {Promise<string>} – Base64 data URL of the QR image
 */
export const generateQRDataURL = async (data) => {
  const qrDataUrl = await QRCode.toDataURL(data, {
    errorCorrectionLevel: "M",
    width: 300,
    margin: 2,
    color: {
      dark: "#1f2937",
      light: "#ffffff",
    },
  });
  return qrDataUrl;
};

/**
 * Generate a QR code as a Buffer (useful for embedding in PDFs).
 *
 * @param {string} data – The data/URL to encode
 * @returns {Promise<Buffer>} – PNG buffer of QR code
 */
export const generateQRBuffer = async (data) => {
  const buffer = await QRCode.toBuffer(data, {
    errorCorrectionLevel: "M",
    width: 300,
    margin: 2,
    color: {
      dark: "#1f2937",
      light: "#ffffff",
    },
  });
  return buffer;
};
