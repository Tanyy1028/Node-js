import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router";
import { base_uri } from "../../utils/global-function";
import "./Signin.css";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      const res = await axios.post(
        `${base_uri}/auth/signin`,
        { email, password },
        { withCredentials: true }
      );

      if (res.data.status) {
        navigate("/verify-otp", { state: email });
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      alert("Server error");
    }
  };

  return (
    <div className="auth-root">
      <div className="auth-box">

        <h1 className="auth-title">SIGN IN</h1>
        <p className="auth-subtitle">
          Secure access to admin system
        </p>

        <div className="auth-field">
          <input
            type="email"
            placeholder="EMAIL"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="auth-field">
          <input
            type="password"
            placeholder="PASSWORD"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="auth-links">
          <Link to="/forgotPassword">Forgot password?</Link>
        </div>

        <button className="auth-action" onClick={handleSignIn}>
          ENTER
        </button>

        <div className="auth-footer">
          New here? <Link to="/signup">Create account</Link>
        </div>

      </div>
    </div>
  );
}
