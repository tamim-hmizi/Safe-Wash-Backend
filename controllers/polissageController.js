const Polissage = require("../models/Polissage");
const User = require("../models/User");
const Car = require("../models/Car");

// Create a new Polissage
exports.createPolissage = async (req, res) => {
  try {
    const { user, voiture, date, hour, price, type, nbPieces } = req.body;

    // Validate user existence and fetch the ObjectId
    const userDocument = await User.findOne({ email: user.email });
    if (!userDocument) {
      return res.status(404).json({ error: "User not found." });
    }

    // Check for overlapping bookings
    const overlappingBooking = await Polissage.findOne({ date, hour });
    if (overlappingBooking) {
      return res.status(400).json({ error: "Time slot already booked." });
    }

    // Prepare the Polissage data
    const polissageData = {
      user: userDocument._id, // Assign the ObjectId here
      voiture,
      date,
      hour,
      price,
      type,
      nbPieces: type === "nb_pieces" ? nbPieces : undefined,
    };

    const polissage = new Polissage(polissageData);

    await polissage.save();
    res.status(201).json({ polissage });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all Polissages
exports.getAllPolissages = async (req, res) => {
  try {
    const polissages = await Polissage.find().populate("user");

    res.status(200).json(polissages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a Polissage by ID
exports.getPolissageById = async (req, res) => {
  try {
    const polissage = await Polissage.findById(req.params.id);

    if (!polissage)
      return res.status(404).json({ error: "Polissage not found" });
    res.status(200).json(polissage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a Polissage
exports.deletePolissage = async (req, res) => {
  try {
    const polissage = await Polissage.findByIdAndDelete(req.params.id);
    if (!polissage)
      return res.status(404).json({ error: "Polissage not found" });
    res.status(200).json({ message: "Polissage deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all Polissages by User
exports.getAllPolissagesByUser = async (req, res) => {
  try {
    const email = req.params.email;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Find polissages associated with the user's ID
    const polissages = await Polissage.find({ user: user._id });

    res.status(200).json(polissages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all Polissages by Date
exports.getAllPolissagesByDate = async (req, res) => {
  try {
    const { date } = req.body;

    const polissages = await Polissage.find({ date }).populate("user");

    res.status(200).json(polissages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
