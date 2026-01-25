const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  table: {
    type: String,
    required: true,
    enum: ["User", "Order", "Dish", "Inventory"]
  },
  action: {
    type: String,
    required: true,
    enum: ["Create", "Delete", "Update"]
  },
  details: {
    type: String,
    required: true,
  },
  actionBy:  {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
