// src/pages/Samples.tsx
import React, { useEffect, useState } from "react";
import { getSamples, addSample } from "../services/sampleService";

interface Sample {
  _id?: string;
  patientName: string;
  sampleType: string;
  dateCollected: string;
}

const Samples: React.FC = () => {
  const [samples, setSamples] = useState<Sample[]>([]);
  const [newSample, setNewSample] = useState<Sample>({
    patientName: "",
    sampleType: "",
    dateCollected: "",
  });

  useEffect(() => {
    getSamples().then(setSamples);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setNewSample({ ...newSample, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const added = await addSample(newSample);
    setSamples([...samples, added]);
    setNewSample({ patientName: "", sampleType: "", dateCollected: "" });
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Gestion des échantillons</h2>

      <form className="mb-4 border rounded p-4 shadow" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nom du patient</label>
          <input
            type="text"
            className="form-control"
            name="patientName"
            value={newSample.patientName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Type d'échantillon</label>
          <select
            className="form-select"
            name="sampleType"
            value={newSample.sampleType}
            onChange={handleChange}
            required
          >
            <option value="">-- Choisir --</option>
            <option value="Sang">Sang</option>
            <option value="Urine">Urine</option>
            <option value="Salive">Salive</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Date de collecte</label>
          <input
            type="date"
            className="form-control"
            name="dateCollected"
            value={newSample.dateCollected}
            onChange={handleChange}
            required
          />
        </div>
        <button className="btn btn-primary" type="submit">Ajouter</button>
      </form>

      <h4>Liste des échantillons</h4>
      <ul className="list-group">
        {samples.map((sample) => (
          <li className="list-group-item" key={sample._id}>
            {sample.patientName} - {sample.sampleType} - {sample.dateCollected}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Samples;
