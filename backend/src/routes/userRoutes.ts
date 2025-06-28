import express from "express";
import { loginUser, registerUser, getUsers } from "../controllers/userController";
import { authMiddleware } from "../middleware/authMiddleware";
import { roleMiddleware } from "../middleware/roleMiddleware";

const router = express.Router();

// Route pour l'inscription
router.post("/register", registerUser);

// Route pour la connexion
router.post("/login", loginUser);

// Route pour récupérer la liste des utilisateurs (protégée)
router.get("/", authMiddleware, roleMiddleware(["doctor"]), getUsers);

export default router;
