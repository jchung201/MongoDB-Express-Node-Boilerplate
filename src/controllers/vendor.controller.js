import express from "express";
import asyncHandler from "express-async-handler";
const router = express.Router();
import mongoose from "mongoose";

import auth from "../middlewares/auth";
const MATCH = mongoose.model("MATCH");

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
// Get propspects
router.get(
  "/matches",
  auth,
  asyncHandler(async (req, res, next) => {
    res.send({
      matches: await MATCH.find({ users: req.user._id, status: "matched" })
    });
  })
);
// Get matches
router.get(
  "/matches",
  auth,
  asyncHandler(async (req, res, next) => {
    // Return only matched 'MATCH's
    res.send({
      matches: await MATCH.find({ users: req.user._id, status: "matched" })
    });
  })
);
// Get RSVPS
router.get(
  "/rsvps",
  auth,
  asyncHandler(async (req, res, next) => {
    // Return only going rsvps
    res.send({
      rsvps: await RSVP.find({ user: req.user._id, status: "going" })
    });
  })
);

export default router;
