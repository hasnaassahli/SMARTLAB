import React, { useEffect, useState } from "react";
import {
  getTechnicians,
  createTechnician,
  updateTechnician,
  deleteTechnician,
} from "../services/technicianService";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table, Button, Form } from "react-bootstrap";

interface Technician {
  _id?: string;
  name: string;
  email: string;
  specialty: string;
}

const Technicians: React.FC = () => {
  const [technicians, setTechnicians] = useState<Technician[]>([]);
  const [form, setForm] = useState<Technician>({ name: "", email: "", specialty: "" });
  const [editId, setEditId] = useState<string | null>(null);

  useEffect(() => {
    fetchTechnicians();
  }, []);

  const fetchTechnicians = async () => {
    try {
      const response = await getTechnicians();
      setTechnicians(response.data);
    } catch (error) {
      console.error("Erreur lors du chargement des techniciens :", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editId) {
        await updateTechnician(editId, form);
        setEditId(null);
      } else {
        await createTechnician(form);
      }
      setForm({ name: "", email: "", specialty: "" });
      fetchTechnicians();
    } catch (error) {
      console.error("Erreur lors de l'enregistrement :", error);
    }
  };

  const handleEdit = (tech: Technician) => {
    setForm({ name: tech.name, email: tech.email, specialty: tech.specialty });
    setEditId(tech._id || null);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTechnician(id);
      fetchTechnicians();
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Gestion des techniciens</h2>

      <Form onSubmit={handleSubmit} className="mb-4">
        <Form.Group className="mb-2">
          <Form.Label>Nom</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Spécialité</Form.Label>
          <Form.Control
            type="text"
            name="specialty"
            value={form.specialty}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button type="submit" variant="primary">
          {editId ? "Modifier" : "Ajouter"}
        </Button>
      </Form>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Email</th>
            <th>Spécialité</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {technicians.map((tech) => (
            <tr key={tech._id}>
              <td>{tech.name}</td>
              <td>{tech.email}</td>
              <td>{tech.specialty}</td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  className="me-2"
                  onClick={() => handleEdit(tech)}
                >
                  Modifier
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => tech._id && handleDelete(tech._id)}
                >
                  Supprimer
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Technicians;
