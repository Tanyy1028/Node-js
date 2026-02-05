import React, { useState } from "react";
import axios from "axios";
import { base_uri } from "../../utils/global-function";
import { Link } from "react-router";

// import "./auth.css"; // same css jo humne final kiya tha

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirmPassword] = useState("");

  const handleSignup = async () => {
    if (password !== confirm) {
      return alert("Password and confirm password not matched!");
    }

    try {
      const res = await axios.post(`${base_uri}/auth/signup`, {
        email,
        password,
      });
      alert(res.data.message);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="auth-root">
      <div className="auth-box">
        <h1 className="auth-title">CREATE ACCESS</h1>
        <p className="auth-subtitle">
          Secure onboarding • Zero friction • Full control
        </p>

        <div className="auth-field">
          <input
            type="email"
            placeholder="EMAIL ADDRESS"
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

        <div className="auth-field">
          <input
            type="password"
            placeholder="CONFIRM PASSWORD"
            value={confirm}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <button className="auth-action" onClick={handleSignup}>
          REGISTER
        </button>

        <div className="auth-footer">
          Already have access?{" "}
          <Link to="/">Sign in</Link>
        </div>
      </div>
    </div>
  );
}
