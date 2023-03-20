import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel } from "../models/Users.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  try {
    const newUser = new UserModel({
      username,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    res.json(savedUser);
  } catch (err) {
    console.log("error:", err);
    res.status(500).send("Error creating user");
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await UserModel.findOne({ username });

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({ error: "Invalid password" });
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

  res.json({ token });
});

export { router as userRouter };
