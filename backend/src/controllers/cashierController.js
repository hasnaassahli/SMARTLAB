

// src/controllers/cashierController.js
const Appointment = require('../models/Appointment');
const Patient = require('../models/Patient');

const getPendingPayments = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    
    const appointments = await Appointment.find({
      paymentStatus: { $in: ['pending', 'partial'] },
      status: { $in: ['completed', 'in-progress'] }
    })
      .populate('patient', 'firstName lastName patientId')
      .populate('doctor', 'firstName lastName')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ appointmentDate: -1 });

    const total = await Appointment.countDocuments({
      paymentStatus: { $in: ['pending', 'partial'] },
      status: { $in: ['completed', 'in-progress'] }
    });

    res.json({
      appointments,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const processPayment = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const { paymentAmount, paymentMethod } = req.body;

    const appointment = await Appointment.findById(appointmentId);
    
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    // Update payment status based on amount
    let paymentStatus = 'paid';
    if (paymentAmount < appointment.fee) {
      paymentStatus = 'partial';
    }

    appointment.paymentStatus = paymentStatus;
    await appointment.save();

    res.json({
      message: 'Payment processed successfully',
      appointment
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getPaymentHistory = async (req, res) => {
  try {
    const { page = 1, limit = 10, startDate, endDate } = req.query;
    const query = { paymentStatus: 'paid' };

    if (startDate && endDate) {
      query.appointmentDate = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    const appointments = await Appointment.find(query)
      .populate('patient', 'firstName lastName patientId')
      .populate('doctor', 'firstName lastName')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ appointmentDate: -1 });

    const total = await Appointment.countDocuments(query);

    res.json({
      appointments,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getPendingPayments,
  processPayment,
  getPaymentHistory
};