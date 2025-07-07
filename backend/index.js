// 
import express from 'express';
 // Import auth routes
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './src/routes/authRoutes.js';
import appointmentRoutes from'./src/routes/appointmentRoutes.js';
import patientRoutes from './src/routes/patientRoutes.js';
import cashierRoutes from './src/routes/cashierRoutes.js';
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', appointmentRoutes);
app.use('/api/cashiers', cashierRoutes); // Use cashier routes for cashier-related operations
app.use('/api/patients', patientRoutes)
app.use('/api/patients', authRoutes); 
app.use('/api/auth', authRoutes); // Use auth routes for authentication

app.use("/api/appointments", require("./routes/appointmentRoutes"));

// Middleware



// app.use("/api/register", registerRouter);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error("MongoDB connection error:", err));

// Example route
app.get("/", (req, res) => {
  res.send("API is running...");
});



// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
