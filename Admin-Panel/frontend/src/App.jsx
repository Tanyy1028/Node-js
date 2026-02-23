import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import VerifyOtp from "./pages/VerifyOtp";
import TeacherDashboard from "./pages/TeacherDashboard";
import PrincipalDashboard from "./pages/PrincipalDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />

        {/* Dashboards */}
        <Route path="/teacher" element={<TeacherDashboard />} />
        <Route path="/principal" element={<PrincipalDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;