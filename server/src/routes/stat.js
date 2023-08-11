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
    const stat = new StatModel(req.body); 
    try {
        const response = await stat.save(); 
        res.json(response);
    } catch (err) {
        res.json(err);
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