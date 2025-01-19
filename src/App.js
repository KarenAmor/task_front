//import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import TaskList from './components/TaskList';
import Register from './components/Register'
import Login from './components/Login';
import TaskForm from './components/TaskForm';
import OneTask from './components/OneTask';
import PutTask from './components/PutTask'
import DeleteTask from './components/DeleteTask';


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
