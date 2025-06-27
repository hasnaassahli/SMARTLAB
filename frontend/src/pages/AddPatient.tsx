import { useState } from "react";
import axios from "axios";

export default function AddPatient() {
  const [name, setName] = useState("");
  const [cin, setCin] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    try {
      await axios.post(
        "/api/patients",
        { name, cin, birthDate, phone },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setIsSuccess(true);
      setMessage("✅ Patient ajouté avec succès !");
      setName("");
      setCin("");
      setBirthDate("");
      setPhone("");
    } catch (err: any) {
      setIsSuccess(false);
      setMessage(err.response?.data?.message || "❌ Erreur lors de l'ajout");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-sm">
        <div className="card-body">
          <h2 className="card-title mb-4">Ajouter un patient</h2>

          {message && (
            <div className={`alert ${isSuccess ? "alert-success" : "alert-danger"}`} role="alert">
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Nom complet :</label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="cin" className="form-label">CIN :</label>
              <input
                type="text"
                className="form-control"
                id="cin"
                value={cin}
                onChange={(e) => setCin(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="birthDate" className="form-label">Date de naissance :</label>
              <input
                type="date"
                className="form-control"
                id="birthDate"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="phone" className="form-label">Téléphone :</label>
              <input
                type="tel"
                className="form-control"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-success w-100">
              Ajouter
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
