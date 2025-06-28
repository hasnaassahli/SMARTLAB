import mongoose, { Document, Schema } from "mongoose";

export interface ISample extends Document {
  code: string;
  description: string;
  createdAt: Date;
}

const sampleSchema: Schema = new Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Sample = mongoose.model<ISample>("Sample", sampleSchema);

export default Sample;
