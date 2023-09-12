import mongoose from "mongoose";

// stat model  
const StatSchema = new mongoose.Schema({
  total: { type: Number, required: true },
  remaining: { type: Number, required: true },
  currentDate: { type: String, required: true },
  userOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

StatSchema.index({ currentDate: 1, userOwner: 1 }, { unique: true });

export const StatModel = mongoose.model("Stats", StatSchema);