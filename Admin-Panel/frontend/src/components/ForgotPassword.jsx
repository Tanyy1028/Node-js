
import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router'
import { base_uri } from '../../utils/global-function';

export default function ForgotPassword() {

  const [email, setEmail] = useState("");
  const Navigate = useNavigate();

  const handleForgotPassword = async () => {
    try {
      const res = await axios.post(`${base_uri}/auth/forgotPassword`, { email });
      alert(res.data.message);
      if (res.data.status) {
        Navigate("/ChangeForgotPassword");
      }
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center bg-light">
      <div className="container">
        <div className="row justify-content-center align-items-center">

          {/* Left SaaS Panel */}
          <div
            className="col-lg-6 d-none d-lg-flex flex-column justify-content-center text-white p-5 rounded-4"
            style={{
              background: "linear-gradient(135deg, #4f46e5, #0ea5e9)",
              minHeight: "520px"
            }}
          >
            <h1 className="fw-bold display-6 mb-3">Forgot your password? 🔐</h1>
            <p className="fs-5 opacity-75">
              Don’t worry. Enter your registered email and we’ll help you reset your password.
            </p>
            <ul className="mt-4 fs-6 opacity-75 list-unstyled">
              <li className="mb-2">✔ Secure recovery process</li>
              <li className="mb-2">✔ Quick verification</li>
              <li className="mb-2">✔ Protecting your account</li>
            </ul>
          </div>

          {/* Right Forgot Card */}
          <div className="col-lg-5 col-md-8">
            <div className="card border-0 shadow-lg rounded-4 p-4 p-md-5">

              <h3 className="fw-bold text-center mb-2">Forgot Password</h3>
              <p className="text-muted text-center mb-4">
                Enter your email to continue
              </p>

              <div className="mb-4">
                <label className="form-label fw-semibold">Email address</label>
                <input
                  type="email"
                  className="form-control form-control-lg"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <button
                onClick={handleForgotPassword}
                className="btn btn-primary btn-lg w-100 fw-semibold rounded-3"
              >
                Continue
              </button>

            </div>
          </div>

        </div>
      </div>
    </div>
  )
}