const mongoose = require("mongoose");
const CarSchema = require("./Car");

const DetailingSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    voiture: {
      type: CarSchema,
      required: function () {
        return this.type === "voiture";
      },
    },
    price: { type: Number, required: true },
    date: { type: String, required: true },
    hour: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Detailing", DetailingSchema);