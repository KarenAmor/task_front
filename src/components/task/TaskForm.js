import React, { useState } from 'react';

export default function TaskForm() {
  const [task, setTask] = useState({
    title: '',
    description: '',
  });

  // Función para manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log('Estado actualizado de las tareas:', task);  // Verificar el estado después de cada cambio
  };

  // Función para manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Formulario enviado con los siguientes datos:', task);  // Depurar el estado que se está enviando

    fetch('https://task-manager-6tex.onrender.com/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    })
      .then((response) => {
        console.log('Respuesta del servidor:', response);
        
        // Verificar si la respuesta fue exitosa
        if (!response.ok) {
          throw new Error(`Error en la respuesta del servidor: ${response.statusText}`);
        }

        return response.json();
      })
      .then((data) => {
        console.log('Tarea agregada exitosamente:', data);
      })
      .catch((error) => {
        console.error('Error al agregar la tarea:', error);
      });
  };

  return (
    <div>
      <h1>Formulario de Tareas</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Título de la tarea:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={task.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Descripción:</label>
          <input
            type="text"
            id="description"
            name="description"
            value={task.description}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Agregar Tarea</button>
      </form>
    </div>
  );
}