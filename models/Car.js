const mongoose = require("mongoose");

const CarSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: String, required: true },
    matricule: { type: String, required: true },
    taille: {
      type: String,
      enum: ["citadine", "berline", "commercial", "pickup"],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = CarSchema;