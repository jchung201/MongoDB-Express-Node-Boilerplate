import express from "express";
const router = express.Router();

import authController from "../controllers/auth.controller";
router.use("/api/auth", authController);
import daterController from "../controllers/dater.controller";
router.use("/api/dater", daterController);
import eventController from "../controllers/event.controller";
router.use("/api/event", eventController);
import matchController from "../controllers/match.controller";
router.use("/api/match", matchController);
import rsvpController from "../controllers/rsvp.controller";
router.use("/api/rsvp", rsvpController);
import userController from "../controllers/user.controller";
router.use("/api/user", userController);
import vendorController from "../controllers/vendor.controller";
router.use("/api/vendor", vendorController);

export default router;
