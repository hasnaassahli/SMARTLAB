// backend/routes/paymentRoutes.js
const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const authMiddleware = require('../middleware/authMiddleware');

// Créer un paiement (quand analyses assignées)
router.post('/', authMiddleware.verifyToken, paymentController.createPayment);

// Lister paiements en attente (caissier)
router.get('/pending', authMiddleware.verifyToken, paymentController.getPendingPayments);

// Confirmer paiement
router.put('/:id/confirm', authMiddleware.verifyToken, paymentController.confirmPayment);

module.exports = router;
