const mongoose = require("mongoose");
const Detailing = require("../models/Detailing");
const User = require("../models/User");

exports.createDetailing = async (req, res) => {
  try {
    const { user, voiture, price, date, hour } = req.body;

    // Validate user existence and fetch the ObjectId
    const userDocument = await User.findOne({ email: user.email });
    if (!userDocument) {
      return res.status(404).json({ error: "User not found." });
    }

    // Check for overlapping bookings
    const overlappingBooking = await Detailing.findOne({ date, hour });
    if (overlappingBooking) {
      return res.status(400).json({ error: "Time slot already booked." });
    }

    // Prepare the Detailing data
    const detailingData = {
      user: userDocument._id, // Assign the ObjectId here
      price,
      date,
      hour,
      voiture,
    };

    const detailing = new Detailing(detailingData);
    await detailing.save();
    res.status(201).json({ detailing });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all Detailings
exports.getAllDetailings = async (req, res) => {
  try {
    const detailings = await Detailing.find().populate("user");

    res.status(200).json(detailings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a Detailing by ID
exports.getDetailingById = async (req, res) => {
  try {
    const detailing = await Detailing.findById(req.params.id).populate("user");
    if (!detailing)
      return res.status(404).json({ error: "Detailing not found" });
    res.status(200).json(detailing);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a Detailing
exports.deleteDetailing = async (req, res) => {
  try {
    const detailing = await Detailing.findByIdAndDelete(req.params.id);
    if (!detailing)
      return res.status(404).json({ error: "Detailing not found" });
    res.status(200).json({ message: "Detailing deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all Detailings by User
exports.getAllDetailingsByUser = async (req, res) => {
  try {
    const email = req.params.email;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Find detailings associated with the user's ID
    const detailings = await Detailing.find({ user: user._id });
    res.status(200).json(detailings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all Detailings by Date
exports.getAllDetailingsByDate = async (req, res) => {
  try {
    const { date } = req.body;

    const detailings = await Detailing.find({ date }).populate("user");

    res.status(200).json(detailings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};