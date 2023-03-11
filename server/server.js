const express = require('express')
const mongoose = require("mongoose");
const app = express()

app.use(express.json())

mongoose.connect(
  "mongodb+srv://newuser:password12345@caltrackdatabase.wckeeew.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
  }
);

app.get("/", (req, res) => {
    res.send("Di Morto")
});

app.listen(3001, () => {
  console.log("Server listening on port 3001");
});