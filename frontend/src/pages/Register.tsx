import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/registerService"; // ✅ on utilise cette fonction

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await registerUser(form); // ✅ appel à la fonction du service
      navigate("/appointment"); // redirection vers la prise de rendez-vous
    } catch (error) {
      alert("Erreur d’inscription. Veuillez réessayer.");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <div className="card p-4 shadow" style={{ maxWidth: "500px", width: "100%" }}>
        <h3 className="text-center mb-4 text-primary">Créer un compte Patient</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Nom complet</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              placeholder="Ex: Sara Ben Ali"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Adresse Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              placeholder="Ex: sara@example.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="form-label">Mot de passe</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              placeholder="********"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            S'inscrire
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
