<?php
include 'db.php';

// Get all tasks
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $sql = "SELECT * FROM tasks ORDER BY created_at DESC";
    $result = $conn->query($sql);
    
    $tasks = array();
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $tasks[] = $row;
        }
    }
    
    echo json_encode($tasks);
}

// Add new task
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    $title = $data['title'];
    
    $sql = "INSERT INTO tasks (title, completed) VALUES ('$title', 0)";
    if ($conn->query($sql) === TRUE) {
        $task_id = $conn->insert_id;
        $response = array(
            'id' => $task_id,
            'title' => $title,
            'completed' => 0,
            'created_at' => date('Y-m-d H:i:s')
        );
        echo json_encode($response);
    } else {
        echo json_encode(array('error' => $conn->error));
    }
}

// Delete task
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $id = $_GET['id'];
    $sql = "DELETE FROM tasks WHERE id=$id";
    
    if ($conn->query($sql) === TRUE) {
        echo json_encode(array('message' => 'Task deleted successfully'));
    } else {
        echo json_encode(array('error' => $conn->error));
    }
}

$conn->close();
?>