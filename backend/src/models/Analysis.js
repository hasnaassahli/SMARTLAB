import mongoose from 'mongoose';

const analysisSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' },
  analysesList: [String],
  cashier: { type: mongoose.Schema.Types.ObjectId, ref: 'Cashier' },
  createdAt: { type: Date, default: Date.now }
});

const Analysis = mongoose.model('Analysis', analysisSchema);
export default Analysis;
