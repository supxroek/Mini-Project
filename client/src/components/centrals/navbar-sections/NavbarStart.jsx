import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div>
      <div className="navbar bg-base-100">
        <Link to="/" className="btn btn-ghost text-xl">
          daisyUI
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
