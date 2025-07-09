import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/smartlab')
  .then(() => console.log('Connecté à MongoDB'))
  .catch(err => console.error('Erreur MongoDB :', err));

// import des routes en ES module
import authRoutes from './routes/authRoutes.js';
import cashierRoutes from './routes/cashierRoutes.js';

app.use('/api/auth', authRoutes);
app.use('/api/cashiers', cashierRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));
