import { Request, Response, NextFunction } from "express";

export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
  // logique inscription
};

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  // logique connexion
};

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  // logique récupération utilisateurs
};
