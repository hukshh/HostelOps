import crypto from "crypto";

/**
 * Generate a cryptographically random 6-digit OTP.
 *
 * Uses crypto.randomInt for uniform distribution (no modulo bias).
 * Returns the OTP as a zero-padded string (e.g. "007342").
 *
 * @returns {string} 6-digit OTP
 */
const generateOTP = () => {
  const otp = crypto.randomInt(100000, 999999);
  return otp.toString();
};

export default generateOTP;
