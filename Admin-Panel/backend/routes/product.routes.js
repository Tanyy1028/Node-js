import express from "express";
import {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  getProductStats,
} from "../controllers/product.controller.js";
import { protect, roleAuth } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/upload.middleware.js";
import { productValidation } from "../utils/validators.js";

const router = express.Router();

// All routes require authentication
router.use(protect);

// Stats route - Admin only
router.get("/stats", roleAuth("admin"), getProductStats);

// Product CRUD routes
router
  .route("/")
  .get(getProducts)
  .post(roleAuth("admin"), upload.single("image"), productValidation, createProduct);

// Single product routes
router
  .route("/:id")
  .get(getProduct)
  .put(roleAuth("admin"), updateProduct)
  .delete(roleAuth("admin"), deleteProduct);

export default router;

