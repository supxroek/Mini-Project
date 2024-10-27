import { useEffect, useState } from "react";

const History = () => {
  const [bookings, setBookings] = useState([]);

  // ดึงข้อมูลจาก LocalStorage เมื่อ component นี้ถูก mount
  useEffect(() => {
    const storedBookings = JSON.parse(localStorage.getItem("bookings")) || [];
    setBookings(storedBookings);
  }, []);

  // ฟังก์ชันสำหรับยกเลิกการจอง
  const handleCancel = (id) => {
    const updatedBookings = bookings.filter((booking) => booking.id !== id);
    setBookings(updatedBookings);
    localStorage.setItem("bookings", JSON.stringify(updatedBookings));
    alert("ยกเลิกการจองสำเร็จ!");
  };

  return (
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
                alt="Dashboard"
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
                alt="Booking"
                width="24"
                height="24"
              />
              Booking
            </a>
            <a
              href="/history"
              className="flex items-center gap-2 p-3 bg-indigo-700 rounded-lg"
            >
              <img
                src="/src/assets/hierarchical-structure.png"
                alt="History"
                width="24"
                height="24"
              />
              History
            </a>
          </nav>
        </div>
        <a
          href="/login"
          className="flex items-center gap-2 p-3 hover:bg-indigo-700 rounded-lg mt-auto"
        >
          <img
            src="/src/assets/logout.png"
            alt="Logout"
            width="24"
            height="24"
          />
          Logout
        </a>
      </aside>

      {/* Main Content */}
      <div className="flex-1">
        <div className="navbar bg-base-100">
          <div className="navbar-start m-4">
            <h1 className="text-2xl font-bold">Booking History</h1>
          </div>
        </div>

        <div className="min-h-screen bg-base-200 p-6">
          <div className="grid grid-cols-1 gap-4">
            {bookings.length > 0 ? (
              bookings.map((booking) => (
                <div
                  key={booking.id}
                  className="p-4 bg-white rounded-lg shadow flex justify-between items-center"
                >
                  <div>
                    <p><strong>ID:</strong> {booking.id}</p>
                    <p><strong>Date:</strong> {booking.date}</p>
                    <p><strong>Time:</strong> {booking.time}</p>
                    <p><strong>Persons:</strong> {booking.persons}</p>
                    <p><strong>Status:</strong> {booking.status}</p>
                  </div>
                  <button
                    className="btn btn-error"
                    onClick={() => handleCancel(booking.id)}
                  >
                    Cancel
                  </button>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">
                No bookings found.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
