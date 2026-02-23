import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendOtpMail = async (email, otp) => {
  try {
    await transporter.sendMail({
      from: `"School Admin" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your OTP Code",
      html: `
        <h2>Your OTP is: ${otp}</h2>
        <p>Do not share this OTP.</p>
      `,
    });

    console.log("OTP email sent successfully");
  } catch (error) {
    console.error("MAIL ERROR:", error);
    throw error;
  }
};