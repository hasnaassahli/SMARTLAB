// backend/src/models/Patient.js
import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  gender: String,
  birthDate: Date
});

const Patient = mongoose.model("Patient", patientSchema);
export default Patient;
