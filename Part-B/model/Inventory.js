const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema({
  supplier_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Supplier"
  },
  product_name: String,
  quantity: Number,
  price: Number
});

module.exports = mongoose.model("Inventory", inventorySchema);