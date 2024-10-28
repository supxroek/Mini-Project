const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const oracledb = require("oracledb");
const connectDB = require("../config/database");

// ดึงข้อมูลของบทบาททั้งหมด
// Get all roles
exports.getRoles = async (req, res) => {
  try {
    const connection = await connectDB();
    const result = await connection.execute(`SELECT * FROM roles`);
    await connection.close();

    const roles = result.rows.map((row) => {
      return {
        id: row[0], // ID ของบทบาท
        name: row[1], // ชื่อบทบาท
      };
    });

    res.status(200).json({ roles });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error getting roles", error: err.message });
  }
};

// ดึงข้อมูลของบทบาทจาก ID
// Get role by ID
exports.getRoleById = async (req, res) => {
  const { id } = req.params;

  try {
    const connection = await connectDB();
    const result = await connection.execute(
      `SELECT * FROM roles WHERE role_id = :id`,
      [id]
    );
    await connection.close();

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Role not found" });
    }

    const role = {
      id: result.rows[0][0], // ID ของบทบาท
      name: result.rows[0][1], // ชื่อบทบาท
    };

    res.status(200).json({ role });
  } catch (err) {
    res.status(500).json({ message: "Error getting role", error: err.message });
  }
};

// สร้างบทบาทใหม่
// Create new role
exports.createRole = async (req, res) => {
  const { name } = req.body;

  try {
    const connection = await connectDB();
    const result = await connection.execute(
      `INSERT INTO roles (role_name) VALUES (:name)`,
      [name]
    );
    await connection.commit();
    await connection.close();

    res.status(201).json({ message: "Role created" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating role", error: err.message });
  }
};

// อัปเดตข้อมูลบทบาท
// Update role
exports.updateRole = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const connection = await connectDB();
    const result = await connection.execute(
      `UPDATE roles SET role_name = :name WHERE role_id = :id`,
      [name, id]
    );
    await connection.commit();
    await connection.close();

    res.status(200).json({ message: "Role updated" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating role", error: err.message });
  }
};

// ลบบทบาท
// Delete role
exports.deleteRole = async (req, res) => {
  const { id } = req.params;

  try {
    const connection = await connectDB();
    const result = await connection.execute(
      `DELETE FROM roles WHERE role_id = :id`,
      [id]
    );
    await connection.commit();
    await connection.close();

    res.status(200).json({ message: "Role deleted" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting role", error: err.message });
  }
};
