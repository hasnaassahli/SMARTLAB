import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
// Importing pages for different roles  

// Home Page
import Home from './pages/Home';  


// Patient Pages
import RegisterPatient from './pages/RegisterPatient';
import LoginPatient from './pages/LoginPatient';
import AppointmentForm from './pages/AppointmentForm';
import ViewResults from './pages/ViewResults';

// Technician Pages
import RegisterTechnician from './pages/RegisterTechnician';

import LoginTechnician from './pages/LoginTechnician';
import SubmitAnalysis from './pages/SubmitAnalysis';

// Cashier Pages
import RegisterCashier from './pages/RegisterCashier';
import LoginCashier from './pages/LoginCashier';
import ValidateAppointments from './pages/ValidateAppointments';
import SelectAnalyses from './pages/SelectAnalyses';
import ConfirmPayments from './pages/ConfirmPayments';

// Layout (optional, if used)
// import Layout from './components/Layout';

const App: React.FC = () => {
  return (
    <Router>
      <Navbar/>
      <Routes>
        {/* Default route */}
        <Route path="/" element={<Home />} />
         
        {/* Home Page */}
        <Route path="/home" element={<h2 className="text-center mt-5">Bienvenue sur SMARTLAB</h2>} />
        {/* PATIENT */}
        <Route path="/register-patient" element={<RegisterPatient />} />
        <Route path="/login-patient" element={<LoginPatient />} />
        <Route path="/appointment" element={<AppointmentForm />} />
        <Route path="/results" element={<ViewResults />} />

        {/* TECHNICIAN */}
        <Route path="/register-technician" element={<RegisterTechnician />} />
        <Route path="/login-technician" element={<LoginTechnician />} />
        <Route path="/submit-analysis" element={<SubmitAnalysis />} />

        {/* CASHIER */}
        <Route path="/login-cashier" element={<LoginCashier />} />
        <Route path="/register-cashier" element={<RegisterCashier />} />
        <Route path="/validate-appointments" element={<ValidateAppointments />} />
        <Route path="/select-analyses" element={<SelectAnalyses />} />
        <Route path="/confirm-payments" element={<ConfirmPayments />} />

        {/* Default route (optional) */}
        <Route path="*" element={<h2 className="text-center mt-5">Page non trouvée</h2>} />
      </Routes>
    </Router>
  );
};

export default App;
