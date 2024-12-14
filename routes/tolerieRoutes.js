const express = require("express");
const tolerieController = require("../controllers/tolerieController");

const router = express.Router();

router.post("/", tolerieController.createTolerie);
router.get("/", tolerieController.getAllToleries);
router.get("/:id", tolerieController.getTolerieById);
router.delete("/:id", tolerieController.deleteTolerie);
router.post("/by-date", tolerieController.getAllToleiresByDate);
router.get("/user/:email", tolerieController.getTolerieByEmail);
module.exports = router;