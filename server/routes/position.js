const express = require("express");
const {
  getPositions,
  getPositionById,
  createPosition,
  updatePosition,
  deletePosition,
} = require("../controllers/position");
const router = express.Router();

// Get all positions
router.get("/list-positions", getPositions);

// Get position by ID
router.get("/position/:id", getPositionById);

// Add position
router.post("/add-position", createPosition);

// Update position
router.put("/update-position/:id", updatePosition);

// Delete position
router.delete("/delete-position/:id", deletePosition);

module.exports = router;
