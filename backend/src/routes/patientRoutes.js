const express = require("express");
const Patient = require("../models/Patient");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

// Toutes les routes protégées : seulement admin par exemple
router.use(authMiddleware);
router.use(roleMiddleware(["admin"]));

// GET all patients
router.get("/", async (req, res) => {
  try {
    const patients = await Patient.find();
    res.json(patients);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// POST create patient
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, birthDate } = req.body;
    const patient = new Patient({ name, email, phone, birthDate });
    await patient.save();
    res.status(201).json(patient);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// PUT update patient
router.put("/:id", async (req, res) => {
  try {
    const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!patient) return res.status(404).json({ message: "Patient non trouvé" });
    res.json(patient);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// DELETE patient
router.delete("/:id", async (req, res) => {
  try {
    const patient = await Patient.findByIdAndDelete(req.params.id);
    if (!patient) return res.status(404).json({ message: "Patient non trouvé" });
    res.json({ message: "Patient supprimé" });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

module.exports = router;
