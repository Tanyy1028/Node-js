import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { base_uri } from '../../utils/global-function';
// import './ForgotPassword.css'; // Ensure your CSS file is imported

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const Navigate = useNavigate();

  const handleForgotPassword = async () => {
    try {
      const res = await axios.post(`${base_uri}/auth/forget-password`, { email });
      alert(res.data.message);
      if (res.data.status) {
        Navigate("/ChangeForgotPassword");
      }
    } catch (err) {
      console.log(err.response?.data);
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="auth-root">
      <div className="auth-box">

        <h1 className="auth-title">
          Forgot <span>Password</span>?
        </h1>
        <p className="auth-subtitle">
          Don’t worry. Enter your registered email and we’ll help you reset your password.
        </p>

        <div className="auth-field">
          <input
            type="email"
            placeholder="Your Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="auth-links">
          <a href="/">Back to login</a>
        </div>

        <button className="auth-action" onClick={handleForgotPassword}>
          CONTINUE
        </button>

        <div className="auth-footer">
          &copy; 2026 YourCompany. All rights reserved.
        </div>

      </div>
    </div>
  );
}
