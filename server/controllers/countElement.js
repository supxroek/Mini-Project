const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const oracledb = require("oracledb");
const connectDB = require("../config/database");

// ดึงข้อมูลจำนวนผู้ใช้ทั้งหมด หจำนวนห้องทั้งหมด และจำนวน role ทั้งหมด

// Get total number of users
// Get total number of users
exports.getTotalUsers = async (req, res) => {
  try {
    const connection = await connectDB();
    const result = await connection.execute(
      `SELECT COUNT(*) AS total_users FROM employees`
    );
    await connection.close();

    const totalUsers = result.rows[0] ? result.rows[0][0] : 0;
    res.status(200).json({ total_users: totalUsers });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error getting total users", error: err.message });
  }
};

// Get total number of rooms
exports.getTotalRooms = async (req, res) => {
  try {
    const connection = await connectDB();
    const result = await connection.execute(
      `SELECT COUNT(*) AS total_rooms FROM rooms`
    );
    await connection.close();

    const totalRooms = result.rows[0] ? result.rows[0][0] : 0;
    res.status(200).json({ total_rooms: totalRooms });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error getting total rooms", error: err.message });
  }
};

// Get total number of roles
exports.getTotalRoles = async (req, res) => {
  try {
    const connection = await connectDB();
    const result = await connection.execute(
      `SELECT COUNT(*) AS total_roles FROM roles`
    );
    await connection.close();

    const totalRoles = result.rows[0] ? result.rows[0][0] : 0;
    res.status(200).json({ total_roles: totalRoles });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error getting total roles", error: err.message });
  }
};
