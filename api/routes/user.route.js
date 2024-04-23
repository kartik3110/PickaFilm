import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import userController from "../controllers/user.controller.js";
import catchAsync from "../utils/catchAsync.js";
const router = express.Router();

router.get("/", protectRoute, catchAsync(userController.getUser));

export default router;
