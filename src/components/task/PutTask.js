import React, { useState, useCallback } from 'react';

export default function PutTask() {
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [taskId, setTaskId] = useState('');
  const [token, setToken] = useState(''); // Estado para el token
  const [editTask, setEditTask] = useState({
    title: '',
    description: '',
    completed: false,
  });

  const fetchTask = useCallback(() => {
    if (!taskId) {
      setError('Debe ingresar un ID válido para buscar.');
      return;
    }
    if (!token) {
      setError('Debe ingresar un token de autenticación.');
      return;
    }
    setLoading(true);
    setError(null);
    fetch(`https://task-manager-6tex.onrender.com/tasks/${taskId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error HTTP! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setTask(data);
        setEditTask({
          title: data.title,
          description: data.description,
          completed: data.completed,
        });
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error al obtener la tarea:', error);
        setError(error.message);
        setLoading(false);
      });
  }, [taskId, token]);

  const updateTask = () => {
    if (!taskId) {
      setError('Debe ingresar un ID válido para modificar.');
      return;
    }
    if (!token) {
      setError('Debe ingresar un token de autenticación.');
      return;
    }
    setLoading(true);
    setError(null);
    fetch(`https://task-manager-6tex.onrender.com/tasks/${taskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(editTask),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error HTTP! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setTask(data);
        setLoading(false);
        alert('Tarea modificada con éxito');
      })
      .catch((error) => {
        console.error('Error al modificar la tarea:', error);
        setError(error.message);
        setLoading(false);
      });
  };

  return (
    <div>
      <h1>Gestionar Tarea</h1>
      <input
        type="text"
        placeholder="Pegar token de autenticación"
        value={token}
        onChange={(e) => setToken(e.target.value)}
        style={{ width: '100%', marginBottom: '10px' }}
      />
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
          <h2>Editar Tarea</h2>
          <input
            type="text"
            placeholder="Título"
            value={editTask.title}
            onChange={(e) => setEditTask({ ...editTask, title: e.target.value })}
          />
          <textarea
            placeholder="Descripción"
            value={editTask.description}
            onChange={(e) => setEditTask({ ...editTask, description: e.target.value })}
          />
          <label>
            <input
              type="checkbox"
              checked={editTask.completed}
              onChange={(e) => setEditTask({ ...editTask, completed: e.target.checked })}
            />
            Completada
          </label>
          <button onClick={updateTask}>Modificar</button>
        </div>
      )}
    </div>
  );
}