// src/pages/SelectAnalyses.tsx
import React, { useEffect, useState } from 'react';
import api from '../services/api';

const SelectAnalyses: React.FC = () => {
  const [patients, setPatients] = useState([]);
  const [selected, setSelected] = useState<{ patientId: string; analyses: string }>({
    patientId: '',
    analyses: '',
  });

  useEffect(() => {
    const fetchPatients = async () => {
      const res = await api.get('/appointments/confirmed');
      setPatients(res.data);
    };
    fetchPatients();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.post('/analyses/assign', selected);
    alert('Analyses assignées au patient.');
    setSelected({ patientId: '', analyses: '' });
  };

  return (
    <div className="container mt-5">
      <h2>Choisir les analyses pour un patient</h2>
      <form onSubmit={handleSubmit}>
        <select
          className="form-control my-2"
          value={selected.patientId}
          onChange={(e) => setSelected({ ...selected, patientId: e.target.value })}
        >
          <option value="">-- Sélectionner un patient --</option>
          {patients.map((p: any) => (
            <option key={p._id} value={p._id}>
              {p.name} - {p.date}
            </option>
          ))}
        </select>

        <textarea
          className="form-control my-2"
          placeholder="Liste des analyses (ex: Glycémie, Hémoglobine...)"
          rows={3}
          value={selected.analyses}
          onChange={(e) => setSelected({ ...selected, analyses: e.target.value })}
        />

        <button className="btn btn-primary">Assigner les analyses</button>
      </form>
    </div>
  );
};

export default SelectAnalyses;
