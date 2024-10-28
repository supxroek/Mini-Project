const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const oracledb = require("oracledb");
const connectDB = require("../config/database");

// ดึงข้อมูลของแผนกทั้งหมด
// Get all departments
exports.getDepartments = async (req, res) => {
  try {
    const connection = await connectDB();
    const result = await connection.execute(`SELECT * FROM departments`);
    await connection.close();

    const departments = result.rows.map((row) => {
      return {
        id: row[0], // ID ของแผนก
        name: row[1], // ชื่อแผนก
      };
    });

    res.status(200).json({ departments });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error getting departments", error: err.message });
  }
};

// ดึงข้อมูลของแผนกจาก ID
// Get department by ID
exports.getDepartmentById = async (req, res) => {
  const { id } = req.params;

  try {
    const connection = await connectDB();
    const result = await connection.execute(
      `SELECT * FROM departments WHERE department_id = :id`,
      [id]
    );
    await connection.close();

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Department not found" });
    }

    const department = {
      id: result.rows[0][0], // ID ของแผนก
      name: result.rows[0][1], // ชื่อแผนก
    };

    res.status(200).json({ department });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error getting department", error: err.message });
  }
};

// สร้างแผนกใหม่
// Create new department
exports.createDepartment = async (req, res) => {
  const { name } = req.body;

  try {
    const connection = await connectDB();
    const result = await connection.execute(
      `INSERT INTO departments (department_name) VALUES (:name)`,
      [name]
    );
    await connection.commit();
    await connection.close();

    res.status(201).json({ message: "Department created successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating department", error: err.message });
  }
};

// แก้ไขข้อมูลแผนก
// Update department
exports.updateDepartment = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const connection = await connectDB();
    const result = await connection.execute(
      `UPDATE departments SET department_name = :name WHERE department_id = :id`,
      [name, id],
      { autoCommit: true }
    );
    await connection.close();

    res.status(200).json({ message: "Department updated successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating department", error: err.message });
  }
};

// ลบแผนก
// Delete department
exports.deleteDepartment = async (req, res) => {
  const { id } = req.params;

  try {
    const connection = await connectDB();
    const result = await connection.execute(
      `DELETE FROM departments WHERE department_id = :id`,
      [id],
      { autoCommit: true }
    );
    await connection.close();

    res.status(200).json({ message: "Department deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting department", error: err.message });
  }
};
