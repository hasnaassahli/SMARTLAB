import React, { useState } from 'react';
import axios from 'axios';

const AppointmentForm: React.FC = () => {
  const [form, setForm] = useState({ name: '', phone: '', date: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (!token) {
      setError("Vous devez être connecté pour prendre un rendez-vous");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/appointments", form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Rendez-vous enregistré avec succès !');
    } catch (err: any) {
      console.error(err);
      if (err.response?.status === 400) {
        setError(err.response.data.message);
      } else {
        setError("Une erreur s'est produite lors de l'enregistrement");
      }
    }
  };

  return (
    <div className="container mt-5">
      <h2>Prendre un Rendez-vous</h2>
      <form onSubmit={handleSubmit}>
        {error && <div className="alert alert-danger">{error}</div>}
        <input
          className="form-control my-2"
          placeholder="Nom"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          className="form-control my-2"
          placeholder="Téléphone"
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          required
        />
        <input
          className="form-control my-2"
          type="date"
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          required
        />
        <button className="btn btn-primary">Envoyer</button>
      </form>
    </div>
  );
};

export default AppointmentForm;
