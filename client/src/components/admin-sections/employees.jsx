import { useState, useEffect } from "react";

const Employees = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal
  const [positions, setPositions] = useState([]); // State for positions
  const [departments, setDepartments] = useState([]); // State for departments
  const [roles, setRoles] = useState([]); // State for roles

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

    const fetchPositions = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/auth/list-positions"
        );
        const data = await response.json();
        setPositions(data.positions);
      } catch (error) {
        console.error("Error fetching positions:", error);
      }
    };

    const fetchDepartments = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/auth/list-departments"
        );
        const data = await response.json();
        setDepartments(data.departments);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };

    const fetchRoles = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/auth/list-roles"
        );
        const data = await response.json();
        setRoles(data.roles);
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };

    fetchEmployees();
    fetchPositions();
    fetchDepartments();
    fetchRoles();

    return () => clearInterval(interval);
  }, []);

  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
    setIsModalOpen(true); // Open modal on edit
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
            position_name: selectedEmployee.position_name,
            department_name: selectedEmployee.department_name,
            role_name: selectedEmployee.role_name,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update employee");
      }

      // Update state
      setEmployees((prev) =>
        prev.map((emp) =>
          emp.id === selectedEmployee.id ? selectedEmployee : emp
        )
      );

      setSelectedEmployee(null);
      setIsModalOpen(false); // Close modal after saving
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
        method: "PATCH", // Use PATCH for locking user
      });
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
        <div className="min-h-screen bg-base-200">
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-semibold">Employees</h1>
              <button
                onClick={() => {
                  setSelectedEmployee(null);
                  setIsModalOpen(true); // Open modal for new employee
                }}
                className="btn btn-primary"
              >
                Create Employee
              </button>
            </div>
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
                        <td>{employee.position_name}</td>
                        <td>{employee.department_name}</td>
                        <td>{employee.role_name}</td>
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

            {/* Edit Modal */}
            {isModalOpen && (
              <div className="modal modal-open">
                <div className="modal-box">
                  <h2 className="font-semibold text-xl">Edit Employee</h2>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">First Name</span>
                    </label>
                    <input
                      type="text"
                      value={selectedEmployee.fname}
                      onChange={(e) =>
                        setSelectedEmployee({
                          ...selectedEmployee,
                          fname: e.target.value,
                        })
                      }
                      className="input input-bordered"
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Last Name</span>
                    </label>
                    <input
                      type="text"
                      value={selectedEmployee.lname}
                      onChange={(e) =>
                        setSelectedEmployee({
                          ...selectedEmployee,
                          lname: e.target.value,
                        })
                      }
                      className="input input-bordered"
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Email</span>
                    </label>
                    <input
                      type="text"
                      value={selectedEmployee.email}
                      onChange={(e) =>
                        setSelectedEmployee({
                          ...selectedEmployee,
                          email: e.target.value,
                        })
                      }
                      className="input input-bordered"
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Phone Number</span>
                    </label>
                    <input
                      type="text"
                      value={selectedEmployee.pnumber}
                      onChange={(e) =>
                        setSelectedEmployee({
                          ...selectedEmployee,
                          pnumber: e.target.value,
                        })
                      }
                      className="input input-bordered"
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Position</span>
                    </label>
                    <select
                      value={selectedEmployee.position_name}
                      onChange={(e) =>
                        setSelectedEmployee({
                          ...selectedEmployee,
                          position_name: e.target.value,
                        })
                      }
                      className="select select-bordered"
                    >
                      {positions.map((position) => (
                        <option key={position.id} value={position.name}>
                          {position.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Department</span>
                    </label>
                    <select
                      value={selectedEmployee.department_name}
                      onChange={(e) =>
                        setSelectedEmployee({
                          ...selectedEmployee,
                          department_name: e.target.value,
                        })
                      }
                      className="select select-bordered"
                    >
                      {departments.map((department) => (
                        <option key={department.id} value={department.name}>
                          {department.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Role</span>
                    </label>
                    <select
                      value={selectedEmployee.role_name}
                      onChange={(e) =>
                        setSelectedEmployee({
                          ...selectedEmployee,
                          role_name: e.target.value,
                        })
                      }
                      className="select select-bordered"
                    >
                      {roles.map((role) => (
                        <option key={role.id} value={role.name}>
                          {role.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="modal-action">
                    <button className="btn" onClick={handleSave}>
                      Save
                    </button>
                    <button
                      className="btn"
                      onClick={() => setIsModalOpen(false)}
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
    </div>
  );
};

export default Employees;
