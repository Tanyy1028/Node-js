import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", form);

      // ✅ role based redirect
      if (res.data.role === "teacher") {
        navigate("/teacher");
      } else if (res.data.role === "principal") {
        navigate("/principal");
      }

    } catch (err) {
      const msg = err.response?.data?.message;
      console.log("LOGIN ERROR MSG:", msg);

      // 🔥 AUTO redirect if not verified
      if (msg === "Please verify OTP first") {
        navigate("/verify-otp", {
          state: { email: form.email },
        });
      } else {
        alert(msg || "Login failed");
      }
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Login</h2>

      <form onSubmit={submit}>
        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <br /><br />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <br /><br />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}