import express from "express";
import asyncHandler from "express-async-handler";
import httpErrors from "http-errors";
const router = express.Router();
import mongoose from "mongoose";

const USER = mongoose.model("USER");

// POST new user route (optional, everyone has access)
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
    res.send({ user: savedUser });
  })
);

// POST login route (optional, everyone has access)
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
