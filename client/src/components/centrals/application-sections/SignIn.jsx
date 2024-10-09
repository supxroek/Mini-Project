/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../navbar-sections/NavbarStart";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // ตรวจสอบข้อมูล login
    if (email === "admin@test.com" && password === "1234") {
      navigate("/dashboard"); // ลิ้งไปยังหน้า Dashboard
    } else {
      alert("Email or password is incorrect");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content">
          <div className="text-center lg:text-center">
            <h1 className="text-5xl font-bold">Sign In now!</h1>
            <p className="p-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi.
            </p>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form className="card-body" onSubmit={handleLogin}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <label className="label">
                  <Link
                    to="/ForgotPass"
                    className="label-text-alt link link-hover"
                  >
                    Forgot password?
                  </Link>
                </label>
              </div>
              <div className="form-control mt-6">
                <button type="submit" className="btn btn-outline btn-success">
                  Login
                </button>
              </div>
              <label className="label text-center text-sm text-gray-600">
                <p className="py-6 text-center">
                  Don't have an account yet?{" "}
                  <Link
                    to="/SignUp"
                    className="label-text-alt link link-hover text-sm"
                  >
                    Create new account
                  </Link>
                </p>
              </label>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
