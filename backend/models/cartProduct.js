const mongoose = require("mongoose");

const addToCartSchema = mongoose.Schema(
  {
    productId: String,
    quantity: Number,
    userId: String,
  },
  { timestamps: true }
);

const addToCartModule = mongoose.model("addToCart", addToCartSchema);
module.exports = addToCartModule;
