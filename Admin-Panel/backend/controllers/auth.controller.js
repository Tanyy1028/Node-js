import User from "../models/User.js";
import { generateToken } from "../utils/generateToken.js";
import { transporter } from "../config/mail.js";
import { generateOtp } from "../utils/generateOtp.js";
import { catchAsync } from "../utils/catchAsync.js";
import AppError from "../utils/AppError.js";

/**
 * Send OTP email
 * @param {string} email - Recipient email
 * @param {string} otp - OTP to send
 */
const sendOtpMail = async (email, otp) => {
  try {
    await transporter.sendMail({
      to: email,
      subject: "OTP Verification",
      text: `Your OTP is ${otp}. It will expire in 5 minutes.`,
    });
    console.log("OTP email sent successfully");
  } catch (error) {
    console.error("Email sending error:", error.message);
    // Don't throw error - continue with registration
  }
};

/**
 * Register a new user
 * @route POST /api/auth/register
 * @access Public
 */
export const register = catchAsync(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new AppError("User already exists with this email", 400));
  }

  // Hash password (handled by pre-save middleware)
  // Generate OTP
  const otp = generateOtp();

  // Create user
  const user = await User.create({
    name,
    email: email.toLowerCase().trim(),
    password,
    role: role || "user",
    otp,
    otpExpire: Date.now() + 5 * 60 * 1000, // 5 minutes
    isVerified: false,
  });

  // Send OTP email
  await sendOtpMail(email, otp);

  // Send response (without sending token - user needs to verify OTP first)
  res.status(201).json({
    success: true,
    message: "Registration successful. Please verify your OTP.",
  });
});

/**
 * Verify OTP
 * @route POST /api/auth/verify-otp
 * @access Public
 */
export const verifyOtp = catchAsync(async (req, res, next) => {
  const { email, otp } = req.body;

  // Find user with OTP
  const user = await User.findOne({
    email: email.toLowerCase().trim(),
    otp,
    otpExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(new AppError("Invalid or expired OTP", 400));
  }

  // Update user as verified
  user.isVerified = true;
  user.otp = undefined;
  user.otpExpire = undefined;
  await user.save();

  // Generate token
  const token = generateToken({
    id: user._id,
    role: user.role,
  });

  res.status(200).json({
    success: true,
    message: "Account verified successfully",
    token,
    role: user.role,
    name: user.name,
  });
});

/**
 * Resend OTP
 * @route POST /api/auth/resend-otp
 * @access Public
 */
export const resendOtp = catchAsync(async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email: email.toLowerCase().trim() });
  if (!user) {
    return next(new AppError("User not found", 404));
  }

  if (user.isVerified) {
    return next(new AppError("Account is already verified", 400));
  }

  // Generate new OTP
  const otp = generateOtp();
  user.otp = otp;
  user.otpExpire = Date.now() + 5 * 60 * 1000;
  await user.save();

  // Send OTP email
  await sendOtpMail(email, otp);

  res.status(200).json({
    success: true,
    message: "OTP sent successfully",
  });
});

/**
 * Login user
 * @route POST /api/auth/login
 * @access Public
 */
export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // Check if email and password are provided
  if (!email || !password) {
    return next(new AppError("Please provide email and password", 400));
  }

  // Find user and include password for comparison
  const user = await User.findOne({ email: email.toLowerCase().trim() }).select("+password");

  if (!user) {
    return next(new AppError("Invalid credentials", 401));
  }

  // Check if password is correct
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return next(new AppError("Invalid credentials", 401));
  }

  // Check if user is verified
  if (!user.isVerified) {
    return next(new AppError("Please verify your account first", 401));
  }

  // Generate token
  const token = generateToken({
    id: user._id,
    role: user.role,
  });

  res.status(200).json({
    success: true,
    token,
    role: user.role,
    name: user.name,
  });
});

/**
 * Get current user profile
 * @route GET /api/auth/me
 * @access Private
 */
export const getProfile = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    return next(new AppError("User not found", 404));
  }

  res.status(200).json({
    success: true,
    data: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      isVerified: user.isVerified,
      avatar: user.avatar,
      createdAt: user.createdAt,
    },
  });
});

/**
 * Update user profile
 * @route PUT /api/auth/profile
 * @access Private
 */
export const updateProfile = catchAsync(async (req, res, next) => {
  const { name, email, avatar } = req.body;

  // Check if email is being changed and if it's already in use
  if (email) {
    const existingUser = await User.findOne({ email: email.toLowerCase().trim() });
    if (existingUser && existingUser._id.toString() !== req.user.id) {
      return next(new AppError("Email already in use", 400));
    }
  }

  const user = await User.findByIdAndUpdate(
    req.user.id,
    { name, email, avatar },
    { new: true, runValidators: true }
  );

  res.status(200).json({
    success: true,
    data: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      isVerified: user.isVerified,
      avatar: user.avatar,
    },
  });
});

/**
 * Change password
 * @route PUT /api/auth/change-password
 * @access Private
 */
export const changePassword = catchAsync(async (req, res, next) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return next(new AppError("Please provide current and new password", 400));
  }

  // Get user with password
  const user = await User.findById(req.user.id).select("+password");

  // Check current password
  const isMatch = await user.comparePassword(currentPassword);
  if (!isMatch) {
    return next(new AppError("Current password is incorrect", 401));
  }

  // Update password
  user.password = newPassword;
  await user.save();

  // Generate new token
  const token = generateToken({
    id: user._id,
    role: user.role,
  });

  res.status(200).json({
    success: true,
    message: "Password changed successfully",
    token,
  });
});

/**
 * Logout user (client-side token removal)
 * @route POST /api/auth/logout
 * @access Private
 */
export const logout = catchAsync(async (req, res, next) => {
  // In a stateless JWT system, logout is handled client-side
  // You could implement a blacklist for tokens if needed
  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});

