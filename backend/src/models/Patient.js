const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  gender: String,
  birthDate: Date
});

module.exports = mongoose.model("Patient", patientSchema);
