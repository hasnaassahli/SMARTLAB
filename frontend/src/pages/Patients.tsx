import React, { useEffect, useState } from "react";
import { getPatients, deletePatient } from "../services/patientService";
import type { Patient } from "../services/patientService";

const Patients: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    const data = await getPatients();
    setPatients(data); // data est déjà un tableau Patient[]
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Supprimer ce patient ?")) {
      await deletePatient(id);
      fetchPatients();
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-primary">Liste des patients</h2>
      <table className="table table-bordered table-hover">
        <thead className="table-light">
          <tr>
            <th>Nom</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <tr key={patient._id}>
              <td>{patient.name}</td>
              <td>{patient.email}</td>
              <td>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(patient._id)}
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Patients;
