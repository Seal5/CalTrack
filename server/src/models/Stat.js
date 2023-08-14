import mongoose from "mongoose";

const StatSchema = new mongoose.Schema({
  total: { type: Number, required: true },
  remaining: { type: Number, required: true },
  currentDate: { type: String, required: true },
  userOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
});

// Adding a unique compound index
StatSchema.index({ currentDate: 1, userOwner: 1 }, { unique: true });

export const StatModel = mongoose.model("stat", StatSchema);