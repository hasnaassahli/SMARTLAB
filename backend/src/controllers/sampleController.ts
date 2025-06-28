import { Request, Response } from 'express';
import Sample from '../models/Sample';

export const createSample = async (req: Request, res: Response) => {
  const { patientId, type, status, result, urgent } = req.body;
  const newSample = await Sample.create({ patientId, type, status, result, urgent });
  res.status(201).json(newSample);
};

export const getAllSamples = async (req: Request, res: Response) => {
  const samples = await Sample.find().populate('patientId');
  res.json(samples);
};

export const getSampleById = async (req: Request, res: Response) => {
  const sample = await Sample.findById(req.params.id).populate('patientId');
  if (!sample) return res.status(404).json({ message: 'Échantillon non trouvé' });
  res.json(sample);
};

export const updateSample = async (req: Request, res: Response) => {
  const updated = await Sample.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

export const deleteSample = async (req: Request, res: Response) => {
  await Sample.findByIdAndDelete(req.params.id);
  res.status(204).end();
};

