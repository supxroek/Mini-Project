import { useState, useEffect } from "react";

const Employees = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    const fetchEmployees = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/auth/list-employees"
        );
        const data = await response.json();
        setEmployees(data.employees);
      } catch (error) {
        console.error("Error fetching employees:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
    return () => clearInterval(interval);
  }, []);

  const handleEdit = (employee) => {
    setEditMode(true);
    setSelectedEmployee(employee);
  };

  const handleSave = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/auth/update-employee/${selectedEmployee.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            employee_id: selectedEmployee.id,
            fname: selectedEmployee.fname,
            lname: selectedEmployee.lname,
            email: selectedEmployee.email,
            pnumber: selectedEmployee.pnumber,
            position_id: selectedEmployee.position_id,
            department_id: selectedEmployee.department_id,
            role_id: selectedEmployee.role_id,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update employee");
      }

      // อัปเดตข้อมูลใน State
      setEmployees((prev) =>
        prev.map((emp) =>
          emp.id === selectedEmployee.id ? selectedEmployee : emp
        )
      );

      setEditMode(false);
      setSelectedEmployee(null);
    } catch (error) {
      console.error("Error saving employee:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/auth/delete-employee/${id}`, {
        method: "DELETE",
      });
      setEmployees((prev) => prev.filter((employee) => employee.id !== id));
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  const handleLockUser = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/auth/lock-employee/${id}`, {
        method: "PATCH", // ใช้ PATCH สำหรับการล็อกผู้ใช้
      });
      // อัปเดตข้อมูลใน State หากจำเป็น
      setEmployees((prev) =>
        prev.map((employee) =>
          employee.id === id ? { ...employee, locked: true } : employee
        )
      );
    } catch (error) {
      console.error("Error locking employee:", error);
    }
  };

  const dayName = currentTime.toLocaleString("en-US", { weekday: "long" });
  const monthName = currentTime.toLocaleString("en-US", { month: "short" });
  const timeString = currentTime.toLocaleTimeString("en-US", {
    hour12: false,
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
                alt="Dashboard"
                width="20"
                height="20"
              />
              Dashboard
            </a>
            <a className="flex items-center gap-2 p-3 bg-indigo-700 rounded-lg">
              <img
                src="/src/assets/setting.png"
                alt="Employees"
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
                alt="Roles"
                width="24"
                height="24"
              />
              Roles
            </a>
            <a
              href="/rooms"
              className="flex items-center gap-2 p-3 hover:bg-indigo-700 rounded-lg"
            >
              <img
                src="/src/assets/livingroom.png"
                alt="Rooms"
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
                alt="Reports"
                width="24"
                height="24"
              />
              Report
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
                  <a className="justify-between">
                    Profile<span className="badge">New</span>
                  </a>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <a href="/login">Logout</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-4">
          <h1 className="text-2xl font-semibold mb-4">Employees</h1>
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Employee ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Phone Number</th>
                  <th>Position ID</th>
                  <th>Department ID</th>
                  <th>Role ID</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="9" className="text-center">
                      Loading...
                    </td>
                  </tr>
                ) : (
                  employees.map((employee) => (
                    <tr key={employee.id}>
                      <td>{employee.id}</td>
                      <td>{employee.fname}</td>
                      <td>{employee.lname}</td>
                      <td>{employee.email}</td>
                      <td>{employee.pnumber}</td>
                      <td>{employee.position_id}</td>
                      <td>{employee.department_id}</td>
                      <td>{employee.role_id}</td>
                      <td>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEdit(employee)}
                            className="btn btn-sm btn-ghost"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleLockUser(employee.id)}
                            className="btn btn-sm btn-warning"
                          >
                            Lock User
                          </button>
                          <button
                            onClick={() => handleDelete(employee.id)}
                            className="btn btn-sm btn-error"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {editMode && selectedEmployee && (
            <div className="edit-form mt-6">
              <h2 className="text-xl font-semibold mb-4">Edit Employee</h2>
              <div className="space-y-4">
                <div>
                  <label>First Name:</label>
                  <input
                    type="text"
                    value={selectedEmployee.fname}
                    onChange={(e) =>
                      setSelectedEmployee({
                        ...selectedEmployee,
                        fname: e.target.value,
                      })
                    }
                    className="input input-bordered w-full"
                  />
                </div>
                <div>
                  <label>Last Name:</label>
                  <input
                    type="text"
                    value={selectedEmployee.lname}
                    onChange={(e) =>
                      setSelectedEmployee({
                        ...selectedEmployee,
                        lname: e.target.value,
                      })
                    }
                    className="input input-bordered w-full"
                  />
                </div>
                <div>
                  <label>Email:</label>
                  <input
                    type="email"
                    value={selectedEmployee.email}
                    onChange={(e) =>
                      setSelectedEmployee({
                        ...selectedEmployee,
                        email: e.target.value,
                      })
                    }
                    className="input input-bordered w-full"
                  />
                </div>
                <div>
                  <label>Phone Number:</label>
                  <input
                    type="text"
                    value={selectedEmployee.pnumber}
                    onChange={(e) =>
                      setSelectedEmployee({
                        ...selectedEmployee,
                        pnumber: e.target.value,
                      })
                    }
                    className="input input-bordered w-full"
                  />
                </div>
                <div>
                  <label>Position ID:</label>
                  <input
                    type="text"
                    value={selectedEmployee.position_id}
                    onChange={(e) =>
                      setSelectedEmployee({
                        ...selectedEmployee,
                        position_id: e.target.value,
                      })
                    }
                    className="input input-bordered w-full"
                  />
                </div>
                <div>
                  <label>Department ID:</label>
                  <input
                    type="text"
                    value={selectedEmployee.department_id}
                    onChange={(e) =>
                      setSelectedEmployee({
                        ...selectedEmployee,
                        department_id: e.target.value,
                      })
                    }
                    className="input input-bordered w-full"
                  />
                </div>
                <div>
                  <label>Role ID:</label>
                  <input
                    type="text"
                    value={selectedEmployee.role_id}
                    onChange={(e) =>
                      setSelectedEmployee({
                        ...selectedEmployee,
                        role_id: e.target.value,
                      })
                    }
                    className="input input-bordered w-full"
                  />
                </div>
                <div className="flex space-x-2">
                  <button onClick={handleSave} className="btn btn-primary mt-4">
                    Save
                  </button>
                  <button
                    onClick={() => setEditMode(false)}
                    className="btn btn-ghost mt-4"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Employees;
