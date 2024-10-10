const express = require("express");
const { register, login } = require("../controllers/authController");
const { auth, checkRole } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);

// ตรวจสอบสิทธิ์
router.get("/user-page", auth, checkRole("user"), (req, res) => {
  res.json({ message: "Welcome to User Page" });
});

router.get("/admin-page", auth, checkRole("admin"), (req, res) => {
  res.json({ message: "Welcome to Admin Page" });
});

module.exports = router;
