// src/models/Result.js
const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
  resultId: {
    type: String,
    unique: true,
    required: true
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true
  },
  appointment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Appointment'
  },
  testType: {
    type: String,
    required: true
  },
  testName: {
    type: String,
    required: true
  },
  results: [{
    parameter: String,
    value: String,
    unit: String,
    referenceRange: String,
    status: {
      type: String,
      enum: ['normal', 'abnormal', 'critical'],
      default: 'normal'
    }
  }],
  technician: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'completed', 'verified'],
    default: 'pending'
  },
  notes: String,
  attachments: [String], // File URLs
  verifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  verifiedAt: Date
}, {
  timestamps: true
});

// Generate result ID
resultSchema.pre('save', async function(next) {
  if (!this.resultId) {
    const count = await mongoose.model('Result').countDocuments();
    this.resultId = `R${String(count + 1).padStart(6, '0')}`;
  }
  next();
});

module.exports = mongoose.model('Result', resultSchema);