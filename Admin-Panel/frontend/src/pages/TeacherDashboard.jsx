import { useEffect, useState } from "react";
import api from "../api/axios";

export default function TeacherDashboard() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const res = await api.get("/auth/me");
      setProfile(res.data);
    } catch (err) {
      console.error(err);
      alert("Session expired");
      logout();
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location = "/";
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) return <h2>Loading...</h2>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Teacher Dashboard 👨‍🏫</h1>

      <hr />

      <h3>Welcome: {profile?.name}</h3>
      <p>Email: {profile?.email}</p>
      <p>Role: {profile?.role}</p>
      <p>Verified: {profile?.isVerified ? "Yes ✅" : "No ❌"}</p>

      <br />

      <button onClick={logout}>Logout</button>
    </div>
  );
}