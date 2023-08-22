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

        console.log("Received userOwner:", userOwner);
        console.log("Received currentDate:", currentDate);
        
        const userStats = await StatModel.find({ userOwner, currentDate });
        res.json(userStats); 
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error.");
    } 
});

export { router as statRouter };
