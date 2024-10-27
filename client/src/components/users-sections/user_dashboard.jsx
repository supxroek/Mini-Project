import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const User_dashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const navigate = useNavigate();

  // ตั้งค่าเวลาปัจจุบัน
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // อัปเดตทุกๆ วินาที

    return () => clearInterval(interval); // Cleanup interval
  }, []);

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("authToken"); // ลบ token
    navigate("/login"); // นำผู้ใช้ไปหน้า login
  };

  // ดึงข้อมูลชื่อวัน, เดือน, และเวลา
  const dayName = currentTime.toLocaleString("en-US", { weekday: "long" });
  const monthName = currentTime.toLocaleString("en-US", { month: "short" });
  const timeString = currentTime.toLocaleTimeString("en-US", {
    hour12: false, // ใช้รูปแบบเวลา 24 ชั่วโมง
  });

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="w-64 bg-indigo-600 min-h-screen p-4 text-white flex flex-col justify-between">
        <div className="flex flex-col">
          <a className="text-2xl font-semibold mb-6">Logo</a>
          <nav className="flex flex-col gap-3">
            <a className="flex items-center gap-2 p-3 bg-indigo-700 rounded-lg">
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
              className="flex items-center gap-2 p-3 hover:bg-indigo-700 rounded-lg"
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
              className="flex items-center gap-2 p-3 hover:bg-indigo-700 rounded-lg"
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

        {/* ปุ่ม Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 p-3 hover:bg-indigo-700 rounded-lg mt-auto"
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
                <span className="countdown font-mono font-semibold text-2xl">
                  {dayName}
                </span>{" "}
                {/* แสดงชื่อวัน */}
              </div>
              <div className="flex flex-col">
                <span className="countdown font-mono font-semibold text-2xl">
                  {monthName}
                </span>{" "}
                {/* แสดงชื่อเดือน */}
              </div>
              <div className="flex flex-col">
                <span className="countdown font-mono font-semibold text-2xl">
                  {timeString}
                </span>{" "}
                {/* แสดงเวลา */}
              </div>
            </div>
          </div>
          <div className="navbar-end">
            {/* Cart Dropdown */}

            {/* User Dropdown */}
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
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <a href="/profile" className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </a>
                </li>
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="min-h-screen bg-base-200">
          {/* Main Content */}
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
            {/* ส่วนที่จะแสดงรายละเอียด */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default User_dashboard;
