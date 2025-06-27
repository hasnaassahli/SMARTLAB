import { useEffect, useState } from "react";
import axios from "axios";

interface Technician {
  _id: string;
  name: string;
  specialty: string;
}

export default function Technicians() {
  const [technicians, setTechnicians] = useState<Technician[]>([]);
  const [name, setName] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  const fetchTechnicians = () => {
    axios.get("/api/technicians")
      .then(res => setTechnicians(res.data))
      .catch(err => console.error("Erreur :", err));
  };

  useEffect(() => {
    fetchTechnicians();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`/api/technicians/${editingId}`, { name, specialty });
        setMessage("✅ Technicien mis à jour");
        setEditingId(null);
      } else {
        await axios.post("/api/technicians", { name, specialty });
        setMessage("✅ Technicien ajouté");
      }
      setName("");
      setSpecialty("");
      fetchTechnicians();
    } catch (err: any) {
      setMessage(err.response?.data?.message || "❌ Erreur");
    }
  };

  const handleEdit = (tech: Technician) => {
    setName(tech.name);
    setSpecialty(tech.specialty);
    setEditingId(tech._id);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Supprimer ce technicien ?")) {
      await axios.delete(`/api/technicians/${id}`);
      fetchTechnicians();
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Gestion des Techniciens</h2>

      {message && <div className="alert alert-info">{message}</div>}

      <form onSubmit={handleSubmit} className="row g-3 mb-4">
        <div className="col-md-5">
          <input
            type="text"
            className="form-control"
            placeholder="Nom du technicien"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="col-md-5">
          <input
            type="text"
            className="form-control"
            placeholder="Spécialité"
            value={specialty}
            onChange={(e) => setSpecialty(e.target.value)}
            required
          />
        </div>
        <div className="col-md-2 d-grid">
          <button type="submit" className="btn btn-primary">
            {editingId ? "Modifier" : "Ajouter"}
          </button>
        </div>
      </form>

      <table className="table table-bordered table-hover">
        <thead className="table-light">
          <tr>
            <th>Nom</th>
            <th>Spécialité</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {technicians.map((tech) => (
            <tr key={tech._id}>
              <td>{tech.name}</td>
              <td>{tech.specialty}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => handleEdit(tech)}
                >
                  Modifier
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(tech._id)}
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
