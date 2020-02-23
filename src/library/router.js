import express from "express";
const router = express.Router();

import eventController from "../controllers/event.controller";
router.use("/api/event", eventController);
import matchController from "../controllers/match.controller";
router.use("/api/match", matchController);
import rsvpController from "../controllers/rsvp.controller";
router.use("/api/rsvp", rsvpController);
import selfController from "../controllers/self.controller";
router.use("/api/self", selfController);
import userController from "../controllers/user.controller";
router.use("/api/user", userController);

export default router;
