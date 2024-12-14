const mongoose = require("mongoose");
const CarSchema = require("./Car");

const PolissageSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    voiture: {
      type: CarSchema,
      required: function () {
        return this.type === "voiture";
      },
    },
    date: {
      type: String,
      required: true,
    },
    hour: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      enum: ["complete", "nb_pieces"],
      required: true,
    },
    nbPieces: {
      type: Number,
      required: function () {
        return this.type === "nb_pieces";
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Polissage", PolissageSchema);