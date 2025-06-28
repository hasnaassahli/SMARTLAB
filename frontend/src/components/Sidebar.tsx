import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar: React.FC = () => {
  const links = [
    { path: "/dashboard", label: "Tableau de bord" },
    { path: "/appointment", label: "Rendez-vous" },
    { path: "/patients", label: "Patients" },
    { path: "/payments", label: "Paiements" },
    { path: "/samples", label: "Échantillons" },
    { path: "/results", label: "Résultats" },
    { path: "/technicians", label: "Techniciens" },
    { path: "/cashiers", label: "Caissiers" },
  ];

  return (
    <div className="bg-light border-end p-3" style={{ width: "200px", height: "100vh", position: "fixed" }}>
      <h5 className="text-center">Menu</h5>
      {links.map((link) => (
        <NavLink key={link.path} className="d-block mb-2 text-decoration-none" to={link.path}>
          {link.label}
        </NavLink>
      ))}
    </div>
  );
};

export default Sidebar;
