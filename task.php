<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Manage Task - Work Pulse</title>
    <link rel="stylesheet" href="task.css">
    <link rel="stylesheet" href="sidebar.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">
</head>

<body>
    <div>
        <?php include "sidebar.php"; ?>
        <div class="main-content">
            <button class="menu-toggle" id="toggleBtn">
                <i class="fas fa-bars"></i>
            </button>
    
            <div class="page-header">
                <h1>Manage Task</h1>
                <p>Dashboard > Tasks</p>
            </div>
    
            <div class="top-bar">
                <div class="search-box">
                    <i class="fas fa-search"></i>
                    <input 
                        type="text" id="searchTask" placeholder="Search task...">
                </div>

                <div class="filter-box">
                    <select id="departmentFilter">
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

                <div class="filter-box">
                    <select id="statusFilter">
                        <option value="all">All Status</option>
                        <option value="Pending">Pending</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>

                <a href="add_task.php" class="add-btn">
                    <i class="fas fa-plus"></i>
                    Add Task
                </a>
            </div>
    
            <div class="table-card">
                <table>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Task Title</th>
                            <th>Department</th>
                            <th>Assigned Staff</th>
                            <th>Due Date</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
    
                    <tbody id="taskTable">
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    
    <script type="module" src="task.js"></script>
</body>
</html>