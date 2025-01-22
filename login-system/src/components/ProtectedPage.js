import React, { useEffect, useState } from 'react';

const ProtectedPage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch('http://localhost:3000/protected', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to fetch');
        }
      })
      .then(data => {
        setUser(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error:', error);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (!user) {
    return <p>Acceso denegado. Por favor, inicia sesión.</p>;
  }

  return (
    <div>
      <h1>Bienvenido, {user.name}</h1>
      <button onClick={handleLogout}>Cerrar sesión</button>
    </div>
  );
}

export default ProtectedPage;
