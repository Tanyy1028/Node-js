import express from "express";
import {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  getUserStats,
} from "../controllers/user.controller.js";
import { protect, roleAuth } from "../middlewares/auth.middleware.js";
import { userIdValidation, updateUserValidation } from "../utils/validators.js";

const router = express.Router();

// All routes require authentication and admin role
router.use(protect, roleAuth("admin"));

// Stats route
router.get("/stats", getUserStats);

// User CRUD routes
router
  .route("/")
  .get(getUsers);

router
  .route("/:id")
  .get(userIdValidation, getUser)
  .put(userIdValidation, updateUserValidation, updateUser)
  .delete(userIdValidation, deleteUser);

export default router;

