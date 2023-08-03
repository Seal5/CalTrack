import mongoose from "mongoose";
 
const StatSchema = new mongoose.Schema({
    calorieTot: { type: Number, required: true },
    calorieDif: { type: Number, required: true },
    // meals: [{ type: String, require: true }],
    userOwner: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true }
});


export const StatModel = mongoose.model("stat", StatSchema)