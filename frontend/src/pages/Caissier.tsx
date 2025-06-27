import { useState } from "react";
import axios from "axios";

interface Patient {
  _id: string;
  name: string;
  cin: string;
}

export default function Caissier() {
  const [cin, setCin] = useState("");
  const [patient, setPatient] = useState<Patient | null>(null);
  const [testName, setTestName] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  const searchPatient = async () => {
    try {
      const res = await axios.get(`/api/patients/cin/${cin}`);
      setPatient(res.data);
      setMessage("");
    } catch (err) {
      setPatient(null);
      setMessage("❌ Patient non trouvé.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!patient) return;
    try {
      await axios.post("/api/payments", {
        patientId: patient._id,
        testName,
        amount,
      });
      setMessage("✅ Paiement enregistré avec succès !");
      setTestName("");
      setAmount("");
    } catch (err) {
      setMessage("❌ Erreur lors de l'enregistrement du paiement.");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">📋 Enregistrement Paiement Patient</h2>

      {/* 🔍 Recherche par CIN */}
      <div className="mb-3 d-flex">
        <input
          type="text"
          className="form-control me-2"
          placeholder="Entrer le CIN du patient"
          value={cin}
          onChange={(e) => setCin(e.target.value)}
        />
        <button onClick={searchPatient} className="btn btn-primary">
          Rechercher
        </button>
      </div>

      {/* ✅ Résultat recherche */}
      {patient && (
        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title">👤 Patient trouvé :</h5>
            <p>Nom : <strong>{patient.name}</strong></p>
            <p>CIN : <strong>{patient.cin}</strong></p>
          </div>
        </div>
      )}

      {/* 🧾 Formulaire paiement */}
      {patient && (
        <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
          <h4 className="mb-3">💰 Paiement pour une analyse</h4>
          <div className="mb-3">
            <label className="form-label">Nom du test / formation médicale</label>
            <input
              type="text"
              className="form-control"
              value={testName}
              onChange={(e) => setTestName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Montant payé (en MAD)</label>
            <input
              type="number"
              className="form-control"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-success">
            Enregistrer Paiement
          </button>
        </form>
      )}

      {/* 📝 Message */}
      {message && (
        <div className={`alert mt-4 ${message.startsWith("✅") ? "alert-success" : "alert-danger"}`}>
          {message}
        </div>
      )}
    </div>
  );
}
