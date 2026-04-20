import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

// Load environment variables first — before any module that reads process.env
dotenv.config();

import errorHandler from "./middlewares/errorHandler.middleware.js";
import authRoutes from "./routes/auth.routes.js";

/**
 * Express App Setup.
 *
 * This module configures all global middleware and mounts route groups.
 * It does NOT start the HTTP server — that's server.js's job.
 */
const app = express();

// ── Global Middleware ───────────────────────────────────
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true, // Allow cookies (refresh token)
  })
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ── Health Check ────────────────────────────────────────
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "HostelOps API is running 🚀",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
  });
});

// ── Route Groups ────────────────────────────────────────
app.use("/api/auth", authRoutes);

// Future route mounts (Phase 2+):
// app.use("/api/rooms",         roomRoutes);
// app.use("/api/students",      studentRoutes);
// app.use("/api/payments",      paymentRoutes);
// app.use("/api/complaints",    complaintRoutes);
// app.use("/api/attendance",    attendanceRoutes);
// app.use("/api/leaves",        leaveRoutes);
// app.use("/api/notices",       noticeRoutes);
// app.use("/api/visitors",      visitorRoutes);
// app.use("/api/mess-menu",     messMenuRoutes);
// app.use("/api/lost-found",    lostFoundRoutes);
// app.use("/api/marketplace",   marketplaceRoutes);
// app.use("/api/notifications", notificationRoutes);

// ── 404 handler — catch unmatched routes ────────────────
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

// ── Global Error Handler (must be last middleware) ──────
app.use(errorHandler);

export default app;
