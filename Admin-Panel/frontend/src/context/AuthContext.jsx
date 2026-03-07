import { createContext, useContext, useState, useEffect } from "react";
import { authAPI } from "../api/axios";

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context};
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on mount
  useEffect(() => {
    const checkAuth = async () => {
      if (token) {
        try {
          const response = await authAPI.getProfile();
          setUser(response.data.data);
        } catch (error) {
          // Token is invalid
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setToken(null);
          setUser(null);
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, [token]);

  // Login function
  const login = async (email, password) => {
    const response = await authAPI.login({ email, password });
    const { token, role, name } = response.data;
    
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify({ role, name }));
    setToken(token);
    setUser({ role, name });
    
    return response.data;
  };

  // Register function
  const register = async (userData) => {
    const response = await authAPI.register(userData);
    return response.data;
  };

  // Verify OTP function
  const verifyOTP = async (email, otp) => {
    const response = await authAPI.verifyOTP({ email, otp });
    const { token, role, name } = response.data;
    
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify({ role, name }));
    setToken(token);
    setUser({ role, name });
    
    return response.data;
  };

  // Logout function
  const logout = async () => {
    try {
      await authAPI.logout();
    } catch (error) {
      // Ignore logout errors
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setToken(null);
      setUser(null);
    }
  };

  // Update profile
  const updateProfile = async (data) => {
    const response = await authAPI.updateProfile(data);
    setUser(response.data.data);
    return response.data;
  };

  // Check if user is admin
  const isAdmin = user?.role === "admin";

  // Check if user has permission
  const hasPermission = (...roles) => {
    return user && roles.includes(user.role);
  };

  const value = {
    user,
    token,
    loading,
    isAuthenticated: !!token && !!user,
    isAdmin,
    hasPermission,
    login,
    register,
    verifyOTP,
    logout,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;

