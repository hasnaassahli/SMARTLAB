const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
  sample: { type: mongoose.Schema.Types.ObjectId, ref: "Sample" },
  resultText: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Result", resultSchema);
