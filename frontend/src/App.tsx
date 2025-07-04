// src/App.tsx
import React from "react";
// import Navbar from "./components/Navbar";
// import Sidebar from "./components/Sidebar";
// import Footer from "./components/Footer";
import AppRoutes from "./routes/AppRoutes";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css"; 


const App: React.FC = () => {
  return (
<div> 

  <AppRoutes />
</div>      
  );
};

export default App;
