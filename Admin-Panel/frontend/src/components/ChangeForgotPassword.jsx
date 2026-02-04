import React, { useState } from 'react'
import OtpInput from "react-otp-input";
import axios from 'axios'
import { base_uri } from '../../utils/global-function';
import {useNavigate} from 'react-router'

export default function ChangeForgotPassword() {

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const Navigate=useNavigate();

  const handleChangePassword = async() => {

    const data = {
      email,
      otp,
      newPassword
    };

   try{
    const res = await axios.post(`${base_uri}/auth/changeForgotPassword`,data);
       alert(res.data.message);
      if(res.data.status){
        Navigate("/");
      }
   }catch(err){
    alert(err.message);
   }
  };

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
            <h1 className="fw-bold display-6 mb-3">Reset your password 🔑</h1>
            <p className="fs-5 opacity-75">
              Enter the OTP sent to your email and set a new secure password.
            </p>
            <ul className="mt-4 fs-6 opacity-75 list-unstyled">
              <li className="mb-2">✔ OTP based verification</li>
              <li className="mb-2">✔ Secure password update</li>
              <li className="mb-2">✔ Protecting your account</li>
            </ul>
          </div>

          {/* Right Card */}
          <div className="col-lg-5 col-md-8">
            <div className="card border-0 shadow-lg rounded-4 p-4 p-md-5">

              <h3 className="fw-bold text-center mb-2">Change Password</h3>
              <p className="text-muted text-center mb-4">
                Verify OTP and create new password
              </p>

              {/* Email */}
              <div className="mb-3">
                <label className="form-label fw-semibold">Email</label>
                <input
                  type="email"
                  className="form-control form-control-lg"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* OTP */}
              <div className="mb-4 text-center">
                <label className="form-label fw-semibold d-block mb-2">Enter OTP</label>

                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  numInputs={6}
                  shouldAutoFocus
                  renderInput={(props) => <input {...props} />}
                  inputStyle={{
                    width: "45px",
                    height: "50px",
                    margin: "0 6px",
                    fontSize: "18px",
                    borderRadius: "8px",
                    border: "1px solid #ced4da"
                  }}
                />
              </div>

              {/* New Password */}
              <div className="mb-4">
                <label className="form-label fw-semibold">New Password</label>
                <input
                  type="password"
                  className="form-control form-control-lg"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>

              <button
                onClick={handleChangePassword}
                className="btn btn-primary btn-lg w-100 fw-semibold rounded-3"
              >
                Update Password
              </button>

            </div>
          </div>

        </div>
      </div>
    </div>
  )
}