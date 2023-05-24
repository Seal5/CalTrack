// import mongoose from "mongoose";

// const MealSchema = new mongoose.Schema({
//     // Meal: [
//     // {
//       title: { type: String, required: true },
//       ingreTitle: { type: String, required: true },
//       caloriePG: { type: Number, required: true },
//       weightG: { type: Number, required: true },
//   //   },
//   // ],
// });

// export const Meals = mongoose.model("meals", MealSchema)

import mongoose from "mongoose";

const MealSchema = new mongoose.Schema({
  title: { type: String, required: true },
  ingreTitle: { type: String, required: true },
  caloriePG: { type: Number, required: true },
  weightG: { type: Number, required: true },
});

export const MealsModel = mongoose.model("meals", MealSchema);