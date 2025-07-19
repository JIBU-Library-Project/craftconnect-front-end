import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';
// import Footer from '../components/Footer';



const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
    
      <Navbar />
     
      <main className="flex-grow bg-[#ffffff]  ">
        <Outlet />
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;