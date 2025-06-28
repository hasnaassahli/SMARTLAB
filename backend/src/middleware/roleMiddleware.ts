import { Request, Response, NextFunction } from "express";

export const roleMiddleware = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    // req.user doit être défini par authMiddleware (avec un role)
    const user = req.user as { role?: string } | undefined;

    if (!user || !user.role || !allowedRoles.includes(user.role)) {
      res.status(403).json({ message: "Accès refusé" });
      return;
    }
    next();
  };
};
