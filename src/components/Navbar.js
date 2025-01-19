import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/tasks">Lista de Tareas</Link></li>
        <li><Link to="/registers">Registro</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/create-task">Agregar Tarea</Link></li>
        <li><Link to="/one-task">Ver Tarea</Link></li>
        <li><Link to="/put-task">Modificar Tarea</Link></li>
        <li><Link to="/delete-task">Eliminar Tarea</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;