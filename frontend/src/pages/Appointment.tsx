import React, { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

// Simule un service d'API (à remplacer par ton vrai service)
async function addAppointment(data: {
  patientName: string;
  date: string;
  testType: string;
}): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Rendez-vous ajouté :", data);
      resolve();
    }, 1000);
  });
}

const Appointment: React.FC = () => {
  const [form, setForm] = useState({
    patientName: "",
    date: "",
    testType: "",
  });

  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      await addAppointment(form);
      setMessage("Rendez-vous pris avec succès !");
      setForm({ patientName: "", date: "", testType: "" });
    } catch {
      setMessage("Erreur lors de la prise de rendez-vous.");
    }
    setLoading(false);
  };

  return (
    <div className="container mt-4">
      <h2>Prise de Rendez-vous</h2>
      {message && <div className="alert alert-info">{message}</div>}

      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          name="patientName"
          placeholder="Nom du patient"
          className="form-control mb-2"
          value={form.patientName}
          onChange={handleChange}
          required
          autoComplete="off"
        />

        <input
          type="date"
          name="date"
          className="form-control mb-2"
          value={form.date}
          onChange={handleChange}
          required
        />

        <select
          name="testType"
          className="form-select mb-2"
          value={form.testType}
          onChange={handleChange}
          required
        >
          <option value="">Sélectionnez un type d'analyse</option>
          <option value="Hématologie">Hématologie</option>
          <option value="Biochimie">Biochimie</option>
          <option value="Microbiologie">Microbiologie</option>
        </select>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "En cours..." : "Prendre Rendez-vous"}
        </button>
      </form>
    </div>
  );
};

export default Appointment;
