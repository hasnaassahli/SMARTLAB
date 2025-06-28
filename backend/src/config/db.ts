import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://hasnaassahli2:6QGLgC2o5gfYDN4A@cluster0.ljn1vxt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connecté");
  } catch (error) {
    console.error("Erreur connexion MongoDB :", error);
    process.exit(1);
  }
};
