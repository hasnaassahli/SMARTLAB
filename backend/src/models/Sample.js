const mongoose = require("mongoose");

const sampleSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: "Patient" },
  type: String,
  collectedAt: Date,
  status: { type: String, default: "Pending" }
});

module.exports = mongoose.model("Sample", sampleSchema);
