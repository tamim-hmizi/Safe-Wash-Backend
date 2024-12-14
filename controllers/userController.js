// controllers/userController.js
const User = require("../models/User");

// Register a new user
exports.registerUser = async (req, res) => {
  const { email, name, lastName, phone, password } = req.body;

  try {
    // Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "L'utilisateur existe déjà" });
    }

    // Create a new user
    const newUser = new User({ email, name, lastName, phone, password });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({
      message: "Utilisateur enregistré avec succès",
      user: {
        email: newUser.email,
        name: newUser.name,
        lastName: newUser.lastName,
        phone: newUser.phone,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur du serveur", error: error.message });
  }
};

// Login a user
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Identifiants invalides" });
    }

    // Check if the password matches
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Identifiants invalides" });
    }

    res.status(200).json({
      message: "Connexion réussie",
      user: {
        email: user.email,
        name: user.name,
        lastName: user.lastName,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur du serveur", error: error.message });
  }
};
