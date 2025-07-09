import mongoose from 'mongoose';

const resultSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  analysis: { type: String, required: true },
  value: { type: String, required: true },
  technician: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

export default mongoose.model('Result', resultSchema);
