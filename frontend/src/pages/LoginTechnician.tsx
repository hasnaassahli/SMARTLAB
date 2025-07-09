// src/pages/LoginTechnician.tsx
import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const LoginTechnician: React.FC = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await api.post('/technicians/login', credentials);
      localStorage.setItem('token', res.data.token);
      alert('Connexion réussie');
      navigate('/submit-analysis');
    } catch (err) {
      alert('Échec de la connexion');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="row w-100">
        <div className="col-md-6 col-lg-4 mx-auto">
          <div className="card shadow-lg border-0">
            <div className="card-header bg-primary text-white text-center py-4">
              <h3 className="mb-0">
                <i className="fas fa-user-md me-2"></i>
                Connexion Technicien
              </h3>
            </div>
            
            <div className="card-body p-5">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="email" className="form-label fw-bold">
                    <i className="fas fa-envelope me-2 text-primary"></i>
                    Adresse Email
                  </label>
                  <input
                    id="email"
                    className="form-control form-control-lg border-2"
                    type="email"
                    placeholder="votre.email@exemple.com"
                    value={credentials.email}
                    onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="password" className="form-label fw-bold">
                    <i className="fas fa-lock me-2 text-primary"></i>
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
                    className="btn btn-primary btn-lg py-3"
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
                    Mot de passe oublié ? 
                    <a href="#" className="text-primary text-decoration-none ms-1">
                      Cliquez ici
                    </a>
                  </small>
                </div>
              </form>
            </div>
          </div>

          <div className="text-center mt-4">
            <small className="text-muted">
              Vous n'êtes pas technicien ? 
              <a href="/login-patient" className="text-primary text-decoration-none ms-1">
                Connexion Patient
              </a>
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginTechnician;