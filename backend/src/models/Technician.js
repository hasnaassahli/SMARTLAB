// backend/src/models/Technician.js
import mongoose from "mongoose";

const technicianSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  specialization: String,
});

const Technician = mongoose.model("Technician", technicianSchema);
export default Technician;
