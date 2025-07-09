// backend/controllers/resultController.js
const Result = require('../models/Result');

// Ajouter un résultat d’analyse
exports.addResult = async (req, res) => {
  try {
    const { patient, analysis, value, technician } = req.body;
    const result = new Result({ patient, analysis, value, technician });
    await result.save();
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Récupérer résultats d’un patient (patient connecté)
exports.getResultsByPatient = async (req, res) => {
  try {
    const patientId = req.user.id;
    const results = await Result.find({ patient: patientId });
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
