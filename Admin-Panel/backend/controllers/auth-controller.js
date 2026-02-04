import { AuthCollection } from '../models/auth-model.js'
import bcrypt from 'bcrypt'
import { sendOTP } from '../services/otp-services.js';
import { OtpCollection } from '../models/otp-model.js';
import jwt from 'jsonwebtoken'

export const signup = async (req, res) => {
    const { email, password } = req.body;
    try {
        const hashed = await bcrypt.hash(password, 12);
        await AuthCollection.create({ email, password: hashed });
        res.json({ status: true, message: "user registered !" });
    } catch (err) {
        res.json({ status: false, message: "user registeration failed !" });
    }
}
export const signin = async (req, res) => {
    const { email, password } = req.body;
    const user = await AuthCollection.findOne({ email });
    if (!user) {
        return res.json({ status: false, message: "User not found! Registere First !" })
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.json({ status: false, message: "Incorrect Passoword !" });
    }
    const status = await sendOTP(email);

    res.json(status);

} 
export const verifyOtp = async (req, res) => {
    const { email, otp } = req.body;
    const record = await OtpCollection.findOne({ email, otp })
    if (!record) {
        return res.json({ status: false, message: "OTP is incorrect !" })
    }
    if (record.expiry < new Date(Date.now())) {
        return res.json({ status: false, message: "OTP is expired !" })
    }


    try {
        const user = await AuthCollection.findOne({ email });
        const token = jwt.sign({ ...user }, process.env.SECRET_KEY, {
            expiresIn: 1000 * 60 * 60
        });
        res.cookie("auth_token", token, { maxAge: 1000 * 60 * 60, httpOnly: true });
        await OtpCollection.deleteMany({ email });
        res.json({ status: true, message: "OTP Verified & Signin successfully !" })
    } catch (err) {
        res.json({ status: false, message: "OTP verification failed", err: err.message });
    }
}

export const signout = (req, res) => {
    res.clearCookie("auth_token");
    res.json({ status: true, message: "Signout successfully !!" });
} 

export const checkLoginStatus = (req, res) => {
    try {
        const token = req.cookies.auth_token;
        if (!token) {
            return res.json({ status: false, message: "Signin First !" });
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY, { expiresIn: "1h" })
        return res.json({ status: true, message: "Already Logged In", user: decoded.payload })
    } catch (err) {
        return res.json({ status: false, message: "Logged out, Login First !", err })
    }
}

export const changePassword = async (req, res) => {
    const { email, oldPassword, newPassword } = req.body;
    try {
        const user = await AuthCollection.findOne({ email });
        if (!user) {
            return res.json({ status: false, message: "user not found !" })
        }
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.json({ status: false, message: "old password is incorrect !" })
        }
        const hashed = await bcrypt.hash(newPassword, 12);
        await AuthCollection.updateOne({ email }, {
            $set: {
                password: hashed
            }
        })
        res.json({ status: true, message: "password changed successfully !" });
    } catch (err) {
        res.json({ status: false, message: err.message })
    }
}


export const forgetPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const status = await sendOTP(email);
        res.json(status);
    } catch (err) {
        res.json({ status: false, message: err.message })
    }
}

export const changeForgetPassword = async (req, res) => {
    const { email, password, otp } = req.body;
    try {
        const record = await OtpCollection.findOne({ email, otp });
        if (!record) {
            return res.json({ status: false, message: "otp is incorrect !" });
        }
        if (record.expiry < new Date(Date.now())) {
            return res.json({ status: false, message: "otp expired !" })
        }
        const hashed = await bcrypt.hash(password, 12);
        await AuthCollection.updateOne({ email }, {
            $set: {
                password: hashed
            }
        })
        res.json({ status: true, message: "Password updated successfully !" })
    } catch (err) {
        res.json({ status: false, message: err.message })
    }
}