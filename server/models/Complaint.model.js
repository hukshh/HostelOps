import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      required: [true, "Complaint title is required"],
      trim: true,
      maxlength: 200,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 2000,
    },
    category: {
      type: String,
      enum: ["electrical", "plumbing", "cleanliness", "internet", "furniture", "other"],
      required: true,
    },
    status: {
      type: String,
      enum: ["open", "assigned", "in-progress", "resolved"],
      default: "open",
    },
    photoUrl: {
      type: String, // Cloudinary URL
    },
    adminResponse: {
      type: String,
      trim: true,
    },
    resolvedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

// ── Indexes ──────────────────────────────────────────────
complaintSchema.index({ studentId: 1 });
complaintSchema.index({ status: 1 });
complaintSchema.index({ category: 1 });
complaintSchema.index({ assignedTo: 1 });

const Complaint = mongoose.model("Complaint", complaintSchema);
export default Complaint;
