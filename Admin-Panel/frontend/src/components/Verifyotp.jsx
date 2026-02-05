import React, { useState } from "react";
import OtpInput from "react-otp-input";
import { useLocation, useNavigate } from "react-router";
import axios from "axios";
import { base_uri } from "../../utils/global-function";
import "./otp.css";

export default function VerifyOtp() {
  const [otp, setOtp] = useState("");
  const { state } = useLocation(); // email
  const navigate = useNavigate();

  const handleVerifyOtp = async () => {
    try {
      const res = await axios.post(
        `${base_uri}/auth/verifyOtp`,
        { email: state, otp: Number(otp) },
        { withCredentials: true }
      );
      alert(res.data.message);
      if (res.data.status) navigate("/HomePage");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="auth-root">
      <div className="auth-box">

        <h2 className="auth-title">OTP VERIFY</h2>
        <p className="auth-subtitle">
          Enter the 6-digit code sent to your email
        </p>

        <div className="otp-wrapper">
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            shouldAutoFocus
            inputType="tel"
            renderInput={(props) => (
              <input {...props} className="otp-input" />
            )}
          />
        </div>

        <button className="auth-action" onClick={handleVerifyOtp}>
          VERIFY
        </button>

      </div>
    </div>
  );
}
