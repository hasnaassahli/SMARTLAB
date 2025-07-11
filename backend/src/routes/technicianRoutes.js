// src/routes/technicianRoutes.js
const express = require('express');
const { body } = require('express-validator');
const { authMiddleware, requireRole } = require('../middleware/authMiddleware');
const {
  createResult,
  getResults,
  updateResult,
  verifyResult
} = require('../controllers/technicianController');

const router = express.Router();

// Validation rules
const resultValidation = [
  body('patient').notEmpty().withMessage('Patient ID is required'),
  body('testType').notEmpty().withMessage('Test type is required'),
  body('testName').notEmpty().withMessage('Test name is required'),
  body('results').isArray().withMessage('Results must be an array'),
  body('results.*.parameter').notEmpty().withMessage('Parameter name is required'),
  body('results.*.value').notEmpty().withMessage('Parameter value is required')
];

// Apply middleware to all routes
router.use(authMiddleware);

router.post('/results', requireRole('admin', 'technician'), resultValidation, createResult);
router.get('/results', getResults);
router.put('/results/:id', requireRole('admin', 'technician'), updateResult);
router.patch('/results/:id/verify', requireRole('admin', 'doctor'), verifyResult);

module.exports = router;