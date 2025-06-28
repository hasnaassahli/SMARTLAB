// src/routes/authRoutes.ts
import { Router, Request, Response, NextFunction } from 'express';

const router = Router();

// Exemple route POST /login
router.post('/login', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Supposons une fonction fictive findUserByEmail
    const user = await findUserByEmail(email);

    if (!user) {
      res.status(404).json({ message: 'Utilisateur non trouvé' });
      return; // Important : on ne retourne pas res, on quitte simplement la fonction
    }

    // Supposons une fonction fictive verifyPassword
    const isPasswordValid = await verifyPassword(password, user.passwordHash);

    if (!isPasswordValid) {
      res.status(401).json({ message: 'Mot de passe incorrect' });
      return;
    }

    // Génération d’un token fictif
    const token = generateToken(user);

    res.status(200).json({ token });
    return; // Optionnel ici, mais bien clair
  } catch (error) {
    next(error); // Passe l’erreur au middleware d’erreur Express
  }
});

// Fonction fictive d'exemple
async function findUserByEmail(email: string) {
  // Ici tu appelleras ta base de données
  // Simulé pour exemple :
  if (email === "test@example.com") {
    return { id: "123", email, passwordHash: "hashedpassword" };
  }
  return null;
}

// Fonction fictive d'exemple
async function verifyPassword(password: string, passwordHash: string) {
  // Simulé : renvoie true si password === "123456"
  return password === "123456";
}

// Fonction fictive d'exemple
function generateToken(user: { id: string; email: string }) {
  return "fake-jwt-token";
}

export default router;
