import { useEffect, useState } from "react";
import api from "../api/axios";

export default function PrincipalDashboard() {
  const [teachers, setTeachers] = useState([]);

  const fetchTeachers = async () => {
    const res = await api.get("/teachers");
    setTeachers(res.data);
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  return (
    <div>
      <h1>Principal Dashboard 👑</h1>

      {teachers.map(t => (
        <div key={t._id}>
          {t.name} - {t.subject}
        </div>
      ))}
    </div>
  );
}