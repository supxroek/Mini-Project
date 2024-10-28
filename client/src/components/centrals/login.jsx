/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom"; // เรียกใช้ useNavigate

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate(); // เรียกใช้ useNavigate

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        data
      );
      const userRole = response.data.role;

      setMessage("Login successful!");
      console.log(response.data); // ใช้ response data ตามความต้องการ
      setLoading(false);

      setTimeout(() => {
        if (userRole === 1) {
          navigate("/admin_dashboard"); // Redirect ไปที่ dashboard สำหรับ Admin
        } else if (userRole === null || userRole === 2) {
          navigate("/user_dashboard"); // Redirect ไปที่ dashboard สำหรับ Manager
        } else {
          navigate("/404"); // Redirect ไปที่ dashboard สำหรับ User ทั่วไป
        }
      }, 2000);
      // Handle redirection based on role from response data
    } catch (error) {
      setMessage(
        `Login failed: ${error.response?.data?.message || error.message}`
      );
      setLoading(false);
    }
  };

  // Inline styles for the background animation
  const backgroundStyle = {
    backgroundImage: 'url("https://your-image-url.com/your-image.jpg")', // Replace with your image URL
    backgroundSize: "cover",
    backgroundPosition: "center",
    animation: "moveBackground 10s linear infinite",
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: -1,
  };

  // Keyframes for background animation
  const keyframes = `
    @keyframes moveBackground {
      0% { background-position: 0 0; }
      100% { background-position: 100% 0; }
    }
  `;

  return (
    <div className="min-h-screen bg-gray-200 flex justify-center items-center" style={backgroundStyle}>
      <style>{keyframes}</style>
      <div className="card w-96 bg-gray-100 shadow-lg z-10"> {/* Changed to gray shades */}
        <div className="card-body">
          <h2 className="card-title text-2xl text-gray-800">Sign In</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control">
              <label className="label text-gray-700">Email</label>
              <input
                type="email"
                className="input input-bordered bg-gray-50 text-gray-800" // Light gray background for input
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <span className="text-red-500 text-sm">
                  {errors.email.message}
                </span>
              )}
            </div>

            <div className="form-control">
              <label className="label text-gray-700">Password</label>
              <input
                type="password"
                className="input input-bordered bg-gray-50 text-gray-800" // Light gray background for input
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && (
                <span className="text-red-500 text-sm">
                  {errors.password.message}
                </span>
              )}
            </div>

            <div className="text-sm text-gray-600 text-right mt-2">
              <a href="/forgot_password" className="link text-gray-600">
                Forgot Password
              </a>
            </div>

            <div className="form-control mt-4">
              <button
                type="submit"
                className={`btn btn-primary bg-gray-700 text-white ${loading ? "loading" : ""}`} // Darker gray for the button
                disabled={loading}
              >
                Login
              </button>
              <div className="text-center">
                <p className="mt-4 text-gray-600">
                  Don't have an account?{" "}
                  <a href="/register" className="link text-gray-600">
                    Sign Up
                  </a>
                </p>
              </div>
            </div>
            {message && <p className="text-center mt-4 text-gray-600">{message}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
