// src/routes/AppRoutes.tsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Patients from "../pages/Patients";
import Technicians from "../pages/Technicians";
import Cashiers from "../pages/cashiers";
import Results from "../pages/Results";
import Dashboard from "../pages/Dashboard";
import Samples from "../pages/Samples";
import Payments from "../pages/Payments"; 
import Appointment from "../pages/Appointment"; 

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/patients" element={<Patients />} />
      <Route path="/technicians" element={<Technicians />} />
      <Route path="/cashiers" element={<Cashiers />} />
      <Route path="/samples" element={<Samples />} />
      <Route path="/payments" element={<Payments />} />
      <Route path="/appointment" element={<Appointment />} />
      <Route path="/results" element={<Results />} />
      <Route path="/dashboard" element={<Dashboard />} />
      {/* <Route path="*" element={<Navigate to="/" />} /> */}
    </Routes>
  );
};

export default AppRoutes;
