const express = require("express");
const router = express.Router();

const { getRoles, getRoleById, createRole } = require("../controllers/roles");

// Get all roles
router.get("/list-roles", getRoles);

// Get role by ID
router.get("/role/:id", getRoleById);

// Create new role
router.post("/add-role", createRole);

module.exports = router;
