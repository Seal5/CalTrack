import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { MealsModel } from "./models/Meals.js";
import { mealRouter } from "./routes/meals.js";
import { userRouter } from "./routes/users.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use(express.json());
app.use(cors());

app.use("/auth", userRouter);
app.use("/meals", mealRouter); // Mount the mealRouter middleware

mongoose.connect(
  "mongodb+srv://user:password12345@mealdata.tkexeqs.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
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
    res.send("Meal saved");
  } catch (err) {
    console.log("error:", err);
  }
});

app.post("/insert", async (req, res) => {
  const mealData = req.body;
  const meal = new MealsModel(mealData);

  try {
    await meal.save();
    res.status(201).send("Meal saved");
  } catch (err) {
    console.log("error:", err);
    res.status(500).send("Error saving meal");
  }
});

app.listen(3001, () => {
  console.log("Server listening on port 3001");
});



// const app = express();
// import { mealRouter } from './routes/meals.js';
// import { userRouter } from "./routes/users.js";


// app.use(express.json());
// app.use(cors());

// app.use("/auth", userRouter);

// mongoose.connect(
//   "mongodb+srv://user:password12345@mealdata.tkexeqs.mongodb.net/?retryWrites=true&w=majority",
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   }
// );

// app.get("/", async (req, res) => {
//     const meal1 = new MealsModel({
//       title: "Kimchi",
//       ingreTitle: "Cabbage",
//       caloriePG: 35,
//       weightG: 25,
//     });
//   try {
//     await meal1.save();
//     console.log("meals:", meal1); // log the meals array to the console
//   } catch (err) {
//     console.log("error:", err); // log any errors to the console
//   }
// });

// app.post("/insert", async (req, res) => {
//     const meal = new MealModel({    
//       title: "Hi",
//       ingreTitle: "Hi",
//       caloriePG: 35,
//       weightG: 30
//     })
// });

// app.listen(3001, () => {
//   console.log("Server listening on port 3001");
// }); 