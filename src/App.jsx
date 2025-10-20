import React, { useLayoutEffect, useReducer, useMemo, useState } from 'react';
import { Routes, Route, Navigate, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ManageBookings from './pages/ManageBookings';
import Login from './pages/Login';
import Register from './pages/Register';
import useTheme from './hooks/useTheme';
import "./styles/App.css";

// reducer for selection / UI state (example of useReducer)
const initialState = { selectedBooking: null };
function reducer(state, action) {
  switch(action.type) {
    case 'select': return { ...state, selectedBooking: action.payload };
    case 'clear': return { ...state, selectedBooking: null };
    default: return state;
  }
}

export default function App(){
  const { theme, toggleTheme } = useTheme('pink'); // custom hook
  const [auth, setAuth] = useState(() => {
    try { return JSON.parse(localStorage.getItem('auth')) || null; } catch { return null; }
  });

  useLayoutEffect(()=> {
    // ensure app min height
    document.documentElement.style.minHeight = '100%';
  }, []);

  const greeting = useMemo(()=> `Hotel Booking System`,[]);

  const login = (user) => {
    const payload = { user };
    setAuth(payload);
    localStorage.setItem('auth', JSON.stringify(payload));
  };
  const logout = () => {
    setAuth(null);
    localStorage.removeItem('auth');
  };

  function ProtectedRoute({ children }) {
    if (!auth) return <Navigate to="/login" replace />;
    return children;
  }

  return (
    <>
      <Navbar theme={theme} onToggleTheme={toggleTheme} auth={auth} onLogout={logout} />
      <div className="container my-3">
        <h6 className="m-0">{greeting}</h6>
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login onLoggedIn={login} />} />
        <Route path="/register" element={<Register onRegistered={login} />} />
        <Route
          path="/manage"
          element={
            <ProtectedRoute>
              <ManageBookings />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}


