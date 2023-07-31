import express from "express";
import mongoose from "mongoose";
import { TotalModel } from "../models/Total.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const response = await RecipeModel.find({});
        res.json(response);
    } catch (err) {
        res.json(err);
    }
})


router.post("/", async (req, res) => {
    const recipe = new RecipeModel({
        ...req.body,
        
    })
    try {
        const response = await RecipeModel.find({});
        res.json(response);
    } catch (err) {
        res.json(err);
    }
});

export { router as totalRouter };
