// src/components/Footer.tsx
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark text-white text-center py-3 mt-auto">
      <div className="container">
        <small>&copy; {new Date().getFullYear()} SmartLAB. Tous droits réservés.</small>
      </div>
    </footer>
  );
};

export default Footer;
