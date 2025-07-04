const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./src/routes/authRoutes");
const { PORT, MONGO_URI } = require("./src/config.js");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log("Connecté à MongoDB");
    app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));
  })
  .catch((err) => {
    console.error("Erreur connexion MongoDB:", err);
  });
