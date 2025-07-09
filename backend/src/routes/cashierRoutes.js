// backend/routes/cashierRoutes.js
import express from 'express';
import {
  getAllCashiers,
  createCashier,
  getCashierById,
  updateCashier,
  deleteCashier,
} from '../controllers/cashierController.js';

const router = express.Router();

router.get('/', getAllCashiers);
router.post('/', createCashier);
router.get('/:id', getCashierById);
router.put('/:id', updateCashier);
router.delete('/:id', deleteCashier);

export default router;
