import express from "express";
import { createPatient, getPatients } from "../controllers/patientController";
import { authMiddleware } from "../middleware/authMiddleware";
import { roleMiddleware } from "../middleware/roleMiddleware";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  roleMiddleware(["cashier", "doctor"]),
  createPatient
);

router.get(
  "/",
  authMiddleware,
  roleMiddleware(["cashier", "doctor", "technician"]),
  getPatients
);

export default router;
