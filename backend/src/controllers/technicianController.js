import Technician from "../models/Technician.js";

// ✅ Obtenir tous les techniciens
export const getAllTechnicians = async (req, res) => {
  try {
    const technicians = await Technician.find();
    res.json(technicians);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Créer un technicien
export const createTechnician = async (req, res) => {
  try {
    const technician = new Technician(req.body);
    await technician.save();
    res.status(201).json(technician);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// ✅ Mettre à jour un technicien
export const updateTechnician = async (req, res) => {
  try {
    const updated = await Technician.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// ✅ Supprimer un technicien
export const deleteTechnician = async (req, res) => {
  try {
    await Technician.findByIdAndDelete(req.params.id);
    res.json({ message: "Technician deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
