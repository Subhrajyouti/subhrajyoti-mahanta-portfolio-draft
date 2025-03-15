
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="fixed w-full z-50 py-8 px-8">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-medium">
          Subhrajyoti.
        </Link>
        
        <div className="flex items-center space-x-8">
          <a href="#home" className="text-sm hover:text-accent transition-colors">Home</a>
          <a href="#about" className="text-sm hover:text-accent transition-colors">About</a>
          <a href="#projects" className="text-sm hover:text-accent transition-colors">Projects</a>
          <a href="#resume" className="text-sm hover:text-accent transition-colors">Resume</a>
          <a href="#contact" className="text-sm hover:text-accent transition-colors">Contact</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
