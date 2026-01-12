import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../app.css";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignin = async () => {
    if (!email || !password) {
      alert("Please enter both email and password!");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:4444/signin",
        { email, password },
        { withCredentials: true } // cookies ke liye zaruri
      );

      alert(res.data.message);

      // Agar OTP verification required
      if (res.data.message.includes("OTP")) {
        navigate("/verify", { state: { email } });
      } else {
        // Successfully logged in
        navigate("/dashboard"); // ya jo bhi page after login
      }

    } catch (err) {
      // Backend se error message show karo
      console.error("Axios Error:", err);
      alert(err.response ? err.response.data.message : err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="brand">Vibe<span>Check</span></div>
        <div className="subtitle">Sign in to your account</div>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <button onClick={handleSignin} disabled={loading}>
          {loading ? "Signing in..." : "Sign In"}
        </button>

        <div className="footer-text">
          Don’t have an account? <span onClick={() => navigate("/")}>Sign Up</span>
        </div>
      </div>
    </div>
  );
}
