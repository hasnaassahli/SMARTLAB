// src/components/Layout.tsx
import React from 'react';
import Navbar from './Navbar';

type Props = {
  children: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="container mt-4">{children}</main>
    </>
  );
};

export default Layout;
