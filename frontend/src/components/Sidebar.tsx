// src/components/Sidebar.tsx
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
    <div
      className="bg-light border-end p-3"
      style={{ width: "220px", minHeight: "100vh", position: "fixed", top: "56px", left: 0 }}
    >
      <nav className="nav flex-column">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              `nav-link mb-2 ${isActive ? "fw-bold text-primary" : "text-dark"}`
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
