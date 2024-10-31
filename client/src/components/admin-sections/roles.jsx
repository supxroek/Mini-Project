import { useState, useEffect } from "react";

const Roles = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [roles, setRoles] = useState([{ name: "Admin" }, { name: "User" }]); // initial roles
  const [newRole, setNewRole] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editRoleIndex, setEditRoleIndex] = useState(null);
  const [accessLevel, setAccessLevel] = useState("");

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

  const addRole = () => {
    if (newRole) {
      setRoles([...roles, { name: newRole }]);
      setNewRole("");
    }
  };

  const deleteRole = (index) => {
    setRoles(roles.filter((_, i) => i !== index));
  };

  const editRole = (index) => {
    setIsEditing(true);
    setEditRoleIndex(index);
  };

  const saveRole = () => {
    const updatedRoles = roles.map((role, index) =>
      index === editRoleIndex ? { ...role, access: accessLevel } : role
    );
    setRoles(updatedRoles);
    setIsEditing(false);
    setEditRoleIndex(null);
    setAccessLevel("");
  };

  return (
    <>
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-800 min-h-screen p-4 text-white flex flex-col justify-between">
          <div className="flex flex-col">
            <a className="text-2xl font-semibold mb-6">Logo</a>
            <nav className="flex flex-col gap-3">
              {/* Navigation links */}
              <a href="/admin_dashboard" className="flex items-center gap-2 p-3 hover:bg-indigo-700 rounded-lg">
                <img src="/src/assets/dashboard.png" alt="My Icon" width="20" height="20" />
                Dashboard
              </a>
              <a href="/employees" className="flex items-center gap-2 p-3 hover:bg-indigo-700 rounded-lg">
                <img src="/src/assets/setting.png" alt="My Icon" width="24" height="24" />
                Employees
              </a>
              <a className="flex items-center gap-2 p-3 bg-indigo-700 rounded-lg">
                <img src="/src/assets/hierarchical-structure.png" alt="My Icon" width="24" height="24" />
                Roles
              </a>
              <a href="/rooms" className="flex items-center gap-2 p-3 hover:bg-indigo-700 rounded-lg">
                <img src="/src/assets/livingroom.png" alt="My Icon" width="24" height="24" />
                Rooms
              </a>
              <a href="/reports" className="flex items-center gap-2 p-3 hover:bg-indigo-700 rounded-lg">
                <img src="/src/assets/bar-chart.png" alt="My Icon" width="24" height="24" />
                Report
              </a>
            </nav>
          </div>
          {/* Logout */}
          <a href="/login" className="flex items-center gap-2 p-3 hover:bg-indigo-700 rounded-lg mt-auto">
            <img src="/src/assets/logout.png" alt="My Icon" width="24" height="24" />
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
          </div>

          <div className="min-h-screen bg-gray-300">
            {/* Main Content */}
            <div className="p-10">
              <h1 className="text-3xl font-semibold">Roles Management</h1>
              <div className="mt-6"></div>
              <h2 className="text-2xl font-semibold mb-4">Manage Roles</h2>

              <div className="flex flex-col gap-4">
                {/* Add Role */}
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="New Role"
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value)}
                    className="input input-bordered w-full max-w-xs"
                  />
                  <button onClick={addRole} className="btn btn-primary">
                    Add Role
                  </button>
                </div>

                {/* Existing Roles */}
                <div className="flex flex-col gap-2">
                  {roles.map((role, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-white rounded-lg shadow">
                      <span>{role.name}</span>
                      <div className="flex items-center gap-2">
                        <button onClick={() => editRole(index)} className="btn btn-sm btn-warning">
                          Edit
                        </button>
                        <button onClick={() => deleteRole(index)} className="btn btn-sm btn-error">
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Edit Access Level */}
                {isEditing && (
                  <div className="p-4 bg-white rounded-lg shadow mt-4">
                    <h3 className="text-xl font-semibold mb-2">Edit Access</h3>
                    <div className="flex items-center gap-4">
                      <label>
                        <input
                          type="radio"
                          name="access"
                          value="User Page"
                          checked={accessLevel === "User Page"}
                          onChange={(e) => setAccessLevel(e.target.value)}
                        />
                        User Page
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="access"
                          value="Admin Page"
                          checked={accessLevel === "Admin Page"}
                          onChange={(e) => setAccessLevel(e.target.value)}
                        />
                        Admin Page
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="access"
                          value="All"
                          checked={accessLevel === "All"}
                          onChange={(e) => setAccessLevel(e.target.value)}
                        />
                        All
                      </label>
                    </div>
                    <button onClick={saveRole} className="btn btn-primary mt-4">
                      Save
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Roles;
