import Cashier from"../models/cashier";

// Get all cashiers
exports.getAllCashiers = async (req, res) => {
  try {
    const cashiers = await Cashier.find();
    res.json(cashiers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create new cashier
exports.createCashier = async (req, res) => {
  try {
    const newCashier = new Cashier(req.body);
    await newCashier.save();
    res.status(201).json(newCashier);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get one cashier by ID
exports.getCashierById = async (req, res) => {
  try {
    const cashier = await Cashier.findById(req.params.id);
    if (!cashier) return res.status(404).json({ message: "Cashier not found" });
    res.json(cashier);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update cashier
exports.updateCashier = async (req, res) => {
  try {
    const updatedCashier = await Cashier.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedCashier);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete cashier
exports.deleteCashier = async (req, res) => {
  try {
    await Cashier.findByIdAndDelete(req.params.id);
    res.json({ message: "Cashier deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
