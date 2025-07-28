// src/components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png"

const Footer = () => {
  return (
    <footer>
      {/* Upper Footer */}
      <div className="bg-white text-gray-800 py-12 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Logo & Tagline */}
          <div className="md:col-span-2 flex flex-col space-y-4">
            {/* PLACE YOUR LOGO HERE */}
            <div className="text-2xl font-bold text-indigo-500">
         <img
                      src={logo} 
                      alt={`CraftConnect`}
                      className=" w-45 "
                    />
            </div>
            <p className="text-sm text-gray-600 max-w-sm">
              Connecting you with trusted, verified artisans for all your home
              and business needs. Simplify hiring, ensure quality, and support
              local professionals.
            </p>
          </div>

          {/* Homeowners */}
          <div>
            <h4 className="font-semibold mb-2">Homeowners</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>
                <Link to="/search">Find an Artisan</Link>
              </li>
            </ul>
          </div>

          {/* Artisans */}
          <div>
            <h4 className="font-semibold mb-2">Artisans</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>
                <Link to="/signup">Join as Artisan</Link>
              </li>
              <li>
                <Link to="/contact">Support</Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-2">Company</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>
                <Link to="">About Us</Link>
              </li>
              <li>
                <Link to="">Blog</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
            <div className="mt-4">
              <h4 className="font-semibold mb-2">Follow Us</h4>
              <div className="flex space-x-3">
                <a href="#" className="hover:text-indigo-600 transition">
                  Facebook
                </a>
                <a href="#" className="hover:text-indigo-600 transition">
                  Instagram
                </a>
                <a href="#" className="hover:text-indigo-600 transition">
                  Twitter
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-900 text-gray-100 text-xs py-4 px-6 md:px-12 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-2 md:mb-0">
          © {new Date().getFullYear()} CraftConnect. All rights reserved.
        </div>
        <div className="flex space-x-4">
          <Link to="/terms" className="hover:underline">
            Terms
          </Link>
          <Link to="/privacy" className="hover:underline">
            Privacy
          </Link>
          <Link to="/cookies" className="hover:underline">
            Cookies
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
