const mongoose = require("mongoose");

const dishSchema = new mongoose.Schema(
  {
  item: { 
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  unit: {
    type: Number,
    required: true,
    enum: ["gram", "Liter", "tsp", "tbsp", "Cup"]
  },
  menueYN: {
    type: Boolean,
    required: true,
  }
});

const Inventory = mongoose.model("Inventory", dishSchema);

module.exports = Inventory;
