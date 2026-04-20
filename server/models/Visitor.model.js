import mongoose from "mongoose";

const visitorSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    visitorName: {
      type: String,
      required: [true, "Visitor name is required"],
      trim: true,
    },
    visitorPhone: {
      type: String,
      required: [true, "Visitor phone is required"],
      trim: true,
    },
    purpose: {
      type: String,
      required: [true, "Visit purpose is required"],
      trim: true,
    },
    scheduledAt: {
      type: Date,
    },
    entryTime: {
      type: Date,
    },
    exitTime: {
      type: Date,
    },
    status: {
      type: String,
      enum: ["pending", "inside", "exited", "expired"],
      default: "pending",
    },
  },
  { timestamps: true }
);

// ── Indexes ──────────────────────────────────────────────
visitorSchema.index({ studentId: 1 });
visitorSchema.index({ status: 1 });
visitorSchema.index({ scheduledAt: 1 });

const Visitor = mongoose.model("Visitor", visitorSchema);
export default Visitor;
