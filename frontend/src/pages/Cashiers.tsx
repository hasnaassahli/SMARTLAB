import React, { useEffect, useState } from "react";
import { getCashiers, addCashier, updateCashier, deleteCashier } from "../services/cashierService";

const Cashiers: React.FC = () => {
  const [cashiers, setCashiers] = useState<any[]>([]);
  const [form, setForm] = useState({ name: "", email: "" });
  const [editId, setEditId] = useState<string | null>(null);

  useEffect(() => {
    fetchCashiers();
  }, []);

  const fetchCashiers = async () => {
    const data = await getCashiers();
    setCashiers(data);
  };

  const handleSubmit = async () => {
    if (editId) {
      await updateCashier(editId, form);
      setEditId(null);
    } else {
      await addCashier(form);
    }
    setForm({ name: "", email: "" });
    fetchCashiers();
  };

  const handleEdit = (c: any) => {
    setForm({ name: c.name, email: c.email });
    setEditId(c._id);
  };

  const handleDelete = async (id: string) => {
    await deleteCashier(id);
    fetchCashiers();
  };

  return (
    <div className="container" style={{ marginLeft: 240 }}>
      <h2 className="mt-4">Gestion des Caissiers</h2>
      <input className="form-control mb-2" placeholder="Nom" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <input className="form-control mb-2" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <button className="btn btn-primary mb-3" onClick={handleSubmit}>{editId ? "Modifier" : "Ajouter"}</button>

      <table className="table table-bordered">
        <thead>
          <tr><th>Nom</th><th>Email</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {cashiers.map((c) => (
            <tr key={c._id}>
              <td>{c.name}</td>
              <td>{c.email}</td>
              <td>
                <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(c)}>Modifier</button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(c._id)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Cashiers;
