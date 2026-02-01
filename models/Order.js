const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  dishes: [
    {
      dish: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recipe',
        required: true
      },
      quantity: {
        type: Number,
        required: true,
        min: 1
      },
      specialRequest: {
        type: String
      }
    }
  ],
  totalPrice: {
    type: Number,
    required: true,
  },
  orderType: {
    type: String,
    required: true,
    enum: ["Take Away", "Delivery", "Dine In"]
  },
  servedBy:  {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
  },
  status: {
    type: String,
    enum: ["Completed", "Preparing", "Pending", "Canceled"],
    default: "Pending"
  }
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
