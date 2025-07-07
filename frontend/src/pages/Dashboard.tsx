import { useEffect, useState } from "react";
import api from "../services/api";

export default function Dashboard() {
  const [patientCount, setPatientCount] = useState<number>(0);
  const [sampleCount, setSampleCount] = useState<number>(0);
  const [technicianCount, setTechnicianCount] = useState<number>(0);
  const [resultCount, setResultCount] = useState<number>(0);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    async function fetchCounts() {
      try {
        const [patientsRes, samplesRes, techniciansRes, resultsRes] = await Promise.all([
          api.get("/patients"),
          api.get("/samples"),
          api.get("/technicians"),
          api.get("/results"),
        ]);
        setPatientCount(patientsRes.data.length);
        setSampleCount(samplesRes.data.length);
        setTechnicianCount(techniciansRes.data.length);
        setResultCount(resultsRes.data.length);
      } catch (err) {
        console.error("Erreur lors du chargement des données :", err);
        setError("Impossible de charger les données du tableau de bord.");
      }
    }
    fetchCounts();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center text-primary">Tableau de Bord</h2>
      {error && <div className="alert alert-danger text-center">{error}</div>}

      <div className="row g-4">
        <div className="col-md-3">
          <div className="card text-white bg-primary shadow">
            <div className="card-body text-center">
              <h5 className="card-title">Patients</h5>
              <p className="display-6">{patientCount}</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-white bg-success shadow">
            <div className="card-body text-center">
              <h5 className="card-title">Échantillons</h5>
              <p className="display-6">{sampleCount}</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-white bg-warning shadow">
            <div className="card-body text-center">
              <h5 className="card-title">Techniciens</h5>
              <p className="display-6">{technicianCount}</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-white bg-danger shadow">
            <div className="card-body text-center">
              <h5 className="card-title">Résultats</h5>
              <p className="display-6">{resultCount}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
