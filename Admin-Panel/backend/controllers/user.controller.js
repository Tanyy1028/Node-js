import User from "../models/User.js";
import { APIFeatures } from "../utils/apiFeatures.js";
import { catchAsync } from "../utils/catchAsync.js";
import AppError from "../utils/AppError.js";

/**
 * Get all users with search, filter, and pagination
 * @route GET /api/users
 * @access Private (Admin only)
 */
export const getUsers = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(User.find().select("-password -otp -otpExpire"), req.query)
    .search()
    .filter()
    .sort()
    .paginate();

  const users = await features.query;
  const total = await User.countDocuments(features.getFilteredCount());

  res.status(200).json({
    success: true,
    count: users.length,
    total,
    currentPage: parseInt(req.query.page) || 1,
    totalPages: Math.ceil(total / (parseInt(req.query.limit) || 10)),
    data: users,
  });
});

/**
 * Get a single user by ID
 * @route GET /api/users/:id
 * @access Private (Admin only)
 */
export const getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id).select("-password -otp -otpExpire");

  if (!user) {
    return next(new AppError("User not found", 404));
  }

  res.status(200).json({
    success: true,
    data: user,
  });
});

/**
 * Update a user
 * @route PUT /api/users/:id
 * @access Private (Admin only)
 */
export const updateUser = catchAsync(async (req, res, next) => {
  const { name, role, isVerified } = req.body;

  let user = await User.findById(req.params.id);

  if (!user) {
    return next(new AppError("User not found", 404));
  }

  // Prevent updating own admin role
  if (req.user.id === req.params.id && user.role === "admin" && role !== "admin") {
    return next(new AppError("Cannot change your own admin role", 400));
  }

  user = await User.findByIdAndUpdate(
    req.params.id,
    { name, role, isVerified },
    { new: true, runValidators: true }
  ).select("-password -otp -otpExpire");

  res.status(200).json({
    success: true,
    data: user,
  });
});

/**
 * Delete a user
 * @route DELETE /api/users/:id
 * @access Private (Admin only)
 */
export const deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new AppError("User not found", 404));
  }

  // Prevent deleting own account
  if (req.user.id === req.params.id) {
    return next(new AppError("Cannot delete your own account", 400));
  }

  await User.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    message: "User deleted successfully",
  });
});

/**
 * Get user statistics (for dashboard)
 * @route GET /api/users/stats
 * @access Private (Admin only)
 */
export const getUserStats = catchAsync(async (req, res, next) => {
  const totalUsers = await User.countDocuments();
  const verifiedUsers = await User.countDocuments({ isVerified: true });
  const unverifiedUsers = await User.countDocuments({ isVerified: false });

  const roleStats = await User.aggregate([
    {
      $group: {
        _id: "$role",
        count: { $sum: 1 },
      },
    },
  ]);

  res.status(200).json({
    success: true,
    data: {
      totalUsers,
      verifiedUsers,
      unverifiedUsers,
      roleStats,
    },
  });
});

