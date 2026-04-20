import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date: {
    type: Date,
    required: [true, "Date is required"],
  },
  status: {
    type: String,
    enum: ["present", "absent"],
    default: "present",
  },
  markedBy: {
    type: String,
    enum: ["self", "warden"],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// ── Compound Index: one record per student per day ──────
attendanceSchema.index({ studentId: 1, date: 1 }, { unique: true });

const Attendance = mongoose.model("Attendance", attendanceSchema);
export default Attendance;
