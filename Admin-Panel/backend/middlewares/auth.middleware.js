import jwt from "jsonwebtoken";
import User from "../models/User.js";
import AppError from "../utils/AppError.js";

/**
 * Protect middleware - verifies JWT token
 * Ensures user is authenticated before accessing protected routes
 */
export const protect = async (req, res, next) => {
  try {
    // Get token from Authorization header
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    // Check if token exists
    if (!token) {
      return next(new AppError("Please login to access this resource", 401));
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get user from database
    const user = await User.findById(decoded.id);
    if (!user) {
      return next(new AppError("User no longer exists", 401));
    }

    // Check if user is verified
    if (!user.isVerified) {
      return next(new AppError("Please verify your account first", 401));
    }

    // Attach user to request object
    req.user = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return next(new AppError("Invalid token. Please login again", 401));
    }
    if (error.name === "TokenExpiredError") {
      return next(new AppError("Token expired. Please login again", 401));
    }
    return next(new AppError("Authentication failed", 401));
  }
};

/**
 * Role authorization middleware
 * Restricts access based on user role
 * @param {...string} roles - Allowed roles
 */
export const roleAuth = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You do not have permission to perform this action", 403)
      );
    }
    next();
  };
};

