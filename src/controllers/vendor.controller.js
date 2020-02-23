import express from "express";
import asyncHandler from "express-async-handler";
const router = express.Router();
import mongoose from "mongoose";

import auth from "../middlewares/auth";
const MATCH = mongoose.model("MATCH");

// Get personal user profile
router.get(
  "/:id",
  auth,
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    // Filter users
    const foundUser = await USER.findById(id);
    if (!foundUser) throw httpErrors(401, "Vendor does not exist!");
    res.send({ user: foundUser });
  })
);

export default router;
