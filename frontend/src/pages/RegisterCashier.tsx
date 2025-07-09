// src/pages/RegisterCashier.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterCashier: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');
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
    setMessage('');
    
    try {
      await axios.post('http://localhost:5000/api/cashiers/register', form);
      setMessage("Caissier enregistré avec succès !");
      setMessageType('success');
      
      // Réinitialiser le formulaire
      setForm({ name: '', email: '', password: '' });
      
      // Rediriger vers la page de connexion après 2 secondes
      setTimeout(() => {
        navigate('/login-cashier');
      }, 2000);
    } catch (err: any) {
      setMessage("Erreur lors de l'enregistrement du caissier. Veuillez réessayer.");
      setMessageType('error');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="row w-100">
        <div className="col-md-6 col-lg-4 mx-auto">
          <div className="card shadow-lg border-0">
            <div className="card-header bg-dark text-white text-center py-4">
              <h3 className="mb-0">
                <i className="fas fa-user-tie me-2"></i>
                Enregistrement Caissier
              </h3>
            </div>
            
            <div className="card-body p-5">
              {message && (
                <div className={`alert ${messageType === 'success' ? 'alert-success' : 'alert-danger'} d-flex align-items-center mb-4`} role="alert">
                  <i className={`fas ${messageType === 'success' ? 'fa-check-circle' : 'fa-exclamation-triangle'} me-2`}></i>
                  {message}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="name" className="form-label fw-bold">
                    <i className="fas fa-user me-2 text-dark"></i>
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
                    <i className="fas fa-envelope me-2 text-dark"></i>
                    Adresse Email
                  </label>
                  <input
                    id="email"
                    className={`form-control form-control-lg border-2 ${errors.email ? 'is-invalid' : ''}`}
                    type="email"
                    placeholder="votre.email@caisse.com"
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
                    <i className="fas fa-lock me-2 text-dark"></i>
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
                  <div className="alert alert-info d-flex align-items-center">
                    <i className="fas fa-info-circle me-2"></i>
                    <div>
                      <strong>Accès restreint :</strong> L'enregistrement des caissiers est réservé aux administrateurs autorisés.
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="terms" required />
                    <label className="form-check-label" htmlFor="terms">
                      J'accepte les 
                      <a href="#" className="text-dark text-decoration-none ms-1">
                        termes et conditions
                      </a>
                      et je certifie être autorisé(e) à créer ce compte
                    </label>
                  </div>
                </div>

                <div className="d-grid gap-2 mb-4">
                  <button 
                    type="submit" 
                    className="btn btn-dark btn-lg py-3"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Enregistrement en cours...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-user-plus me-2"></i>
                        Créer le compte
                      </>
                    )}
                  </button>
                </div>

                <div className="text-center">
                  <small className="text-muted">
                    Déjà un compte ? 
                    <a href="/login-cashier" className="text-dark text-decoration-none ms-1">
                      Se connecter
                    </a>
                  </small>
                </div>
              </form>
            </div>
          </div>

          <div className="text-center mt-4">
            <div className="mb-2">
              <small className="text-muted">
                <i className="fas fa-shield-alt me-1"></i>
                Compte administrateur requis
              </small>
            </div>
            <div className="d-flex justify-content-center gap-2">
              <a href="/login-patient" className="btn btn-outline-dark btn-sm">
                <i className="fas fa-user-injured me-1"></i>
                Patient
              </a>
              <a href="/login-technician" className="btn btn-outline-dark btn-sm">
                <i className="fas fa-user-md me-1"></i>
                Technicien
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterCashier;