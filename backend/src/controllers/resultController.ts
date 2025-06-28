import { Request, Response } from "express";
import Result from "../models/Result";

export const createResult = async (req: Request, res: Response) => {
  try {
    const { patient, technician, description, status, resultData } = req.body;

    const result = new Result({
      patient,
      technician,
      description,
      status,
      resultData,
      analysisDate: new Date(),
    });
    await result.save();

    res.status(201).json({ message: "Résultat créé", result });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

export const getResults = async (req: Request, res: Response) => {
  try {
    const results = await Result.find()
      .populate("patient", "user")
      .populate("technician", "user")
      .sort({ analysisDate: -1 });

    res.json(results);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

export const getResultById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const result = await Result.findById(id)
      .populate("patient", "user")
      .populate("technician", "user");

    if (!result) return res.status(404).json({ message: "Résultat non trouvé" });

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

export const updateResult = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const updateData = req.body;

    const result = await Result.findByIdAndUpdate(id, updateData, { new: true });
    if (!result) return res.status(404).json({ message: "Résultat non trouvé" });

    res.json({ message: "Résultat mis à jour", result });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

export const deleteResult = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const result = await Result.findByIdAndDelete(id);
    if (!result) return res.status(404).json({ message: "Résultat non trouvé" });

    res.json({ message: "Résultat supprimé" });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};
