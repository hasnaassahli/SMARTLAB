import React, { useState } from "react";

const Appointment: React.FC = () => {
  const [form, setForm] = useState({
    patientName: "",
    date: "",
    time: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Rendez-vous pris pour ${form.patientName} le ${form.date} à ${form.time}`);
    setForm({ patientName: "", date: "", time: "" });
  };

  return (
    <div className="container" style={{ marginLeft: 240 }}>
      <h2 className="mt-4">Prendre un rendez-vous</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Nom du patient"
          value={form.patientName}
          onChange={(e) => setForm({ ...form, patientName: e.target.value })}
          required
        />
        <input
          type="date"
          className="form-control mb-2"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          required
        />
        <input
          type="time"
          className="form-control mb-2"
          value={form.time}
          onChange={(e) => setForm({ ...form, time: e.target.value })}
          required
        />
        <button className="btn btn-primary" type="submit">Prendre rendez-vous</button>
      </form>
    </div>
  );
};

export default Appointment;
