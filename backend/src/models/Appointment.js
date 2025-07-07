import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  patientName: String,
  phone: String,
  date: String,
  time: String,
  status: { type: String, default: "En attente" },
});

const Appointment = mongoose.model("Appointment", appointmentSchema);
export default Appointment;
