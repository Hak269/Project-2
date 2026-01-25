const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  tableName: {
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

const Log = mongoose.model("Log", userSchema);

module.exports = Log;
