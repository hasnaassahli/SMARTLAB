// backend/models/Payment.js
const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  analyses: { type: String, required: true },
  status: { type: String, enum: ['pending', 'confirmed'], default: 'pending' },
  cashier: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);
