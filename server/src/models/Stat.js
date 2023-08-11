import mongoose from "mongoose";
 
const StatSchema = new mongoose.Schema({
    total: { type: Number, required: true },
    remaining : { type: Number, required: true },
    currentDate: { type: String, required: true },
    // meal: {type: String, require: true },
    userOwner: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true }
});

export const StatModel = mongoose.model("stat", StatSchema)