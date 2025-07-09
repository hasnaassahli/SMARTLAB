import React, { useState, useEffect } from 'react';
import api from '../services/api';

const SubmitAnalysis: React.FC = () => {
  const [patients, setPatients] = useState([]);
  const [form, setForm] = useState({ patientId: '', analysis: '', value: '' });

  useEffect(() => {
    const fetchPatients = async () => {
      const res = await api.get('/patients');
      setPatients(res.data);
    };
    fetchPatients();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.post('/results', form);
    alert('Analyse enregistrée');
  };

  return (
    <div className="container mt-4">
      <h2>Soumettre une Analyse</h2>
      <form onSubmit={handleSubmit}>
        <select className="form-control my-2" onChange={(e) => setForm({ ...form, patientId: e.target.value })}>
          <option>-- Sélectionner un patient --</option>
          {patients.map((p: any) => (
            <option value={p._id} key={p._id}>{p.name}</option>
          ))}
        </select>
        <input className="form-control my-2" placeholder="Type d'analyse" onChange={(e) => setForm({ ...form, analysis: e.target.value })} />
        <input className="form-control my-2" placeholder="Valeur" onChange={(e) => setForm({ ...form, value: e.target.value })} />
        <button className="btn btn-success">Envoyer</button>
      </form>
    </div>
  );
};

export default SubmitAnalysis;
