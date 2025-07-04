import { useEffect, useState } from "react";
import axios from "axios";

interface Sample {
  _id: string;
  type: string;
  status: string;
  result: string;
  urgent: boolean;
}

export default function Echantillons() {
  const [samples, setSamples] = useState<Sample[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchSamples = () => {
    setLoading(true);
    setError("");
    axios
      .get("/api/samples", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => setSamples(res.data))
      .catch((err) => {
        console.error("Erreur de chargement:", err);
        setError("❌ Impossible de charger les échantillons.");
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchSamples();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">📋 Liste des Échantillons</h2>

      {loading && <div className="alert alert-info">Chargement...</div>}

      {error && (
        <div className="alert alert-danger">
          {error}{" "}
          <button className="btn btn-sm btn-outline-light ms-2" onClick={fetchSamples}>
            Réessayer
          </button>
        </div>
      )}

      {!loading && samples.length === 0 && !error && (
        <div className="alert alert-warning">Aucun échantillon trouvé.</div>
      )}

      {!loading && samples.length > 0 && (
        <div className="table-responsive">
          <table className="table table-bordered table-hover shadow-sm">
            <thead className="table-light">
              <tr>
                <th>Type</th>
                <th>Statut</th>
                <th>Résultat</th>
                <th>Urgent</th>
              </tr>
            </thead>
            <tbody>
              {samples.map((sample) => (
                <tr key={sample._id}>
                  <td>{sample.type}</td>
                  <td>
                    <span
                      className={`badge ${
                        sample.status === "en attente"
                          ? "bg-warning text-dark"
                          : sample.status === "terminé"
                          ? "bg-success"
                          : "bg-secondary"
                      }`}
                    >
                      {sample.status}
                    </span>
                  </td>
                  <td>{sample.result || "N/A"}</td>
                  <td>
                    {sample.urgent ? (
                      <span className="badge bg-danger">Oui</span>
                    ) : (
                      <span className="badge bg-secondary">Non</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
