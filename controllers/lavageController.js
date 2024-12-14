const { default: mongoose } = require("mongoose");
const Lavage = require("../models/Lavage");
const User = require("../models/User");

exports.createLavage = async (req, res) => {
  try {
    const { user, type, voiture, moto, lavageType, date, hour } = req.body;

    // Validate user existence and fetch the ObjectId
    const userDocument = await User.findOne({ email: user.email });
    if (!userDocument) {
      return res.status(404).json({ error: "User not found." });
    }

    // Check for overlapping bookings
    const overlappingBooking = await Lavage.findOne({ date, hour });
    if (overlappingBooking) {
      return res.status(400).json({ error: "Time slot already booked." });
    }

    // Prepare the Lavage data
    const lavageData = {
      user: userDocument._id, // Assign the ObjectId here
      type,
      lavageType,
      date,
      hour,
    };

    if (type === "voiture") {
      lavageData.voiture = voiture;
    } else if (type === "moto") {
      lavageData.moto = moto;
    } else {
      return res.status(400).json({ error: "Invalid type specified" });
    }

    const lavage = new Lavage(lavageData);
    lavage.price = lavage.calculatePrice();

    await lavage.save();
    res.status(201).json({ lavage });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all Lavages
exports.getAllLavages = async (req, res) => {
  try {
    const lavages = await Lavage.find().populate("user");

    res.status(200).json(lavages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a Lavage by ID
exports.getLavageById = async (req, res) => {
  try {
    const lavage = await Lavage.findById(req.params.id).populate("user");
    if (!lavage) return res.status(404).json({ error: "Lavage not found" });
    res.status(200).json(lavage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a Lavage
exports.deleteLavage = async (req, res) => {
  try {
    const lavage = await Lavage.findByIdAndDelete(req.params.id);
    if (!lavage) return res.status(404).json({ error: "Lavage not found" });
    res.status(200).json({ message: "Lavage deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllLavagesByUser = async (req, res) => {
  try {
    const email = req.params.email;

    // Find the user by email
    const user = await User.findOne({ email }); // Use findOne for a single user
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Find lavages associated with the user's ID
    const lavages = await Lavage.find({ user: user._id });
    res.status(200).json(lavages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllLavagesByDate = async (req, res) => {
  try {
    const { date } = req.body;

    const lavages = await Lavage.find({
      date: date,
    }).populate("user");

    res.status(200).json(lavages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};