import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar({ theme, onToggleTheme, auth, onLogout }) {
  return (
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: 'var(--primary)', color: 'var(--text)' }}>
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold text-white" to="/">💗 Hotel Booking System</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMain" aria-controls="navMain" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navMain">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link text-white" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/manage">Manage</Link>
            </li>
          </ul>
          <div className="d-flex align-items-center">
            {auth ? (
              <button className="btn btn-sm btn-outline-light" onClick={onLogout}>Logout</button>
            ) : (
              <>
                <Link className="btn btn-sm btn-outline-light me-2" to="/login">Login</Link>
                <Link className="btn btn-sm btn-light" to="/register">Register</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
