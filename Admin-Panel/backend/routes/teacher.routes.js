import express from "express";
import {
  createTeacher,
  getTeachers,
  deleteTeacher
} from "../controllers/teacher.controller.js";
import { protect, roleAuth } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/upload.middleware.js";

const router = express.Router();

router.use(protect, roleAuth("principal"));

router.post("/", upload.single("photo"), createTeacher);
router.get("/", getTeachers);
router.delete("/:id", deleteTeacher);

export default router;