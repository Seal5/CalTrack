const mongoose = require('mongoose')

const MealSchema = new mongoose.Schema({
    Meal: [
    {
      title: { type: String, required: true },
      ingreTitle: { type: String, required: true },
      caloriePG: { type: Number, required: true },
      weightG: { type: Number, required: true },
    },
  ],
});

const Meal = mongoose.model("Meal", MealSchema)
module.exports = Meal