import mongoose from "mongoose" 
 
const TotalSchema = new mongoose.Schema({
    calorieTot: { type: String, required: true },
    calorieDif: { type: Number, required: false },
    meals: [{ type: String, require: true }],
    userOwner: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true }
});

export const TotalModel = mongoose.model("total", TotalSchema)