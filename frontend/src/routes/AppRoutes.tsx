// src/routes/AppRoutes.tsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/LoginPatient";
import Patients from "../pages/Patients";
import Technicians from "../pages/Technicians";
import Cashier from "../pages/Cashiers";
import Results from "../pages/Results";
import Dashboard from "../pages/Dashboard";
import Samples from "../pages/Samples";
import Payments from "../pages/Payments"; 
import Appointment from "../pages/AppointmentForm"; 
import Register from "../pages/RegisterPatient"; 
const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/patients" element={<Patients onPatientAdded={function (patient: any): void {
        throw new Error("Function not implemented.");
      } } />} />
      <Route path="/technicians" element={<Technicians />} />
      <Route path="/cashier" element={<Cashier/>} />
      <Route path="/samples" element={<Samples />} />
      <Route path="/payments" element={<Payments />} />
      <Route path="/appointment" element={<Appointment />} />
      <Route path="/results" element={<Results />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
};

export default AppRoutes;
