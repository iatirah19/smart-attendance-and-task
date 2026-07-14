<?php

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Manage Staff</title>
    <link rel="stylesheet" href="staff.css">
    <link rel="stylesheet" href="sidebar.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">
</head>

<body> 
    <div>
        <!-- Sidebar -->
        <?php include 'sidebar.php'; ?>

        <!-- Main Content -->
        <main class="main-content">

            <!-- Menu Toggle -->
            <button class="menu-toggle" id="toggleBtn">
                <i class="fas fa-bars"></i>
            </button>

            <!-- Page Header -->
            <div class="page-header">
                <div>
                    <h1>Manage Staff</h1>
                    <p>
                        View and manage all staff by department.
                    </p>
                </div>
            </div>

            <!-- Search & Filter -->
            <div class="top-bar">
                <div class="search-box">
                    <i class="fas fa-search"></i>
                    <input type="text" id="searchInput" placeholder="Search staff...">
                </div>

                <div class="filter-box">
                    <select id="departmentFilter">
                        <option value="all">
                            All Department
                        </option>
                    </select>
                </div>
            </div>

            <!-- Staff Table -->
            <div class="table-card">
                <table>
                    <thead>
                        <tr>
                            <th>Staff ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Department</th>
                            <th>Position</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody id="staffTable">
                        <!-- Firebase data will display here -->
                    </tbody>
                </table>
            </div>
        </main>
    </div>
    <script type="module" src="staff.js"></script>
</body>
</html>