const express = require("express");
const router = express.Router();
const lavageController = require("../controllers/lavageController");

// Create a new lavage
router.post("/", lavageController.createLavage);

// Get all lavages
router.get("/", lavageController.getAllLavages);

// Get lavage by ID
router.get("/:id", lavageController.getLavageById);

// Delete lavage
router.delete("/:id", lavageController.deleteLavage);

// Get all lavages by date
router.post("/by-date", lavageController.getAllLavagesByDate);

router.get("/user/:email", lavageController.getAllLavagesByUser);

module.exports = router;