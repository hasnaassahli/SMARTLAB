import express from 'express';
const router = express.Router();
const {
  getAllTechnicians,
  createTechnician,
  updateTechnician,
  deleteTechnician
} = require("../controllers/technicianController");

router.get("/", getAllTechnicians);
router.post("/", createTechnician);
router.put("/:id", updateTechnician);
router.delete("/:id", deleteTechnician);

export default router;
