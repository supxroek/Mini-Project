const express = require("express");
const {
  getEmployees,
  updateEmployee,
  deleteEmployee,
} = require("../controllers/Employees");
const router = express.Router();

// Get all employees
router.get("/list-employees", getEmployees);

// Update employee
router.put("/update-employee/:id", updateEmployee);

// delete employee
router.delete("/delete-employee/:id", deleteEmployee);

module.exports = router;
