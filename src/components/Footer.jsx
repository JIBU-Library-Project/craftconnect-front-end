import React from 'react';
import { Link } from 'react-router';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <i className="fas fa-hammer mr-2"></i>CraftConnect
            </h3>
            <p className="text-gray-400 mb-4">Connecting skilled artisans with clients across Ghana for quality home services.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white">Home</Link></li>
              <li><Link to="/search" className="text-gray-400 hover:text-white">Find Artisans</Link></li>
              <li><Link to="/signup" className="text-gray-400 hover:text-white">Become an Artisan</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white">Contact Us</Link></li>
              <li><a href="#" className="text-gray-400 hover:text-white">FAQs</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white">Blog</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Safety Tips</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Pricing Guide</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Artisan Resources</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Help Center</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <i className="fas fa-map-marker-alt mt-1 mr-3"></i>
                <span className="text-gray-400">123 Independence Ave, Accra, Ghana</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-phone mt-1 mr-3"></i>
                <span className="text-gray-400">+233 20 123 4567</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-envelope mt-1 mr-3"></i>
                <span className="text-gray-400">support@craftconnect.com</span>
              </li>
              <li className="flex items-start">
                <i className="fab fa-whatsapp mt-1 mr-3"></i>
                <span className="text-gray-400">+233 55 987 6543</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} CraftConnect. All rights reserved. | <a href="#" className="hover:text-white">Privacy Policy</a> | <a href="#" className="hover:text-white">Terms of Service</a></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer