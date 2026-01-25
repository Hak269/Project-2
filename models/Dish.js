const mongoose = require("mongoose");

const dishSchema = new mongoose.Schema(
  {
  ingredients: [{ 
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Inventory'
  }],
  price: {
    type: Number,
    required: true,
  },
  instructions: {
    type: [],
    required: true,
  },
});

const Dish = mongoose.model("Dish", dishSchema);

module.exports = Dish;
