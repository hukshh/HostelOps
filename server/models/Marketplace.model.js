import mongoose from "mongoose";

const marketplaceSchema = new mongoose.Schema(
  {
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: [true, "Item title is required"],
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
      enum: ["books", "electronics", "furniture", "clothing", "other"],
      required: true,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: 0,
    },
    photoUrl: {
      type: String, // Cloudinary URL
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    expiresAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

// ── Pre-save: auto-set expiry to 60 days from creation ──
marketplaceSchema.pre("save", function (next) {
  if (this.isNew && !this.expiresAt) {
    this.expiresAt = new Date(Date.now() + 60 * 24 * 60 * 60 * 1000);
  }
  next();
});

// ── Indexes ──────────────────────────────────────────────
marketplaceSchema.index({ sellerId: 1 });
marketplaceSchema.index({ category: 1 });
marketplaceSchema.index({ isAvailable: 1 });
marketplaceSchema.index({ expiresAt: 1 });

const Marketplace = mongoose.model("Marketplace", marketplaceSchema);
export default Marketplace;
