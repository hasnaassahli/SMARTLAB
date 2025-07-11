// src/controllers/technicianController.js
const Result = require('../models/Result');
const Appointment = require('../models/Appointment');

const createResult = async (req, res) => {
  try {
    const result = new Result({
      ...req.body,
      technician: req.user.id
    });
    
    await result.save();

    const populatedResult = await Result.findById(result._id)
      .populate('patient', 'firstName lastName patientId')
      .populate('technician', 'firstName lastName');

    res.status(201).json({
      message: 'Test result created successfully',
      result: populatedResult
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getResults = async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    const query = {};

    if (status) query.status = status;

    const results = await Result.find(query)
      .populate('patient', 'firstName lastName patientId')
      .populate('technician', 'firstName lastName')
      .populate('verifiedBy', 'firstName lastName')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await Result.countDocuments(query);

    res.json({
      results,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const updateResult = async (req, res) => {
  try {
    const result = await Result.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('patient', 'firstName lastName patientId')
     .populate('technician', 'firstName lastName');

    if (!result) {
      return res.status(404).json({ message: 'Result not found' });
    }

    res.json({
      message: 'Result updated successfully',
      result
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const verifyResult = async (req, res) => {
  try {
    const result = await Result.findByIdAndUpdate(
      req.params.id,
      {
        status: 'verified',
        verifiedBy: req.user.id,
        verifiedAt: new Date()
      },
      { new: true }
    ).populate('patient', 'firstName lastName patientId')
     .populate('technician', 'firstName lastName')
     .populate('verifiedBy', 'firstName lastName');

    if (!result) {
      return res.status(404).json({ message: 'Result not found' });
    }

    res.json({
      message: 'Result verified successfully',
      result
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  createResult,
  getResults,
  updateResult,
  verifyResult
};