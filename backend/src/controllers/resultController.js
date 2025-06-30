const Result = require("../models/Result");

exports.getAllResults = async (req, res) => {
  try {
    const results = await Result.find().populate("sample");
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createResult = async (req, res) => {
  try {
    const result = new Result(req.body);
    await result.save();
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateResult = async (req, res) => {
  try {
    const updated = await Result.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteResult = async (req, res) => {
  try {
    await Result.findByIdAndDelete(req.params.id);
    res.json({ message: "Result deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
