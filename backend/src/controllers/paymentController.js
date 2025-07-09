// backend/controllers/paymentController.js
const Payment = require('../models/Payment');

// Créer un paiement (quand analyses assignées)
exports.createPayment = async (req, res) => {
  try {
    const { patient, analyses, cashier } = req.body;
    const payment = new Payment({ patient, analyses, cashier });
    await payment.save();
    res.status(201).json(payment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Lister paiements en attente
exports.getPendingPayments = async (req, res) => {
  try {
    const payments = await Payment.find({ status: 'pending' });
    res.json(payments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Confirmer paiement
exports.confirmPayment = async (req, res) => {
  try {
    const { id } = req.params;
    const payment = await Payment.findByIdAndUpdate(id, { status: 'confirmed' }, { new: true });
    if (!payment) return res.status(404).json({ message: 'Paiement non trouvé' });
    res.json(payment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
