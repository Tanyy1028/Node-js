import React, { useState } from 'react'
import OtpInput from "react-otp-input";
import {useLocation,useNavigate} from 'react-router'
import { base_uri } from '../../utils/global-function';
import axios from 'axios'

export default function VerifyOtp() {

  const [otp, setOtp] = useState("");
  const {state}=useLocation();
  const Navigate=useNavigate();

  const handleVerifyOtp = async() => {
    
   try {
      const res = await axios.post(`${base_uri}/auth/verifyOtp`, {email:state, otp:Number(otp)},{withCredentials:true} );
      alert(res.data.message);
      if (res.data.status) {
        Navigate("/HomePage");
      }
    }catch(err) {
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
            <h1 className="fw-bold display-6 mb-3">Verify your OTP 🔐</h1>
            <p className="fs-5 opacity-75">
              Enter the 6-digit OTP sent to your registered email to continue.
            </p>
            <ul className="mt-4 fs-6 opacity-75 list-unstyled">
              <li className="mb-2">✔ Secure verification</li>
              <li className="mb-2">✔ One-time password protection</li>
              <li className="mb-2">✔ Safe & reliable system</li>
            </ul>
          </div>

          {/* Right Verify Card */}
          <div className="col-lg-5 col-md-8">
            <div className="card border-0 shadow-lg rounded-4 p-4 p-md-5">

              <h3 className="fw-bold text-center mb-2">OTP Verification</h3>
              <p className="text-muted text-center mb-4">
                Please enter the OTP to verify
              </p>

              {/* OTP Input */}
              <div className="mb-4 text-center">
                <label className="form-label fw-semibold d-block mb-3">
                  Enter OTP
                </label>

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

              <button
                onClick={handleVerifyOtp}
                className="btn btn-primary btn-lg w-100 fw-semibold rounded-3"
              >
                Verify OTP
              </button>

            </div>
          </div>

        </div>
      </div>
    </div>
  )
}