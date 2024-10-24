const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const oracledb = require("oracledb");
const connectDB = require("../config/database");

// สมัครผู้ใช้ใหม่
exports.register = async (req, res) => {
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
    // เข้ารหัสรหัสผ่านก่อนบันทึก
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await connection.execute(
      `INSERT INTO employees (fname, lname, email, password, pnumber, position_id, department_id, role_id)
            VALUES (:fname, :lname, :email, :password, :pnumber, :position_id, :department_id, :role_id)`,
      {
        fname,
        lname,
        email,
        password: hashedPassword,
        pnumber,
        position_id,
        department_id,
        role_id,
      },
      { autoCommit: true }
    );

    await connection.close();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error registering user", error: err.message });
  }
};

// การเข้าสู่ระบบ
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const connection = await connectDB();
    const result = await connection.execute(
      `SELECT * FROM employees WHERE email = :email`,
      { email },
      { outFormat: oracledb.OBJECT }
    );

    const user = result.rows[0];
    await connection.close();

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // ตรวจสอบรหัสผ่าน
    const isMatch = await bcrypt.compare(password, user.PASSWORD);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // สร้าง JWT
    const token = jwt.sign(
      { userId: user.EMPLOYEE_ID, role: user.ROLE_ID },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token, role: user.ROLE_ID });
  } catch (err) {
    res.status(500).json({ message: "Error logging in", error: err.message });
  }
};

// แสดงข้อมูลผู้ใช้ทั้งหมด
exports.getUsers = async (req, res) => {
  let connection;

  try {
    connection = await connectDB();
    const result = await connection.execute(`SELECT * FROM employees`, [], {
      outFormat: oracledb.OBJECT,
    });

    await connection.close();

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    res.status(200).json(result.rows);
  } catch (err) {
    // ปิดการเชื่อมต่อหากเกิดข้อผิดพลาด
    if (connection) {
      try {
        await connection.close();
      } catch (closeErr) {
        console.error("Error closing connection:", closeErr.message);
      }
    }

    res
      .status(500)
      .json({ message: "Error getting users", error: err.message });
  }
};

// แสดงจำนวนผู้ใช้ทั้งหมด
exports.getTotalUsers = async (req, res) => {
  let connection;

  try {
    connection = await connectDB();
    const result = await connection.execute(
      `SELECT COUNT(*) AS total FROM employees`, // เพิ่มชื่อให้กับค่าที่นับ
      [],
      {
        outFormat: oracledb.OBJECT,
      }
    );

    await connection.close();

    // ส่งค่าตัวเลขจำนวนพนักงานกลับไป
    res.status(200).json({ total: result.rows[0].TOTAL }); // เปลี่ยนให้ส่งกลับเป็น object
  } catch (err) {
    // ปิดการเชื่อมต่อหากเกิดข้อผิดพลาด
    if (connection) {
      try {
        await connection.close();
      } catch (closeErr) {
        console.error("Error closing connection:", closeErr.message);
      }
    }

    res
      .status(500)
      .json({ message: "Error getting total users", error: err.message });
  }
};

// การเพิ่มผู้ใช้ใหม่
exports.addUser = async (req, res) => {
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

    const result = await connection.execute(
      `INSERT INTO employees (fname, lname, email, password, pnumber, position_id, department_id, role_id)
            VALUES (:fname, :lname, :email, :password, :pnumber, :position_id, :department_id, :role_id)`,
      {
        fname,
        lname,
        email,
        password: hashedPassword,
        pnumber,
        position_id,
        department_id,
        role_id,
      },
      { autoCommit: true }
    );

    await connection.close();

    res.status(201).json({ message: "User added successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error adding user", error: err.message });
  }
};

// การแก้ไขข้อมูลผู้ใช้
exports.updateUser = async (req, res) => {
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
  const { id } = req.params;

  try {
    const connection = await connectDB();
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await connection.execute(
      `UPDATE employees
            SET fname = :fname, lname = :lname, email = :email, password = :password, pnumber = :pnumber, position_id = :position_id, department_id = :department_id, role_id = :role_id
            WHERE employee_id = :id`,
      {
        fname,
        lname,
        email,
        password: hashedPassword,
        pnumber,
        position_id,
        department_id,
        role_id,
        id,
      },
      { autoCommit: true }
    );

    await connection.close();

    res.json({ message: "User updated successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating user", error: err.message });
  }
};

// การลบผู้ใช้
exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const connection = await connectDB();
    const result = await connection.execute(
      `DELETE FROM employees WHERE employee_id = :id`,
      { id },
      { autoCommit: true }
    );

    await connection.close();

    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting user", error: err.message });
  }
};
