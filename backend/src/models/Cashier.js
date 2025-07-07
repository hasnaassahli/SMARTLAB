import mongoose from "mongoose";

const cashierSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  username: String,
  password: String
});

const Cashier = mongoose.model("Cashier", cashierSchema);
export default Cashier;
