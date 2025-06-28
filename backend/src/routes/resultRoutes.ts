import express from "express";
import {
  createResult,
  getResults,
} from "../controllers/resultController";
import { authMiddleware } from "../middleware/authMiddleware";
import { roleMiddleware } from "../middleware/roleMiddleware";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  roleMiddleware(["technician"]),
  createResult
);

router.get(
  "/",
  authMiddleware,
  roleMiddleware(["cashier", "doctor", "technician"]),
  getResults
);

export default router;
