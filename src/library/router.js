import express from "express";
const router = express.Router();

import authController from "../controllers/auth.controller";
router.use("/api/auth", authController);
import eventsController from "../controllers/events.controller";
router.use("/api/events", eventsController);
import matchesController from "../controllers/matches.controller";
router.use("/api/matches", matchesController);
import rsvpsController from "../controllers/rsvps.controller";
router.use("/api/rsvps", rsvpsController);
import usersController from "../controllers/users.controller";
router.use("/api/users", usersController);

export default router;
