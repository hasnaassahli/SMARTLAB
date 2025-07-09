import React, { useEffect, useState } from 'react';
import api from '../services/api';

const ValidateAppointments: React.FC = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.get('/appointments/pending');
      setAppointments(res.data);
    };
    fetchData();
  }, []);

  const validate = async (id: string) => {
    await api.put(`/appointments/${id}/validate`);
    alert('Rendez-vous validé');
  };

  return (
    <div className="container mt-4">
      <h2>Valider les Rendez-vous</h2>
      <ul className="list-group">
        {appointments.map((a: any) => (
          <li className="list-group-item d-flex justify-content-between" key={a._id}>
            {a.name} - {a.date}
            <button className="btn btn-primary btn-sm" onClick={() => validate(a._id)}>Valider</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ValidateAppointments;
