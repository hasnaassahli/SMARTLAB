import Analysis from '../models/Analysis.js';

// Assigner des analyses à un patient (caissier)
export const assignAnalyses = async (req, res) => {
  try {
    const { patient, analysesList, cashier } = req.body;

    const analysis = new Analysis({ patient, analysesList, cashier });
    await analysis.save();

    res.status(201).json(analysis);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Lister analyses assignées (optionnel)
export const getAnalysesByPatient = async (req, res) => {
  try {
    const { patientId } = req.params;
    const analyses = await Analysis.find({ patient: patientId });
    res.json(analyses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
