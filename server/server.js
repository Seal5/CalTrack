import express from "express";
const app = express();

const cors = require('cors');
const mongoose = require('mongoose');
const MealsModel = require("./models/Meals");


app.use(express.json());
app.use(cors);

mongoose.connect(
  "mongodb+srv://user:password12345@mealdata.tkexeqs.mongodb.net/test",
    {
      useNewUrlParser: true,
    }
);

app.get("/", async (req, res) => {
    const meal1 = new MealsModel({
      title: "Kimchi",
      ingreTitle: "Cabbage",
      caloriePG: 35,
      weightG: 25,
    });
  try {
    await meal1.save();
    console.log("meals:", meal1); // log the meals array to the console
  } catch (err) {
    console.log("error:", err); // log any errors to the console
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