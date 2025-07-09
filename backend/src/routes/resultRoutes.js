// backend/routes/resultRoutes.js
const express = require('express');
const router = express.Router();
const resultController = require('../controllers/resultController');
const authMiddleware = require('../middleware/authMiddleware');

// Ajouter un résultat (technicien)
router.post('/', authMiddleware.verifyToken, resultController.addResult);

// Récupérer les résultats du patient connecté
router.get('/', authMiddleware.verifyToken, resultController.getResultsByPatient);

module.exports = router;
