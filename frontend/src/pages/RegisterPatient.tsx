// src/pages/RegisterPatient.tsx
import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegisterPatient: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = { name: '', email: '', password: '' };
    let isValid = true;

    if (form.name.trim().length < 2) {
      newErrors.name = 'Le nom doit contenir au moins 2 caractères';
      isValid = false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Veuillez entrer une adresse email valide';
      isValid = false;
    }

    if (form.password.length < 6) {
      newErrors.password = 'Le mot de passe doit contenir au moins 6 caractères';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    
    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        ...form,
        role: 'patient',
      });
      
      alert('Inscription réussie !');
      navigate('/login-patient');
    } catch (err) {
      alert('Erreur lors de l\'inscription');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="row w-100">
        <div className="col-md-6 col-lg-4 mx-auto">
          <div className="card shadow-lg border-0">
            <div className="card-header bg-success text-white text-center py-4">
              <h3 className="mb-0">
                <i className="fas fa-user-plus me-2"></i>
                Créer un compte Patient
              </h3>
            </div>
            
            <div className="card-body p-5">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="name" className="form-label fw-bold">
                    <i className="fas fa-user me-2 text-success"></i>
                    Nom complet
                  </label>
                  <input
                    id="name"
                    className={`form-control form-control-lg border-2 ${errors.name ? 'is-invalid' : ''}`}
                    type="text"
                    placeholder="Entrez votre nom complet"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                  />
                  {errors.name && (
                    <div className="invalid-feedback">
                      {errors.name}
                    </div>
                  )}
                </div>

                <div className="mb-4">
                  <label htmlFor="email" className="form-label fw-bold">
                    <i className="fas fa-envelope me-2 text-success"></i>
                    Adresse Email
                  </label>
                  <input
                    id="email"
                    className={`form-control form-control-lg border-2 ${errors.email ? 'is-invalid' : ''}`}
                    type="email"
                    placeholder="votre.email@exemple.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                  />
                  {errors.email && (
                    <div className="invalid-feedback">
                      {errors.email}
                    </div>
                  )}
                </div>

                <div className="mb-4">
                  <label htmlFor="password" className="form-label fw-bold">
                    <i className="fas fa-lock me-2 text-success"></i>
                    Mot de passe
                  </label>
                  <input
                    id="password"
                    className={`form-control form-control-lg border-2 ${errors.password ? 'is-invalid' : ''}`}
                    type="password"
                    placeholder="Choisissez un mot de passe sécurisé"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    required
                  />
                  {errors.password && (
                    <div className="invalid-feedback">
                      {errors.password}
                    </div>
                  )}
                  <div className="form-text">
                    <small className="text-muted">
                      <i className="fas fa-info-circle me-1"></i>
                      Minimum 6 caractères
                    </small>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="terms" required />
                    <label className="form-check-label" htmlFor="terms">
                      J'accepte les 
                      <a href="#" className="text-success text-decoration-none ms-1">
                        termes et conditions
                      </a>
                    </label>
                  </div>
                </div>

                <div className="d-grid gap-2 mb-4">
                  <button 
                    type="submit" 
                    className="btn btn-success btn-lg py-3"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Création en cours...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-user-plus me-2"></i>
                        Créer mon compte
                      </>
                    )}
                  </button>
                </div>

                <div className="text-center">
                  <small className="text-muted">
                    Déjà un compte ? 
                    <a href="/login-patient" className="text-success text-decoration-none ms-1">
                      Se connecter
                    </a>
                  </small>
                </div>
              </form>
            </div>
          </div>

          <div className="text-center mt-4">
            <small className="text-muted">
              Vous êtes un technicien ? 
              <a href="/login-technician" className="text-success text-decoration-none ms-1">
                Connexion Technicien
              </a>
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPatient;