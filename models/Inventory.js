const mongoose = require("mongoose");

const dishSchema = new mongoose.Schema(
  {
  ingredientName: { 
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
});

const Dish = mongoose.model("Dish", dishSchema);

module.exports = Dish;
