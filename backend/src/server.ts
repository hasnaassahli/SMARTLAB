import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes";
import patientRoutes from "./routes/patientRoutes";
import technicianRoutes from "./routes/technicianRoutes";
import resultRoutes from "./routes/resultRoutes";
import cashierRoutes from "./routes/cashierRoutes";



dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connexion à MongoDB
mongoose
  .connect(process.env.MONGO_URI ||"mongodb+srv://hasnaassahli2:6QGLgC2o5gfYDN4A@cluster0.ljn1vxt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => console.log("✅ Connecté à MongoDB"))
  .catch((err) => console.error("❌ Erreur MongoDB:", err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/technicians", technicianRoutes);
app.use("/api/results", resultRoutes);

app.use("/api/cashiers", cashierRoutes);
// Route par défaut
app.get("/", (_, res) => {
  res.send("Bienvenue sur l'API SmartLAB !");
});

// Démarrage du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
});
