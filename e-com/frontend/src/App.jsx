import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar"; // ⭐ import
import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./pages/Products";
import Categories from "./pages/Categories";

function App() {
  return (
    <BrowserRouter>
      <Navbar /> {/* ⭐ ALWAYS visible */}

      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<Products />} />
        <Route path="/categories" element={<Categories />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;