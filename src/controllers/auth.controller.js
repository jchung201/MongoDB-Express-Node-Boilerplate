import express from "express";
import asyncHandler from "express-async-handler";
import httpErrors from "http-errors";
const router = express.Router();
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const USER = mongoose.model("USER");

router.post(
  "/signup",
  asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
      throw httpErrors(402, "Forgot email or password!");
    }
    const newUser = new USER({
      auth: { email: email.toLowerCase() }
    });
    newUser.encryptPassword(password);
    const savedUser = await newUser.save();
    res.send({
      token: jwt.sign({ _id: savedUser._id }, process.env.SECRET, {
        expiresIn: "12h"
      }),
      user: savedUser
    });
  })
);

router.post(
  "/login",
  asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
      throw httpErrors(402, "Forgot email or password!");
    }
    const foundUser = await USER.findOne({
      "auth.email": email
    });
    if (!foundUser) throw httpErrors(402, "No user found.");
    res.send({
      token: "JWT " + (await foundUser.signIn(password)),
      user: foundUser
    });
  })
);

export default router;
