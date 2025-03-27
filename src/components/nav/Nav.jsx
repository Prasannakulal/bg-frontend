import React, { useState } from 'react';
import './Nav.css';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* Logo */}
        <a  href="/" className="logo">
          BgRem
        </a>

        {/* Desktop Navigation */}
        <div className="nav-links">
          <a href="/" className="nav-link">Home</a>
          <a href="/features" className="nav-link">Features</a>
          <a href="/pricing" className="nav-link">Pricing</a>
          <button className="signup-btn">Sign Up</button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="mobile-menu-btn"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
        <a href="/" className="nav-link">Home</a>
        <a href="/features" className="nav-link">Features</a>
        <a href="/pricing" className="nav-link">Pricing</a>
        <button className="signup-btn">Sign Up</button>
      </div>
    </nav>
  );
}

export default Navbar;