

import React, { useState } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router'
import { base_uri } from '../../utils/global-function.js';
import {Link} from 'react-router'

export default function Signin() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const Navigate=useNavigate();

  const handleSignIn = async () => {
    const user = { email, password }
    try {
      const res = await axios.post(`${base_uri}/auth/signin`, user, { withCredentials: true });
      alert(res.data.message);
      if(res.data.status){
       Navigate("/verify-otp",{state:email});
      }
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center bg-light">
      <div className="container">
        <div className="row justify-content-center align-items-center">

          {/* Left SaaS Branding Section */}
          <div className="col-lg-6 d-none d-lg-flex flex-column justify-content-center text-white p-5 rounded-4"
            style={{
              background: "linear-gradient(135deg, #4f46e5, #0ea5e9)",
              minHeight: "520px"
            }}>
            <h1 className="fw-bold display-6 mb-3">Welcome Back 🚀</h1>
            <p className="fs-5 opacity-75">
              Login to manage your dashboard, analytics and SaaS tools from one powerful platform.
            </p>
            <ul className="mt-4 fs-6 opacity-75">
              <li>✔ Secure Authentication</li>
              <li>✔ Modern SaaS Dashboard</li>
              <li>✔ Fast & Scalable Platform</li>
            </ul>
          </div>

          {/* Right Signin Card */}
          <div className="col-lg-5 col-md-8">
            <div className="card border-0 shadow-lg rounded-4 p-4 p-md-5">
              <h3 className="fw-bold text-center mb-2">Sign in to your account</h3>
              <p className="text-muted text-center mb-4">
                Enter your credentials to continue
              </p>

              <div className="mb-3">
                <label className="form-label fw-semibold">Email address</label>
                <input
                  type="email"
                  className="form-control form-control-lg"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label className="form-label fw-semibold">Password</label>
                <input
                  type="password"
                  className="form-control form-control-lg"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="text-end mb-3">
  <Link
    to="/forgotPassword"
    className="text-primary fw-semibold"
    style={{ fontSize: "0.9rem", textDecoration: "none" }}
  >
    Forgot password?
  </Link>
</div>


              <button
                onClick={handleSignIn}
                className="btn btn-primary btn-lg w-100 fw-semibold rounded-3"
              >
                Sign In
              </button>

           <p className="text-center text-muted mt-4 mb-0">
  Don’t have an account?{" "}
  <Link to="/signup" className="text-primary fw-semibold" style={{ cursor: "pointer", textDecoration: "none" }}>
    Sign up
  </Link>
</p>

            </div>
          </div>

        </div>
      </div>
    </div>
  )
}