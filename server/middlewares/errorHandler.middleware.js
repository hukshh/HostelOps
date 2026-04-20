import { ZodError } from "zod";

/**
 * Global error handler middleware.
 *
 * Catches all errors thrown or forwarded by next(err) across the app.
 * Normalizes different error types into a consistent JSON response:
 *   { success: false, message: String, errors?: Array }
 *
 * Handles:
 *   - Mongoose ValidationError  → 400
 *   - Mongoose CastError        → 400  (invalid ObjectId etc.)
 *   - Mongoose duplicate key     → 409  (error code 11000)
 *   - Zod validation errors      → 400
 *   - JWT errors                 → 401
 *   - Custom errors with status  → err.statusCode
 *   - Everything else            → 500
 */
const errorHandler = (err, req, res, _next) => {
  // Default values
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";
  let errors = null;

  // ── Mongoose ValidationError ──────────────────────────
  if (err.name === "ValidationError") {
    statusCode = 400;
    message = "Validation failed";
    errors = Object.values(err.errors).map((e) => ({
      field: e.path,
      message: e.message,
    }));
  }

  // ── Mongoose CastError (e.g. bad ObjectId) ──────────
  if (err.name === "CastError") {
    statusCode = 400;
    message = `Invalid ${err.path}: ${err.value}`;
  }

  // ── Mongoose duplicate key (code 11000) ─────────────
  if (err.code === 11000) {
    statusCode = 409;
    const duplicateField = Object.keys(err.keyValue).join(", ");
    message = `Duplicate value for: ${duplicateField}. This value already exists.`;
  }

  // ── Zod validation errors ───────────────────────────
  if (err instanceof ZodError) {
    statusCode = 400;
    message = "Request validation failed";
    errors = err.errors.map((e) => ({
      field: e.path.join("."),
      message: e.message,
    }));
  }

  // ── JWT errors ──────────────────────────────────────
  if (err.name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Invalid token.";
  }
  if (err.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Token has expired.";
  }

  // ── Log in dev, suppress stack in production ────────
  if (process.env.NODE_ENV !== "production") {
    console.error("❌ Error:", err);
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(errors && { errors }),
    ...(process.env.NODE_ENV !== "production" && { stack: err.stack }),
  });
};

export default errorHandler;
