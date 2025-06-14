# Todo App with React + PHP

A modern Todo application with React frontend and PHP backend with MySQL database.

## Features

- Add new tasks
- Mark tasks as complete
- Delete tasks
- Clean, responsive UI
- Persistent data storage
- RESTful API backend

## Tech Stack

**Frontend:**
- React (Vite)
- Axios for API calls
- React Icons
- Vanilla CSS 

**Backend:**
- PHP
- MySQL
- REST API architecture

## Local Setup

### Prerequisites
- Node.js (v16+)
- PHP (v7.4+)
- MySQL
- XAMPP/WAMP/MAMP (recommended)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/todo-app.git
   cd todo-app
   ```

2. **Backend Setup**

a. Place the `backend` folder in your web server directory (e.g., htdocs)
b. Create MySQL database:

```bash
CREATE DATABASE todo_app;
USE todo_app;
CREATE TABLE tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  completed TINYINT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```
Update `backend/db.php` with your database credentials.

3. **Frontend Setup**

```bash
cd frontend
npm install
```

4. ***Configure API URL***
Edit `frontend/src/App.jsx`:
```bash
const API_URL = 'http://localhost/backend/tasks.php';
```

## Running the Application

1. Start your PHP server (XAMPP/WAMP/MAMP)
2. Run React frontend:
```bash
cd frontend
npm run dev
```
3. Access the app at `http://localhost:5173`#   p h p - t o d o - w e b a p p  
 