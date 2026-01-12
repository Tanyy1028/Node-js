

import axios from "axios";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../app.css";

export default function VerifyOtp() {
  const [otp,setOtp] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const handleVerify = async () => {
    const res = await axios.post(
      "http://localhost:4444/verifyOtp",
      { email, otp },
      { withCredentials:true }
    );

    alert(res.data.message);

    if(res.data.message.includes("verified")){
      navigate("/blog");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">

        <div className="brand">Dev<span>Sphere</span></div>
        <div className="subtitle">
          Enter the OTP sent to your email
        </div>

        <input 
          placeholder="Enter 6 digit OTP"
          value={otp}
          onChange={e=>setOtp(e.target.value)}
          style={{textAlign:"center",letterSpacing:"4px",fontSize:"18px"}}
        />

        <button onClick={handleVerify}>Verify OTP</button>

        <div className="footer-text">
          Didn’t receive the code? <span>Resend</span>
        </div>

      </div>
    </div>
  );
}