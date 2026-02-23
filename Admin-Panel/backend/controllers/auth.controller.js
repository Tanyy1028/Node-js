import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";
import { transporter } from "../config/mail.js";
import { generateOtp } from "../utils/generateOtp.js";

export const signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // check existing user
    const exists = await User.findOne({
      email: email.toLowerCase().trim(),
    });

    if (exists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // generate OTP
    const otp = generateOtp();

    // create user
    const user = await User.create({
      name,
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      role,
      otp,
      isVerified: false,
    });

    // send OTP mail
    await sendOtpMail(email, otp);

    res.status(201).json({
      message: "Signup successful. Please verify OTP",
    });
  } catch (error) {
    console.error("SIGNUP ERROR:", error);
    res.status(500).json({ message: "Signup failed" });
  }
};


// REGISTER
export const register = async (req, res) => {
  const { name, email, password, role } = req.body;

  const hashed = await bcrypt.hash(password, 10);
  const otp = Math.floor(100000 + Math.random() * 900000);

  await User.create({
    name,
    email,
    password: hashed,
    role,
    otp,
    otpExpire: Date.now() + 300000
  });

  await transporter.sendMail({
    to: email,
    subject: "OTP Verification",
    text: `Your OTP is ${otp}`
  });

  res.json({ message: "OTP sent" });
};

// VERIFY OTP
export const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  const user = await User.findOne({ email });

  if (!user || user.otp != otp) {
    return res.status(400).json({ message: "Invalid OTP" });
  }

  user.isVerified = true;
  user.otp = null;
  await user.save();

  res.json({ message: "Verified" });
};

// GET PROFILE
export const getProfile = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json(user);
};

// LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    // ✅ user check (VERY IMPORTANT)
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // ✅ password compare
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({ message: "Wrong credentials" });
    }

    // ✅ verified check (good for viva)
    if (!user.isVerified) {
      return res.status(400).json({ message: "Please verify OTP first" });
    }

    const token = generateToken({
      id: user._id,
      role: user.role
    });

    res.json({
      token,
      role: user.role,
      name: user.name
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    res.status(500).json({ message: "Login failed" });
  }
};  