//import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './components/Home';
import TaskList from './components/task/TaskList';
import Register from './components/auth/Register'
import Login from './components/auth/Login';
import TaskForm from './components/task/TaskForm';
import OneTask from './components/task/OneTask';
import PutTask from './components/task/PutTask'
import DeleteTask from './components/task/DeleteTask';


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tasks" element={<TaskList />} />
        <Route path="/registers" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-task" element={<TaskForm />} />
        <Route path="/one-task" element={<OneTask />} />
        <Route path="/put-task" element={<PutTask />} />
        <Route path="/delete-task" element={<DeleteTask />} />
      </Routes>
    </Router>
  );
}

export default App;
