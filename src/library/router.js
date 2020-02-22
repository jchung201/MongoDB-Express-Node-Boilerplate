import express from "express";
const router = express.Router();

import usersController from "../controllers/users.controller";
router.use("/api/users", usersController);

export default router;
