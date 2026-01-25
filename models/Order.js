const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  dishes: 
  [{ 
    dish:{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Dish'
  }, 
  quantity: Number
  }],
  totalPrice: {
    type: Number,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  orderType: {
    type: Number,
    required: true,
    enum: ["Take Away", "Delivery", "Dine in"]
  },
  servedBy:  {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
