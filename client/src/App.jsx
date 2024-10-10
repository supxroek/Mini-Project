import { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const onSubmit = async (data) => {
    setError("");
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        data
      );

      if (response.status === 201) {
        setMessage("Registration successful!");
        reset(); // เคลียร์ฟอร์ม
      } else {
        setError("Registration failed!");
      }
      setLoading(false);
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred!");
      setLoading(false);
    }
  };

  const password = watch("password");

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="card w-full max-w-lg bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Sign Up</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* ใช้ Grid สำหรับฟิลด์ที่อยู่ใน row เดียวกัน */}
            <div className="grid grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">First Name</label>
                <input
                  type="text"
                  className="input input-bordered"
                  {...register("fname", { required: "First name is required" })}
                />
                {errors.fname && (
                  <span className="text-red-500 text-sm">
                    {errors.fname.message}
                  </span>
                )}
              </div>

              <div className="form-control">
                <label className="label">Last Name</label>
                <input
                  type="text"
                  className="input input-bordered"
                  {...register("lname", { required: "Last name is required" })}
                />
                {errors.lname && (
                  <span className="text-red-500 text-sm">
                    {errors.lname.message}
                  </span>
                )}
              </div>
            </div>

            {/* ใช้ Grid สำหรับฟิลด์ที่อยู่ใน row เดียวกัน */}
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="form-control">
                <label className="label">Email</label>
                <input
                  type="email"
                  className="input input-bordered"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Invalid email address",
                    },
                  })}
                />
                {errors.email && (
                  <span className="text-red-500 text-sm">
                    {errors.email.message}
                  </span>
                )}
              </div>

              <div className="form-control">
                <label className="label">Phone Number</label>
                <input
                  type="text"
                  className="input input-bordered"
                  {...register("pnumber", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^[0-9]{10}$/, // ตรวจสอบให้เบอร์โทรมี 10 หลัก
                      message: "Invalid phone number",
                    },
                  })}
                />
                {errors.pnumber && (
                  <span className="text-red-500 text-sm">
                    {errors.pnumber.message}
                  </span>
                )}
              </div>
            </div>

            <div className="form-control mt-4">
              <label className="label">Password</label>
              <input
                type="password"
                className="input input-bordered"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
              {errors.password && (
                <span className="text-red-500 text-sm">
                  {errors.password.message}
                </span>
              )}
            </div>

            <div className="form-control mt-4">
              <label className="label">Confirm Password</label>
              <input
                type="password"
                className="input input-bordered"
                {...register("confirmPassword", {
                  required: "Please confirm password",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
              />
              {errors.confirmPassword && (
                <span className="text-red-500 text-sm">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="form-control">
                <label className="label">Position</label>
                <select
                  className="select select-bordered"
                  {...register("position_id", {
                    required: "Position is required",
                  })}
                >
                  <option value="">Select Position</option>
                  <option value="1">Manager</option>
                  <option value="2">Employee</option>
                </select>
                {errors.position_id && (
                  <span className="text-red-500 text-sm">
                    {errors.position_id.message}
                  </span>
                )}
              </div>

              <div className="form-control">
                <label className="label">Department</label>
                <select
                  className="select select-bordered"
                  {...register("department_id", {
                    required: "Department is required",
                  })}
                >
                  <option value="">Select Department</option>
                  <option value="1">HR</option>
                  <option value="2">IT</option>
                </select>
                {errors.department_id && (
                  <span className="text-red-500 text-sm">
                    {errors.department_id.message}
                  </span>
                )}
              </div>
            </div>

            <div className="form-control mt-4">
              <button
                type="submit"
                className={`btn btn-primary ${loading ? "loading" : ""}`}
                disabled={loading}
              >
                Sign Up
              </button>
            </div>
            {message && (
              <p className="text-green-500 text-center mt-4">{message}</p>
            )}
            {error && <p className="text-red-500 text-center mt-4">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
