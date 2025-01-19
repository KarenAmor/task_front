import React, { useState, useEffect } from 'react';

export default function TaskList() {
  const [tasks, setTasks] = useState([]); // Estado para las tareas
  const [loading, setLoading] = useState(true); // Estado para el estado de carga
  const [error, setError] = useState(null); // Estado para manejar errores
  const [page, setPage] = useState(1); // Estado para la página actual
  const limit = 5; // Número de tareas por página

  useEffect(() => {
    setLoading(true); // Reinicia el estado de carga al cambiar de página
    fetch(`https://task-manager-6tex.onrender.com/tasks?page=${page}&limit=${limit}`)
      .then(response => {
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
  }, [page]); // Cambia cuando la página cambia

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