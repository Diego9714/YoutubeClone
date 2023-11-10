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
          <li><a href="/register-videos">Register Videos</a></li>
          <li><a href="/popular">Popular</a></li>
          <li><a href="/history">History</a></li>
          <li><a href="/statistics">Statistics</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
