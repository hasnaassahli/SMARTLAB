import React from "react";
import { NavLink } from "react-router-dom";
import logo from "/public/assets/logo.png"; // Assure-toi que le fichier est bien dans /public/assets/

const Sidebar: React.FC = () => {
  const links = [
    { path: "/dashboard", label: "Tableau de bord" },
    { path: "/appointment", label: "Rendez-vous" },
    { path: "/patients", label: "Patients" },
    { path: "/payments", label: "Paiements" },
    { path: "/samples", label: "Échantillons" },
    { path: "/results", label: "Résultats" },
    { path: "/technicians", label: "Techniciens" },
    { path: "/cashier", label: "Caissiers" },
  ];

  return (
    <div
      className="d-flex flex-column bg-white border-end shadow-sm p-3"
      style={{ width: "250px", height: "150vh", position: "fixed", top: 0, left: 0, overflowY: "auto" }}
    >
      <div className="text-center mb-4">
        <img
          src={logo}
          alt="SmartLAB Logo"
          className="img-fluid mb-2"
          style={{ maxWidth: "100px" }}
        />
        <h5 className="fw-bold text-primary">SmartLAB</h5>
      </div>

      <nav className="nav flex-column">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              `nav-link mb-2 rounded px-3 py-2 ${
                isActive ? "bg-secondary text-white fw-bold" : "text-dark"
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
