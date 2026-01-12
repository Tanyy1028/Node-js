
import { otpModel } from '../models/Otp_Model.js'
import { authModel } from '../models/Auth_Models.js'

export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const data = await otpModel.findOne({ email, otp });
    if (!data) {
      return res.json({ success:false, message: "OTP Mismatched!" });
    }

    if (data.expiry < new Date()) {
      return res.json({ success:false, message: "OTP expired!" });
    }

    // ✅ get real user
    const user = await authModel.findOne({ email });
    if(!user){
      return res.json({ success:false, message:"User not found" });
    }

    // ✅ set real user id in cookie
    res.cookie("Authentication", user._id.toString(), {
      maxAge: 1000 * 60 * 60,
      httpOnly: true,
      secure: false,
      sameSite: "lax"
    });

    res.json({ success:true, message: "OTP verified and Sign In successfully!" });

  } catch (err) {
    console.log(err);
    res.json({ success:false, message: "OTP verification failed" });
  }
};