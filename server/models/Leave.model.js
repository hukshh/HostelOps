import mongoose from "mongoose";

const leaveSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    reviewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    fromDate: {
      type: Date,
      required: [true, "From-date is required"],
    },
    toDate: {
      type: Date,
      required: [true, "To-date is required"],
    },
    reason: {
      type: String,
      required: [true, "Reason is required"],
      trim: true,
      maxlength: 1000,
    },
    destination: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    wardenRemark: {
      type: String,
      trim: true,
    },
    leavePassUrl: {
      type: String, // Cloudinary URL for the auto-generated PDF leave pass
    },
  },
  { timestamps: true }
);

// ── Indexes ──────────────────────────────────────────────
leaveSchema.index({ studentId: 1 });
leaveSchema.index({ status: 1 });
leaveSchema.index({ fromDate: 1, toDate: 1 });

const Leave = mongoose.model("Leave", leaveSchema);
export default Leave;
