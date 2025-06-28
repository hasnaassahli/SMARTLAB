import express from "express";
import { createTechnician, getTechnicians } from "../controllers/technicianController";
import { authMiddleware } from "../middleware/authMiddleware";
import { roleMiddleware } from "../middleware/roleMiddleware";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  roleMiddleware(["doctor"]),
  (req, res, next) => {
    createTechnician(req, res, next).catch(next);
  }
);

router.get(
  "/",
  authMiddleware,
  roleMiddleware(["doctor"]),
  (req, res, next) => {
    getTechnicians(req, res, next).catch(next);
  }
);

export default router;
