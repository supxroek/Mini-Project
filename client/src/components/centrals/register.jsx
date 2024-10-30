import { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Swal from "sweetalert2"; // import sweetalert2

const Register = () => {
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
  const [positions, setPositions] = useState([]); // State สำหรับตำแหน่ง
  const [departments, setDepartments] = useState([]); // State สำหรับแผนก

  const navigate = useNavigate(); // เรียกใช้ useNavigate

  useEffect(() => {
    const fetchPositionsAndDepartments = async () => {
      try {
        const positionsResponse = await axios.get(
          "http://localhost:5000/api/auth/list-positions"
        );
        const departmentsResponse = await axios.get(
          "http://localhost:5000/api/auth/list-departments"
        );

        setPositions(positionsResponse.data.positions); // บันทึกตำแหน่ง
        setDepartments(departmentsResponse.data.departments); // บันทึกแผนก
      } catch (err) {
        console.error("Error fetching positions or departments:", err);
        setError("Failed to load positions or departments.");
      }
    };

    fetchPositionsAndDepartments(); // เรียกใช้ฟังก์ชันเพื่อดึงข้อมูล
  }, []);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        data
      );
      if (response.status === 201) {
        Swal.fire("Success", "Registration successful!", "success").then(() => {
          reset();
          navigate("/login");
        });
      } else {
        Swal.fire("Error", "Registration failed!", "error");
      }
    } catch (error) {
      Swal.fire(
        "Error",
        error.response?.data?.message || "An error occurred!",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  const password = watch("password");

  // Inline styles for the animated background
  const backgroundStyle = {
    backgroundImage:
      'url("https://images.pexels.com/photos/1292998/pexels-photo-1292998.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")', // Replace with your image URL
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: -1,
    animation: "moveBackground 30s linear infinite",
  };

  // Keyframes for background animation
  const keyframes = `
    @keyframes moveBackground {
      0% { background-position: 0% 0%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 100%; }
    }
  `;

  return (
    <div
      className="min-h-screen bg-gray-200 flex justify-center items-center"
      style={backgroundStyle}
    >
      <style>{keyframes}</style>
      <div className="card w-500 max-w-lg bg-base-100 shadow-xl p-6">
        <div className="card-body">
          <h2 className="card-title text-center mb-4 text-2xl">Sign Up</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* ใช้ Grid สำหรับฟิลด์ที่อยู่ใน row เดียวกัน */}
            <div className="grid grid-cols-2 gap-2 mb-2">
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
            <div className="grid grid-cols-2 gap-2 mb-2">
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

            <div className="form-control mb-2">
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

            <div className="form-control mb-2">
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

            <div className="grid grid-cols-2 gap-2 mb-2">
              <div className="form-control">
                <label className="label">Position</label>
                <select
                  className="select select-bordered"
                  {...register("position_id", {
                    required: "Position is required",
                  })}
                >
                  <option value="">Select Position</option>
                  {positions.map((position) => (
                    <option key={position.id} value={position.id}>
                      {position.name}
                    </option>
                  ))}
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
                  {departments.map((department) => (
                    <option key={department.id} value={department.id}>
                      {department.name}
                    </option>
                  ))}
                </select>
                {errors.department_id && (
                  <span className="text-red-500 text-sm">
                    {errors.department_id.message}
                  </span>
                )}
              </div>
            </div>
            <br />

            <div className="form-control mb-4">
              <button
                type="submit"
                className={`btn btn-primary ${loading ? "loading" : ""}`}
                disabled={loading}
              >
                Sign Up
              </button>
            </div>
            <div className="text-center">
              <p className="mt-4">
                Already have an account?{" "}
                <a href="/login" className="link">
                  Login
                </a>
              </p>
            </div>

            {message && (
              <p className="text-green-500 text-center mt-2">{message}</p>
            )}
            {error && <p className="text-red-500 text-center mt-2">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
