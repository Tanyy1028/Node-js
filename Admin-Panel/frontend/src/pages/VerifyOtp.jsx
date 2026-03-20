import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import OTPInput from "react-otp-input";
import { useAuth } from "../context/AuthContext";
import { authAPI } from "../api/axios";
import LoadingSpinner from "../components/LoadingSpinner";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { verifyOTP } = useAuth();

  const email = location.state?.email;

  useEffect(() => {
    if (!email) {
      navigate("/register");
    }
  }, [email, navigate]);

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          clearInterval(countdown);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, []);

  const handleVerify = async (e) => {
    e.preventDefault();
    if (otp.length !== 6) return;

    setIsLoading(true);
    try {
      await verifyOTP(email, otp);
      navigate("/dashboard");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Invalid or expired OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      await authAPI.resendOTP({ email });
      setTimer(60);
      setCanResend(false);
      setOtp("");
    } catch (error) {
      console.error("Resend OTP error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Verify Email</h1>
            <p className="text-gray-500 mt-2">
              Enter the 6-digit code sent to your email
            </p>
          </div>

          <form onSubmit={handleVerify} className="space-y-6">
            <div className="flex justify-center">
              <OTPInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                renderSeparator={<span className="w-2" />}
                renderInput={(props) => (
                  <input
                    {...props}
                    className="w-12 h-12 text-center border-2 border-gray-300 rounded-lg focus:border-primary-500 focus:outline-none text-xl font-bold"
                  />
                )}
              />
            </div>

            <button
              type="submit"
              disabled={otp.length !== 6 || isLoading}
              className="w-full bg-primary-600 text-white py-3 rounded-lg font-medium hover:bg-primary-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? <LoadingSpinner size="sm" /> : "Verify OTP"}
            </button>

            <div className="text-center">
              {canResend ? (
                <button
                  type="button"
                  onClick={handleResend}
                  className="text-primary-600 hover:text-primary-700 font-medium"
                >
                  Resend OTP
                </button>
              ) : (
                <p className="text-gray-500">
                  Resend OTP in{" "}
                  <span className="font-medium text-gray-700">{timer}s</span>
                </p>
              )}
            </div>
          </form>

          <div className="mt-6 text-center">
            <Link
              to="/login"
              className="text-gray-600 hover:text-gray-700 text-sm"
            >
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;

