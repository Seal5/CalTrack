import express from "express";
import cors from 'cors';
import mongoose from 'mongoose';

import { userRouter } from './routes/users.js';
import { statRouter } from "./routes/stat.js";

const port = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(cors());
app.use("/auth", userRouter);
app.use("/stat", statRouter);

mongoose.connect(
    "mongodb+srv://trackcalorie:trackcalorie123@calories.tnch48i.mongodb.net/calories?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
);

app.listen(port, () =>
  console.log("server started")
); 