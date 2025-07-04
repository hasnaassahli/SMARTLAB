// src/components/PrivateRoute.tsx
import React, { type JSX } from "react";
import { Navigate } from "react-router-dom";

interface Props {
  children: JSX.Element;
}

const PrivateRoute: React.FC<Props> = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem("token"); // ou sessionStorage

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
