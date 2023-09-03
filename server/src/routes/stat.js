import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import { StatModel } from "../models/Stat.js";
// import { verifyToken } from "./users.js"

const router = express.Router();

// router.get("/", async (req, res) => {
//     try {
//       const result = await StatModel.find({});
//       res.json(result);
//     } catch (err) {
//       res.json(err);
//     }
// });

router.post("/", async (req, res) => {
    const { currentDate, userOwner } = req.body;
    try {
        const filter = { currentDate, userOwner };
        const options = {
            new: true,
            upsert: true
        };
        // Use findOneAndUpdate to perform the upsert
        const response = await StatModel.findOneAndUpdate(filter, req.body, options);

        res.json(response);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
  });   

router.get("/", async (req, res) => {
    try {
        const userOwner = req.query.userOwner;
        const currentDate = req.query.currentDate;
        
        const userStats = await StatModel.find({ userOwner, currentDate });
        res.json(userStats); 
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error.");
    } 
});

router.get("/goal", async (req, res) => {
  try {
    const userID = req.query.userID;
    if (userID) {
      const mostRecentGoal = await StatModel.find({ userOwner: userID })
        .sort({ currentDate: -1 })
        .limit(1);

      if (mostRecentGoal.length > 0) {
        console.log(mostRecentGoal[0].total);
        res.json(mostRecentGoal[0].total);
      } else {
        // If no goals are found for the user, send the default value
        res.json(2250);
      }
    } else {
      // If userID is not provided, send the default value
      res.json(2250);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error.");
  }
});

export { router as statRouter };
