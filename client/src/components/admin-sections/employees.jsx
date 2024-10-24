import { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react"; // ต้องติดตั้ง @headlessui/react

const Employees = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    surname: "", // เพิ่มฟิลด์นามสกุล
    phone: "", // เพิ่มฟิลด์เบอร์โทร
    jobTitle: "",
    department: "", // เพิ่มฟิลด์แผนก
    accessRights: "", // เพิ่มฟิลด์สิทธิ์การเข้าใช้งาน
    imgSrc: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // สถานะเปิดปิด Modal

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/auth/getUsers");
        const data = await response.json();
        setEmployees(data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = isEditing
        ? await fetch(
            `http://localhost:5000/api/auth/updateUser/${formData.id}`,
            {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(formData),
            }
          )
        : await fetch("http://localhost:5000/api/auth/addUser", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
          });
      const data = await response.json();
      setEmployees((prev) =>
        isEditing
          ? prev.map((employee) =>
              employee.id === formData.id ? data : employee
            )
          : [...prev, data]
      );
      setFormData({
        id: null,
        name: "",
        surname: "", // รีเซ็ตฟิลด์นามสกุล
        phone: "", // รีเซ็ตฟิลด์เบอร์โทร
        jobTitle: "",
        department: "", // รีเซ็ตฟิลด์แผนก
        accessRights: "", // รีเซ็ตฟิลด์สิทธิ์การเข้าใช้งาน
        imgSrc: "",
      });
      setIsEditing(false);
      setIsOpen(false); // ปิด Modal
    } catch (error) {
      console.error("Error saving employee:", error);
    }
  };

  const handleEdit = (employee) => {
    setFormData(employee);
    setIsEditing(true);
    setIsOpen(true); // เปิด Modal
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/auth/deleteUser/${id}`, {
        method: "DELETE",
      });
      setEmployees((prev) => prev.filter((employee) => employee.id !== id));
    } catch (error) {
      console.error("Error deleting employee:", error);
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

        <div className="min-h-screen bg-base-200 p-6">
          {/* ปุ่ม New Employee */}
          <button
            className="btn mb-4"
            onClick={() => {
              setIsOpen(true);
              setFormData({
                id: null,
                name: "",
                surname: "",
                phone: "",
                jobTitle: "",
                department: "",
                accessRights: "",
                imgSrc: "",
              });
              setIsEditing(false);
            }}
          >
            New Employee
          </button>

          {/* Modal สำหรับเพิ่ม/แก้ไขพนักงาน */}
          <Dialog
            open={isOpen}
            onClose={() => setIsOpen(false)}
            className="relative z-10"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
            <div className="fixed inset-0 flex items-center justify-center p-4">
              <Dialog.Panel className="bg-white rounded max-w-lg w-full p-6">
                <Dialog.Title className="text-lg font-bold mb-4">
                  {isEditing ? "Edit Employee" : "Add Employee"}
                </Dialog.Title>
                <form onSubmit={handleSubmit}>
                  <div className="form-control mb-4">
                    <label className="label">
                      <span className="label-text">Name</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="input input-bordered"
                      required
                    />
                  </div>
                  <div className="form-control mb-4">
                    <label className="label">
                      <span className="label-text">Surname</span>
                    </label>
                    <input
                      type="text"
                      name="surname"
                      value={formData.surname}
                      onChange={handleInputChange}
                      className="input input-bordered"
                      required
                    />
                  </div>
                  <div className="form-control mb-4">
                    <label className="label">
                      <span className="label-text">Phone</span>
                    </label>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="input input-bordered"
                      required
                    />
                  </div>
                  <div className="form-control mb-4">
                    <label className="label">
                      <span className="label-text">Job Title</span>
                    </label>
                    <input
                      type="text"
                      name="jobTitle"
                      value={formData.jobTitle}
                      onChange={handleInputChange}
                      className="input input-bordered"
                      required
                    />
                  </div>
                  <div className="form-control mb-4">
                    <label className="label">
                      <span className="label-text">Department</span>
                    </label>
                    <input
                      type="text"
                      name="department"
                      value={formData.department}
                      onChange={handleInputChange}
                      className="input input-bordered"
                      required
                    />
                  </div>
                  <div className="form-control mb-4">
                    <label className="label">
                      <span className="label-text">Access Rights</span>
                    </label>
                    <input
                      type="text"
                      name="accessRights"
                      value={formData.accessRights}
                      onChange={handleInputChange}
                      className="input input-bordered"
                      required
                    />
                  </div>
                  <div className="form-control mb-4">
                    <label className="label">
                      <span className="label-text">Image URL</span>
                    </label>
                    <input
                      type="text"
                      name="imgSrc"
                      value={formData.imgSrc}
                      onChange={handleInputChange}
                      className="input input-bordered"
                    />
                  </div>
                  <div className="modal-action">
                    <button type="submit" className="btn">
                      {isEditing ? "Update" : "Add"}
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setIsOpen(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </div>
          </Dialog>

          {/* ตารางพนักงาน */}
          <table className="table w-full">
            <thead>
              <tr>
                <th>Name</th>
                <th>Surname</th>
                <th>Phone</th>
                <th>Job Title</th>
                <th>Department</th>
                <th>Access Rights</th>
                <th>Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.name}</td>
                  <td>{employee.surname}</td>
                  <td>{employee.phone}</td>
                  <td>{employee.jobTitle}</td>
                  <td>{employee.department}</td>
                  <td>{employee.accessRights}</td>
                  <td>
                    <img
                      src={employee.imgSrc}
                      alt={employee.name}
                      className="w-12 h-12 rounded-full"
                    />
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-warning"
                      onClick={() => handleEdit(employee)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(employee.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Employees;
