import { Request, Response } from "express";
import Cashier from "../models/cashier";
import User from "../models/User";

export const createCashier = async (req: Request, res: Response) => {
  try {
    const { username, email, password, shift } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email déjà utilisé" });

    const user = new User({ username, email, password, role: "cashier" });
    await user.save();

    const cashier = new Cashier({
      user: user._id,
      shift,
    });
    await cashier.save();

    res.status(201).json({ message: "Caissier créé", cashier });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

export const getCashiers = async (req: Request, res: Response) => {
  try {
    const cashiers = await Cashier.find().populate("user", "username email");
    res.json(cashiers);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

export const updateCashier = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const updateData = req.body;

    const cashier = await Cashier.findByIdAndUpdate(id, updateData, { new: true });
    if (!cashier) return res.status(404).json({ message: "Caissier non trouvé" });

    res.json({ message: "Caissier mis à jour", cashier });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

export const deleteCashier = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const cashier = await Cashier.findByIdAndDelete(id);
    if (!cashier) return res.status(404).json({ message: "Caissier non trouvé" });

    await User.findByIdAndDelete(cashier.user);

    res.json({ message: "Caissier supprimé" });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};
