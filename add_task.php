<?php
session_start();

$username = $_SESSION['username'] ?? "Admin";
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Add Task - Work Pulse</title>
    <link rel="stylesheet" href="CSS/add_task.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">
</head>
<body>
    <div class="dashboard-container">

        <div class="main-content">

            <div class="page-header">
                <h1>Add New Task</h1>
                <p>Assign task to staff</p>
            </div>


            <div class="form-container">
                <form id="taskForm">
                    <div class="form-group">
                        <label>Task ID</label>
                        <input type="text" id="task_id" placeholder="Enter task ID" required>
                    </div>

                    <div class="form-group">
                        <label>Task Title</label>
                        <input type="text" id="title" placeholder="Enter task title" required>
                    </div>
                    
                    <div class="form-group">
                        <label>Description</label>
                        <textarea id="description" rows="5" placeholder="Enter task description" required></textarea>
                    </div>
                    
                    <div class="form-group">
                        <label>
                            Department
                        </label>
                        <select id="departmentDropdown" required>
                            <option value="">-- Select Department --</option>
                            <option value="all">All Departments</option>
                            <option value="Human Resources (HR)">Human Resources (HR)</option>
                            <option value="Information Technology (IT)">Information Technology (IT)</option>
                            <option value="Finance">Finance</option>
                            <option value="Marketing">Marketing</option>
                            <option value="Supply Chain">Supply Chain</option>
                            <option value="Maintenance">Maintenance</option>
                            <option value="Data Analytics">Data Analytics</option>
                            <option value="Administrator">Administrator</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label>Assign To</label>
                        <select id="assigned_to" required>
                            <option value="">Select Staff</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label>Due Date</label>
                        <input type="datetime-local" id="due_date" required>
                    </div>
                    
                    <div class="form-group">
                        <label>Status</label>
                        <select id="status">
                            <option value="">Select Status</option>
                            <option value="Pending">Pending</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </div>
                    
                    <div class="button-group">
                        <button type="button" class="cancel-btn" onclick="history.back()">
                            Cancel
                        </button>

                        <button type="submit" class="save-btn">
                            <i class="fa-solid fa-plus"></i>
                            Create Task
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <script type="module" src="JS/add_task.js"></script>
</body>
</html>