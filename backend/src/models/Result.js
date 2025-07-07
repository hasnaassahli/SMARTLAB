// backend/src/models/Result.js
import mongoose from "mongoose";

const resultSchema = new mongoose.Schema({
  sample: { type: mongoose.Schema.Types.ObjectId, ref: "Sample" },
  resultText: String,
  createdAt: { type: Date, default: Date.now }
});

const Result = mongoose.model("Result", resultSchema);
export default Result;
