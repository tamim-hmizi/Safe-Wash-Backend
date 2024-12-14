const express = require("express");
const router = express.Router();
const polissageController = require("../controllers/polissageController");

// Create a new Polissage
router.post("/", polissageController.createPolissage);

// Get all Polissages
router.get("/", polissageController.getAllPolissages);

// Get Polissage by ID
router.get("/:id", polissageController.getPolissageById);

// Delete Polissage
router.delete("/:id", polissageController.deletePolissage);

// Get all Polissages by Date
router.post("/by-date", polissageController.getAllPolissagesByDate);

// Get all Polissages by User
router.get("/user/:email", polissageController.getAllPolissagesByUser);

module.exports = router;