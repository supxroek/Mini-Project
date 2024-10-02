const express = require("express");
const oracledb = require("oracledb");

require("dotenv").config();
const cors = require("cors");

const app = express();
app.use(cors());

// สร้างการเชื่อมต่อกับฐานข้อมูล Oracle
async function getConnection() {
  return await oracledb.getConnection({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    connectString: process.env.DB_CONNECT_STRING,
  });
}

// สร้าง API ดึงข้อมูล
app.get("/employee", async (req, res) => {
  try {
    const connection = await getConnection();
    const result = await connection.execute("SELECT * FROM EMPLOYEES"); // เปลี่ยนเป็นตารางที่ต้องการ
    res.json(result.rows);
    await connection.close();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
