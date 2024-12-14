// controllers/commandeController.js
const Commande = require("../models/Commande");
const Product = require("../models/Product");
const User = require("../models/User");

// Create a new order (Commande)
exports.createCommande = async (req, res) => {
  const { email, productId } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const commande = new Commande({
      user: user._id,
      product: product._id,
    });

    await commande.save();
    res.status(201).json({ message: "Order created successfully", commande });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all orders (no user filtering)
exports.getAllOrders = async (req, res) => {
  try {
    const commandes = await Commande.find()
      .populate("product")
      .populate("user");

    res.status(200).json(commandes);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get orders for a specific user
exports.getUserOrders = async (req, res) => {
  const email = req.params.email;
  const user = await User.findOne({ email });
  try {
    const commandes = await Commande.find({ user: user._id })
      .populate("product")
      .populate("user");

    res.status(200).json(commandes);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update verification status of an order
exports.verifyCommande = async (req, res) => {
  const { commandeId, isVerified } = req.body;

  try {
    const commande = await Commande.findById(commandeId);
    if (!commande)
      return res.status(404).json({ message: "Commande not found" });

    commande.verified = isVerified;
    await commande.save();

    res
      .status(200)
      .json({ message: "Commande verification status updated", commande });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete an order (Commande)
exports.deleteCommande = async (req, res) => {
  const commandeId = req.params.commandeId;

  try {
    const commande = await Commande.findByIdAndDelete(commandeId);
    if (!commande)
      return res.status(404).json({ message: "Commande not found" });

    res.status(200).json({ message: "Commande deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
