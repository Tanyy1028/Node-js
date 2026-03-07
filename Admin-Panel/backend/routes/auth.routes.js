import express from "express";
import {
  register,
  login,
  verifyOtp,
  resendOtp,
  getProfile,
  updateProfile,
  changePassword,
  logout,
} from "../controllers/auth.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { loginValidation, signupValidation, otpValidation } from "../utils/validators.js";

const router = express.Router();

// Public routes
router.post("/register", signupValidation, register);
router.post("/login", loginValidation, login);
router.post("/verify-otp", otpValidation, verifyOtp);
router.post("/resend-otp", resendOtp);

// Protected routes
router.use(protect);

router.get("/me", getProfile);
router.put("/profile", updateProfile);
router.put("/change-password", changePassword);
router.post("/logout", logout);

export default router;

