import express from "express";
import asyncHandler from "express-async-handler";
import httpErrors from "http-errors";
const router = express.Router();
import mongoose from "mongoose";
import auth from "../middlewares/auth";

const RSVP = mongoose.model("RSVP");

// Make event with your ID stuff
router.post(
  "/",
  auth,
  asyncHandler(async (req, res, next) => {
    const { event, status } = req.body;
    const newRSVP = new RSVP({
      user: req.user._id,
      event,
      status
    });
    const savedRSVP = await newRSVP.save();
    res.send({
      rsvp: savedRSVP
    });
  })
);

// Get personal user profile
router
  .get(
    "/",
    auth,
    asyncHandler(async (req, res, next) => {
      // TODO: Filter rsvps
      res.send({ rsvps: await RSVP.find({ user: req.user._id }) });
    })
  )
  .get(
    "/:id",
    auth,
    asyncHandler(async (req, res, next) => {
      const { id } = req.params;
      res.send({ rsvp: await RSVP.findById(id) });
    })
  );

// Edit RSVP
router.patch(
  "/:id",
  auth,
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { status } = req.body;
    const foundRSVP = await RSVP.findById(id);
    if (!foundRSVP) throw httpErrors(401, "RSVP not found!");
    if (!foundRSVP.user.equals(req.user._id))
      throw httpErrors(401, "This is not your RSVP!");
    const updatedRSVP = await RSVP.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    res.send({
      rsvp: updatedRSVP
    });
  })
);

export default router;
