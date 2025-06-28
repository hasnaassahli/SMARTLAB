import { Request, Response, NextFunction } from "express";

// Exemple simple, adapte la logique métier et accès base de données

export const createPatient = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Simuler création patient (remplace par logique réelle)
    const newPatient = req.body; // à valider / sauvegarder en DB
    res.status(201).json({ message: "Patient créé avec succès", patient: newPatient });
  } catch (error) {
    next(error);
  }
};

export const getPatients = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Simuler récupération patients (remplace par DB)
    const patients = [{ id: 1, name: "Jean Dupont" }];
    res.status(200).json(patients);
  } catch (error) {
    next(error);
  }
};
