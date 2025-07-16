import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';
// import Footer from '../components/Footer';



const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
    
      <Navbar />
     
      <main className="flex-grow //bg-[#e1d6d2] outlet ">
        <Outlet />
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;