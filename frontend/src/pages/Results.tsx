import React, { useEffect, useState } from "react";
import { getResults, addResult, deleteResult } from "../services/resultService";

interface Result {
  _id?: string;
  patientName: string;
  testType: string;
  date: string;
  status: string;
  value: string;
  urgent: boolean;
}

const Results: React.FC = () => {
  const [results, setResults] = useState<Result[]>([]);
  const [form, setForm] = useState<Result>({
    patientName: "",
    testType: "",
    date: "",
    status: "",
    value: "",
    urgent: false,
  });

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
  const response = await getResults(); // getResults utilise axios.get(...)
  setResults(response.data); // Utilise uniquement les données (tableau Result[])
};
  

 const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  const { name, value, type } = e.target;
  const isChecked = type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;

  setForm({
    ...form,
    [name]: type === "checkbox" ? isChecked : value,
  });
};


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addResult(form);
    setForm({
      patientName: "",
      testType: "",
      date: "",
      status: "",
      value: "",
      urgent: false,
    });
    fetchResults();
  };

  const handleDelete = async (id: string) => {
    await deleteResult(id);
    fetchResults();
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-primary">Résultats d'analyses</h2>

      <form onSubmit={handleSubmit} className="row g-3 bg-light p-4 rounded shadow-sm mb-4">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            name="patientName"
            placeholder="Nom du patient"
            value={form.patientName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            name="testType"
            placeholder="Type d'analyse"
            value={form.testType}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-4">
          <input
            type="date"
            className="form-control"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-4">
          <select
            className="form-select"
            name="status"
            value={form.status}
            onChange={handleChange}
            required
          >
            <option value="">Statut</option>
            <option value="en cours">En cours</option>
            <option value="terminé">Terminé</option>
          </select>
        </div>
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            name="value"
            placeholder="Valeur"
            value={form.value}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-12 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            name="urgent"
            checked={form.urgent}
            onChange={handleChange}
          />
          <label className="form-check-label ms-2">Urgent</label>
        </div>
        <div className="col-12 text-end">
          <button type="submit" className="btn btn-success">Ajouter Résultat</button>
        </div>
      </form>

      <table className="table table-bordered table-hover shadow-sm">
        <thead className="table-primary">
          <tr>
            <th>Patient</th>
            <th>Analyse</th>
            <th>Date</th>
            <th>Statut</th>
            <th>Valeur</th>
            <th>Urgent</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {results.map((r) => (
            <tr key={r._id}>
              <td>{r.patientName}</td>
              <td>{r.testType}</td>
              <td>{new Date(r.date).toLocaleDateString()}</td>
              <td>{r.status}</td>
              <td>{r.value}</td>
              <td>{r.urgent ? "Oui" : "Non"}</td>
              <td>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(r._id!)}>
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

export default Results;
