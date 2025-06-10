import { useState, useEffect } from 'react';
import axios from 'axios';
import { FiTrash2, FiPlus, FiCheck } from 'react-icons/fi';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const API_URL = 'http://localhost/todo-app/tasks.php';

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(API_URL);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const addTask = async () => {
    if (newTask.trim() === '') return;
    
    try {
      const response = await axios.post(API_URL, { title: newTask });
      setTasks([response.data, ...tasks]);
      setNewTask('');
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}?id=${id}`);
      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const toggleComplete = async (id) => {
    try {
      const updatedTasks = tasks.map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
      );
      setTasks(updatedTasks);
      await axios.put(`${API_URL}?id=${id}`, { 
        completed: !tasks.find(task => task.id === id).completed 
      });
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  return (
    <div className="app-container">
      <div className="todo-app">
        <header className="app-header">
          <h1>My Tasks</h1>
          <p>Get things done, one task at a time</p>
        </header>
        
        <div className="input-container">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTask()}
            placeholder="What needs to be done?"
            className="task-input"
          />
          <button onClick={addTask} className="add-button">
            <FiPlus className="button-icon" /> Add Task
          </button>
        </div>
        
        <div className="tasks-list">
          {tasks.length === 0 ? (
            <div className="empty-state">
              <FiCheck className="empty-icon" />
              <p>No tasks yet. Add your first task above!</p>
            </div>
          ) : (
            tasks.map((task) => (
              <div 
                key={task.id} 
                className={`task-item ${task.completed ? 'completed' : ''}`}
              >
                <div 
                  className="task-checkbox"
                  onClick={() => toggleComplete(task.id)}
                >
                  {task.completed && <FiCheck className="check-icon" />}
                </div>
                <span className="task-text">{task.title}</span>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="delete-button"
                >
                  <FiTrash2 className="delete-icon" />
                </button>
              </div>
            ))
          )}
        </div>
        
        <footer className="app-footer">
          <p>{tasks.length} {tasks.length === 1 ? 'task' : 'tasks'} remaining</p>
        </footer>
      </div>
    </div>
  );
}

export default App;