const mongoose = reqiore('mongoose')
const MealSchema = new mongoose.Schema({
    foodName:{
        type: String,
        required: true,
    }
    daysSinceIAte: {
        type: Number,
        required: true,
    },
});