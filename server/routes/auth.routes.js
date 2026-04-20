import { Router } from "express";
import validate from "../middlewares/validate.middleware.js";
import {
  registerSchema,
  verifyOTPSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} from "../validations/auth.validation.js";
import {
  register,
  verifyOTP,
  login,
  refresh,
  logout,
  forgotPassword,
  resetPassword,
} from "../controllers/auth.controller.js";

const router = Router();

/**
 * Auth Routes
 *
 * All routes are public (no verifyAccessToken middleware).
 * Request bodies are validated with Zod before reaching controllers.
 *
 * POST /api/auth/register         – Create account + send OTP email
 * POST /api/auth/verify-otp       – Verify email with OTP
 * POST /api/auth/login            – Login + get tokens
 * POST /api/auth/refresh          – Get new access token from refresh cookie
 * POST /api/auth/logout           – Revoke refresh token + clear cookie
 * POST /api/auth/forgot-password  – Send password reset OTP
 * POST /api/auth/reset-password   – Verify OTP + set new password
 */

router.post("/register", validate(registerSchema), register);
router.post("/verify-otp", validate(verifyOTPSchema), verifyOTP);
router.post("/login", validate(loginSchema), login);
router.post("/refresh", refresh);
router.post("/logout", logout);
router.post("/forgot-password", validate(forgotPasswordSchema), forgotPassword);
router.post("/reset-password", validate(resetPasswordSchema), resetPassword);

export default router;
