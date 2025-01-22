import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = data => {
    fetch('http://localhost:5000/login', {
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
      localStorage.setItem('token', data.token);
      window.location.href = '/protected';
    })
    .catch(error => {
      setErrorMessage(error.message);
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form-container">
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      <div className="form-group">
        <input {...register("email", { required: true, pattern: /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/ })} placeholder="Correo electrónico" className="form-control" />
        {errors.email && <span className="text-danger">Formato de correo inválido</span>}
      </div>

      <div className="form-group">
        <input {...register("password", { required: true })} type="password" placeholder="Contraseña" className="form-control" />
        {errors.password && <span className="text-danger">Campo requerido</span>}
      </div>

      <button type="submit" className="btn btn-primary">Iniciar sesión</button>
      <div className="register-link">
        ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
      </div>
    </form>
  );
}

export default LoginForm;
