import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    roomNumber: {
      type: String,
      required: [true, "Room number is required"],
      unique: true,
      trim: true,
    },
    floor: {
      type: Number,
      required: [true, "Floor is required"],
    },
    type: {
      type: String,
      enum: ["single", "double", "triple", "dormitory"],
      required: true,
    },
    capacity: {
      type: Number,
      required: [true, "Capacity is required"],
      min: 1,
    },
    currentOccupancy: {
      type: Number,
      default: 0,
      min: 0,
    },
    rentAmount: {
      type: Number,
      required: [true, "Rent amount is required"],
      min: 0,
    },
    amenities: {
      type: [String],
      default: [],
    },
    /**
     * `status` is computed from occupancy:
     *   - available → currentOccupancy === 0
     *   - partial   → 0 < currentOccupancy < capacity
     *   - full      → currentOccupancy === capacity
     */
    status: {
      type: String,
      enum: ["available", "partial", "full"],
      default: "available",
    },
    students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

// ── Indexes ──────────────────────────────────────────────
roomSchema.index({ floor: 1 });
roomSchema.index({ status: 1 });
roomSchema.index({ type: 1 });

// ── Pre-save hook: recompute status from occupancy ──────
roomSchema.pre("save", function (next) {
  if (this.currentOccupancy === 0) this.status = "available";
  else if (this.currentOccupancy < this.capacity) this.status = "partial";
  else this.status = "full";
  next();
});

const Room = mongoose.model("Room", roomSchema);
export default Room;
