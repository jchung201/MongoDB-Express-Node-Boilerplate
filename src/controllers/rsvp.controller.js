import express from "express";
import asyncHandler from "express-async-handler";
import httpErrors from "http-errors";
const router = express.Router();
import mongoose from "mongoose";
import auth from "../middlewares/auth";

const RSVP = mongoose.model("RSVP");

// Get personal user profile
router.get(
  "/",
  auth,
  asyncHandler(async (req, res, next) => {
    // TODO: Filter rsvps
    res.send({ rsvps: await RSVP.find({ user: req.user._id }) });
  })
);

// Find user profile
router.patch(
  "/:id",
  auth,
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    // TODO: Edit event attendance
    res.send();
  })
);

export default router;
