import React, { useEffect, useState } from "react";
import { getResults, addResult, updateResult, deleteResult } from "../services/resultService"; // Adjust the import path as needed

const Results: React.FC = () => {
  const [results, setResults] = useState<any[]>([]);
  const [form, setForm] = useState({ sampleCode: "", value: "" });
  const [editId, setEditId] = useState<string | null>(null);

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    const data = await getResults();
    setResults(data);
  };

  const handleSubmit = async () => {
    if (editId) {
      await updateResult(editId, form);
      setEditId(null);
    } else {
      await addResult(form);
    }
    setForm({ sampleCode: "", value: "" });
    fetchResults();
  };

  const handleEdit = (result: any) => {
    setForm({ sampleCode: result.sampleCode, value: result.value });
    setEditId(result._id);
  };

  const handleDelete = async (id: string) => {
    await deleteResult(id);
    fetchResults();
  };

  return (
    <div className="container" style={{ marginLeft: 240 }}>
      <h2 className="mt-4">Gestion des Résultats</h2>

      <input
        className="form-control mb-2"
        placeholder="Code échantillon"
        value={form.sampleCode}
        onChange={(e) => setForm({ ...form, sampleCode: e.target.value })}
      />
      <input
        className="form-control mb-2"
        placeholder="Valeur"
        value={form.value}
        onChange={(e) => setForm({ ...form, value: e.target.value })}
      />
      <button className="btn btn-primary mb-3" onClick={handleSubmit}>
        {editId ? "Modifier" : "Ajouter"}
      </button>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Code échantillon</th>
            <th>Valeur</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {results.map((r) => (
            <tr key={r._id}>
              <td>{r.sampleCode}</td>
              <td>{r.value}</td>
              <td>
                <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(r)}>
                  Modifier
                </button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(r._id)}>
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
