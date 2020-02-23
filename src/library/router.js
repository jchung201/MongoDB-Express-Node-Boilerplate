import express from "express";
const router = express.Router();

import authController from "../controllers/auth.controller";
router.use("/api/auth", authController);
import usersController from "../controllers/users.controller";
router.use("/api/users", usersController);

export default router;
