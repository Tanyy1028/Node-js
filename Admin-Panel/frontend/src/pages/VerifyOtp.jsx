import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function VerifyOtp() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    otp: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async () => {
    try {
      const res = await api.post("/auth/verify-otp", form);
      alert(res.data.message || "Verified successfully");
      navigate("/"); // login page
    } catch (err) {
      alert(err.response?.data?.message || "OTP verification failed");
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Verify OTP</h2>

      <input
        name="email"
        placeholder="Email"
        onChange={handleChange}
      />
      <br /><br />

      <input
        name="otp"
        placeholder="OTP"
        onChange={handleChange}
      />
      <br /><br />

      <button onClick={submit}>Verify</button>
    </div>
  );
}