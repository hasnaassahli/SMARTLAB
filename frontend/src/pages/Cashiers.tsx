import { useEffect, useState } from "react";
import api from "../services/api";

interface Patient {
  _id: string;
  name: string;
  cin: string;
}

interface Analysis {
  _id: string;
  name: string;
  price: number;
}

export default function Cashier() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [analyses, setAnalyses] = useState<Analysis[]>([]);
  const [selectedPatientId, setSelectedPatientId] = useState("");
  const [selectedAnalyses, setSelectedAnalyses] = useState<string[]>([]);

  useEffect(() => {
    api.get("/patients").then((res) => setPatients(res.data));
    api.get("/analyses").then((res) => setAnalyses(res.data));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPatientId || selectedAnalyses.length === 0) {
      alert("Veuillez sélectionner un patient et au moins une analyse.");
      return;
    }

    await api.post("/cashiers", {
      patientId: selectedPatientId,
      analyses: selectedAnalyses,
    });

    setSelectedPatientId("");
    setSelectedAnalyses([]);
    alert("Analyse enregistrée avec succès !");
  };

  const toggleAnalysis = (id: string) => {
    setSelectedAnalyses((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-primary">💵 Enregistrement par le Caissier</h2>

      <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
        {/* Sélection du patient */}
        <div className="mb-3">
          <label className="form-label">Patient</label>
          <select
            className="form-select"
            value={selectedPatientId}
            onChange={(e) => setSelectedPatientId(e.target.value)}
          >
            <option value="">-- Sélectionner un patient --</option>
            {patients.map((p) => (
              <option key={p._id} value={p._id}>
                {p.name} ({p.cin})
              </option>
            ))}
          </select>
        </div>

        {/* Sélection des analyses */}
        <div className="mb-3">
          <label className="form-label">Analyses demandées</label>
          <div className="row">
            {analyses.map((a) => (
              <div className="col-md-4" key={a._id}>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id={a._id}
                    checked={selectedAnalyses.includes(a._id)}
                    onChange={() => toggleAnalysis(a._id)}
                  />
                  <label className="form-check-label" htmlFor={a._id}>
                    {a.name} ({a.price} MAD)
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bouton soumettre */}
        <button type="submit" className="btn btn-success">
          ✅ Enregistrer la demande
        </button>
      </form>
    </div>
  );
}
