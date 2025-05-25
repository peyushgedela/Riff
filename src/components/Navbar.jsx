// src/components/Navbar.jsx
import React from "react";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent py-4 px-6 md:px-10 flex justify-between items-center backdrop-blur-sm bg-black/10">
      {/* Logo */}
      <div className="text-xl font-bold tracking-wider md:text-3xl">
        <img
          src="/logo.png"
          alt="Logo"
          className="inline-block h-8 md:h-10 mr-3 mb-1"
        />
        <span className="text-amber-800">The Riff Project</span>
      </div>

      {/* Navigation Links */}
      <div className="space-x-6 md:space-x-8 flex items-center">
        <a
          href="#signup" // Replace with your actual signup route
          className="text-gray-800 hover:text-amber-800 transition-colors duration-300 relative group text-sm md:text-base"
        >
          Signup
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-500 transition-all duration-300 group-hover:w-full"></span>
        </a>
        <a
          href="#login" // Replace with your actual login route
          className="text-gray-800 hover:text-amber-800 transition-colors duration-300 relative group text-sm md:text-base"
        >
          Login
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-500 transition-all duration-300 group-hover:w-full"></span>
        </a>
        <a
          href="#about" // Replace with your actual login route
          className="text-gray-800 hover:text-amber-800 transition-colors duration-300 relative group text-sm md:text-base"
        >
          About
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-500 transition-all duration-300 group-hover:w-full"></span>
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
