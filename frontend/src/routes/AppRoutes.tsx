// src/routes/AppRoutes.tsx
// import React from "react";
// import { Routes, Route } from "react-router-dom";
// import Home from "../pages/Home";
// import Login from "../pages/Login";
// import Patients from "../pages/Patients";
// import Technicians from "../pages/Technicians";
// import Cashiers from "../pages/Cashiers";
// import Results from "../pages/Results";
// import Dashboard from "../pages/Dashboard";
// import Samples from "../pages/Samples";
// import Payments from "../pages/Payments"; 
// import Appointment from "../pages/Appointment"; 
// import Register from "../pages/Register"; 

// const AppRoutes: React.FC = () => {
//   return (
//     <Routes>
//       <Route path="/" element={<Home />} />
//       <Route path="/Register" element={<Register />} />
//       <Route path="/login" element={<Login />} />
//       <Route path="/patients" element={<Patients />} />
//       <Route path="/technicians" element={<Technicians />} />
//       <Route path="/cashiers" element={<Cashiers />} />
//       <Route path="/samples" element={<Samples />} />
//       <Route path="/payments" element={<Payments />} />
//       <Route path="/appointment" element={<Appointment />} />
//       <Route path="/results" element={<Results />} />
//       <Route path="/dashboard" element={<Dashboard />} />
//     </Routes>
//   );
// };

// export default AppRoutes;
// src/routes/AppRoutes.tsx
import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";

import Patients from "../pages/Patients";
import Technicians from "../pages/Technicians";
import Cashiers from "../pages/Cashiers";
import Results from "../pages/Results";
import Dashboard from "../pages/Dashboard";
import Samples from "../pages/Samples";
import Payments from "../pages/Payments"; 
import Appointment from "../pages/Appointment"; 

import MainLayout from "../components/MainLayout";
import PrivateRoute from "../components/PrivateRoute";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Routes publiques */}
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      {/* Routes protégées */}
      <Route
        path="/patients"
        element={
          <PrivateRoute>
            <MainLayout>
              <Patients />
            </MainLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/technicians"
        element={
          <PrivateRoute>
            <MainLayout>
              <Technicians />
            </MainLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/cashiers"
        element={
          <PrivateRoute>
            <MainLayout>
              <Cashiers />
            </MainLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/samples"
        element={
          <PrivateRoute>
            <MainLayout>
              <Samples />
            </MainLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/payments"
        element={
          <PrivateRoute>
            <MainLayout>
              <Payments />
            </MainLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/appointment"
        element={
          <PrivateRoute>
            <MainLayout>
              <Appointment />
            </MainLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/results"
        element={
          <PrivateRoute>
            <MainLayout>
              <Results />
            </MainLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <MainLayout>
              <Dashboard />
            </MainLayout>
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
