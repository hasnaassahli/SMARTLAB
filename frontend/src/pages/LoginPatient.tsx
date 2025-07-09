// src/pages/LoginPatient.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPatient: React.FC = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        ...form,
        role: 'patient'
      });
      
      localStorage.setItem('token', res.data.token);
      navigate('/appointment');
    } catch (error: any) {
      console.error('Erreur de connexion :', error);
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
            <div className="card-header bg-info text-white text-center py-4">
              <h3 className="mb-0">
                <i className="fas fa-user-injured me-2"></i>
                Connexion Patient
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
                    <i className="fas fa-envelope me-2 text-info"></i>
                    Adresse Email
                  </label>
                  <input
                    id="email"
                    className="form-control form-control-lg border-2"
                    type="email"
                    placeholder="votre.email@exemple.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="password" className="form-label fw-bold">
                    <i className="fas fa-lock me-2 text-info"></i>
                    Mot de passe
                  </label>
                  <input
                    id="password"
                    className="form-control form-control-lg border-2"
                    type="password"
                    placeholder="Entrez votre mot de passe"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    required
                  />
                </div>

                <div className="d-grid gap-2 mb-4">
                  <button 
                    type="submit" 
                    className="btn btn-info btn-lg py-3 text-white"
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
                    <a href="#" className="text-info text-decoration-none ms-1">
                      Réinitialiser
                    </a>
                  </small>
                </div>
              </form>
            </div>
          </div>

          <div className="text-center mt-4">
            <div className="mb-2">
              <small className="text-muted">
                Pas encore de compte ? 
                <a href="/register-patient" className="text-info text-decoration-none ms-1">
                  S'inscrire
                </a>
              </small>
            </div>
            <div>
              <small className="text-muted">
                Vous êtes un technicien ? 
                <a href="/login-technician" className="text-info text-decoration-none ms-1">
                  Connexion Technicien
                </a>
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPatient;