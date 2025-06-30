const mongoose = require("mongoose");

const technicianSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  specialization: String
});

module.exports = mongoose.model("Technician", technicianSchema);
