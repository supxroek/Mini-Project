import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const User_dashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [bookingCount, setBookingCount] = useState(0);
  const [missedBookingCount, setMissedBookingCount] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const navigate = useNavigate();

  // Update current time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Fetch booking and missed count from localStorage or API on load
  useEffect(() => {
    const storedBookingCount = localStorage.getItem("bookingCount");
    const storedMissedBookingCount = localStorage.getItem("missedBookingCount");
    if (storedBookingCount) setBookingCount(parseInt(storedBookingCount));
    if (storedMissedBookingCount)
      setMissedBookingCount(parseInt(storedMissedBookingCount));

    // Check if the user should be locked out
    if (storedMissedBookingCount >= 3) setIsLocked(true);
  }, []);

  // Function to handle a successful booking
  const handleBooking = () => {
    if (isLocked) {
      alert(
        "คุณทำการจองห้องและไม่ได้เข้าใช้งานเกิน 3 ครั้ง กรุณาติดต่อเจ้าหน้าที่"
      );
      return;
    }

    setBookingCount((prev) => {
      const newCount = prev + 1;
      localStorage.setItem("bookingCount", newCount);
      return newCount;
    });
  };

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("bookingCount");
    localStorage.removeItem("missedBookingCount");
    navigate("/login");
  };

  const handleContactSupport = () => {
    alert(
      "กรุณาติดต่อเจ้าหน้าที่:\nโทรศัพท์: 02-123-4567\nอีเมล: support@example.com"
    );
  };

  const dayName = currentTime.toLocaleString("en-US", { weekday: "long" });
  const monthName = currentTime.toLocaleString("en-US", { month: "short" });
  const timeString = currentTime.toLocaleTimeString("en-US", {
    hour12: false,
  });

  return (
    <div className="flex bg-gray-700">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 min-h-screen p-4 text-white flex flex-col justify-between">
        <div className="flex flex-col">
          <a className="text-2xl font-semibold mb-6">Logo</a>
          <nav className="flex flex-col gap-3">
            <a className="flex items-center gap-2 p-3 bg-neutral rounded-lg">
              <img
                src="/src/assets/dashboard.png"
                alt="Dashboard Icon"
                width="20"
                height="20"
              />
              Dashboard
            </a>
            <a
              href="/booking"
              className="flex items-center gap-2 p-3 hover:bg-neutral rounded-lg"
            >
              <img
                src="/src/assets/setting.png"
                alt="Booking Icon"
                width="24"
                height="24"
              />
              Booking
            </a>
            <a
              href="/history"
              className="flex items-center gap-2 p-3 hover:bg-neutral rounded-lg"
            >
              <img
                src="/src/assets/hierarchical-structure.png"
                alt="History Icon"
                width="24"
                height="24"
              />
              History
            </a>
          </nav>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 p-3 hover:bg-neutral rounded-lg mt-auto"
        >
          <img
            src="/src/assets/logout.png"
            alt="Logout Icon"
            width="24"
            height="24"
          />
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <div className="flex-1">
        {/* Navbar */}
        <div className="navbar bg-base-100">
          <div className="navbar-start m-4">
            <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
              <div className="flex flex-col">
                <span className="countdown font-mono font-semibold text-2xl text-black">
                  {dayName}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="countdown font-mono font-semibold text-2xl text-black">
                  {monthName}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="countdown font-mono font-semibold text-2xl text-black">
                  {timeString}
                </span>
              </div>
            </div>
          </div>
          <div className="navbar-end">
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="User Avatar"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-gray-800 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <a href="/profile" className="justify-between text-white">
                    Profile
                    <span className="badge">New</span>
                  </a>
                </li>
                <li>
                  <button onClick={handleLogout} className="text-white">
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="min-h-screen bg-gray-300">
          {/* Main Content */}
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
            <p className="text-gray-800">Bookings: {bookingCount}</p>
            <p className="text-gray-800">
              Missed Bookings: {missedBookingCount}
            </p>
            <button
              onClick={handleBooking}
              className="btn btn-primary text-white m-2 bg-gray-600 hover:bg-gray-500"
            >
              Book Now
            </button>
            <button
              onClick={handleContactSupport}
              className="btn btn-info text-white m-2 bg-gray-600 hover:bg-gray-500"
            >
              ติดต่อเจ้าหน้าที่
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User_dashboard;
