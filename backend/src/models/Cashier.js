const mongoose = require("mongoose");

const cashierSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  username: String,
  password: String
});

module.exports = mongoose.model("Cashier", cashierSchema);
