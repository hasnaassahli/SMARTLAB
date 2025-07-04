import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

interface Props {
  children: React.ReactNode;
}

const MainLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="d-flex">
      {/* Sidebar fixe à gauche */}
      <Sidebar />

      {/* Contenu principal à droite */}
      <div className="flex-grow-1" style={{ marginLeft: "250px" }}>
        {/* Barre de navigation en haut */}
        <Navbar />

        {/* Contenu de la page */}
        <main className="p-4" style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
