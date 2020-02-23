import express from "express";
import asyncHandler from "express-async-handler";
import httpErrors from "http-errors";
const router = express.Router();
import mongoose from "mongoose";
import auth from "../middlewares/auth";

const EVENT = mongoose.model("EVENT");

// Get personal user profile
router.get(
  "/",
  auth,
  asyncHandler(async (req, res, next) => {
    // TODO: Filter events
    res.send({ events: await EVENT.find({}) });
  })
);

export default router;
