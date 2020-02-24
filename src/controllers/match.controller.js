import express from "express";
import asyncHandler from "express-async-handler";
import httpErrors from "http-errors";
const router = express.Router();
import mongoose from "mongoose";
import auth from "../middlewares/auth";

const MATCH = mongoose.model("MATCH");

// Create or Update Match
router.post(
  "/",
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
        matched: status === "matched" ? true : false,
        match: updatedMatch
      });
    } else if (existingMatch) {
      throw httpErrors(401, "Cannot update match!");
    } else {
      let newStatus = status === "passed" ? "passed" : "half";
      const newMatch = new MATCH({
        users: [user, req.user._id],
        status: newStatus
      });
      const savedMatch = await newMatch.save();
      res.send({
        match: savedMatch
      });
    }
  })
);

// Find specific
router.get(
  "/:id",
  auth,
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    res.send({ match: await MATCH.findById(id) });
  })
);

// Edit match
router.patch(
  "/:id",
  auth,
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { status } = req.body;
    if (status !== "passed")
      throw httpErrors(401, "Cannot update to anything other than cancelled!");
    const foundMatch = await MATCH.findById(id);
    if (!foundMatch) throw httpErrors(401, "Match not found!");
    if (!foundMatch.users.includes(req.user._id))
      throw httpErrors(401, "This is not your Match!");
    const updatedMatch = await MATCH.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    res.send({
      match: updatedMatch
    });
  })
);

export default router;
