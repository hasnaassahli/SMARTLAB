import { useEffect, useState } from "react";
import axios from "axios";

interface Result {
  _id: string;
  patientName: string;
  testType: string;
  result: string;
  date: string;
  urgent: boolean;
}

export default function Results() {
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/results", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => setResults(res.data))
      .catch((err) => console.error("Erreur chargement des résultats", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center mt-5">Chargement des résultats...</div>;

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-primary">📊 Liste des Résultats</h2>
      {results.length === 0 ? (
        <div className="alert alert-warning">Aucun résultat trouvé.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="table-light">
              <tr>
                <th>Nom du patient</th>
                <th>Type d'analyse</th>
                <th>Résultat</th>
                <th>Date</th>
                <th>Urgent</th>
              </tr>
            </thead>
            <tbody>
              {results.map((r) => (
                <tr key={r._id}>
                  <td>{r.patientName}</td>
                  <td>{r.testType}</td>
                  <td>{r.result}</td>
                  <td>{new Date(r.date).toLocaleDateString()}</td>
                  <td>{r.urgent ? <span className="text-danger fw-bold">Oui</span> : "Non"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
