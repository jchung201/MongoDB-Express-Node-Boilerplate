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
router
  .get(
    "/",
    auth,
    asyncHandler(async (req, res, next) => {
      // TODO: Filter events
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

// Edit EVENT
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
    const updatedEvent = await EVENT.findByIdAndUpdate(
      id,
      {
        category: category || foundEvent.category,
        description: description || foundEvent.description,
        date: {
          start: start || foundEvent.date.start,
          end: end || foundEvent.date.end
        },
        location: location || foundEvent.location,
        title: title || foundEvent.title,
        picture: picture || foundEvent.picture
      },
      { new: true }
    );
    res.send({
      event: updatedEvent
    });
  })
);

export default router;
