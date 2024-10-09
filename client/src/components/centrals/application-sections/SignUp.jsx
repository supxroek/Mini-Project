import { Link } from "react-router-dom";

import NavbarStart from "../navbar-sections/NavbarStart";

function SignUp() {
  return (
    <div className="div">
      <NavbarStart />
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center">
            <h1 className="text-5xl font-bold">Sign Up now!</h1>
            <p className="p-6">
              Join us today and enjoy exclusive benefits. Sign up to get
              started!
            </p>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Confirm Password</span>
                </label>
                <input
                  type="password"
                  placeholder="confirm password"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-outline btn-info">Sign Up</button>
              </div>
              <label className="label text-sm text-gray-600">
                <p className="py-6 text-center">
                  Do you have an account?{" "}
                  <Link
                    to="/SignIn"
                    className="label-text-alt link link-hover text-sm text-left"
                  >
                    Login Now!
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

export default SignUp;
