import express from 'express';
const router = express.Router();
const {
  getAllResults,
  createResult,
  updateResult,
  deleteResult
} = require("../controllers/resultController");

router.get("/", getAllResults);
router.post("/", createResult);
router.put("/:id", updateResult);
router.delete("/:id", deleteResult);

export default router;
