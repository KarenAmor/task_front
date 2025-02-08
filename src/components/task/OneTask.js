import React, { useState, useCallback } from 'react';

export default function OneTask() {
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [taskId, setTaskId] = useState('');

  const fetchTask = useCallback(() => {
    if (!taskId) {
      setError('Debe ingresar un ID válido para buscar.');
      return;
    }
    setLoading(true);
    setError(null);
    fetch(`https://task-manager-6tex.onrender.com/tasks/${taskId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error HTTP! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setTask(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error al obtener la tarea:', error);
        setError(error.message);
        setLoading(false);
      });
  }, [taskId]);

  return (
    <div>
      <h1>Buscar Tarea</h1>
      <input
        type="text"
        placeholder="Ingrese el ID de la tarea"
        value={taskId}
        onChange={(e) => setTaskId(e.target.value)}
      />
      <button onClick={fetchTask}>Buscar</button>
      {loading && <div>Cargando...</div>}
      {error && <div style={{ color: 'red' }}>Error: {error}</div>}
      {task && (
        <div>
          <h2>{task.title}</h2>
          <p>{task.description}</p>
          <span>Estado: {task.completed ? 'Completada' : 'Pendiente'}</span>
        </div>
      )}
    </div>
  );
}