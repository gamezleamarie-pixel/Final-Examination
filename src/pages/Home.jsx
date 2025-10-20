import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/App.css";

export default function Home() {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <div className={`container my-4 theme-${theme}`}>

      <header className="text-center mb-5">
        <h1 className="display-6 fw-bold">Welcome</h1>
        <p className="text-muted">
          Streamline your reservations and manage bookings in one place
        </p>
      </header>

      <div className="row g-4">
        <div className="col-md-6">
          <div className="card border-0 shadow-sm h-100" style={{ backgroundColor: "#ffe6f2" }}>
            <div className="card-body d-flex flex-column">
              <h5 className="card-title text-danger">Create a Booking</h5>
              <p className="card-text flex-grow-1">
                Add a new guest reservation quickly with essential details like guest name,
                room type, dates, and contact information.
              </p>
              <Link to="/manage" className="btn btn-danger align-self-start">Start Booking</Link>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">Manage Bookings</h5>
              <p className="card-text flex-grow-1">
                View, search, edit, and delete existing bookings. Keep your stay schedule up to date.
              </p>
              <Link to="/manage" className="btn btn-outline-danger align-self-start">Go to Manage</Link>
            </div>
          </div>
        </div>
      </div>

      <section className="mt-5">
        <h6 className="text-uppercase text-muted">Why choose this tool</h6>
        <ul className="mt-3 mb-0">
          <li className="mb-2">Simple interface for fast data entry</li>
          <li className="mb-2">Search and filter to find bookings instantly</li>
          <li className="mb-2">Light/Dark theme for comfortable use</li>
        </ul>
      </section>
    </div>
  );
}

