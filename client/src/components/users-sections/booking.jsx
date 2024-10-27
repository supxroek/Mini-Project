import { useEffect, useState } from "react";

const BookingHistoryApp = () => {
  const [currentTab, setCurrentTab] = useState("booking"); // state สำหรับสลับระหว่าง Booking และ History
  const [bookings, setBookings] = useState([]);
  const [date, setDate] = useState(""); 
  const [time, setTime] = useState(""); 
  const [persons, setPersons] = useState("");

  // ดึงข้อมูลการจองจาก LocalStorage
  useEffect(() => {
    const storedBookings = JSON.parse(localStorage.getItem("bookings")) || [];
    setBookings(storedBookings);
  }, []);

  const handleBooking = () => {
    if (!date || !time || !persons) {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    const bookingData = {
      id: Math.floor(Math.random() * 1000000).toString(),
      date,
      time,
      persons,
      status: "รอการยืนยัน",
    };

    const updatedBookings = [...bookings, bookingData];
    setBookings(updatedBookings);
    localStorage.setItem("bookings", JSON.stringify(updatedBookings));

    alert("การจองสำเร็จ!");
    setDate("");
    setTime("");
    setPersons("");
  };

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
          <a href="/user_dashboard" className="flex items-center gap-2 p-3 hover:bg-indigo-700 rounded-lg">
                <img src="/src/assets/dashboard.png" alt="Dashboard" width="20" height="20" />
                Dashboard
              </a>
            <button
              onClick={() => setCurrentTab("booking")}
              className={`flex items-center gap-2 p-3 ${
                currentTab === "booking" ? "bg-indigo-700" : "hover:bg-indigo-700"
              } rounded-lg`}
            >
              <img
                src="/src/assets/setting.png"
                alt="Booking"
                width="24"
                height="24"
              />
              Booking
            </button>
            <button
              onClick={() => setCurrentTab("history")}
              className={`flex items-center gap-2 p-3 ${
                currentTab === "history" ? "bg-indigo-700" : "hover:bg-indigo-700"
              } rounded-lg`}
            >
              <img
                src="/src/assets/hierarchical-structure.png"
                alt="History"
                width="24"
                height="24"
              />
              History
            </button>
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
            <h1 className="text-2xl font-bold">
              {currentTab === "booking" ? "Book a Room" : "Booking History"}
            </h1>
          </div>
        </div>

        <div className="min-h-screen bg-base-200 p-6">
          {currentTab === "booking" ? (
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
                <option value="" disabled>Select Time</option>
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
                <option value="" disabled>Select Persons</option>
                <option value="1-5">1-5</option>
                <option value="6-10">6-10</option>
                <option value="11-15">11-15</option>
              </select>

              <button className="btn btn-primary mt-4" onClick={handleBooking}>
                Book Now
              </button>
            </div>
          ) : (
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
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingHistoryApp;
