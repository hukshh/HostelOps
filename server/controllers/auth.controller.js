import asyncHandler from "../middlewares/asyncHandler.js";
import authService from "../services/auth.service.js";

/**
 * Auth Controller.
 *
 * Thin layer — delegates all business logic to AuthService.
 * Handles HTTP concerns only: reading req, sending res, setting cookies.
 */

// ── Cookie options for refresh token ────────────────────
const REFRESH_COOKIE_OPTIONS = {
  httpOnly: true,                                         // JS can't read it
  secure: process.env.NODE_ENV === "production",          // HTTPS only in prod
  sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000,                      // 7 days
  path: "/",
};

/**
 * POST /api/auth/register
 */
export const register = asyncHandler(async (req, res) => {
  const result = await authService.register(req.body);
  res.status(201).json({ success: true, ...result });
});

/**
 * POST /api/auth/verify-otp
 */
export const verifyOTP = asyncHandler(async (req, res) => {
  const result = await authService.verifyOTP(req.body);
  res.status(200).json({ success: true, ...result });
});

/**
 * POST /api/auth/login
 */
export const login = asyncHandler(async (req, res) => {
  const { accessToken, refreshToken, user } = await authService.login(req.body);

  // Set refresh token in httpOnly cookie
  res.cookie("refreshToken", refreshToken, REFRESH_COOKIE_OPTIONS);

  res.status(200).json({
    success: true,
    accessToken,
    user,
  });
});

/**
 * POST /api/auth/refresh
 */
export const refresh = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  const result = await authService.refresh(refreshToken);
  res.status(200).json({ success: true, ...result });
});

/**
 * POST /api/auth/logout
 */
export const logout = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  const result = await authService.logout(refreshToken);

  // Clear the cookie
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
    path: "/",
  });

  res.status(200).json({ success: true, ...result });
});

/**
 * POST /api/auth/forgot-password
 */
export const forgotPassword = asyncHandler(async (req, res) => {
  const result = await authService.forgotPassword(req.body);
  res.status(200).json({ success: true, ...result });
});

/**
 * POST /api/auth/reset-password
 */
export const resetPassword = asyncHandler(async (req, res) => {
  const result = await authService.resetPassword(req.body);
  res.status(200).json({ success: true, ...result });
});
