import express from "express";
import asyncHandler from "express-async-handler";
const router = express.Router();
import httpErrors from "http-errors";
import mongoose from "mongoose";

import auth from "../middlewares/auth";
const USER = mongoose.model("USER");
const EVENT = mongoose.model("EVENT");

// Get personal user profile
router
  .get(
    "/events",
    auth,
    asyncHandler(async (req, res, next) => {
      const foundEvents = EVENT.find({ vendor: req.user._id });
      res.send({ events: foundEvents });
    })
  )
  .get(
    "/:id",
    auth,
    asyncHandler(async (req, res, next) => {
      const { id } = req.params;
      const foundUser = await USER.findById(id);
      if (!foundUser) throw httpErrors(401, "Vendor does not exist!");
      res.send({ user: foundUser });
    })
  );

export default router;
