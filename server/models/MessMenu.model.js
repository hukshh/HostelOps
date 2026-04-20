import mongoose from "mongoose";

/**
 * Weekly mess menu schema.
 * Each document represents one week's full meal plan.
 * `weekLabel` uses ISO week format, e.g. "2024-W48".
 */
const dayMealSchema = new mongoose.Schema(
  {
    breakfast: { type: String, default: "" },
    lunch: { type: String, default: "" },
    dinner: { type: String, default: "" },
  },
  { _id: false }
);

const messMenuSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    weekLabel: {
      type: String,
      required: [true, "Week label is required (e.g. 2024-W48)"],
      trim: true,
    },
    meals: {
      monday: { type: dayMealSchema, default: () => ({}) },
      tuesday: { type: dayMealSchema, default: () => ({}) },
      wednesday: { type: dayMealSchema, default: () => ({}) },
      thursday: { type: dayMealSchema, default: () => ({}) },
      friday: { type: dayMealSchema, default: () => ({}) },
      saturday: { type: dayMealSchema, default: () => ({}) },
      sunday: { type: dayMealSchema, default: () => ({}) },
    },
  },
  { timestamps: true }
);

// ── Indexes ──────────────────────────────────────────────
messMenuSchema.index({ weekLabel: 1 }, { unique: true });

const MessMenu = mongoose.model("MessMenu", messMenuSchema);
export default MessMenu;
