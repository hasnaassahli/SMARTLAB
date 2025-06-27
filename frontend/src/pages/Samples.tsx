import { useEffect, useState } from "react";
import axios from "axios";

interface Sample {
  _id: string;
  patientName: string;
  type: string;
  status: string;
  dateCollected: string;
  urgent: boolean;
}

export default function Samples() {
  const [samples, setSamples] = useState<Sample[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/samples", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => setSamples(res.data))
      .catch((err) => console.error("Erreur chargement des échantillons", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center mt-5">Chargement des échantillons...</div>;

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-primary">🧪 Liste des Échantillons</h2>

      {samples.length === 0 ? (
        <div className="alert alert-warning">Aucun échantillon trouvé.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="table-light">
              <tr>
                <th>Nom du patient</th>
                <th>Type</th>
                <th>Statut</th>
                <th>Date de prélèvement</th>
                <th>Urgent</th>
              </tr>
            </thead>
            <tbody>
              {samples.map((sample) => (
                <tr key={sample._id}>
                  <td>{sample.patientName}</td>
                  <td>{sample.type}</td>
                  <td>
                    <span
                      className={`badge ${
                        sample.status === "En cours"
                          ? "bg-warning text-dark"
                          : sample.status === "Terminé"
                          ? "bg-success"
                          : "bg-secondary"
                      }`}
                    >
                      {sample.status}
                    </span>
                  </td>
                  <td>{new Date(sample.dateCollected).toLocaleDateString()}</td>
                  <td>{sample.urgent ? <span className="text-danger fw-bold">Oui</span> : "Non"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
