const express = require('express');
const app = express();

const cors = require('cors');
const mongoose = require("mongoose");
const MealsModel = require("./models/Meals");


app.use(express.json());
app.use(cors);

mongoose.connect(
  "mongodb+srv://user:password12345@mealdata.tkexeqs.mongodb.net/test",
    {
      useNewUrlParser: true,
    }
);

app.get("/getMeal", async (req, res) => {
  try {
    const meals = await MealsModel.find({});
    console.log("meals:", meals); // log the meals array to the console
    res.json(meals);
  } catch (err) {
    console.log("error:", err); // log any errors to the console
    res.json(err);
  }
});

// app.post("/insert", async (req, res) => {
//     const meal = new MealModel({    
//       title: "Hi",
//       ingreTitle: "Hi",
//       caloriePG: 35,
//       weightG: 30
//     })
// });

app.listen(3001, () => {
  console.log("Server listening on port 3001");
});