import Appointment from '../models/Appointment.js';

// Créer un rendez-vous
export const createAppointment = async (req, res) => {
  try {
    const { patient, name, phone, date } = req.body;

    // Vérifier si date déjà prise
    const existing = await Appointment.findOne({ date });
    if (existing) {
      return res.status(400).json({ message: 'Date déjà réservée' });
    }

    const appointment = new Appointment({ patient, name, phone, date });
    await appointment.save();

    res.status(201).json(appointment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Lister tous les rendez-vous en attente (pour caissier)
export const getPendingAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ status: 'pending' });
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Valider un rendez-vous (caissier)
export const validateAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const appointment = await Appointment.findByIdAndUpdate(
      id,
      { status: 'validated' },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({ message: 'Rendez-vous non trouvé' });
    }

    res.json(appointment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
