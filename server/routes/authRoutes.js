const express = require("express");
const {
  register,
  login,
  getUsers,
  addUser,
  updateUser,
  deleteUser,
  getTotalUsers,
} = require("../controllers/authController");
const { auth, checkRole } = require("../middlewares/authMiddleware");
const router = express.Router();

// สมัครผู้ใช้ใหม่
router.post("/register", register);

// การเข้าสู่ระบบ
router.post("/login", login);

// แสดงข้อมูลผู้ใช้ทั้งหมด
router.get("/getUsers", getUsers);

// แสดงจำนวนผู้ใช้ทั้งหมด
router.get("/getTotalUsers", getTotalUsers);

// การเพิ่มผู้ใช้ใหม่
router.post("/addUser", addUser);

// การแก้ไขข้อมูลผู้ใช้
router.put("/updateUser", updateUser);

// การลบผู้ใช้
router.delete("/deleteUser", deleteUser);

// ตรวจสอบสิทธิ์
router.get("/user-page", auth, checkRole("user"), (req, res) => {
  res.json({ message: "Welcome to User Page" });
});

router.get("/admin-page", auth, checkRole("admin"), (req, res) => {
  res.json({ message: "Welcome to Admin Page" });
});

module.exports = router;
