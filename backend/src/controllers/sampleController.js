const Sample = require("../models/Sample");

exports.getAllSamples = async (req, res) => {
  try {
    const samples = await Sample.find().populate("patient");
    res.json(samples);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createSample = async (req, res) => {
  try {
    const sample = new Sample(req.body);
    await sample.save();
    res.status(201).json(sample);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateSample = async (req, res) => {
  try {
    const updated = await Sample.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteSample = async (req, res) => {
  try {
    await Sample.findByIdAndDelete(req.params.id);
    res.json({ message: "Sample deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
