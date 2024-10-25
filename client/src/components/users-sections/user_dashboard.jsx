import { useState, useEffect } from "react";

const User_dashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // อัปเดตทุกๆ วินาที

    return () => clearInterval(interval); // Cleanup เมื่อตัว component ถูกยกเลิก
  }, []);

  // ดึงข้อมูลชื่อวัน, เดือน, และเวลาในรูปแบบที่ต้องการ
  const dayName = currentTime.toLocaleString("en-US", { weekday: "long" });
  const monthName = currentTime.toLocaleString("en-US", { month: "short" });
  const timeString = currentTime.toLocaleTimeString("en-US", {
    hour12: false, // ใช้รูปแบบเวลา 24 ชั่วโมง
  });

  return (
    <>
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-indigo-600 min-h-screen p-4 text-white flex flex-col justify-between">
          <div className="flex flex-col">
            <a className="text-2xl font-semibold mb-6">Logo</a>
            <nav className="flex flex-col gap-3">
              <a className="flex items-center gap-2 p-3 bg-indigo-700 rounded-lg">
                <img
                  src="/src/assets/dashboard.png"
                  alt="My Icon"
                  width="20"
                  height="20"
                />
                Dashboard
              </a>
              <a
                href="/employees"
                className="flex items-center gap-2 p-3 hover:bg-indigo-700 rounded-lg"
              >
                <img
                  src="/src/assets/setting.png"
                  alt="My Icon"
                  width="24"
                  height="24"
                />
                Employees
              </a>
              <a
                href="/roles"
                className="flex items-center gap-2 p-3 hover:bg-indigo-700 rounded-lg"
              >
                <img
                  src="/src/assets/hierarchical-structure.png"
                  alt="My Icon"
                  width="24"
                  height="24"
                />
                Roles
              </a>
              <a
                href="/rooms"
                className="flex items-center gap-2 p-3 hover:bg-indigo-700 rounded-lg"
              >
                <img
                  src="/src/assets/livingroom.png"
                  alt="My Icon"
                  width="24"
                  height="24"
                />
                Rooms
              </a>
              <a
                href="/reports"
                className="flex items-center gap-2 p-3 hover:bg-indigo-700 rounded-lg"
              >
                <img
                  src="/src/assets/bar-chart.png"
                  alt="My Icon"
                  width="24"
                  height="24"
                />
                Report
              </a>
            </nav>
          </div>

          {/* ปุ่ม Logout */}
          <a
            href="/login"
            className="flex items-center gap-2 p-3 hover:bg-indigo-700 rounded-lg mt-auto"
          >
            <img
              src="/src/assets/logout.png"
              alt="My Icon"
              width="24"
              height="24"
            />
            Logout
          </a>
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
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle"
                >
                  <div className="indicator">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    <span className="badge badge-sm indicator-item">8</span>
                  </div>
                </div>
                <div
                  tabIndex={0}
                  className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow"
                >
                  <div className="card-body">
                    <span className="text-lg font-bold">8 Items</span>
                    <span className="text-info">Subtotal: $999</span>
                    <div className="card-actions">
                      <button className="btn btn-primary btn-block">
                        View cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>

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
                    <a className="justify-between">
                      Profile
                      <span className="badge">New</span>
                    </a>
                  </li>
                  <li>
                    <a>Settings</a>
                  </li>
                  <li>
                    <a>Logout</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="min-h-screen bg-base-200">
            {/* Main Content */}
            <div className="p-6">
              <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
              {/* ส่วนที่จะแสดงรายละเอียดการจองล่าสุด */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default User_dashboard;
