import mongoose from "mongoose";

const lostFoundSchema = new mongoose.Schema(
  {
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["lost", "found"],
      required: [true, "Type (lost/found) is required"],
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: 200,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 1000,
    },
    location: {
      type: String,
      trim: true,
    },
    photoUrl: {
      type: String, // Cloudinary URL
    },
    status: {
      type: String,
      enum: ["active", "claimed", "archived"],
      default: "active",
    },
    claimedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

// ── Indexes ──────────────────────────────────────────────
lostFoundSchema.index({ status: 1 });
lostFoundSchema.index({ type: 1 });
lostFoundSchema.index({ postedBy: 1 });

const LostFound = mongoose.model("LostFound", lostFoundSchema);
export default LostFound;
