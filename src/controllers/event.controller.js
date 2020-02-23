import express from "express";
import asyncHandler from "express-async-handler";
import httpErrors from "http-errors";
const router = express.Router();
import mongoose from "mongoose";
import auth from "../middlewares/auth";

const EVENT = mongoose.model("EVENT");

// Make event with your ID stuff
router.post(
  "/",
  auth,
  asyncHandler(async (req, res, next) => {
    const {
      category,
      description,
      start,
      end,
      location,
      title,
      picture
    } = req.body;
    const newEvent = new EVENT({
      vendor: req.user._id,
      category,
      description,
      date: {
        start,
        end
      },
      location,
      title,
      picture
    });
    const savedEvent = await newEvent.save();
    res.send({
      event: savedEvent
    });
  })
);

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
