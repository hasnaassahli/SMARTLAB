import React, { useEffect, useState } from "react";
import { getTechnicians, addTechnician, updateTechnician, deleteTechnician } from "../services/technicianService";

const Technicians: React.FC = () => {
  const [technicians, setTechnicians] = useState<any[]>([]);
  const [form, setForm] = useState({ name: "", specialty: "" });
  const [editId, setEditId] = useState<string | null>(null);

  useEffect(() => {
    fetchTechnicians();
  }, []);

  const fetchTechnicians = async () => {
    const data = await getTechnicians();
    setTechnicians(data);
  };

  const handleSubmit = async () => {
    if (editId) {
      await updateTechnician(editId, form);
      setEditId(null);
    } else {
      await addTechnician(form);
    }
    setForm({ name: "", specialty: "" });
    fetchTechnicians();
  };

  const handleEdit = (t: any) => {
    setForm({ name: t.name, specialty: t.specialty });
    setEditId(t._id);
  };

  const handleDelete = async (id: string) => {
    await deleteTechnician(id);
    fetchTechnicians();
  };

  return (
    <div className="container" style={{ marginLeft: 240 }}>
      <h2 className="mt-4">Gestion des Techniciens</h2>
      <input className="form-control mb-2" placeholder="Nom" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <input className="form-control mb-2" placeholder="Spécialité" value={form.specialty} onChange={(e) => setForm({ ...form, specialty: e.target.value })} />
      <button className="btn btn-primary mb-3" onClick={handleSubmit}>{editId ? "Modifier" : "Ajouter"}</button>

      <table className="table table-bordered">
        <thead>
          <tr><th>Nom</th><th>Spécialité</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {technicians.map((t) => (
            <tr key={t._id}>
              <td>{t.name}</td>
              <td>{t.specialty}</td>
              <td>
                <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(t)}>Modifier</button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(t._id)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Technicians;
