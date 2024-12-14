const mongoose = require("mongoose");

const MotoSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    taille: {
      type: String,
      enum: ["grande", "petit"],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = MotoSchema;