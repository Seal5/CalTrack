import express from "express";
import cors from 'cors';
import mongoose from 'mongoose';

import { userRouter } from './routes/users.js';
import { statRouter } from "./routes/stat.js";

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ["https://caltrack-server.onrender.com"],
  })
);
app.use("/auth", userRouter);
app.use("/stat", statRouter);

mongoose.connect(
    "mongodb+srv://trackcalorie:trackcalorie123@calories.tnch48i.mongodb.net/calories?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
);

app.listen(PORT, () =>
  console.log("server started on " + PORT)
); 
