import { Link } from "react-router-dom";
import logo from "/assets/logo.png";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <img src={logo} alt="Logo" width="70" height="70" className="me-2 rounded-circle" />
          SMARTLAB
        </Link>

        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item"><Link to="/" className="nav-link">Dashboard</Link></li>
            <li className="nav-item"><Link to="/patients" className="nav-link">Patients</Link></li>
            <li className="nav-item"><Link to="/technicians" className="nav-link">Techniciens</Link></li>
            <li className="nav-item"><Link to="/samples" className="nav-link">Échantillons</Link></li>
            <li className="nav-item"><Link to="/results" className="nav-link">Résultats</Link></li>
            <li className="nav-item"><Link to="/login" className="nav-link">Login</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
