import cron from "node-cron";

/**
 * Centralized cron job registry.
 *
 * All scheduled tasks are registered here and started once
 * when the server boots. Each job is wrapped with error handling
 * so a single job failure doesn't crash the process.
 *
 * Jobs to add in later phases:
 *   - Rent reminder emails     (Phase 4) — daily at 9am
 *   - Auto-archive notices     (Phase 6) — daily at midnight
 *   - Auto-expire visitors     (Phase 6) — hourly
 *   - Auto-archive lost-found  (Phase 7) — daily at midnight
 *   - Auto-expire marketplace  (Phase 7) — daily at midnight
 */

const registerJobs = () => {
  console.log("⏰ Registering scheduled jobs...");

  // ── Example: Daily rent reminder (Phase 4) ────────────
  // cron.schedule("0 9 * * *", async () => {
  //   try {
  //     console.log("[CRON] Running rent reminder job...");
  //     // await rentReminderService();
  //   } catch (err) {
  //     console.error("[CRON] Rent reminder failed:", err.message);
  //   }
  // });

  // ── Example: Auto-archive expired notices (Phase 6) ───
  // cron.schedule("0 0 * * *", async () => {
  //   try {
  //     console.log("[CRON] Archiving expired notices...");
  //     // await archiveExpiredNotices();
  //   } catch (err) {
  //     console.error("[CRON] Notice archival failed:", err.message);
  //   }
  // });

  console.log("✅ Scheduled jobs registered (none active yet — scaffolded for Phase 4+)");
};

export default registerJobs;
