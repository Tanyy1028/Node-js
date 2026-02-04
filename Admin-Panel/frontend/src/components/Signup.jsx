
import React, { useState } from 'react'
import axios from 'axios'
import { base_uri } from '../../utils/global-function'
import {Link} from 'react-router'


export default function Signup() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirmPassword] = useState("");

  const handleSignup = async () => {

    if (password !== confirm) {
      return alert("Password and confirm password not matched!");
    }

    const user = { email, password }

    try {
      const res = await axios.post(`${base_uri}/auth/signup`, user);
      alert(res.data.message );
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center bg-light">
      <div className="container">
        <div className="row justify-content-center align-items-center">

          {/* Left SaaS Panel (same as signin) */}
          <div
            className="col-lg-6 d-none d-lg-flex flex-column justify-content-center text-white p-5 rounded-4"
            style={{
              background: "linear-gradient(135deg, #4f46e5, #0ea5e9)",
              minHeight: "520px"
            }}
          >
            <h1 className="fw-bold display-6 mb-3">Create your account ✨</h1>
            <p className="fs-5 opacity-75">
              Join our SaaS platform and manage everything from one powerful dashboard.
            </p>
            <ul className="mt-4 fs-6 opacity-75 list-unstyled">
              <li className="mb-2">✔ Quick & secure signup</li>
              <li className="mb-2">✔ Modern SaaS experience</li>
              <li className="mb-2">✔ Scalable & reliable system</li>
            </ul>
          </div>

          {/* Right Signup Card */}
          <div className="col-lg-5 col-md-8">
            <div className="card border-0 shadow-lg rounded-4 p-4 p-md-5">

              <h3 className="fw-bold text-center mb-2">Create Account</h3>
              <p className="text-muted text-center mb-4">
                Sign up to get started
              </p>

              <div className="mb-3">
                <label htmlFor="email" className="form-label fw-semibold">Email</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control form-control-lg"
                  placeholder="name@example.com"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label fw-semibold">Password</label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control form-control-lg"
                  placeholder="password"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="confirm" className="form-label fw-semibold">Confirm Password</label>
                <input
                  id="confirm"
                  type="password"
                  value={confirm}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="form-control form-control-lg"
                  placeholder="confirm password"
                />
              </div>

              <button
                onClick={handleSignup}
                className="btn btn-primary btn-lg w-100 fw-semibold rounded-3"
              >
                Sign Up
              </button>
    <p className="text-center text-muted mt-4 mb-0">
  Already have an account?{" "}
  <Link
    to="/"
    className="text-primary fw-semibold"
    style={{ cursor: "pointer", textDecoration: "none" }}
  >
    Sign in
  </Link>
</p>

            </div>
          </div>

        </div>
      </div>
    </div>
  )
}