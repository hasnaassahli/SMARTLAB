import express, { Request, Response, NextFunction } from 'express';
import Cashier from '../models/cashier'; // Vérifie que le fichier s'appelle bien 'Cashier.ts' avec la même casse

const router = express.Router();

// GET /cashiers - lister tous les caissiers
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cashiers = await Cashier.find();
    res.status(200).json(cashiers);
  } catch (error) {
    next(error);
  }
});

// POST /cashiers - créer un caissier
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newCashier = new Cashier(req.body);
    const savedCashier = await newCashier.save();
    res.status(201).json(savedCashier);
  } catch (error) {
    next(error);
  }
});

// GET /cashiers/:id - obtenir un caissier par id
router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cashier = await Cashier.findById(req.params.id);
    if (!cashier) {
      res.status(404).json({ message: 'Caissier non trouvé' });
      return;
    }
    res.status(200).json(cashier);
  } catch (error) {
    next(error);
  }
});

// PUT /cashiers/:id - mettre à jour un caissier
router.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updatedCashier = await Cashier.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedCashier) {
      res.status(404).json({ message: 'Caissier non trouvé' });
      return;
    }
    res.status(200).json(updatedCashier);
  } catch (error) {
    next(error);
  }
});

// DELETE /cashiers/:id - supprimer un caissier
router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deletedCashier = await Cashier.findByIdAndDelete(req.params.id);
    if (!deletedCashier) {
      res.status(404).json({ message: 'Caissier non trouvé' });
      return;
    }
    res.status(200).json({ message: 'Caissier supprimé' });
  } catch (error) {
    next(error);
  }
});

export default router;
