const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const oracledb = require("oracledb");
const connectDB = require("../config/database");

// ดึงข้อมูลของพนักงานทั้งหมด
// Get all employees
exports.getEmployees = async (req, res) => {
  try {
    const connection = await connectDB();
    const result = await connection.execute(`SELECT * FROM employees`);
    await connection.close();

    const employees = result.rows.map((row) => {
      return {
        id: row[0], // ID ของพนักงาน
        fname: row[1], // ชื่อ
        lname: row[2], // นามสกุล
        email: row[3], // อีเมล
        pnumber: row[4], // เบอร์โทรศัพท์
        position_id: row[7], // รหัสตำแหน่ง
        department_id: row[8], // รหัสแผนก
        role_id: row[9], // รหัสบทบาท
      };
    });

    res.status(200).json({ employees });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error getting employees", error: err.message });
  }
};

// อัปเดตข้อมูลพนักงาน
// Update employee
exports.updateEmployee = async (req, res) => {
  const {
    employee_id,
    fname,
    lname,
    email,
    password,
    pnumber,
    position_id,
    department_id,
    role_id,
  } = req.body;

  try {
    const connection = await connectDB();

    const updateQuery = `
      UPDATE employees 
      SET fname = :fname, 
          lname = :lname, 
          email = :email, 
          pnumber = :pnumber, 
          position_id = :position_id, 
          department_id = :department_id, 
          role_id = :role_id 
      WHERE employee_id = :employee_id
    `;

    const params = {
      employee_id,
      fname,
      lname,
      email,
      pnumber,
      position_id,
      department_id,
      role_id,
    };

    //if (hashedPassword) params.password = hashedPassword;

    const result = await connection.execute(updateQuery, params, {
      autoCommit: true,
    });

    await connection.close();

    res.status(200).json({ message: "Employee updated successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating employee", error: err.message });
  }
};

// ลบข้อมูลพนักงาน
// Delete employee
exports.deleteEmployee = async (req, res) => {
  const employee_id = req.params.id;

  try {
    const connection = await connectDB();

    const deleteQuery = `DELETE FROM employees WHERE employee_id = :employee_id`;

    const result = await connection.execute(
      deleteQuery,
      { employee_id },
      {
        autoCommit: true,
      }
    );

    await connection.close();

    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting employee", error: err.message });
  }
};
