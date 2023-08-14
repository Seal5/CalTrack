import express from "express";
import mongoose from "mongoose";
import { StatModel } from "../models/Stat.js";
import { UserModel } from "../models/Users.js";
// import { verifyToken } from "./users.js"

const router = express.Router();
router.get("/", async (req, res) => {
    try {
        const response = await StatModel.find({});
        res.json(response);
    } catch (err) {
        res.json(err);
    }
})

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

router.put("/", async (req, res) => {
  try {
    const stat = await StatModel.findById(req.body.statId);
    const user = await UserModel.findById(req.body.userID);
    user.savedStats.push(recipe);
    await user.save();
    res.json({ savedStats: user.savedStats });
    const response = await stat.save();
  } catch (err) {
    res.json(err);
  }
});

router.get("/savedStats/ids", async (req, res) => {
    try {
        const user = await UserModel.findById(req.body.userID) 
        res.json({ savedRecipes: user?.savedStatas})
    } catch (err) {
        res.json(err)
    }
});

router.get("/savedStats", async (req, res) => {
  try {
    const user = await UserModel.findById(req.body.userID);
    const savedStats = await StatModel.find({
      _id: { $in: user.savedStats },
    });
    res.json({ savedStats });
  } catch (err) {
    res.json(err);
  }
});

export { router as statRouter };
