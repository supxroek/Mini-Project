/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        data
      );
      setMessage("Login successful!");
      console.log(response.data); // ใช้ response data ตามความต้องการ
      setLoading(false);
      // Handle redirection based on role from response data
    } catch (error) {
      setMessage(
        `Login failed: ${error.response?.data?.message || error.message}`
      );
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex justify-center items-center">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl">Sign In</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control">
              <label className="label">Email</label>
              <input
                type="email"
                className="input input-bordered"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <span className="text-red-500 text-sm">
                  {errors.email.message}
                </span>
              )}
            </div>

            <div className="form-control">
              <label className="label">Password</label>
              <input
                type="password"
                className="input input-bordered"
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && (
                <span className="text-red-500 text-sm">
                  {errors.password.message}
                </span>
              )}
            </div>

            <div className="form-control mt-4">
              <button
                type="submit"
                className={`btn btn-primary ${loading ? "loading" : ""}`}
                disabled={loading}
              >
                Sign In
              </button>
              <div className="text-center">
                <p className="mt-4">
                  Don't have an account?{" "}
                  <a href="/signup" className="link">
                    Sign Up
                  </a>
                </p>
              </div>
            </div>
            {message && <p className="text-center mt-4">{message}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
