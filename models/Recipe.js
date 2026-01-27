const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema(
  {
  recipeName: {
    type: String,
    required: true,
  },
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

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
