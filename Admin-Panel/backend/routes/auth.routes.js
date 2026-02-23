import express from "express";
import { register, login, verifyOtp, signup } from "../controllers/auth.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { getProfile } from "../controllers/auth.controller.js";
const router = express.Router();

router.post("/register", register);
router.post("/verify-otp", verifyOtp);
router.post("/login", login);
router.post("/signup", signup);
router.get("/profile", protect, getProfile);
export default router;