// backend/src/models/Sample.js
import mongoose from "mongoose";

const sampleSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: "Patient" },
  type: String,
  collectedAt: Date,
  status: { type: String, default: "Pending" }
});

const Sample = mongoose.model("Sample", sampleSchema);
export default Sample;
