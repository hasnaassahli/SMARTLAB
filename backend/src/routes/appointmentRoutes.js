// backend/routes/appointmentRoutes.js
const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');
const authMiddleware = require('../middleware/authMiddleware');

// Créer un rendez-vous (patient)
router.post('/', authMiddleware.verifyToken, appointmentController.createAppointment);

// Lister les rendez-vous en attente (caissier)
router.get('/pending', authMiddleware.verifyToken, appointmentController.getPendingAppointments);

// Valider un rendez-vous (caissier)
router.put('/:id/validate', authMiddleware.verifyToken, appointmentController.validateAppointment);

module.exports = router;
