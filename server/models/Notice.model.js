import mongoose from "mongoose";

const noticeSchema = new mongoose.Schema(
  {
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: [true, "Notice title is required"],
      trim: true,
      maxlength: 300,
    },
    content: {
      type: String,
      required: [true, "Notice content is required"],
      trim: true,
    },
    priority: {
      type: String,
      enum: ["normal", "important", "urgent"],
      default: "normal",
    },
    expiresAt: {
      type: Date,
    },
    acknowledgedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    isArchived: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// ── Indexes ──────────────────────────────────────────────
noticeSchema.index({ isArchived: 1 });
noticeSchema.index({ priority: 1 });
noticeSchema.index({ expiresAt: 1 });

const Notice = mongoose.model("Notice", noticeSchema);
export default Notice;
