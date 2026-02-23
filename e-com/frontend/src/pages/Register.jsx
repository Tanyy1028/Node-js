import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "", // ⭐ name → username
    email: "",
    password: "",
  });

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/register", form);
      console.log(res.data);
      alert("Registered successfully");
      navigate("/login");
    } catch (err) {
      console.log("SERVER ERROR:", err?.response?.data);
      alert(err?.response?.data?.msg || "Register failed");
    }
  };

  return (
    <form onSubmit={submit} style={formStyle}>
      <h2>Register</h2>

      <input
        placeholder="Username"
        onChange={(e) =>
          setForm({ ...form, username: e.target.value })
        }
      />

      <input
        placeholder="Email"
        onChange={(e) =>
          setForm({ ...form, email: e.target.value })
        }
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) =>
          setForm({ ...form, password: e.target.value })
        }
      />

      <button>Register</button>
    </form>
  );
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  width: "300px",
  margin: "50px auto",
};

export default Register;