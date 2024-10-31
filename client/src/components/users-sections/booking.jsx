import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const rooms = [
  {
    id: 1,
    type: "ธรรมดา",
    name: "ห้องประชุม A",
    description: "ห้องประชุมมาตรฐานสำหรับการประชุมทั่วไป",
    facilities: "โต๊ะ 5 ตัว, เก้าอี้ 20 ตัว, แอร์, โปรเจคเตอร์",
    imageUrl: "https://images.pexels.com/photos/6899396/pexels-photo-6899396.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&dpr=1",
    floor: "ชั้น 3",
    building: "ตึก F"
  },
  {
    id: 2,
    type: "VIP",
    name: "ห้องประชุม VIP B",
    description: "ห้องประชุม VIP พร้อมอุปกรณ์ครบครัน",
    facilities: "โต๊ะ 3 ตัว, เก้าอี้ 15 ตัว, แอร์, โปรเจคเตอร์, จอภาพ",
    imageUrl: "https://images.pexels.com/photos/2976970/pexels-photo-2976970.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&dpr=1",
    floor: "ชั้น 5",
    building: "ตึก F"
  },
  {
    id: 3,
    type: "ธรรมดา",
    name: "ห้องประชุม C",
    description: "ห้องประชุมขนาดเล็กสำหรับทีมเล็ก",
    facilities: "โต๊ะ 2 ตัว, เก้าอี้ 10 ตัว, แอร์",
    imageUrl: "https://images.pexels.com/photos/7046168/pexels-photo-7046168.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&dpr=1",
    floor: "ชั้น 2",
    building: "ตึก F"
  },
];


const Booking = () => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [persons, setPersons] = useState(1); // Default to 1 person
  const [step, setStep] = useState(1);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [cart, setCart] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [customerContact, setCustomerContact] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerDepartment, setCustomerDepartment] = useState("");

  const navigate = useNavigate();

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  const handleProceedToRooms = () => {
    if (date && time && persons > 0) setStep(2);
    else alert("Please fill in all fields correctly.");
  };

  const handleRoomSelection = (room) => {
    setSelectedRoom(room);
    setStep(3); // Move directly to booking details
  };

  const handleConfirmBooking = () => {
    if (!customerName || !customerEmail || !customerContact || !customerDepartment) {
      alert("Please fill in all customer details.");
      return;
    }

    const bookingDetails = {
      room: selectedRoom,
      date,
      time,
      persons,
      customerName,
      customerContact,
      customerEmail,
      customerDepartment,
    };
    
    setCart([...cart, bookingDetails]);
    alert(`จองห้อง ${selectedRoom.name} สำเร็จ!`);
    resetBooking();
  };

  const resetBooking = () => {
    setDate("");
    setTime("");
    setPersons(1); // Reset to default value
    setSelectedRoom(null);
    setCustomerName("");
    setCustomerContact("");
    setCustomerEmail("");
    setCustomerDepartment("");
    setStep(1);
  };

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const dayName = currentTime.toLocaleString("en-US", { weekday: "long" });
  const monthName = currentTime.toLocaleString("en-US", { month: "short" });
  const timeString = currentTime.toLocaleTimeString("en-US", { hour12: false });

  const handleViewCart = () => {
    setStep(4);
  };

  const handleConfirmAllBookings = () => {
    if (cart.length === 0) {
      alert("No bookings to confirm.");
      return;
    }
    alert("Booking confirmed for all rooms in cart!");
    setCart([]);
    resetBooking();
  };

  const handleConfirmSingleBooking = (booking) => {
    alert(`Booking confirmed for ${booking.room.name}!`);
    setCart(cart.filter((b) => b !== booking));
  };

  return (
    <div className="flex bg-gray-300"> {/* Changed background color here */}
      <aside className="w-64 bg-gray-800 min-h-screen p-4 text-white flex flex-col justify-between">
        <div className="flex flex-col">
          <a className="text-2xl font-semibold mb-6">Logo</a>
          <nav className="flex flex-col gap-3">
            <a href="/user_dashboard" className="flex items-center gap-2 p-3 hover:bg-neutral rounded-lg">
              <img src="/src/assets/dashboard.png" alt="My Icon" width="20" height="20" />
              Dashboard
            </a>
            <a className="flex items-center gap-2 p-3 bg-neutral rounded-lg">
              <img src="/src/assets/setting.png" alt="My Icon" width="24" height="24" />
              Booking
            </a>
            <a href="/history" className="flex items-center gap-2 p-3 hover:bg-neutral rounded-lg">
              <img src="/src/assets/hierarchical-structure.png" alt="My Icon" width="24" height="24" />
              History
            </a>
          </nav>
        </div>
        <a href="/login" className="flex items-center gap-2 p-3 hover:bg-neutral rounded-lg mt-auto" onClick={handleLogout}>
          <img src="/src/assets/logout.png" alt="My Icon" width="24" height="24" />
          Logout
        </a>
      </aside>

      <div className="flex-1">
        <div className="navbar bg-base-300">
          <div className="navbar-start m-4">
            <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
              <div className="flex flex-col">
                <span className="countdown font-mono font-semibold text-2xl text-black">{dayName}</span>
              </div>
              <div className="flex flex-col">
                <span className="countdown font-mono font-semibold text-2xl text-black">{monthName}</span>
              </div>
              <div className="flex flex-col">
                <span className="countdown font-mono font-semibold text-2xl text-black">{timeString}</span>
              </div>
            </div>
          </div>
          <div className="navbar-end">
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                <div className="indicator">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="black">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span className="badge badge-sm indicator-item">{cart.length}</span>
                </div>
              </div>
              <div tabIndex={0} className="card card-compact dropdown-content bg-gray-700 z-[1] mt-3 shadow">
                <div className="card-body">
                  <span className="font-bold text-lg">{cart.length} Items</span>
                  <div className="card-actions">
                    <button className="btn btn-primary" onClick={handleViewCart}>View Cart</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {step === 1 && (
          <div className="p-4">
            <h2 className="text-2xl font-bold">Booking Form</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="mb-4">
                <label>Date:</label>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="input w-full" />
              </div>
              <div className="mb-4">
                <label>Time:</label>
                <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="input w-full" />
              </div>
              <div className="mb-4">
                <label>Number of Persons:</label>
                <input type="number" value={persons} min={1} onChange={(e) => setPersons(parseInt(e.target.value))} className="input w-full" />
              </div>
            </div>
            <button onClick={handleProceedToRooms} className="btn btn-primary">Proceed</button>
          </div>
        )}

{step === 2 && (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 p-4 gap-4">
    {rooms.map((room) => (
      <div key={room.id} className="card bg-base-200 shadow-lg">
        <figure>
          <img src={room.imageUrl} alt={room.name} className="h-48 w-full object-contain rounded-lg" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{room.name}</h2>
          <p>{room.description}</p>
          <p>Facilities: {room.facilities}</p>
          <p>Price: {room.price}</p>
          <p>Floor: {room.floor}</p>   {/* Display floor */}
          <p>Building: {room.building}</p>  {/* Display building */}
          <button onClick={() => handleRoomSelection(room)} className="btn btn-primary">Select</button>
        </div>
      </div>
    ))}
  </div>
)}

{step === 3 && selectedRoom && (
  <div className="p-4">
    <h2 className="text-2xl font-bold">Confirm Booking for {selectedRoom.name}</h2>
    <figure className="mb-4">
      <img src={selectedRoom.imageUrl} alt={selectedRoom.name} className="h-48 w-full object-contain rounded-lg" />
    </figure>
    <p className="font-semibold">Description: {selectedRoom.description}</p>
    <p className="font-semibold">Facilities: {selectedRoom.facilities}</p>
    <p>Floor: {selectedRoom.floor}</p>   {/* Display floor */}
    <p>Building: {selectedRoom.building}</p>  {/* Display building */}
    <p>Date: {date}</p>
    <p>Time: {time}</p>
    <p>Persons: {persons}</p>

    <div className="grid grid-cols-1 gap-4">
              <div className="mb-4">
                <label>Name:</label>
                <input type="text" value={customerName} onChange={(e) => setCustomerName(e.target.value)} className="input w-full" />
              </div>
              <div className="mb-4">
                <label>Email:</label>
                <input type="email" value={customerEmail} onChange={(e) => setCustomerEmail(e.target.value)} className="input w-full" />
              </div>
              <div className="mb-4">
                <label>Contact:</label>
                <input type="text" value={customerContact} onChange={(e) => setCustomerContact(e.target.value)} className="input w-full" />
              </div>
              <div className="mb-4">
                <label>Department:</label>
                <input type="text" value={customerDepartment} onChange={(e) => setCustomerDepartment(e.target.value)} className="input w-full" />
              </div>
            </div>

    {/* Customer information form and buttons */}
    <button onClick={handleConfirmBooking} className="btn btn-success">Confirm Booking</button>
    <button onClick={resetBooking} className="btn btn-secondary">Cancel</button>
  </div>
)}

        {step === 4 && (
          <div className="p-4">
            <h2 className="text-2xl font-bold">Your Cart</h2>
            {cart.length === 0 ? (
              <p>No bookings in the cart.</p>
            ) : (
              <div>
                {cart.map((booking, index) => (
                  <div key={index} className="mb-4">
                    <h3>{booking.room.name}</h3>
                    <p>Date: {booking.date}</p>
                    <p>Time: {booking.time}</p>
                    <p>Persons: {booking.persons}</p>
                    <button className="btn btn-warning" onClick={() => handleConfirmSingleBooking(booking)}>Confirm Booking</button>
                  </div>
                ))}
                <button className="btn btn-success" onClick={handleConfirmAllBookings}>Confirm All Bookings</button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Booking;
