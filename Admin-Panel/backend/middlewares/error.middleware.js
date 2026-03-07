import AppError from "../utils/AppError.js";

/**
 * Global error handling middleware
 * Handles all errors and sends appropriate response
 */
export const globalError = (err, req, res, next) => {
  // Set default status code and message
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  // Log error for debugging
  if (process.env.NODE_ENV === "development") {
    console.error("Error:", err);
  }

  // Handle Mongoose CastError (Invalid ID)
  if (err.name === "CastError") {
    const message = "Resource not found";
    err = new AppError(message, 404);
  }

  // Handle Mongoose duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    const message = `${field} already exists`;
    err = new AppError(message, 400);
  }

  // Handle Mongoose validation error
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((val) => val.message);
    const message = messages.join(". ");
    err = new AppError(message, 400);
  }

  // Handle JWT errors
  if (err.name === "JsonWebTokenError") {
    const message = "Invalid token. Please login again";
    err = new AppError(message, 401);
  }

  if (err.name === "TokenExpiredError") {
    const message = "Token expired. Please login again";
    err = new AppError(message, 401);
  }

  // Send error response
  res.status(err.statusCode).json({
    success: false,
    status: err.status,
    message: err.message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

/**
 * 404 handler for undefined routes
 */
export const notFound = (req, res, next) => {
  const err = new AppError(`Cannot find ${req.originalUrl} on this server`, 404);
  next(err);
};

