import express from 'express';
const router = express.Router();
const {
  getAllPatients,
  createPatient
} = require("../controllers/patientController");

router.get("/", getAllPatients);
router.post("/", createPatient);

export default router;
