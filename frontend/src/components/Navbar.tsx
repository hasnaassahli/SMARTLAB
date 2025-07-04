// src/components/Navbar.tsx
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark"
      style={{ backgroundColor: "#2a9d8f", zIndex: 1040 }}
    >
      <div className="container-fluid">
        <Link to="/" className="navbar-brand d-flex align-items-center fw-bold text-white">
          <img src="/assets/logo.png" alt="SmartLAB" height="40" className="me-2" />
          SmartLAB
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/login" className="btn btn-outline-light fw-semibold px-4">
                Se connecter
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
