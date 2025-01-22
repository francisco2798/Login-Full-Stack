// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';
import ProtectedPage from './components/ProtectedPage';
import './styles.css';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Bienvenido a la Prueba Técnica de Login</h1>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/protected" element={<ProtectedPage />} />
        </Routes>
      </header>
    </div>
  );
}

const WrappedApp = () => (
  <Router>
    <App />
  </Router>
);

export default WrappedApp;
