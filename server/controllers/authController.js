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
