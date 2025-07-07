import React, { useEffect, useState } from "react";
import axios from "axios";

const Cashiers: React.FC = () => {
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const [resAppointments, resPatients] = await Promise.all([
        axios.get("http://localhost:5000/api/appointments"),
        axios.get("http://localhost:5000/api/patients"),
      ]);
      setAppointments(resAppointments.data);
      setPatients(resPatients.data);
    };
    fetchData();
  }, []);

  const handleValidate = async (id: string) => {
    try {
      await axios.put(`http://localhost:5000/api/appointments/${id}/status`, {
        status: "Confirmé",
      });
      setAppointments((prev) =>
        prev.map((a) =>
          a._id === id ? { ...a, status: "Confirmé" } : a
        )
      );
    } catch (err) {
      alert("Erreur lors de la validation.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>📅 Liste des Rendez-vous</h2>
      <table className="table table-bordered mb-5">
        <thead>
          <tr>
            <th>Nom</th><th>Téléphone</th><th>Date</th><th>Heure</th><th>Statut</th><th>Action</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((a, i) => (
            <tr key={i}>
              <td>{a.patientName}</td>
              <td>{a.phone}</td>
              <td>{a.date}</td>
              <td>{a.time}</td>
              <td>{a.status}</td>
              <td>
                {a.status === "En attente" && (
                  <button
                    className="btn btn-sm btn-success"
                    onClick={() => handleValidate(a._id)}
                  >
                    Valider
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>🧑‍⚕️ Patients Enregistrés</h2>
      <table className="table table-bordered">
        <thead>
          <tr><th>Nom</th><th>Email</th></tr>
        </thead>
        <tbody>
          {patients.map((p, i) => (
            <tr key={i}>
              <td>{p.name}</td>
              <td>{p.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Cashiers;
