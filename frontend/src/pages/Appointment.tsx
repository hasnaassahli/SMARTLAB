import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Appointment: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    patientName: "",
    phone: "",
    email: "",
    typeAnalyse: "",
    date: "",
    time: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/appointments", {
        ...form,
        datetime: `${form.date}T${form.time}`, // Combine date and time if backend expects datetime
      });
      alert("Rendez-vous enregistré !");
      navigate("/login"); // ou navigate("/dashboard") si tu préfères
    } catch (err) {
      alert("Erreur d'enregistrement");
    }
  };

  return (
    <div className="container" style={{ marginLeft: 240, maxWidth: 600 }}>
      <h2 className="mt-4 mb-3">Prendre un rendez-vous</h2>
      <form onSubmit={handleSubmit} className="p-4 border bg-light rounded shadow-sm">
        <div className="mb-3">
          <label>Nom du patient</label>
          <input
            type="text"
            name="patientName"
            className="form-control"
            value={form.patientName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Téléphone</label>
          <input
            type="tel"
            name="phone"
            className="form-control"
            value={form.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Type d’analyse</label>
          <select
            name="typeAnalyse"
            className="form-select"
            value={form.typeAnalyse}
            onChange={handleChange}
            required
          >
            <option value="">-- Sélectionner --</option>
            <option value="Sang">Analyse de sang</option>
            <option value="Urine">Analyse d'urine</option>
            <option value="Autre">Autre</option>
          </select>
        </div>
        <div className="mb-3">
          <label>Date</label>
          <input
            type="date"
            name="date"
            className="form-control"
            value={form.date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Heure</label>
          <input
            type="time"
            name="time"
            className="form-control"
            value={form.time}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Valider le rendez-vous
        </button>
      </form>
    </div>
  );
};

export default Appointment;

