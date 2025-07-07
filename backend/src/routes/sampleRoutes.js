import express from 'express';
const router = express.Router();
const {
  getAllSamples,
  createSample,
  updateSample,
  deleteSample
} = require("../controllers/sampleController");

router.get("/", getAllSamples);
router.post("/", createSample);
router.put("/:id", updateSample);
router.delete("/:id", deleteSample);

export default router;
