<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Manage Attendance - Work Pulse</title>
    <link rel="stylesheet" href="attendance.css">
    <link rel="stylesheet" href="sidebar.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">
</head>

<body>

<?php include 'sidebar.php'; ?>

<div class="main-content">

    <button class="menu-toggle" id="toggleBtn">
        <i class="fas fa-bars"></i>
    </button>

    <div class="page-header">
        <h1>Manage Attendance</h1>
        <p>Dashboard > Attendance</p>
    </div>

    <div class="top-bar">
        <div class="filter-box">
            <select id="workModeFilter">
                <option value="all">
                    All
                </option>
    
                <option value="Office">
                    Office
                </option>
    
                <option value="WFH">
                    WFH
                </option>
    
                <option value="Leave">
                    Leave
                </option>
            </select>
        </div>
    </div>

    <div class="table-card">

        <table>

            <thead>
                <tr>
                    <th>Staff Name</th>
                    <th>Date</th>
                    <th>Check In</th>
                    <th>Check Out</th>
                    <th>Work Mode</th>
                    <th>Reason</th>
                    <th>Status</th>
                </tr>
            </thead>

            <tbody id="attendanceTable">
            </tbody>

        </table>

    </div>

</div>

<script type="module" src="attendance.js"></script>

</body>
</html>