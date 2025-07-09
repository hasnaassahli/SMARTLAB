import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark text-light py-4">
      <div className="container text-center">
        <div className="d-flex justify-content-center align-items-center mb-3">
          <i className="bi bi-flask text-warning me-2" style={{ fontSize: '1.5rem' }}></i>
          <span className="h5 mb-0 fw-bold">SmartLAB</span>
        </div>
        <p className="text-muted mb-0">
          © 2024 SmartLAB. Tous droits réservés. | Solution de gestion de laboratoire
        </p>
      </div>
    </footer>
  );
};

export default Footer;
