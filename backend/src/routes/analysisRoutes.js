// backend/routes/analysisRoutes.js
const express = require('express');
const router = express.Router();
const analysisController = require('../controllers/analysisController');
const authMiddleware = require('../middleware/authMiddleware');

// Assigner des analyses (caissier)
router.post('/assign', authMiddleware.verifyToken, analysisController.assignAnalyses);

// Optionnel: analyses par patient
router.get('/patient/:patientId', authMiddleware.verifyToken, analysisController.getAnalysesByPatient);

module.exports = router;
