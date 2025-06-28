import mongoose, { Document, Schema } from "mongoose";

export interface IResult extends Document {
  patient: mongoose.Types.ObjectId;
  technician: mongoose.Types.ObjectId;
  analysisDate: Date;
  description: string;
  status: "pending" | "completed";
  resultData: string; // ou JSON selon besoin
}

const ResultSchema = new Schema<IResult>({
  patient: { type: Schema.Types.ObjectId, ref: "Patient", required: true },
  technician: { type: Schema.Types.ObjectId, ref: "Technician" },
  analysisDate: { type: Date, default: Date.now },
  description: { type: String, required: true },
  status: { type: String, enum: ["pending", "completed"], default: "pending" },
  resultData: String,
}, { timestamps: true });

export default mongoose.model<IResult>("Result", ResultSchema);
