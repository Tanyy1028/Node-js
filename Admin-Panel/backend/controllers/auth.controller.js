import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendOTP } from "../utils/sendMail.js";

export const register = async (req, res, next) => {
  const { email, password } = req.body;

const hashed = await bcrypt.hash(password, 10);
const otp = Math.floor(100000 + Math.random() * 900000).toString(); 

const user = await User.create({
    email,
    password: hashed,
    otp,
    otpExpiry: Date.now() + 5 * 60 * 1000
  });

  await sendOTP(email, otp);

  res.json({ message: "OTP sent to email" });
};

export const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  const user = await User.findOne({ email });

  if (!user || user.otp !== otp)
    return res.status(400).json({ msg: "Invalid OTP" });

  if (user.otpExpiry < Date.now())
    return res.status(400).json({ msg: "OTP expired" });

  user.isVerified = true;
  user.otp = null;
  await user.save();

  res.json({ msg: "Account verified" });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user || !user.isVerified)
    return res.status(400).json({ msg: "User not verified" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ msg: "Wrong password" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  res.json({ token });
};