import express from 'express';
import {
  createSample,
  getAllSamples,
  getSampleById,
  updateSample,
  deleteSample,
} from '../controllers/sampleController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

router.use(authMiddleware);

router.post('/', createSample);
router.get('/', getAllSamples);
router.get('/:id', getSampleById);
router.put('/:id', updateSample);
router.delete('/:id', deleteSample);

export default router;
