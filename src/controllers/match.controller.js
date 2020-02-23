import express from "express";
import asyncHandler from "express-async-handler";
import httpErrors from "http-errors";
const router = express.Router();
import mongoose from "mongoose";
import auth from "../middlewares/auth";

const MATCH = mongoose.model("MATCH");

// Create or Update Match
router.post(
  "/signup",
  asyncHandler(async (req, res, next) => {
    const { user, status } = req.body;
    if (!user || !status) {
      throw httpErrors(402, "Forgot user or status!");
    }
    const existingMatch = await MATCH.findOne({
      users: { $all: [req.user._id, user] }
    });
    if (existingMatch && existingMatch.status !== "passed") {
      const updatedMatch = await MATCH.findByIdAndUpdate({ status });
      res.send({
        match: updatedMatch
      });
    } else if (existingMatch) {
      throw httpErrors(401, "Cannot update match!");
    } else {
      const newMatch = new MATCH({
        users: [user, req.user._id],
        status
      });
      const savedMatch = await newMatch.save();
      res.send({
        match: savedMatch
      });
    }
  })
);

// Find user profile
router.get(
  "/:id",
  auth,
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    res.send({ match: await MATCH.findById(id) });
  })
);

export default router;
