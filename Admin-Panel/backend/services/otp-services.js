import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import { OtpCollection } from '../models/otp-model.js';
dotenv.config()

const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS
    }
});

export const sendOTP = async (email) => {
    const otp = Math.floor(100000 + Math.random() * 90000);
    const expiry = new Date(Date.now() + 1000 * 60 * 30);
    try {
        await OtpCollection.create({ email, otp, expiry });
        const smtp = await transport.sendMail({
            from: `Admin Panel <${process.env.EMAIL}>`,
            to: email,
            subject: "OTP Verification",
            text: `Your otp is ${otp}, will expire in 2 minutes`
        });
        return { status: true, message: "OTP Sent successfully !!" };
    } catch (err) {
        return { status: false, message: err.message }
    }
}