import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/Users.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const existingUser = await UserModel.findOne({ username });

  if (existingUser) {
    return res.json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new UserModel({
    username,
    password: hashedPassword,
  });

  await newUser.save();

  res.json({ message: "User registered successfully" });
});

router.post("/login", async (req, res) => {
    var { username, password } = req.body;
    const user = await UserModel.findOne({ username }); 

    if(!user) {
        return res.json({ message: "Cannot find your account"})
    } else {
            const isPasswordValid = await bcrypt.compare(
              password,
              user.password 
            );

            if (isPasswordValid){
                const token = jwt.sign({ id: user._id }, "secret")
                return res.json({
                  token,
                  userID: user._id,
                });
                // return res.json({ token, userID: user._id })
            } else {
                return res.status(401).json({ message: "Wrong Password or Username" })
            }
    }
});

export { router as userRouter };
