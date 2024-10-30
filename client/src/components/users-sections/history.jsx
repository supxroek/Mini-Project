import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const History = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [bookingHistory, setBookingHistory] = useState([
    {
      id: 1,
      roomImage: "/path/to/room1.jpg", // Replace with generated images
      roomName: "ห้อง VIP",
      customerName: "John Doe",
      bookingDate: "2024-10-25",
      bookingStatus: "Completed",
      customerInfo: "Phone: 1234567890, Email: john@example.com",
      roomDetails: "Spacious VIP room with sea view and premium amenities.",
    },
    {
      id: 2,
      roomImage: "/path/to/room2.jpg", // Replace with generated images
      roomName: "ห้องธรรมดา",
      customerName: "Jane Smith",
      bookingDate: "2024-10-20",
      bookingStatus: "Cancelled",
      customerInfo: "Phone: 0987654321, Email: jane@example.com",
      roomDetails: "Standard room with basic amenities.",
    },
  ]);

  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const dayName = currentTime.toLocaleString("en-US", { weekday: "long" });
  const monthName = currentTime.toLocaleString("en-US", { month: "short" });
  const timeString = currentTime.toLocaleTimeString("en-US", {
    hour12: false,
  });

  const deleteBooking = (id) => {
    setBookingHistory(bookingHistory.filter((booking) => booking.id !== id));
  };

  const deleteAllBookings = () => {
    setBookingHistory([]);
  };

  const showDetails = (booking) => {
    setSelectedBooking(booking);
  };

  const closeDetails = () => {
    setSelectedBooking(null);
  };

  const navigate = useNavigate();
  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("bookingCount");
    localStorage.removeItem("missedBookingCount");
    navigate("/login");
  };

  return (
    <>
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-800 min-h-screen p-4 text-white flex flex-col justify-between">
          <div className="flex flex-col">
            <a className="text-2xl font-semibold mb-6">Logo</a>
            <nav className="flex flex-col gap-3">
              <a
                href="/user_dashboard"
                className="flex items-center gap-2 p-3 hover:bg-neutral rounded-lg transition"
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
                href="/booking"
                className="flex items-center gap-2 p-3 hover:bg-neutral rounded-lg transition"
              >
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
                className="flex items-center gap-2 p-3 bg-neutral rounded-lg"
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

          <a
            href="/login"
            className="flex items-center gap-2 p-3 hover:bg-neutral rounded-lg mt-auto"
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
          <div className="navbar bg-gray-100">
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
            <div className="p-6">
              <h1 className="text-2xl font-bold mb-4 text-gray-800">History</h1>

              {/* Delete All Button */}
              <button
                onClick={deleteAllBookings}
                className="text-white bg-red-500 p-2 rounded mb-4"
              >
                ลบประวัติทั้งหมด
              </button>

              {/* Booking History List */}
              <div className="grid gap-4">
                {bookingHistory.map((booking) => (
                  <div
                    key={booking.id}
                    className="flex bg-white shadow-md p-4 rounded-lg hover:shadow-lg transition-shadow duration-300"
                  >
                    <img
                      src={booking.roomImage}
                      alt={booking.roomName}
                      className="w-32 h-32 object-cover rounded-lg mr-4"
                    />
                    <div className="flex flex-col justify-between">
                      <h2 className="text-xl font-semibold text-gray-800">
                        {booking.roomName}
                      </h2>
                      <p className="text-gray-600">
                        Customer: {booking.customerName}
                      </p>
                      <p className="text-gray-600">
                        Booking Date: {booking.bookingDate}
                      </p>
                      <p
                        className={`font-semibold ${
                          booking.bookingStatus === "Completed"
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        Status: {booking.bookingStatus}
                      </p>
                      <button
                        onClick={() => deleteBooking(booking.id)}
                        className="bg-red-500 text-white p-2 rounded mt-2"
                      >
                        ลบประวัติการจอง
                      </button>
                      <button
                        onClick={() => showDetails(booking)}
                        className="bg-gray-500 text-white p-2 rounded mt-2"
                      >
                        กดเพื่อดูรายระเอียด
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Modal for Booking Details */}
              {selectedBooking && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                  <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-semibold">
                      {selectedBooking.roomName}
                    </h2>
                    <p>
                      <strong>Customer Name:</strong>{" "}
                      {selectedBooking.customerName}
                    </p>
                    <p>
                      <strong>Booking Date:</strong>{" "}
                      {selectedBooking.bookingDate}
                    </p>
                    <p>
                      <strong>Status:</strong> {selectedBooking.bookingStatus}
                    </p>
                    <p>
                      <strong>Customer Info:</strong>{" "}
                      {selectedBooking.customerInfo}
                    </p>
                    <p>
                      <strong>Room Details:</strong>{" "}
                      {selectedBooking.roomDetails}
                    </p>
                    <button
                      onClick={closeDetails}
                      className="bg-red-500 text-white p-2 rounded mt-4"
                    >
                      Close
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

export default History;
