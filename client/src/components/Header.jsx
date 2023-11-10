import React from 'react';
import '../styles/Header.css';
import logo from '../assets/logo/logo.png'

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <img src={logo} alt="Logo" />
        <span>YouTube Clone</span>
      </div>
      <nav className="navigation">
        <ul>
          <li><a href="/home">Home</a></li>
          <li><a href="/login">Login</a></li>
          <li><a href="/">Register</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
