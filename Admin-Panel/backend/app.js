import express from "express";
import cors from "cors";
import morgan from "morgan";

// Import routes
import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/product.routes.js";
import userRoutes from "./routes/user.routes.js";

// Import middlewares
import { globalError, notFound } from "./middlewares/error.middleware.js";

const app = express();

// Body parser - limit to 10MB for file uploads
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// CORS configuration
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

// HTTP request logger (development only)
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

// Static files for uploads
app.use("/uploads", express.static("uploads"));

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API is running",
    timestamp: new Date().toISOString(),
  });
});

// 404 handler for undefined routes
app.use(notFound);

// Global error handler
app.use(globalError);

export default app;

