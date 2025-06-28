import mongoose, { Document, Schema } from "mongoose";

export interface IPatient extends Document {
  user: mongoose.Types.ObjectId;
  phone?: string;
  address?: string;
  dateOfBirth?: Date;
}

const PatientSchema = new Schema<IPatient>({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  phone: String,
  address: String,
  dateOfBirth: Date,
}, { timestamps: true });

export default mongoose.model<IPatient>("Patient", PatientSchema);
