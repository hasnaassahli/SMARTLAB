import express from 'express';
const router = express.Router();
const {
  getAllCashiers,
  createCashier,
  getCashierById,
  updateCashier,
  deleteCashier
} = require("../controllers/cashierController");

router.get("/", getAllCashiers);
router.post("/", createCashier);
router.get("/:id", getCashierById);
router.put("/:id", updateCashier);
router.delete("/:id", deleteCashier);

export default router;
