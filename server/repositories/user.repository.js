import User from "../models/User.model.js";
import RefreshToken from "../models/RefreshToken.model.js";

/**
 * User Repository.
 *
 * Pure data-access layer — only Mongoose queries live here.
 * No business logic, no validation, no HTTP concerns.
 */
class UserRepository {
  /**
   * Create a new user document.
   * @param {Object} userData – Fields to create the user with
   * @returns {Promise<Document>}
   */
  async create(userData) {
    const user = new User(userData);
    return user.save();
  }

  /**
   * Find user by email (includes password field for auth checks).
   * @param {string} email
   * @returns {Promise<Document|null>}
   */
  async findByEmail(email) {
    return User.findOne({ email }).select("+password");
  }

  /**
   * Find user by email WITH otp and otpExpiry fields.
   * Needed during OTP verification and password reset.
   * @param {string} email
   * @returns {Promise<Document|null>}
   */
  async findByEmailWithOTP(email) {
    return User.findOne({ email }).select("+otp +otpExpiry +password");
  }

  /**
   * Find user by ID (excludes password).
   * @param {string} userId
   * @returns {Promise<Document|null>}
   */
  async findById(userId) {
    return User.findById(userId);
  }

  /**
   * Update a user document by ID.
   * @param {string} userId
   * @param {Object} updateData
   * @returns {Promise<Document|null>}
   */
  async updateById(userId, updateData) {
    return User.findByIdAndUpdate(userId, updateData, { new: true });
  }

  // ── Refresh Token operations ──────────────────────────

  /**
   * Save a new refresh token.
   * @param {Object} tokenData – { userId, token, expiresAt }
   * @returns {Promise<Document>}
   */
  async saveRefreshToken(tokenData) {
    const refreshToken = new RefreshToken(tokenData);
    return refreshToken.save();
  }

  /**
   * Find a refresh token document by the token string.
   * @param {string} token
   * @returns {Promise<Document|null>}
   */
  async findRefreshToken(token) {
    return RefreshToken.findOne({ token });
  }

  /**
   * Delete a refresh token by the token string.
   * @param {string} token
   * @returns {Promise<Object>}
   */
  async deleteRefreshToken(token) {
    return RefreshToken.deleteOne({ token });
  }

  /**
   * Delete all refresh tokens for a specific user (e.g. on password reset).
   * @param {string} userId
   * @returns {Promise<Object>}
   */
  async deleteAllRefreshTokens(userId) {
    return RefreshToken.deleteMany({ userId });
  }
}

export default new UserRepository();
