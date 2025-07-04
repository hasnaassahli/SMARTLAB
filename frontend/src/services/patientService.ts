import axios from "axios";
import { getAuthHeader } from "./authHeader";

export interface Patient {
  _id: string;
  name: string;
  email: string;
}

// Juste les fonctions d’API dont tu as besoin (ajoute addPatient si tu souhaites)
export const getPatients = async (): Promise<Patient[]> => {
  const res = await axios.get("/api/patients", getAuthHeader());
  return res.data; // Ici on retourne uniquement res.data (pas tout l’objet response)
};

export const deletePatient = async (id: string) => {
  const res = await axios.delete(`/api/patients/${id}`, getAuthHeader());
  return res.data;
};

// Si tu veux créer un patient (optionnel)
export const addPatient = async (patient: Omit<Patient, "_id">) => {
  const res = await axios.post("/api/patients", patient, getAuthHeader());
  return res.data;
};
