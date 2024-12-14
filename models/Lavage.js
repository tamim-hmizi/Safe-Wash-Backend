const mongoose = require("mongoose");
const CarSchema = require("./Car");
const MotoSchema = require("./Moto");

const LavageSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    type: { type: String, enum: ["voiture", "moto"], required: true },
    voiture: {
      type: CarSchema,
      required: function () {
        return this.type === "voiture";
      },
    },
    moto: {
      type: MotoSchema,
      required: function () {
        return this.type === "moto";
      },
    },
    lavageType: { type: String, enum: ["express", "rapide"], required: true },
    price: { type: String }, // Not required if calculated dynamically
    date: { type: String, required: true },
    hour: { type: String, required: true },
  },
  { timestamps: true }
);

// Pricing function
LavageSchema.methods.calculatePrice = function () {
  if (this.type === "voiture") {
    const prices = {
      citadine: { rapide: 13, express: 5 },
      berline: { rapide: 15, express: 5 },
      commercial: { rapide: 17, express: 5 },
      pickup: { rapide: 20, express: 5 },
    };
    return prices[this.voiture.taille][this.lavageType];
  } else if (this.type === "moto") {
    const prices = {
      grande: { rapide: 10, express: 5 },
      petit: { rapide: 6, express: 5 },
    };
    return prices[this.moto.taille][this.lavageType];
  }
};

module.exports = mongoose.model("Lavage", LavageSchema);
