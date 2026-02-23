import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import { protect } from "./middleware/authMiddleware.js";


dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true
  })
);

app.use("/api/auth", authRoutes);

app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);

app.listen(process.env.PORT, () => {
  console.log("Server running on 5000");
});