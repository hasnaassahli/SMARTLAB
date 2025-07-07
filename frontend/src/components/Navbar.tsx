import { Link } from "react-router-dom";
import logo from "/public/assets/logo.png";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "#83c5be" }}>
      <div className="container-fluid px-4">
        {/* Logo à gauche */}
        <Link to="/" className="navbar-brand d-flex align-items-center text-white fw-bold">
          <img src={logo} alt="SmartLAB Logo" height="55" className="me-2" />
          SmartLAB
        </Link>

        {/* Bouton burger responsive */}
        <button
          className="navbar-toggler bg-light"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Liens au centre */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item mx-2">
              <Link className="nav-link text-white fw-semibold" to="/">Accueil</Link>
            </li>
            <li className="nav-item mx-2">
              <Link className="nav-link text-white fw-semibold" to="/about">À propos</Link>
            </li>
            <li className="nav-item mx-2">
              <Link className="nav-link text-white fw-semibold" to="/contact">Contact</Link>
            </li>
          </ul>

          {/* Bouton à droite */}
          <Link
            to="/login"
            className="btn btn-outline-light px-4 fw-semibold"
          >
            Se connecter
          </Link>
        </div>
      </div>
    </nav>
  );
}
