// src/components/HomePage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="homepage-container">
      <h1>Bienvenido a la Página Principal</h1>
      <button onClick={goToLogin} className="btn btn-primary">Ir a Login</button>
    </div>
  );
}

export default HomePage;
