import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },        // Nom du patient (duplication pour faciliter)
  phone: { type: String, required: true },
  date: { type: String, required: true, unique: true }, // Date du rendez-vous, unique pour éviter doublons
  status: { type: String, enum: ['pending', 'validated'], default: 'pending' },
}, { timestamps: true });

export default mongoose.model('Appointment', appointmentSchema);
