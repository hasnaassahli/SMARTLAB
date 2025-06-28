// src/App.tsx
import React from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import AppRoutes from "./routes/AppRoutes";

const App: React.FC = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <div className="d-flex flex-grow-1">
        <Sidebar />
        <main style={{ marginLeft: 220, padding: "20px", width: "100%" }}>
          <AppRoutes />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default App;
