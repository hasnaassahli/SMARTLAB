import React, { useEffect, useState } from "react";
import { getPayments, addPayment, updatePayment, deletePayment } from "../services/paymentService"; // Adjust the import path as needed 

const Payments: React.FC = () => {
  const [payments, setPayments] = useState<any[]>([]);
  const [form, setForm] = useState({ patientName: "", amount: "" });
  const [editId, setEditId] = useState<string | null>(null);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    const data = await getPayments();
    setPayments(data);
  };

  const handleSubmit = async () => {
    if (editId) {
      await updatePayment(editId, form);
      setEditId(null);
    } else {
      await addPayment(form);
    }
    setForm({ patientName: "", amount: "" });
    fetchPayments();
  };

  const handleEdit = (p: any) => {
    setForm({ patientName: p.patientName, amount: p.amount });
    setEditId(p._id);
  };

  const handleDelete = async (id: string) => {
    await deletePayment(id);
    fetchPayments();
  };

  return (
    <div className="container" style={{ marginLeft: 240 }}>
      <h2 className="mt-4">Gestion des Paiements</h2>
      <input className="form-control mb-2" placeholder="Nom du patient" value={form.patientName} onChange={(e) => setForm({ ...form, patientName: e.target.value })} />
      <input className="form-control mb-2" placeholder="Montant" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} />
      <button className="btn btn-primary mb-3" onClick={handleSubmit}>{editId ? "Modifier" : "Ajouter"}</button>

      <table className="table table-bordered">
        <thead>
          <tr><th>Patient</th><th>Montant</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {payments.map((p) => (
            <tr key={p._id}>
              <td>{p.patientName}</td>
              <td>{p.amount}</td>
              <td>
                <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(p)}>Modifier</button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(p._id)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Payments;
