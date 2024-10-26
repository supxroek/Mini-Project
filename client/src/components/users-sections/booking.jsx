import { useState, useEffect } from "react";

const Booking = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [date, setDate] = useState(""); // เก็บค่าวันที่เลือก
  const [time, setTime] = useState(""); // เก็บช่วงเวลาที่เลือก
  const [persons, setPersons] = useState(""); // เก็บจำนวนคนที่เลือก

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // อัปเดตทุกวินาที

    return () => clearInterval(interval); // Cleanup เมื่อตัว component ถูกยกเลิก
  }, []);

  const dayName = currentTime.toLocaleString("en-US", { weekday: "long" });
  const monthName = currentTime.toLocaleString("en-US", { month: "short" });
  const timeString = currentTime.toLocaleTimeString("en-US", { hour12: false });

  const handleBooking = () => {
    alert(`Booking on ${date}, Time: ${time}, Persons: ${persons}`);
    // เพิ่มฟังก์ชันส่งข้อมูลการจองไปยัง backend ได้ที่นี่
  };

  return (
    <>
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-indigo-600 min-h-screen p-4 text-white flex flex-col justify-between">
          <div className="flex flex-col">
            <a className="text-2xl font-semibold mb-6">Logo</a>
            <nav className="flex flex-col gap-3">
              <a href="/user_dashboard" className="flex items-center gap-2 p-3 hover:bg-indigo-700 rounded-lg">
                <img src="/src/assets/dashboard.png" alt="Dashboard" width="20" height="20" />
                Dashboard
              </a>
              <a href="/booking" className="flex items-center gap-2 p-3 bg-indigo-700 rounded-lg">
                <img src="/src/assets/setting.png" alt="Booking" width="24" height="24" />
                Booking
              </a>
              <a href="/history" className="flex items-center gap-2 p-3 hover:bg-indigo-700 rounded-lg">
                <img src="/src/assets/hierarchical-structure.png" alt="History" width="24" height="24" />
                History
              </a>
            </nav>
          </div>
          <a href="/login" className="flex items-center gap-2 p-3 hover:bg-indigo-700 rounded-lg mt-auto">
            <img src="/src/assets/logout.png" alt="Logout" width="24" height="24" />
            Logout
          </a>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          <div className="navbar bg-base-100">
            <div className="navbar-start m-4">
              <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
                <div className="flex flex-col">
                  <span className="countdown font-mono font-semibold text-2xl">{dayName}</span>
                </div>
                <div className="flex flex-col">
                  <span className="countdown font-mono font-semibold text-2xl">{monthName}</span>
                </div>
                <div className="flex flex-col">
                  <span className="countdown font-mono font-semibold text-2xl">{timeString}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="min-h-screen bg-base-200 p-6">
            <h1 className="text-2xl font-bold mb-4">Book a Room</h1>

            {/* ฟอร์มการจอง */}
            <div className="flex flex-col gap-4 max-w-md mx-auto p-6 bg-white rounded-lg shadow">
              <label className="font-semibold">Date</label>
              <input
                type="date"
                className="input input-bordered"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />

              <label className="font-semibold">Time</label>
              <select className="select select-bordered" value={time} onChange={(e) => setTime(e.target.value)}>
                <option value="" disabled>Select Time</option>
                <option value="10:00 - 12:00">10:00 - 12:00</option>
                <option value="13:00 - 15:00">13:00 - 15:00</option>
                <option value="16:00 - 18:00">16:00 - 18:00</option>
              </select>

              <label className="font-semibold">Persons</label>
              <select className="select select-bordered" value={persons} onChange={(e) => setPersons(e.target.value)}>
                <option value="" disabled>Select Persons</option>
                <option value="1-5">1-5</option>
                <option value="6-10">6-10</option>
                <option value="11-15">11-15</option>
              </select>

              <button className="btn btn-primary mt-4" onClick={handleBooking}>
                Book Now
              </button>
            </div>

            {/* รูปตัวอย่างห้อง */}
            <h2 className="text-xl font-bold mt-10 mb-4">Room Sample</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <img src="room1.jpg" alt="Room 1" className="rounded-lg shadow" />
              <img src="room2.jpg" alt="Room 2" className="rounded-lg shadow" />
              <img src="room3.jpg" alt="Room 3" className="rounded-lg shadow" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Booking;
