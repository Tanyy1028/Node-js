import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  timeout: 10000
});

// Verify transporter on startup
transporter.verify((error, success) => {
  if (error) {
    console.log("Email transporter verification failed:", error.message);
  } else {
    console.log("Email transporter is ready");
  }
});
