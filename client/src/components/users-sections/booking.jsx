import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const rooms = [
  {
    id: 1,
    type: "ธรรมดา",
    name: "ห้องประชุม A",
    description: "ห้องประชุมมาตรฐานสำหรับการประชุมทั่วไป",
    imageUrl: "room1.jpg",
    price: "$100",
  },
  {
    id: 2,
    type: "VIP",
    name: "ห้องประชุม VIP B",
    description: "ห้องประชุม VIP พร้อมอุปกรณ์ครบครัน",
    imageUrl: "room2.jpg",
    price: "$200",
  },
  {
    id: 3,
    type: "ธรรมดา",
    name: "ห้องประชุม C",
    description: "ห้องประชุมขนาดเล็กสำหรับทีมเล็ก",
    imageUrl: "room3.jpg",
    price: "$80",
  },
];

const Booking = () => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [persons, setPersons] = useState("");
  const [step, setStep] = useState(1);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [cart, setCart] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [customerContact, setCustomerContact] = useState("");

  const handleProceedToRooms = () => {
    if (date && time && persons) setStep(2);
  };

  const handleRoomSelection = (room) => {
    setSelectedRoom(room);
  };

  const navigate = useNavigate();
  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("bookingCount");
    localStorage.removeItem("missedBookingCount");
    navigate("/login");
  };

  const handleConfirmBooking = () => {
    const bookingDetails = {
      room: selectedRoom,
      date,
      time,
      persons,
      customerName,
      customerContact,
    };
    setCart([...cart, bookingDetails]);
    alert(`จองห้อง ${selectedRoom.name} สำเร็จ!`);
    resetBooking();
  };

  const resetBooking = () => {
    setDate("");
    setTime("");
    setPersons("");
    setSelectedRoom(null);
    setCustomerName("");
    setCustomerContact("");
    setStep(1);
  };

  // Time management
  const [currentTime, setCurrentTime] = useState(new Date());

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

  const handleViewCart = () => {
    setStep(4); // Change to view cart step
  };

  const handleConfirmAllBookings = () => {
    alert("Booking confirmed for all rooms in cart!");
    setCart([]);
    resetBooking();
  };

  // Confirm individual booking
  const handleConfirmSingleBooking = (booking) => {
    alert(`Booking confirmed for ${booking.room.name}!`);
    setCart(cart.filter((b) => b !== booking)); // Remove confirmed booking from cart
  };

  return (
    <>
      <div className="flex bg-gray-100">
        {/* Sidebar */}
        <aside className="w-64 bg-blue-700 min-h-screen p-4 text-white flex flex-col justify-between">
          <div className="flex flex-col">
            <a className="text-2xl font-semibold mb-6">Logo</a>
            <nav className="flex flex-col gap-3">
              <a
                href="/user_dashboard"
                className="flex items-center gap-2 p-3 hover:bg-neutral rounded-lg"
              >
                <img
                  src="/src/assets/dashboard.png"
                  alt="My Icon"
                  width="20"
                  height="20"
                />
                Dashboard
              </a>
              <a className="flex items-center gap-2 p-3 bg-neutral rounded-lg">
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
                className="flex items-center gap-2 p-3 hover:bg-neutral rounded-lg"
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

          {/* Logout Button */}
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
                      className="h-5 w-5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="black"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    <span className="badge badge-sm indicator-item">
                      {cart.length}
                    </span>
                  </div>
                </div>
                <div
                  tabIndex={0}
                  className="card card-compact dropdown-content bg-gray-700 z-[1] mt-3 w-52 shadow"
                >
                  <div className="card-body">
                    <span className="text-lg font-bold text-white">
                      {cart.length} Items
                    </span>
                    <div className="card-actions">
                      <button
                        className="btn btn-primary btn-block"
                        onClick={handleViewCart}
                      >
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
                    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu p-2 shadow bg-gray-700 rounded-box w-52"
                >
                  <li>
                    <a href="/profile" className="text-white">
                      Profile
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

          {/* Main Content */}
          <div className="min-h-screen bg-base-200">
            <div className="p-8">
              {step === 1 && (
                <div>
                  <h2 className="text-xl mb-4">
                    กรุณาเลือกวันและเวลาที่ต้องการจอง
                  </h2>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="input input-bordered w-full mb-2"
                    placeholder="Select Date"
                  />
                  <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="input input-bordered w-full mb-2"
                    placeholder="Select Time"
                  />
                  <input
                    type="number"
                    value={persons}
                    onChange={(e) => setPersons(e.target.value)}
                    className="input input-bordered w-full mb-4"
                    placeholder="Number of Persons"
                  />
                  <button
                    onClick={handleProceedToRooms}
                    className="btn bg-gray-600 text-white hover:bg-gray-700"
                  >
                    Proceed to Select Room
                  </button>
                </div>
              )}

              {step === 2 && (
                <div>
                  <h2 className="text-xl mb-4">เลือกห้องประชุม</h2>
                  <div className="grid grid-cols-3 gap-4">
                    {rooms.map((room) => (
                      <div
                        key={room.id}
                        className="card bg-gray-300 shadow-xl cursor-pointer"
                        onClick={() => handleRoomSelection(room)}
                      >
                        <figure>
                          <img src={room.imageUrl} alt={room.name} />
                        </figure>
                        <div className="card-body">
                          <h2 className="card-title">{room.name}</h2>
                          <p>{room.description}</p>
                          <p>ราคา: {room.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  {selectedRoom && (
                    <div className="mt-4">
                      <h3>ห้องที่เลือก: {selectedRoom.name}</h3>
                      <input
                        type="text"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="input input-bordered w-full mb-2"
                        placeholder="ชื่อ"
                      />
                      <input
                        type="text"
                        value={customerContact}
                        onChange={(e) => setCustomerContact(e.target.value)}
                        className="input input-bordered w-full mb-4"
                        placeholder="เบอร์โทร"
                      />
                      <button
                        onClick={handleConfirmBooking}
                        className="btn btn-primary"
                      >
                        ยืนยันการจอง
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* View Cart Step */}
              {step === 4 && (
                <div>
                  <h2 className="text-xl mb-4">Cart Details</h2>
                  {cart.length > 0 ? (
                    cart.map((booking, index) => (
                      <div key={index} className="border-b pb-2 mb-2">
                        <h3>{booking.room.name}</h3>
                        <p>วันที่: {booking.date}</p>
                        <p>เวลา: {booking.time}</p>
                        <p>จำนวนคน: {booking.persons}</p>
                        <p>ชื่อ: {booking.customerName}</p>
                        <p>เบอร์โทร: {booking.customerContact}</p>
                        <button
                          className="btn btn-success mt-2"
                          onClick={() => handleConfirmSingleBooking(booking)}
                        >
                          Confirm Booking
                        </button>
                      </div>
                    ))
                  ) : (
                    <p>No bookings in cart.</p>
                  )}
                  <button
                    className="btn btn-success"
                    onClick={handleConfirmAllBookings}
                  >
                    Confirm All Bookings
                  </button>
                  <button
                    className="btn btn-secondary ml-2"
                    onClick={() => setStep(1)}
                  >
                    Back to Booking
                  </button>
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
