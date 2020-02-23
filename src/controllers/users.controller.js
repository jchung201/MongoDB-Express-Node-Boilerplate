import express from "express";
import asyncHandler from "express-async-handler";
import httpErrors from "http-errors";
const router = express.Router();
import mongoose from "mongoose";
import auth from "../middlewares/auth";

const USER = mongoose.model("USER");

// Get personal user profile
router.get(
  "/me",
  auth,
  asyncHandler(async (req, res, next) => {
    res.send({
      user: req.user
    });
  })
);

// Find user profiles
router.get(
  "/:id",
  auth,
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    // Filter users
    res.send({ user: await USER.findById(id) });
  })
);

export default router;
