import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    roomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
    },
    amount: {
      type: Number,
      required: [true, "Amount is required"],
      min: 0,
    },
    dueDate: {
      type: Date,
    },
    paidAt: {
      type: Date,
    },
    status: {
      type: String,
      enum: ["pending", "paid", "overdue"],
      default: "pending",
    },
    razorpayOrderId: {
      type: String,
    },
    razorpayPaymentId: {
      type: String,
    },
    receiptUrl: {
      type: String, // Cloudinary URL for the generated PDF receipt
    },
  },
  { timestamps: true }
);

// ── Indexes ──────────────────────────────────────────────
paymentSchema.index({ studentId: 1 });
paymentSchema.index({ status: 1 });
paymentSchema.index({ dueDate: 1 });

const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;
