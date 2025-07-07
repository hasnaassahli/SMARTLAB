// src/models/User.js
// backend/src/models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["admin", "cashier", "technician", "patient"],
    default: "patient",
  },
});

// ✅ Export par défaut requis pour `import User from ...`
const User = mongoose.model("User", userSchema);
export default User;

