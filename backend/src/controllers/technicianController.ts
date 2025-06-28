// src/controllers/technicianController.ts
import { Request, Response, NextFunction } from "express";
import Technician from "../models/Technician";

export const createTechnician = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const newTechnician = new Technician(req.body);
    await newTechnician.save();
    res.status(201).json(newTechnician);
  } catch (error) {
    next(error);
  }
};

export const getTechnicians = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const technicians = await Technician.find();
    res.status(200).json(technicians);
  } catch (error) {
    next(error);
  }
};
