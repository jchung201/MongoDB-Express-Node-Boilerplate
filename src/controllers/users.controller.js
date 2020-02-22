import express from "express";
import asyncHandler from "express-async-handler";
import httpErrors from "http-errors";
const router = express.Router();
import mongoose from "mongoose";
import passport from "passport";
import auth from "../middlewares/auth";

const USER = mongoose.model("USER");

// POST new user route (optional, everyone has access)
router.post(
  "/signup",
  auth.optional,
  asyncHandler(async (req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password) {
      throw httpErrors(402, "Forgot username or password!");
    }
    const newUser = new USER({
      auth: { username: username.toLowerCase(), displayUsername: username }
    });
    newUser.setPassword(password);
    const savedUser = await newUser.save();
    res.send({ success: true, user: savedUser });
  })
);

// POST login route (optional, everyone has access)
router.post(
  "/login",
  auth.optional,
  asyncHandler(async (req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password) {
      throw httpErrors(402, "Forgot username or password!");
    }
    return passport.authenticate(
      "local",
      { session: false },
      (err, passportUser, info) => {
        if (err) {
          return next(err);
        }
        if (passportUser) {
          const user = passportUser;
          user.auth = passportUser.generateJWT();
          return res.send({ success: true, user });
        }
        return res.status(400).send(info);
      }
    )(req, res, next);
  })
);

router.get(
  "/profile",
  auth.required,
  auth.getCurrentUser,
  asyncHandler(async (req, res, next) => {
    res.send({ success: true, user: req.user });
  })
);

router.patch(
  "/profile",
  asyncHandler(async (req, res, next) => {
    const { picture, description, displayUsername } = req.body;
    if (!picture && !description && !displayUsername) {
      throw httpErrors(400, "Forgot update fields!");
    }
    res.send({
      success: true,
      user: await req.user.updateProfile(picture, description, displayUsername)
    });
  })
);

export default router;
