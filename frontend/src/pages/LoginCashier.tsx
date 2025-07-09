// src/pages/LoginCashier.tsx
import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const LoginCashier: React.FC = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await api.post('/cashiers/login', credentials);
      localStorage.setItem('token', res.data.token);
      navigate('/validate-appointments');
    } catch (err: any) {
      setError('Email ou mot de passe incorrect');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="row w-100">
        <div className="col-md-6 col-lg-4 mx-auto">
          <div className="card shadow-lg border-0">
            <div className="card-header bg-secondary text-white text-center py-4">
              <h3 className="mb-0">
                <i className="fas fa-cash-register me-2"></i>
                Connexion Caissier
              </h3>
            </div>
            
            <div className="card-body p-5">
              {error && (
                <div className="alert alert-danger d-flex align-items-center mb-4" role="alert">
                  <i className="fas fa-exclamation-triangle me-2"></i>
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="email" className="form-label fw-bold">
                    <i className="fas fa-envelope me-2 text-secondary"></i>
                    Adresse Email
                  </label>
                  <input
                    id="email"
                    className="form-control form-control-lg border-2"
                    type="email"
                    placeholder="votre.email@caisse.com"
                    value={credentials.email}
                    onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="password" className="form-label fw-bold">
                    <i className="fas fa-lock me-2 text-secondary"></i>
                    Mot de passe
                  </label>
                  <input
                    id="password"
                    className="form-control form-control-lg border-2"
                    type="password"
                    placeholder="Entrez votre mot de passe"
                    value={credentials.password}
                    onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                    required
                  />
                </div>

                <div className="d-grid gap-2 mb-4">
                  <button 
                    type="submit" 
                    className="btn btn-secondary btn-lg py-3"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Connexion en cours...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-sign-in-alt me-2"></i>
                        Se connecter
                      </>
                    )}
                  </button>
                </div>

                <div className="text-center">
                  <small className="text-muted">
                    Problème de connexion ? 
                    <a href="#" className="text-secondary text-decoration-none ms-1">
                      Contacter l'administrateur
                    </a>
                  </small>
                </div>
              </form>
            </div>
          </div>

          <div className="text-center mt-4">
            <div className="mb-2">
              <small className="text-muted">
                <i className="fas fa-users me-1"></i>
                Autres connexions :
              </small>
            </div>
            <div className="d-flex justify-content-center gap-3">
              <a href="/login-patient" className="btn btn-outline-secondary btn-sm">
                <i className="fas fa-user-injured me-1"></i>
                Patient
              </a>
              <a href="/login-technician" className="btn btn-outline-secondary btn-sm">
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

export default LoginCashier;