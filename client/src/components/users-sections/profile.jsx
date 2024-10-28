import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [profileData, setProfileData] = useState({
    name: "Suparoek",
    surname: "Example",
    email: "example@company.com",
    phone: "012-345-6789",
    jobTitle: "Software Engineer",
    department: "IT",
    accessRights: "Admin",
    imgSrc:
      "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(profileData);

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

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setProfileData(editedData);
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setEditedData(profileData);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prev) => ({ ...prev, [name]: value }));
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
    <div className="flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-primary min-h-screen p-4 text-white flex flex-col justify-between">
        <div className="flex flex-col">
          <a className="text-2xl font-semibold mb-6">Logo</a>
          <nav className="flex flex-col gap-3">
            <a
              href="/user_dashboard"
              className="flex items-center gap-2 p-3 hover:bg-neutral rounded-lg"
            >
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
              className="flex items-center gap-2 p-3 hover:bg-neutral rounded-lg"
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
              className="flex items-center gap-2 p-3 hover:bg-neutral rounded-lg"
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
        <a
          href="/login"
          className="flex items-center gap-2 p-3 hover:bg-neutral rounded-lg mt-auto"
        >
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

        <div className="min-h-screen bg-gray-300 p-6">
          <h1 className="text-2xl font-bold mb-4">Profile</h1>
          <div className="flex justify-center items-center min-h-screen p-6">
            <div className="card w-full max-w-md bg-white shadow-lg rounded-lg p-6">
              <div className="flex justify-center mb-6">
                <img
                  src={profileData.imgSrc}
                  alt="User Avatar"
                  className="w-32 h-32 rounded-full shadow-lg"
                />
              </div>

              {isEditing ? (
                <div className="space-y-4">
                  <input
                    name="name"
                    value={editedData.name}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                    placeholder="Name"
                  />
                  <input
                    name="surname"
                    value={editedData.surname}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                    placeholder="Surname"
                  />
                  <input
                    name="email"
                    value={editedData.email}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                    placeholder="Email"
                  />
                  <input
                    name="phone"
                    value={editedData.phone}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                    placeholder="Phone"
                  />
                  <input
                    name="jobTitle"
                    value={editedData.jobTitle}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                    placeholder="Job Title"
                  />
                  <input
                    name="department"
                    value={editedData.department}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                    placeholder="Department"
                  />
                  <input
                    name="accessRights"
                    value={editedData.accessRights}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                    placeholder="Access Rights"
                  />
                  <button
                    onClick={handleSaveClick}
                    className="btn bg-gray-600 text-white w-full mt-4"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancelClick}
                    className="btn bg-gray-500 text-white w-full mt-2"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-gray-800">
                    {profileData.name} {profileData.surname}
                  </h2>
                  <p className="text-gray-500">{profileData.jobTitle}</p>
                  <div className="mt-6">
                    <p>
                      <span className="font-semibold text-gray-700">
                        Email:
                      </span>{" "}
                      {profileData.email}
                    </p>
                    <p>
                      <span className="font-semibold text-gray-700">
                        Phone:
                      </span>{" "}
                      {profileData.phone}
                    </p>
                    <p>
                      <span className="font-semibold text-gray-700">
                        Department:
                      </span>{" "}
                      {profileData.department}
                    </p>
                    <p>
                      <span className="font-semibold text-gray-700">
                        Access Rights:
                      </span>{" "}
                      {profileData.accessRights}
                    </p>
                  </div>
                  <button
                    onClick={handleEditClick}
                    className="btn bg-gray-600 text-white w-full mt-4"
                  >
                    Edit Profile
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
