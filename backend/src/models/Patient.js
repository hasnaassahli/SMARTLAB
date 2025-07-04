const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: String,
  birthDate: Date,
  // ajoute d'autres champs utiles ici
});

module.exports = mongoose.model("Patient", patientSchema);
