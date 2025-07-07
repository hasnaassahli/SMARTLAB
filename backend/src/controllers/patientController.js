import Patient from"../models/Patient";

exports.getAllPatients = async (req, res) => {
  const patients = await Patient.find();
  res.json(patients);
};

exports.createPatient = async (req, res) => {
  const patient = new Patient(req.body);
  await patient.save();
  res.status(201).json(patient);
};
