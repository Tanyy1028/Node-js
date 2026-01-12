

import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../app.css";

export default function Signup() {

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    const res = await axios.post("http://localhost:4444/signup",{email,password});
    alert(res.data.message);

    if(res.data.message.includes("success")){
      navigate("/signin");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">

        <div className="brand">Vibe<span>Check</span></div>
       <div className="subtitle">Where developers write, build, and grow</div>


        <input 
          placeholder="Enter your email"
          onChange={e=>setEmail(e.target.value)} 
        />

        <input 
          type="password"
          placeholder="Create password"
          onChange={e=>setPassword(e.target.value)} 
        />

        <button onClick={handleSignup}>Sign Up</button>

        <div className="footer-text">
          Already have an account? <span onClick={()=>navigate("/signin")}>Sign In</span>
        </div>

      </div>
    </div>
  );
}