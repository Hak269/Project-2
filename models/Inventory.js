const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema(
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
    type: String,
    required: true,
    enum: ["gram", "Liter", "tsp", "tbsp", "Cup", "piece"]
  },
  menueYN: {
    type: Boolean,
    required: true,
    default: false,
  }
});

const Inventory = mongoose.model("Inventory", inventorySchema);

module.exports = Inventory;
