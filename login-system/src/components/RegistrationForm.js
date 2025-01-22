// src/components/RegistrationForm.js
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const RegistrationForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const onSubmit = data => {
    fetch('http://localhost:5000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      if (!response.ok) {
        return response.text().then(text => { throw new Error(text); });
      }
      return response.json();
    })
    .then(data => {
      setSuccessMessage('Registro exitoso!');
      setTimeout(() => {
        navigate('/');
      }, 2000); // Redirige a la página principal después de 2 segundos
    })
    .catch(error => {
      setSuccessMessage('');
      console.error('Error:', error);
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form-container">
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      <div className="form-group">
        <input {...register("name", { required: true })} placeholder="Nombre" className="form-control" />
        {errors.name && <span className="text-danger">Campo requerido</span>}
      </div>

      <div className="form-group">
        <input {...register("email", { required: true, pattern: /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/ })} placeholder="Correo electrónico" className="form-control" />
        {errors.email && <span className="text-danger">Formato de correo inválido</span>}
      </div>

      <div className="form-group">
        <input {...register("password", { required: true })} type="password" placeholder="Contraseña" className="form-control" />
        {errors.password && <span className="text-danger">Campo requerido</span>}
      </div>

      <button type="submit" className="btn btn-primary">Registrarse</button>
    </form>
  );
}

export default RegistrationForm;
