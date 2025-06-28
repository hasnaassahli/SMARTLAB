import { Request, Response, NextFunction } from "express";

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  // Simuler authentification simple (remplace par vraie logique JWT, session, etc.)
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).json({ message: "Non authentifié" });
    return;
  }
  // Exemple : stocker info user dans req (pour roleMiddleware)
  req.user = { role: "doctor" }; // adapter selon ton système réel
  next();
};
