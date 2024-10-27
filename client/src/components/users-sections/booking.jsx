import { useState, useEffect } from "react";

const rooms = [
  {
    id: 1,
    type: "ธรรมดา",
    name: "ห้องประชุม A",
    description: "ห้องประชุมมาตรฐานสำหรับการประชุมทั่วไป",
    imageUrl: "room1.jpg",
  },
  {
    id: 2,
    type: "VIP",
    name: "ห้องประชุม VIP B",
    description: "ห้องประชุม VIP พร้อมอุปกรณ์ครบครัน",
    imageUrl: "room2.jpg",
  },
  {
    id: 3,
    type: "ธรรมดา",
    name: "ห้องประชุม C",
    description: "ห้องประชุมขนาดเล็กสำหรับทีมเล็ก",
    imageUrl: "room3.jpg",
  },
];

const Booking = () => {
  const [date, setDate] = useState(""); // วันที่เลือก
  const [time, setTime] = useState(""); // ช่วงเวลาที่เลือก
  const [persons, setPersons] = useState(""); // จำนวนคนที่เลือก
  const [step, setStep] = useState(1); // ขั้นตอนของการจอง
  const [selectedRoom, setSelectedRoom] = useState(null); // ห้องที่เลือก

  const handleProceedToRooms = () => {
    if (date && time && persons) setStep(2); // ไปที่ขั้นตอนถัดไป
  };

  const handleRoomSelection = (room) => {
    setSelectedRoom(room);
  };

  const handleConfirmBooking = () => {
    alert(`จองห้อง ${selectedRoom.name} สำเร็จ!`);
    // รีเซ็ตข้อมูลหลังการจอง
    setDate("");
    setTime("");
    setPersons("");
    setSelectedRoom(null);
    setStep(1); // กลับไปเริ่มต้นใหม่
  };

  //Time
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
              <a
                href="/user_dashboard"
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
              <a className="flex items-center gap-2 p-3 bg-indigo-700 rounded-lg">
                <img
                  src="/src/assets/setting.png"
                  alt="My Icon"
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
                  alt="My Icon"
                  width="24"
                  height="24"
                />
                History
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
                    <a href="/profile" className="justify-between">
                      Profile
                      <span className="badge">New</span>
                    </a>
                  </li>
                  <li>
                    <a href="/login">Logout</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="min-h-screen bg-base-200">
            {/* Main Content */}
            <div className="p-6">
              <h1 className="text-2xl font-bold mb-4">Booking</h1>

              {/* ส่วนที่จะแสดงรายละเอียด */}

              {/* ขั้นตอนที่ 1: เลือกวันและเวลา */}
              {step === 1 && (
                <div className="flex flex-col gap-4 max-w-md mx-auto p-6 bg-white rounded-lg shadow">
                  <label className="font-semibold">Date</label>
                  <input
                    type="date"
                    className="input input-bordered"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />

                  <label className="font-semibold">Time</label>
                  <select
                    className="select select-bordered"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                  >
                    <option value="" disabled>
                      Select Time
                    </option>
                    <option value="10:00 - 12:00">10:00 - 12:00</option>
                    <option value="13:00 - 15:00">13:00 - 15:00</option>
                    <option value="16:00 - 18:00">16:00 - 18:00</option>
                  </select>

                  <label className="font-semibold">Persons</label>
                  <select
                    className="select select-bordered"
                    value={persons}
                    onChange={(e) => setPersons(e.target.value)}
                  >
                    <option value="" disabled>
                      Select Persons
                    </option>
                    <option value="1-5">1-5</option>
                    <option value="6-10">6-10</option>
                    <option value="11-15">11-15</option>
                  </select>

                  <button
                    className="btn btn-primary mt-4"
                    onClick={handleProceedToRooms}
                  >
                    Next
                  </button>
                </div>
              )}

              {/* ขั้นตอนที่ 2: เลือกห้อง */}
              {step === 2 && (
                <>
                  <h2 className="text-xl font-bold mt-10 mb-4">
                    Choose a Room
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {rooms.map((room) => (
                      <div
                        key={room.id}
                        className={`room-card p-4 bg-white rounded-lg shadow cursor-pointer ${
                          room.type === "VIP"
                            ? "border-2 border-yellow-500"
                            : "border"
                        }`}
                        onClick={() => handleRoomSelection(room)}
                      >
                        <img
                          src={room.imageUrl}
                          alt={room.name}
                          className="rounded-lg shadow mb-4"
                        />
                        <h3 className="text-lg font-semibold">{room.name}</h3>
                        <p>{room.description}</p>
                        <p className="font-bold text-red-500 mt-2">
                          {room.price}
                        </p>
                      </div>
                    ))}
                  </div>
                  <button
                    className="btn btn-secondary mt-6"
                    onClick={() => setStep(1)}
                  >
                    Back
                  </button>
                </>
              )}

              {/* ยืนยันการจอง */}
              {selectedRoom && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
                  <div className="bg-white p-6 rounded-lg max-w-sm">
                    <h2 className="text-lg font-bold mb-4">Confirm Booking</h2>
                    <p>Room: {selectedRoom.name}</p>
                    <p>Date: {date}</p>
                    <p>Time: {time}</p>
                    <p>Persons: {persons}</p>
                    <button
                      className="btn btn-primary mt-4"
                      onClick={handleConfirmBooking}
                    >
                      Confirm
                    </button>
                    <button
                      className="btn btn-secondary mt-2"
                      onClick={() => setSelectedRoom(null)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Booking;
