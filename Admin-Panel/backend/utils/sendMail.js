import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({

  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false
  }
});

export const sendOTP = async (email, otp) => {
  try {
    await transporter.sendMail({
      from: `"Admin Panel" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your OTP Code",
      html: `
        <h2>Your OTP is: <strong>${otp}</strong></h2>
        <p>Valid for 5 minutes. Do not share.</p>
      `
    });
    console.log("OTP email sent successfully to", email);
  } catch (error) {
    console.error("OTP email failed:", error.message);
    throw error;
  }
};
