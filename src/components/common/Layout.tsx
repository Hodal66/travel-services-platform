import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Layout: React.FC = () => {
  const location = useLocation();
  
  // Get current page from pathname
  const getCurrentPage = () => {
    const path = location.pathname.split('/')[1];
    if (!path) return 'home';
    return path as any;
  };

  return (
    <>
      <Header currentPage={getCurrentPage()} />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;