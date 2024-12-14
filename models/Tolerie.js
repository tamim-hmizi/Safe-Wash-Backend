const mongoose = require("mongoose");
const CarSchema = require("./Car");

const TolerieSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    voiture: { type: CarSchema, required: true },
    date: { type: String, required: true },
    hour: { type: String, required: true },
    color: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Tolerie", TolerieSchema);
