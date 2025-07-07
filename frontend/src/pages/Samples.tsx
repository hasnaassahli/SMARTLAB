import React, { useEffect, useState } from "react";
import { getSamples, addSample, updateSample, deleteSample } from "../services/sampleService"; // Adjust the import path as needed

const Samples: React.FC = () => {
  const [samples, setSamples] = useState<any[]>([]);
  const [form, setForm] = useState({ code: "", description: "" });
  const [editId, setEditId] = useState<string | null>(null);

  useEffect(() => {
    fetchSamples();
  }, []);

  const fetchSamples = async () => {
    const data = await getSamples();
    setSamples(data);
  };

  const handleSubmit = async () => {
    if (editId) {
      await updateSample(editId, form);
      setEditId(null);
    } else {
      await addSample(form);
    }
    setForm({ code: "", description: "" });
    fetchSamples();
  };

  const handleEdit = (sample: any) => {
    setForm({ code: sample.code, description: sample.description });
    setEditId(sample._id);
  };

  const handleDelete = async (id: string) => {
    await deleteSample(id);
    fetchSamples();
  };

  return (
    <div className="container" style={{ marginLeft: 240 }}>
      <h2 className="mt-4">Gestion des Échantillons</h2>

      <input
        className="form-control mb-2"
        placeholder="Code échantillon"
        value={form.code}
        onChange={(e) => setForm({ ...form, code: e.target.value })}
      />
      <input
        className="form-control mb-2"
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />
      <button className="btn btn-primary mb-3" onClick={handleSubmit}>
        {editId ? "Modifier" : "Ajouter"}
      </button>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Code</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {samples.map((s) => (
            <tr key={s._id}>
              <td>{s.code}</td>
              <td>{s.description}</td>
              <td>
                <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(s)}>
                  Modifier
                </button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(s._id)}>
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

export default Samples;
