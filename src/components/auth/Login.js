import React, { useState } from 'react';
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [login, setLogin] = useState({
    username: '',
    password: '',
  });

  const { login: saveToken } = useAuth(); // Extrae la función `login` del contexto


  // Función para manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target; // Acceder a "name" y "value" del input
    setLogin((prevState) => ({
      ...prevState,
      [name]: value, // Actualizar el estado de forma dinámica
    }));
  };

  // Función para manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('Formulario enviado con los siguientes datos:', login);

    fetch('https://task-manager-6tex.onrender.com/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(login), // Aquí se convierte el objeto del estado en un JSON
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error en la respuesta del servidor: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Bienvenido a su aplicacion de tareas:', data);
      
   // Guardar el token en localStorage
   localStorage.setItem('access_token', data.access_token);
   alert('Inicio de sesión exitoso');
 })
      .catch ((error) => {
    console.error('Error al agregar el logearse:', error);
  });
};

return (
  <div>
    <h1>Formulario de Login</h1>
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Usuario:</label>
        <input
          type="text"
          id="username"
          name="username" // El "name" debe coincidir con las claves del estado
          value={login.username}
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
          value={login.password}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
);
}