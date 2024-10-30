const express = require("express");
const {
  getDepartments,
  getDepartmentById,
  createDepartment,
  updateDepartment,
  deleteDepartment,
} = require("../controllers/department");
const router = express.Router();

// Get all departments
router.get("/list-departments", getDepartments);

// Get department by ID
router.get("/department/:id", getDepartmentById);

// Add department
router.post("/add-department", createDepartment);

// Update department
router.put("/update-department/:id", updateDepartment);

// Delete department
router.delete("/delete-department/:id", deleteDepartment);

module.exports = router;
