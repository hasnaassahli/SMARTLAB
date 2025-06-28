import mongoose, { Document, Schema } from "mongoose";

export interface ICashier extends Document {
  user: mongoose.Types.ObjectId;
  shift?: string;
}

const CashierSchema = new Schema<ICashier>({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  shift: String,
}, { timestamps: true });

export default mongoose.model<ICashier>("Cashier", CashierSchema);
