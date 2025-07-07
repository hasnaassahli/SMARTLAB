import Appointment from "../models/Appointment";

exports.createAppointment = async (req, res) => {
  try {
    const { patientName, email, date, typeAnalyse } = req.body;
    const newAppointment = new Appointment({ patientName, email, date, typeAnalyse });
    await newAppointment.save();
    res.status(201).json(newAppointment);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

exports.getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des rendez-vous" });
  }
};
