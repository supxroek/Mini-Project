import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Container,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const Admin_dashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [totalRooms, setTotalRooms] = useState(0);
  const [totalRoles, setTotalRoles] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const employeesResponse = await fetch(
          "http://localhost:5000/api/auth/total-users"
        );
        if (!employeesResponse.ok) {
          throw new Error(`HTTP error! status: ${employeesResponse.status}`);
        }
        const employeesData = await employeesResponse.json();
        setTotalEmployees(employeesData.total_users); // เปลี่ยนเป็น total_users

        const roomsResponse = await fetch(
          "http://localhost:5000/api/auth/total-rooms"
        );
        if (!roomsResponse.ok) {
          throw new Error(`HTTP error! status: ${roomsResponse.status}`);
        }
        const roomsData = await roomsResponse.json();
        setTotalRooms(roomsData.total_rooms); // เปลี่ยนเป็น total_rooms

        const rolesResponse = await fetch(
          "http://localhost:5000/api/auth/total-roles"
        );
        if (!rolesResponse.ok) {
          throw new Error(`HTTP error! status: ${rolesResponse.status}`);
        }
        const rolesData = await rolesResponse.json();
        setTotalRoles(rolesData.total_roles); // เปลี่ยนเป็น total_roles
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // อัปเดตทุกๆ วินาที

    return () => clearInterval(interval); // Cleanup เมื่อตัว component ถูกยกเลิก
  }, []);

  // ดึงข้อมูลชื่อวัน, เดือน, และเวลาในรูปแบบที่ต้องการ
  const dayName = currentTime.toLocaleString("en-US", { weekday: "long" });
  const monthName = currentTime.toLocaleString("en-US", { month: "short" });
  const timeString = currentTime.toLocaleTimeString("en-US", {
    hour12: false, // ใช้รูปแบบเวลา 24 ชั่วโมง
  });

  return (
    <>
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-800 min-h-screen p-4 text-white flex flex-col justify-between">
          <div className="flex flex-col">
            <a className="text-2xl font-semibold mb-6">Logo</a>
            <nav className="flex flex-col gap-3">
              <a className="flex items-center gap-2 p-3 bg-indigo-700 rounded-lg">
                <img
                  src="/src/assets/dashboard.png"
                  alt="My Icon"
                  width="20"
                  height="20"
                />
                Dashboard
              </a>
              <a
                href="/employees"
                className="flex items-center gap-2 p-3 hover:bg-indigo-700 rounded-lg"
              >
                <img
                  src="/src/assets/setting.png"
                  alt="My Icon"
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
                  alt="My Icon"
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
                  alt="My Icon"
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
                  alt="My Icon"
                  width="24"
                  height="24"
                />
                Report
              </a>
            </nav>
          </div>

          {/* ปุ่ม Logout */}
          <a
            href="/login"
            className="flex items-center gap-2 p-3 hover:bg-indigo-700 rounded-lg mt-auto"
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
          {/* Navbar */}
          <div className="navbar bg-base-100">
            <div className="navbar-start m-4">
              <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
                <div className="flex flex-col">
                  <span className="countdown font-mono font-semibold text-2xl">
                    {dayName}
                  </span>{" "}
                  {/* แสดงชื่อวัน */}
                </div>
                <div className="flex flex-col">
                  <span className="countdown font-mono font-semibold text-2xl">
                    {monthName}
                  </span>{" "}
                  {/* แสดงชื่อเดือน */}
                </div>
                <div className="flex flex-col">
                  <span className="countdown font-mono font-semibold text-2xl">
                    {timeString}
                  </span>{" "}
                  {/* แสดงเวลา */}
                </div>
              </div>
            </div>
            <div className="navbar-end">
              {/* User Dropdown */}
              <div className="dropdown dropdown-end">
                <Link to="/profile">
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
                </Link>
              </div>
            </div>
          </div>
          <div className="min-h-screen bg-base-200">
            {/* Dashboard Content */}
            <div className="p-6">
              <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Typography variant="h4" gutterBottom>
                  Dashboard Overview
                </Typography>
                <Grid container spacing={3}>
                  {/* Total Employees */}
                  <Grid item xs={12} md={4}>
                    <Card
                      sx={{
                        bgcolor: "#ffeb3b",
                        color: "#212121",
                        borderRadius: 2,
                        boxShadow: 3,
                      }}
                    >
                      <CardContent>
                        <Typography variant="h6">Total Employees</Typography>
                        <Typography variant="h3">{totalEmployees}</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  {/* Total Rooms */}
                  <Grid item xs={12} md={4}>
                    <Card
                      sx={{
                        bgcolor: "#03a9f4",
                        color: "#fff",
                        borderRadius: 2,
                        boxShadow: 3,
                      }}
                    >
                      <CardContent>
                        <Typography variant="h6">Total Rooms</Typography>
                        <Typography variant="h3">{totalRooms}</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  {/* Total Roles */}
                  <Grid item xs={12} md={4}>
                    <Card
                      sx={{
                        bgcolor: "#4caf50",
                        color: "#fff",
                        borderRadius: 2,
                        boxShadow: 3,
                      }}
                    >
                      <CardContent>
                        <Typography variant="h6">Total Roles</Typography>
                        <Typography variant="h3">{totalRoles}</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>

                {/* Recent Bookings Table */}
                <Box sx={{ mt: 4 }}>
                  <Typography variant="h5">Recent Bookings</Typography>
                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>User</TableCell>
                          <TableCell>Room</TableCell>
                          <TableCell>Date</TableCell>
                          <TableCell>Status</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {/* Map over recent bookings data here */}
                        <TableRow>
                          <TableCell>John Doe</TableCell>
                          <TableCell>Room 101</TableCell>
                          <TableCell>2024-11-01</TableCell>
                          <TableCell>Confirmed</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              </Container>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin_dashboard;
