const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const oracledb = require("oracledb");
const connectDB = require("../config/database");

// ดึงข้อมูลของตำแหน่งทั้งหมด
// Get all positions
exports.getPositions = async (req, res) => {
  try {
    const connection = await connectDB();
    const result = await connection.execute(`SELECT * FROM positions`);
    await connection.close();

    const positions = result.rows.map((row) => {
      return {
        id: row[0], // ID ของตำแหน่ง
        name: row[1], // ชื่อตำแหน่ง
      };
    });

    res.status(200).json({ positions });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error getting positions", error: err.message });
  }
};

// ดึงข้อมูลของตำแหน่งจาก ID
// Get position by ID
exports.getPositionById = async (req, res) => {
  const { id } = req.params;

  try {
    const connection = await connectDB();
    const result = await connection.execute(
      `SELECT * FROM positions WHERE position_id = :id`,
      [id]
    );
    await connection.close();

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Position not found" });
    }

    const position = {
      id: result.rows[0][0], // ID ของตำแหน่ง
      name: result.rows[0][1], // ชื่อตำแหน่ง
    };

    res.status(200).json({ position });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error getting position", error: err.message });
  }
};

// สร้างตำแหน่งใหม่
// Create new position
exports.createPosition = async (req, res) => {
  const { name } = req.body;

  try {
    const connection = await connectDB();
    const result = await connection.execute(
      `INSERT INTO positions (position_name) VALUES (:name)`,
      [name]
    );
    await connection.commit();
    await connection.close();

    res.status(201).json({ message: "Position created" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating position", error: err.message });
  }
};

// แก้ไขข้อมูลของตำแหน่ง
// Update position
exports.updatePosition = async (req, res) => {
  const { id, name } = req.body;

  try {
    const connection = await connectDB();
    const result = await connection.execute(
      `UPDATE positions SET position_name = :name WHERE position_id = :id`,
      [name, id]
    );
    await connection.commit();
    await connection.close();

    res.status(200).json({ message: "Position updated" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating position", error: err.message });
  }
};

// ลบตำแหน่ง
// Delete position
exports.deletePosition = async (req, res) => {
  const { id } = req.params;

  try {
    const connection = await connectDB();
    const result = await connection.execute(
      `DELETE FROM positions WHERE position_id = :id`,
      [id]
    );
    await connection.commit();
    await connection.close();

    res.status(200).json({ message: "Position deleted" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting position", error: err.message });
  }
};
