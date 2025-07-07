import React, { useEffect, useState } from "react";
import { getPatients, addPatient, updatePatient, deletePatient } from "../services/patientService";

const Patients: React.FC<{ onPatientAdded: (patient: any) => void }> = ({ onPatientAdded }) => {
  const [patients, setPatients] = useState<any[]>([]);
  const [form, setForm] = useState({ name: "", age: "" });
  const [editId, setEditId] = useState<string | null>(null);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    const data = await getPatients();
    setPatients(data);
  };

  const handleSubmit = async () => {
    if (editId) {
      await updatePatient(editId, form);
      setEditId(null);
    } else {
      const newPatient = await addPatient(form);
      onPatientAdded(newPatient); // Notify parent of new patient
    }
    setForm({ name: "", age: "" });
    fetchPatients();
  };

  const handleEdit = (p: any) => {
    setForm({ name: p.name, age: p.age });
    setEditId(p._id);
  };

  const handleDelete = async (id: string) => {
    await deletePatient(id);
    fetchPatients();
  };

  return (
    <div className="container" style={{ marginLeft: 240 }}>
      <h2 className="mt-4">Gestion des Patients</h2>
      <input
        className="form-control mb-2"
        placeholder="Nom"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        className="form-control mb-2"
        placeholder="Âge"
        value={form.age}
        onChange={(e) => setForm({ ...form, age: e.target.value })}
      />
      <button className="btn btn-primary mb-3" onClick={handleSubmit}>
        {editId ? "Modifier" : "Ajouter"}
      </button>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Âge</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((p) => (
            <tr key={p._id}>
              <td>{p.name}</td>
              <td>{p.age}</td>
              <td>
                <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(p)}>
                  Modifier
                </button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(p._id)}>
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

export default Patients;