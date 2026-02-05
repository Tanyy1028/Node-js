import React, { useState } from 'react';
import OtpInput from "react-otp-input";
import axios from 'axios';
import { base_uri } from '../../utils/global-function';
import { useNavigate } from 'react-router';
// import './ChangeForgotPassword.css'; // CSS file import

export default function ChangeForgotPassword() {

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const Navigate = useNavigate();

  const handleChangePassword = async () => {
    const data = { email, otp, newPassword };
    try {
      const res = await axios.post(`${base_uri}/auth/changeForgotPassword`, data);
      alert(res.data.message);
      if (res.data.status) {
        Navigate("/");
      }
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="auth-root">
      <div className="auth-box">

        <h1 className="auth-title">
          Reset <span>Password</span> 🔑
        </h1>
        <p className="auth-subtitle">
          Enter the OTP sent to your email and set a new secure password.
        </p>

        {/* Email */}
        <div className="auth-field">
          <input
            type="email"
            placeholder="Your Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* OTP */}
        <div className="auth-field text-center" style={{ marginBottom: "1.5rem" }}>
          <label className="auth-subtitle" style={{ display: "block", marginBottom: "0.5rem" }}>
            Enter OTP
          </label>
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            shouldAutoFocus
            renderInput={(props) => <input {...props} />}
            inputStyle={{
              width: "38px",
              height: "50px",
              margin: "0 6px",
              fontSize: "16px",
              borderRadius: "8px",
              border: "1px solid #444",
              background: "transparent",
              color: "#e5e7eb",
              textAlign: "center",
              transition: "0.3s",
            }}
            focusStyle={{
              border: "1px solid var(--accent)",
              boxShadow: "0 0 15px var(--accent-glow)",
            }}
          />
        </div>

        {/* New Password */}
        <div className="auth-field">
          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>

        {/* Button */}
        <button className="auth-action" onClick={handleChangePassword}>
          UPDATE PASSWORD
        </button>

        <div className="auth-footer">
          &copy; 2026 YourCompany. All rights reserved.
        </div>

      </div>
    </div>
  );
}
