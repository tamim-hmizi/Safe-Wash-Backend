const Tolerie = require("../models/Tolerie");
const User = require("../models/User");

exports.createTolerie = async (req, res) => {
  try {
    const { user, voiture, date, hour, color } = req.body;

    // Validate user existence
    const userDocument = await User.findOne({ email: user.email });
    if (!userDocument) {
      return res.status(404).json({ error: "User not found." });
    }

    // Validate overlapping bookings
    const overlappingBooking = await Tolerie.findOne({ date, hour });
    if (overlappingBooking) {
      return res.status(400).json({ error: "Time slot already booked." });
    }

    const tolerie = new Tolerie({
      user: userDocument._id,
      voiture,
      date,
      hour,
      color,
    });

    await tolerie.save();
    res.status(201).json({ tolerie });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllToleries = async (req, res) => {
  try {
    const toleries = await Tolerie.find().populate("user");
    res.status(200).json(toleries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTolerieById = async (req, res) => {
  try {
    const tolerie = await Tolerie.findById(req.params.id).populate("user");
    if (!tolerie) return res.status(404).json({ error: "Tolerie not found." });
    res.status(200).json(tolerie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteTolerie = async (req, res) => {
  try {
    const tolerie = await Tolerie.findByIdAndDelete(req.params.id);
    if (!tolerie) return res.status(404).json({ error: "Tolerie not found." });
    res.status(200).json({ message: "Tolerie deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllToleiresByDate = async (req, res) => {
  try {
    const { date } = req.body;

    const Toleries = await Tolerie.find({
      date: date,
    }).populate("user");

    res.status(200).json(Toleries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTolerieByEmail = async (req, res) => {
  try {
    const email = req.params.email;

    const userDocument = await User.findOne({ email });
    if (!userDocument) {
      return res.status(404).json({ error: "User not found." });
    }
    const toleries = await Tolerie.find({ user: userDocument._id });
    res.status(200).json(toleries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};