import { useState, useEffect } from "react";

// Component สำหรับจัดการห้อง
const RoomsManagement = () => {
  const [rooms, setRooms] = useState([
    { id: 1, name: "Room A", locked: false },
    { id: 2, name: "Room B", locked: false },
  ]);
  const [newRoomName, setNewRoomName] = useState("");

  const addRoom = () => {
    if (newRoomName.trim()) {
      setRooms([
        ...rooms,
        { id: rooms.length + 1, name: newRoomName, locked: false },
      ]);
      setNewRoomName("");
    }
  };

  const deleteRoom = (id) => {
    setRooms(rooms.filter((room) => room.id !== id));
  };

  const toggleLockRoom = (id) => {
    setRooms(
      rooms.map((room) =>
        room.id === id ? { ...room, locked: !room.locked } : room
      )
    );
  };

  return (
    <div>
      <div className="mb-4">
        <input
          type="text"
          value={newRoomName}
          onChange={(e) => setNewRoomName(e.target.value)}
          placeholder="Enter room name"
          className="input input-bordered mr-2"
        />
        <button onClick={addRoom} className="btn btn-primary">
          Add Room
        </button>
      </div>
      <ul>
        {rooms.map((room) => (
          <li key={room.id} className="flex items-center justify-between mb-2">
            <span className={room.locked ? "line-through" : ""}>
              {room.name}
            </span>
            <div>
              <button
                onClick={() => toggleLockRoom(room.id)}
                className={`btn btn-sm mr-2 ${
                  room.locked ? "btn-warning" : "btn-secondary"
                }`}
              >
                {room.locked ? "Unlock" : "Lock"}
              </button>
              <button
                onClick={() => deleteRoom(room.id)}
                className="btn btn-sm btn-error"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Component สำหรับแสดงหน้า Rooms
const Rooms = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // อัปเดตทุกๆ วินาที

    return () => clearInterval(interval); // Cleanup เมื่อตัว component ถูกยกเลิก
  }, []);

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
            <a
              href="/admin_dashboard"
              className="flex items-center gap-2 p-3 hover:bg-indigo-700 rounded-lg"
            >
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
            <a className="flex items-center gap-2 p-3 bg-indigo-700 rounded-lg">
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
                </span>
              </div>
              <div className="flex flex-col">
                <span className="countdown font-mono font-semibold text-2xl">
                  {monthName}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="countdown font-mono font-semibold text-2xl">
                  {timeString}
                </span>
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
                className="menu menu-sm dropdown-content bg-base-100 z-[1] mt-3 p-2 shadow rounded-box w-52"
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

        {/* Room Management Section */}
        <div className="p-6">
          <h1 className="text-2xl font-semibold mb-4">Rooms Management</h1>
          <RoomsManagement />
        </div>
      </div>
    </div>
  );
};

export default Rooms;
