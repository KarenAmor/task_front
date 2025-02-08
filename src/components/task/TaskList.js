import React, { useState, useEffect } from 'react';
import { useAuth } from "../context/AuthContext";

export default function TaskList() {
  const [tasks, setTasks] = useState([]); // Estado para las tareas
  const [loading, setLoading] = useState(true); // Estado para el estado de carga
  const [error, setError] = useState(null); // Estado para manejar errores
  const [page, setPage] = useState(1); // Estado para la página actual
  const limit = 5; // Número de tareas por página

  const { token } = useAuth(); // Obtén el token del contexto

  useEffect(() => {
    console.log("Ejecutando useEffect"); // Log para indicar que useEffect se ejecutó
    console.log("Token:", token); // Log para verificar el token
    console.log("Página actual:", page); // Log para verificar la página actual
    if (!token) {
      setError("No estás autenticado. Por favor, inicia sesión.");
      setLoading(false);
      return;
    }
    setLoading(true); // Reinicia el estado de carga al cambiar de página
    fetch(`https://task-manager-6tex.onrender.com/tasks?page=${page}&limit=${limit}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // Agrega el token al encabezado de autorización
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error HTTP! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setTasks(data); // Actualiza las tareas en el estado
        setLoading(false); // Detiene la pantalla de carga
      })
      .catch(error => {
        console.error('Error al obtener las tareas:', error);
        setError(error.message); // Guarda el mensaje de error
        setLoading(false); // Detiene la pantalla de carga
      });
  }, [page, token]); // Cambia cuando la página cambia

  // Muestra un indicador de carga mientras se obtienen las tareas
  if (loading) {
    return <div>Cargando...</div>;
  }

  // Muestra el mensaje de error si ocurrió algún problema
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Función para cambiar a la página anterior
  const handlePrevious = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  // Función para cambiar a la página siguiente
  const handleNext = () => {
    setPage(page + 1);
  };

  // Renderiza la lista de tareas con paginación
  return (
    <div>
      <h1>Lista de Tareas</h1>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <strong>{task.title}</strong> - {task.description}
            <br />
            <span>Estado: {task.completed ? "Completada" : "Pendiente"}</span>
          </li>
        ))}
      </ul>
      <div>
        <button onClick={handlePrevious} disabled={page === 1}>
          Anterior
        </button>
        <span> Página {page} </span>
        <button onClick={handleNext}>Siguiente</button>
      </div>
    </div>
  );
}