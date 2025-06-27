import { Routes, Route } from "react-router-dom"
import Dashboard from "../pages/Dashboard"
import Patients from "../pages/Patients"
import Technicians from "../pages/Technicians"
import Samples from "../pages/Samples"
import Results from "../pages/Results"
import Home from "../pages/Home"
import Login from "../pages/Login"
import Caissier from "../pages/Caissier";

export default function AppRoutes() {
  return (
    <Routes>
     
      <Route path="/" element={<Home />} />
      <Route path="/Caissier" element={<Caissier />} />
      <Route path="/patients" element={<Patients />} />
      <Route path="/technicians" element={<Technicians />} />
      <Route path="/samples" element={<Samples />} />
      <Route path="/results" element={<Results />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<div className="text-center mt-5">Page non trouvée</div>} />

    </Routes>
  )
}
