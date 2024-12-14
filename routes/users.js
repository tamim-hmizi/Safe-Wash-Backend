// routes/users.js
var express = require("express");
var router = express.Router();
const { registerUser, loginUser } = require("../controllers/userController");

// Register route
router.post("/register", registerUser);

// Login route
router.post("/login", loginUser);

module.exports = router;