import express from "express";
import asyncHandler from "express-async-handler";
import httpErrors from "http-errors";
const router = express.Router();
import mongoose from "mongoose";
import auth from "../middlewares/auth";

const EVENT = mongoose.model("EVENT");

// Make event with information
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

// Get events/specific event
router
  .get(
    "/",
    auth,
    asyncHandler(async (req, res, next) => {
      // TODO: Filter events (Also events that already have rsvp)
      res.send({ events: await EVENT.find({}) });
    })
  )
  .get(
    "/:id",
    auth,
    asyncHandler(async (req, res, next) => {
      const { id } = req.params;
      res.send({ event: await EVENT.findById(id) });
    })
  );

// Edit Event
router.patch(
  "/:id",
  auth,
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const {
      category,
      description,
      start,
      end,
      location,
      title,
      picture
    } = req.body;
    const foundEvent = await EVENT.findById(id);
    if (!foundEvent) throw httpErrors(401, "Event not found!");
    if (!foundEvent.vendor.equals(req.user._id))
      throw httpErrors(401, "This is not your Event!");
    const updatedEvent = await foundEvent.updateEvent(
      cateogry,
      description,
      start,
      end,
      location,
      title,
      picture
    );
    res.send({
      event: updatedEvent
    });
  })
);

export default router;
