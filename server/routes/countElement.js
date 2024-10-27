const express = require("express");
const {
  getTotalUsers,
  getTotalRooms,
  getTotalRoles,
} = require("../controllers/countElement");
const router = express.Router();

// Get total number of users
router.get("/total-users", getTotalUsers);

// Get total number of rooms
router.get("/total-rooms", getTotalRooms);

// Get total number of roles
router.get("/total-roles", getTotalRoles);

module.exports = router;
