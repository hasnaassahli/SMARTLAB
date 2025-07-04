import React, { useEffect, useState } from "react";
import axios from "axios";

interface Stats {
  patientCount: number;
  appointmentCount: number;
  urgentResultsCount: number;
  analysesPerDay: Record<string, number>;
}

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Utilisateur non authentifié");
          setLoading(false);
          return;
        }
        const res = await axios.get("/api/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStats(res.data);
      } catch (e) {
        setError("Erreur lors du chargement des statistiques");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading)
    return (
      <div className="container mt-4 text-center">
        <div className="spinner-border text-primary" role="status" />
        <p>Chargement...</p>
      </div>
    );

  if (error)
    return (
      <div className="container mt-4">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </div>
    );

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Tableau de Bord</h2>
      {stats ? (
        <>
          <div className="row mb-4">
            <div className="col-md-3">
              <div className="card text-white bg-primary mb-3">
                <div className="card-body">
                  <h5 className="card-title">Patients</h5>
                  <p className="card-text fs-4">{stats.patientCount}</p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card text-white bg-success mb-3">
                <div className="card-body">
                  <h5 className="card-title">Rendez-vous</h5>
                  <p className="card-text fs-4">{stats.appointmentCount}</p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card text-white bg-danger mb-3">
                <div className="card-body">
                  <h5 className="card-title">Résultats urgents</h5>
                  <p className="card-text fs-4">{stats.urgentResultsCount}</p>
                </div>
              </div>
            </div>
          </div>

          <h5>Analyses par jour :</h5>
          <ul className="list-group">
            {Object.entries(stats.analysesPerDay).map(([date, count]) => (
              <li key={date} className="list-group-item d-flex justify-content-between align-items-center">
                {date}
                <span className="badge bg-primary rounded-pill">{count}</span>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>Aucune statistique disponible.</p>
      )}
    </div>
  );
};

export default Dashboard;
