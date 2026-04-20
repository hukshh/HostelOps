import { z } from "zod";

/**
 * Zod schemas for all authentication endpoints.
 * Used with the validate middleware to enforce request body shape
 * before any controller logic runs.
 */

// ── POST /api/auth/register ─────────────────────────────
export const registerSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be at most 100 characters")
    .trim(),
  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email format")
    .toLowerCase()
    .trim(),
  password: z
    .string({ required_error: "Password is required" })
    .min(6, "Password must be at least 6 characters")
    .max(128, "Password must be at most 128 characters"),
  role: z
    .enum(["admin", "warden", "student"], {
      invalid_type_error: "Role must be admin, warden, or student",
    })
    .optional()
    .default("student"),
  phone: z
    .string()
    .regex(/^\+?[1-9]\d{6,14}$/, "Invalid phone number format")
    .optional(),
});

// ── POST /api/auth/verify-otp ───────────────────────────
export const verifyOTPSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email format")
    .toLowerCase()
    .trim(),
  otp: z
    .string({ required_error: "OTP is required" })
    .length(6, "OTP must be exactly 6 digits"),
});

// ── POST /api/auth/login ────────────────────────────────
export const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email format")
    .toLowerCase()
    .trim(),
  password: z
    .string({ required_error: "Password is required" })
    .min(1, "Password is required"),
});

// ── POST /api/auth/forgot-password ──────────────────────
export const forgotPasswordSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email format")
    .toLowerCase()
    .trim(),
});

// ── POST /api/auth/reset-password ───────────────────────
export const resetPasswordSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email format")
    .toLowerCase()
    .trim(),
  otp: z
    .string({ required_error: "OTP is required" })
    .length(6, "OTP must be exactly 6 digits"),
  newPassword: z
    .string({ required_error: "New password is required" })
    .min(6, "Password must be at least 6 characters")
    .max(128, "Password must be at most 128 characters"),
});
