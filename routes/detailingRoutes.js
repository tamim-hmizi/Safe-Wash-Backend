const express = require("express");
const router = express.Router();
const detailingController = require("../controllers/detailingController");

// Create a new detailing
router.post("/", detailingController.createDetailing);

// Get all detailings
router.get("/", detailingController.getAllDetailings);

// Get detailing by ID
router.get("/:id", detailingController.getDetailingById);

// Delete detailing
router.delete("/:id", detailingController.deleteDetailing);

// Get all detailings by date
router.post("/by-date", detailingController.getAllDetailingsByDate);

// Get all detailings by user email
router.get("/user/:email", detailingController.getAllDetailingsByUser);

module.exports = router;