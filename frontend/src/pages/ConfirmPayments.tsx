// src/pages/ConfirmPayments.tsx
import React, { useEffect, useState } from 'react';
import api from '../services/api';

const ConfirmPayments: React.FC = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.get('/payments/pending');
      setPatients(res.data);
    };
    fetchData();
  }, []);

  const confirm = async (id: string) => {
    await api.put(`/payments/${id}/confirm`);
    alert('Paiement confirmé');
    setPatients(patients.filter((p: any) => p._id !== id));
  };

  return (
    <div className="container mt-5">
      <h2>Confirmer les paiements</h2>
      <ul className="list-group">
        {patients.map((p: any) => (
          <li className="list-group-item d-flex justify-content-between" key={p._id}>
            {p.name} - Analyses : {p.analyses}
            <button className="btn btn-success btn-sm" onClick={() => confirm(p._id)}>
              Confirmer le paiement
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ConfirmPayments;
