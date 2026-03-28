const mongoose = require("mongoose");

const supplierSchema = new mongoose.Schema({
  name: String,
  city: String
});

module.exports = mongoose.model("Supplier", supplierSchema);
