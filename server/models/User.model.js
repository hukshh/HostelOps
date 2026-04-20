import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: 100,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
      select: false, // Never return password in queries by default
    },
    role: {
      type: String,
      enum: ["admin", "warden", "student"],
      default: "student",
    },
    phone: {
      type: String,
      trim: true,
    },
    profilePhoto: {
      type: String, // Cloudinary URL
      default: "",
    },
    hostelBlock: {
      type: String, // Relevant for wardens — which block they supervise
      trim: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    otp: {
      type: String,
      select: false, // Hide OTP from normal queries
    },
    otpExpiry: {
      type: Date,
      select: false,
    },
  },
  { timestamps: true }
);

// ── Indexes ──────────────────────────────────────────────
userSchema.index({ role: 1 });
userSchema.index({ hostelBlock: 1 });

// ── Pre-save hook: hash password before saving ──────────
userSchema.pre("save", async function (next) {
  // Only hash if the password field was modified
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// ── Instance method: compare candidate password ─────────
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
