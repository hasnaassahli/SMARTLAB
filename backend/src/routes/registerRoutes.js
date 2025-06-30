// Exemple minimal Express
const express = require("express");
const router = express.Router();
const User = require("../models/User"); // ton modèle utilisateur
const bcrypt = require("bcryptjs");

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // Vérifie si l'utilisateur existe déjà
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "Email déjà utilisé" });

    // Hash du mot de passe
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Création user
    user = new User({ name, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: "Utilisateur créé" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

module.exports = router;
