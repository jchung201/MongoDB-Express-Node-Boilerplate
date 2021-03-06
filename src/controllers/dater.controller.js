import express from "express";
import asyncHandler from "express-async-handler";
const router = express.Router();
import mongoose from "mongoose";

import auth from "../middlewares/auth";
const USER = mongoose.model("USER");
const MATCH = mongoose.model("MATCH");
const RSVP = mongoose.model("RSVP");

// Get personal user profile
router
  .get(
    "/me",
    auth,
    asyncHandler(async (req, res, next) => {
      res.send({
        user: req.user
      });
    })
  )
  // Get propspects
  .get(
    "/prospects",
    auth,
    asyncHandler(async (req, res, next) => {
      const matches = await MATCH.find({ users: req.user._id });
      const users = await USER.find({ _id: { $ne: req.user._id } });
      // Return prospects that are not a match yet
      // This ensures that there are no duplicates
      // TODO: Include filtered information based on location and filters that are on the user object
      res.send({
        prospects: users.filter(user => {
          for (let i = 0; i < matches.length; i++) {
            if (matches[i].users.includes(user._id)) {
              return false;
            }
          }
          return true;
        })
      });
    })
  )
  // Get matches
  .get(
    "/matches",
    auth,
    asyncHandler(async (req, res, next) => {
      // Return only matched 'MATCH's
      res.send({
        matches: await MATCH.find({
          users: req.user._id,
          status: "matched"
        }).populate("users")
      });
    })
  )
  // Get RSVPS
  .get(
    "/rsvps",
    auth,
    asyncHandler(async (req, res, next) => {
      // Return only going rsvps
      // TODO: Filter based on location/etc
      res.send({
        rsvps: await RSVP.find({ user: req.user._id })
      });
    })
  )
  .get(
    "/:id",
    auth,
    asyncHandler(async (req, res, next) => {
      const { id } = req.params;
      const foundUser = await USER.findById(id);
      if (!foundUser) throw httpErrors(401, "User does not exist!");
      res.send({ user: foundUser });
    })
  );

// Edit filters
router
  .patch(
    "/filters",
    auth,
    asyncHandler(async (req, res, next) => {
      const { distance, ageLow, ageHigh, heightLow, heightHigh } = req.body;
      const updatedUser = await req.user.updateFilter(
        distance,
        ageLow,
        ageHigh,
        heightLow,
        heightHigh
      );
      res.send({ user: updatedUser });
    })
  )
  // Edit profile information
  .patch(
    "/profile",
    auth,
    asyncHandler(async (req, res, next) => {
      const { name, birthDate, location } = req.body;
      const updatedUser = await req.user.updateDater(name, birthDate, location);
      res.send({ user: updatedUser });
    })
  )
  .patch(
    "/icons",
    auth,
    asyncHandler(async (req, res, next) => {
      const {
        horoscope,
        life,
        love,
        meetMe,
        preference,
        schedule,
        search,
        sexuality,
        status,
        tell
      } = req.body;
      const updatedUser = await req.user.updateIcons(
        horoscope,
        life,
        love,
        meetMe,
        preference,
        schedule,
        search,
        sexuality,
        status,
        tell
      );
      res.send({ user: updatedUser });
    })
  );

export default router;
