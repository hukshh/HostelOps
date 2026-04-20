import mongoose from "mongoose";

const mealRatingSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  menuId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MessMenu",
    required: true,
  },
  day: {
    type: String,
    required: true,
    enum: [
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
      "sunday",
    ],
  },
  mealType: {
    type: String,
    enum: ["breakfast", "lunch", "dinner"],
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
    trim: true,
    maxlength: 500,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// ── Compound Index: one rating per student per meal per week ─
mealRatingSchema.index(
  { studentId: 1, menuId: 1, day: 1, mealType: 1 },
  { unique: true }
);

const MealRating = mongoose.model("MealRating", mealRatingSchema);
export default MealRating;
