import { otpModel } from "../models/Otp_Model.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS
  }
});

export const sendMail = async (email) => {
  try {
    const otp = Math.floor(100000 + Math.random() * 900000);
    const expiry = new Date(Date.now() + 2 * 60 * 1000);

    await otpModel.deleteMany({ email });
    await otpModel.create({ email, otp, expiry });

    await transporter.sendMail({
      from: `OTP Service <${process.env.EMAIL}>`,
      to: email,
      subject: "OTP Verification",
      text: `Your OTP is ${otp}. It will expire in 2 minutes.`
    });

    return true;
  } catch (err) {
    console.log("OTP Error:", err.message);
    return false;
  }
};
