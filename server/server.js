const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const app = express()
const MealModel = require("./models/Meal")

app.use(express.json());
app.use(cors);

mongoose.connect(
  "mongodb+srv://newuser:password12345@caltrackdatabase.wckeeew.mongodb.net/caltrackdatabase?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
  }
);

app.post("/insert", async (req, res) => {
    const meal = new MealModel({    
      title: "Hi",
      ingreTitle: "Hi",
      caloriePG: 35,
      weightG: 30
    })
});

app.listen(3001, () => {
  console.log("Server listening on port 3001");
});