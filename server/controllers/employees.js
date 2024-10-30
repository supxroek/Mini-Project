const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const oracledb = require("oracledb");
const connectDB = require("../config/database");

// ดึงข้อมูลของพนักงานทั้งหมด
// Get all employees
exports.getEmployees = async (req, res) => {
  try {
    const connection = await connectDB();
    const result = await connection.execute(`
      SELECT e.EMPLOYEE_ID, e.FNAME, e.LNAME, e.EMAIL, e.PNUMBER,
             p.POSITION_NAME AS position_name,
             d.DEPARTMENT_NAME AS department_name,
             r.ROLE_NAME AS role_name
      FROM employees e
      JOIN POSITIONS p ON e.POSITION_ID = p.POSITION_ID
      JOIN DEPARTMENTS d ON e.DEPARTMENT_ID = d.DEPARTMENT_ID
      JOIN ROLES r ON e.ROLE_ID = r.ROLE_ID
    `);
    await connection.close();

    const employees = result.rows.map((row) => {
      return {
        id: row[0], // ID ของพนักงาน
        fname: row[1], // ชื่อ
        lname: row[2], // นามสกุล
        email: row[3], // อีเมล
        pnumber: row[4], // เบอร์โทรศัพท์
        position_name: row[5], // ชื่อตำแหน่ง
        department_name: row[6], // ชื่อแผนก
        role_name: row[7], // ชื่อบทบาท
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

// สร้างข้อมูลพนักงาน
// Create employee
exports.createEmployee = async (req, res) => {
  const {
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

    const hashedPassword = await bcrypt.hash(password, 10);

    const createQuery = `
      INSERT INTO employees (fname, lname, email, password, pnumber, position_id, department_id, role_id)
      VALUES (:fname, :lname, :email, :password, :pnumber, :position_id, :department_id, :role_id)
    `;

    const params = {
      fname,
      lname,
      email,
      password: hashedPassword,
      pnumber,
      position_id,
      department_id,
      role_id,
    };

    const result = await connection.execute(createQuery, params, {
      autoCommit: true,
    });

    await connection.close();

    res.status(201).json({ message: "Employee created successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating employee", error: err.message });
  }
};
