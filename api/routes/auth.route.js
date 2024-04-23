// /api/auth/ is the base path for all the routes in the auth.route.js file.
import express from "express";
import catchAsync from "../utils/catchAsync.js";
import authController from "../controllers/auth.controller.js";
const router = express.Router();
router.post("/signup", catchAsync(authController.signUp));

router.post("/signin", catchAsync(authController.signIn));

// According to RESTful principles, POST requests are often used for operations that have side effects, such as changing the state on the server.
router.get("/signout", authController.signOut);

export default router;

// A route handler is essentially a middleware function attached to a specific route or HTTP method.
