import http from "http";
import app from "./app.js";
import connectDB from "./config/db.js";
import { configureCloudinary } from "./config/cloudinary.js";
import registerJobs from "./jobs/scheduler.js";

/**
 * Server Entry Point.
 *
 * Responsibilities:
 *   1. Connect to MongoDB
 *   2. Configure Cloudinary
 *   3. Register cron jobs
 *   4. Create HTTP server (Socket.io will attach here in Phase 7)
 *   5. Start listening
 */

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  // ── 1. Database ─────────────────────────────────────
  await connectDB();

  // ── 2. Cloudinary ───────────────────────────────────
  configureCloudinary();

  // ── 3. Cron Jobs ────────────────────────────────────
  registerJobs();

  // ── 4. HTTP Server ──────────────────────────────────
  const server = http.createServer(app);

  // Socket.io will be attached here in Phase 7:
  // const io = new Server(server, { cors: { origin: process.env.CLIENT_URL } });
  // io.on("connection", (socket) => { ... });

  // ── 5. Listen ───────────────────────────────────────
  server.listen(PORT, () => {
    console.log(`\n🚀 HostelOps server running on port ${PORT}`);
    console.log(`   Environment: ${process.env.NODE_ENV || "development"}`);
    console.log(`   Health check: http://localhost:${PORT}/api/health\n`);
  });
};

startServer().catch((err) => {
  console.error("❌ Failed to start server:", err);
  process.exit(1);
});
