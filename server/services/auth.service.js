import jwt from "jsonwebtoken";
import userRepository from "../repositories/user.repository.js";
import generateOTP from "../utils/generateOTP.js";
import { sendOTPEmail } from "../utils/sendEmail.js";

/**
 * Auth Service.
 *
 * Contains all business logic for authentication flows.
 * Called by controllers — never touches req/res directly.
 */
class AuthService {
  // ── Helper: generate JWT access token ─────────────────
  _generateAccessToken(userId, role) {
    return jwt.sign({ userId, role }, process.env.JWT_ACCESS_SECRET, {
      expiresIn: process.env.JWT_ACCESS_EXPIRES || "15m",
    });
  }

  // ── Helper: generate JWT refresh token ────────────────
  _generateRefreshToken(userId) {
    return jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET, {
      expiresIn: process.env.JWT_REFRESH_EXPIRES || "7d",
    });
  }

  // ── Helper: create & save OTP on a user doc ───────────
  async _setOTP(user) {
    const otp = generateOTP();
    user.otp = otp;
    user.otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
    await user.save({ validateBeforeSave: false });
    return otp;
  }

  /**
   * Register a new user.
   *
   * 1. Check if email already exists
   * 2. Create user (password is hashed by model pre-save hook)
   * 3. Generate OTP, save on user, send via email
   */
  async register({ name, email, password, role, phone }) {
    // Check duplicate email
    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) {
      const error = new Error("An account with this email already exists.");
      error.statusCode = 409;
      throw error;
    }

    // Create user (password will be hashed by the User model pre-save hook)
    const user = await userRepository.create({ name, email, password, role, phone });

    // Generate and send OTP
    const otp = await this._setOTP(user);
    await sendOTPEmail(email, otp, "Email Verification");

    return { message: "Registration successful. OTP sent to your email for verification." };
  }

  /**
   * Verify email with OTP.
   *
   * 1. Find user by email (with OTP fields)
   * 2. Check OTP matches and hasn't expired
   * 3. Mark as verified, clear OTP
   */
  async verifyOTP({ email, otp }) {
    const user = await userRepository.findByEmailWithOTP(email);
    if (!user) {
      const error = new Error("No account found with this email.");
      error.statusCode = 404;
      throw error;
    }

    if (user.isVerified) {
      const error = new Error("Email is already verified.");
      error.statusCode = 400;
      throw error;
    }

    if (!user.otp || user.otp !== otp) {
      const error = new Error("Invalid OTP.");
      error.statusCode = 400;
      throw error;
    }

    if (user.otpExpiry < new Date()) {
      const error = new Error("OTP has expired. Please request a new one.");
      error.statusCode = 400;
      throw error;
    }

    // Mark verified and clear OTP fields
    user.isVerified = true;
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save({ validateBeforeSave: false });

    return { message: "Email verified successfully." };
  }

  /**
   * Login user.
   *
   * 1. Find user by email
   * 2. Check verified + password match
   * 3. Generate access & refresh tokens
   * 4. Save refresh token in DB
   * 5. Return tokens + user info
   */
  async login({ email, password }) {
    const user = await userRepository.findByEmail(email);
    if (!user) {
      const error = new Error("Invalid email or password.");
      error.statusCode = 401;
      throw error;
    }

    if (!user.isVerified) {
      const error = new Error("Please verify your email before logging in.");
      error.statusCode = 403;
      throw error;
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      const error = new Error("Invalid email or password.");
      error.statusCode = 401;
      throw error;
    }

    // Generate tokens
    const accessToken = this._generateAccessToken(user._id, user.role);
    const refreshToken = this._generateRefreshToken(user._id);

    // Save refresh token in DB with 7-day expiry
    await userRepository.saveRefreshToken({
      userId: user._id,
      token: refreshToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    return {
      accessToken,
      refreshToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }

  /**
   * Refresh access token.
   *
   * 1. Verify the refresh token JWT
   * 2. Check it exists in DB
   * 3. Issue a new access token
   */
  async refresh(refreshToken) {
    if (!refreshToken) {
      const error = new Error("Refresh token is required.");
      error.statusCode = 401;
      throw error;
    }

    // Verify JWT signature
    let decoded;
    try {
      decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    } catch {
      const error = new Error("Invalid or expired refresh token.");
      error.statusCode = 401;
      throw error;
    }

    // Check the token exists in DB (not revoked)
    const storedToken = await userRepository.findRefreshToken(refreshToken);
    if (!storedToken) {
      const error = new Error("Refresh token not found. Please login again.");
      error.statusCode = 401;
      throw error;
    }

    // Fetch user to get current role (in case role changed since last login)
    const user = await userRepository.findById(decoded.userId);
    if (!user) {
      const error = new Error("User no longer exists.");
      error.statusCode = 401;
      throw error;
    }

    const accessToken = this._generateAccessToken(user._id, user.role);
    return { accessToken };
  }

  /**
   * Logout user.
   *
   * 1. Delete the refresh token from DB
   */
  async logout(refreshToken) {
    if (refreshToken) {
      await userRepository.deleteRefreshToken(refreshToken);
    }
    return { message: "Logged out successfully." };
  }

  /**
   * Forgot password — send OTP to email.
   */
  async forgotPassword({ email }) {
    const user = await userRepository.findByEmailWithOTP(email);
    if (!user) {
      // Don't reveal whether the email exists (security best practice)
      return { message: "If an account exists with this email, an OTP has been sent." };
    }

    const otp = await this._setOTP(user);
    await sendOTPEmail(email, otp, "Password Reset");

    return { message: "If an account exists with this email, an OTP has been sent." };
  }

  /**
   * Reset password using OTP.
   *
   * 1. Verify OTP + expiry
   * 2. Hash and save new password
   * 3. Clear OTP and revoke all refresh tokens
   */
  async resetPassword({ email, otp, newPassword }) {
    const user = await userRepository.findByEmailWithOTP(email);
    if (!user) {
      const error = new Error("No account found with this email.");
      error.statusCode = 404;
      throw error;
    }

    if (!user.otp || user.otp !== otp) {
      const error = new Error("Invalid OTP.");
      error.statusCode = 400;
      throw error;
    }

    if (user.otpExpiry < new Date()) {
      const error = new Error("OTP has expired. Please request a new one.");
      error.statusCode = 400;
      throw error;
    }

    // Update password (pre-save hook will hash it)
    user.password = newPassword;
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    // Revoke all existing refresh tokens for this user (force re-login)
    await userRepository.deleteAllRefreshTokens(user._id);

    return { message: "Password reset successful. Please login with your new password." };
  }
}

export default new AuthService();
