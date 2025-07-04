import React from "react";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        backgroundImage: `url("/assets/img-labo.jpg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        color: "#fff",
        textShadow: "1px 1px 5px rgba(0,0,0,0.7)",
        padding: "0 20px",
      }}
    >
      <div className="bg-dark bg-opacity-50 p-5 rounded text-center">
        <h1 className="display-4 fw-bold mb-3">
          Bienvenue sur <span className="text-warning">SmartLAB</span>
        </h1>
        <p className="lead mb-4">
          La solution complète pour gérer votre laboratoire efficacement.
        </p>

        <div className="d-flex justify-content-center gap-3 flex-wrap">
          <button
            className="btn btn-success btn-lg px-4"
            onClick={() => navigate("/appointment")}
          >
            Prendre rendez-vous
          </button>
          <button
            className="btn btn-outline-light btn-lg px-4"
            onClick={() => navigate("/register")}
          >
            Créer un compte
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
