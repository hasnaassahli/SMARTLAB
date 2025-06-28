import mongoose, { Document, Schema } from "mongoose";

export interface ITechnician extends Document {
  user: mongoose.Types.ObjectId;
  specialty?: string;
}

const TechnicianSchema = new Schema<ITechnician>({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  specialty: String,
}, { timestamps: true });

export default mongoose.model<ITechnician>("Technician", TechnicianSchema);
