import { useState } from "react";
import api from "../api/axios";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "teacher"
  });

  const submit = async () => {
    await api.post("/auth/register", form);
    alert("OTP sent to email");
    window.location = "/verify";
  };

  return (
    <div>
      <h2>Register</h2>

      <input placeholder="Name"
        onChange={e => setForm({...form,name:e.target.value})} />

      <input placeholder="Email"
        onChange={e => setForm({...form,email:e.target.value})} />

      <input type="password" placeholder="Password"
        onChange={e => setForm({...form,password:e.target.value})} />

      <select onChange={e => setForm({...form,role:e.target.value})}>
        <option value="teacher">Teacher</option>
        <option value="principal">Principal</option>
      </select>

      <button onClick={submit}>Register</button>
    </div>
  );
}