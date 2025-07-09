import Cashier from "../models/cashier.js";

// Obtenir tous les caissiers
export const getAllCashiers = async (req, res) => {
  try {
    const cashiers = await Cashier.find();
    res.json(cashiers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Créer un nouveau caissier
export const createCashier = async (req, res) => {
  try {
    const newCashier = new Cashier(req.body);
    await newCashier.save();
    res.status(201).json(newCashier);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Obtenir un caissier par ID
export const getCashierById = async (req, res) => {
  try {
    const cashier = await Cashier.findById(req.params.id);
    if (!cashier) return res.status(404).json({ message: "Caissier non trouvé" });
    res.json(cashier);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Mettre à jour un caissier
export const updateCashier = async (req, res) => {
  try {
    const updatedCashier = await Cashier.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedCashier);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Supprimer un caissier
export const deleteCashier = async (req, res) => {
  try {
    await Cashier.findByIdAndDelete(req.params.id);
    res.json({ message: "Caissier supprimé" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
