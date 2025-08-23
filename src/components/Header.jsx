// Header.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Header.css';

export default function Header() {
  return (
    <header className="header">
      <div className="logo">
        <span className="logo-travel">Travel</span>
        <span className="logo-trucks">Trucks</span>
      </div>
      <nav className="nav">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? 'nav-link active' : 'nav-link'
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/catalog"
          className={({ isActive }) =>
            isActive ? 'nav-link active' : 'nav-link'
          }
        >
          Catalog
        </NavLink>
      </nav>
    </header>
  );
}
