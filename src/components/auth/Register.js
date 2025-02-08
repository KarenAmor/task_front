import React, { useState } from 'react';

export default function Register() {
  const [register, setRegister] = useState({
    username: '',
    password: '',
  });

  // Función para manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target; // Acceder a "name" y "value" del input
    setRegister((prevState) => ({
      ...prevState,
      [name]: value, // Actualizar el estado de forma dinámica
    }));
  };

  // Función para manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('Formulario enviado con los siguientes datos:', register);

    fetch('https://task-manager-6tex.onrender.com/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(register), // Aquí se convierte el objeto del estado en un JSON
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error en la respuesta del servidor: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Registro agregado exitosamente:', data);
      })
      .catch((error) => {
        console.error('Error al agregar el registro:', error);
      });
  };

  return (
    <div>
      <h1>Formulario de Registro</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Nombre de usuario:</label>
          <input
            type="text"
            id="username"
            name="username" // El "name" debe coincidir con las claves del estado
            value={register.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password" // Cambiado a "password" para mayor seguridad
            id="password"
            name="password" // El "name" debe coincidir con las claves del estado
            value={register.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
}