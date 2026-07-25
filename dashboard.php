<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Dashboard - Work Pulse</title>
    <link rel="stylesheet" href="CSS/dashboard.css">
    <link rel="stylesheet" href="CSS/sidebar.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">
</head>

<body>

    <div class="dashboard-container" id="dashboardContent" style="display:none;">
    
        <!-- Sidebar -->
        <?php include 'sidebar.php'; ?>

        <main class="main-content">

            <button class="menu-toggle" id="toggleBtn">
                <i class="fas fa-bars"></i>
            </button>

            <div class="welcome">
                <h1>
                    Welcome, 
                    <span id="adminName">
                        Admin
                    </span>
                    ! 👋
                </h1>
                <p>
                    Manage your employees, attendance and tasks efficiently.
                </p>
            </div>
    
            <!-- Statistic Cards -->
            <div class="cards">
                <div class="card">
                    <div class="icon">
                        👥
                    </div>
                    <div>
                        <h3>
                            Total Staff
                        </h3>
                        <h1 id="totalStaff">
                            0
                        </h1>
                        <p>
                            Active Employees
                        </p>
                    </div>
                </div>
                
                <div class="card">

                    <div class="icon">
                        🕒
                    </div>

                    <div>
                        <h3>
                            Today's Attendance
                        </h3>
                        <div class="attendance-status">
                            <span>
                                Present
                                <b id="presentToday">
                                    0
                                </b>
                            </span>

                            <span>
                                Leave
                                <b id="leaveToday">
                                    0
                                </b>
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Work Mode -->
            <div class="section">
                <h2>
                    Today's Work Mode
                </h2>

                <div class="work-mode">
                    <div>
                        🏢 Office
                        <strong id="officeMode">
                            0
                        </strong>
                    </div>

                    <div>
                        🏠 WFH
                       <strong id="wfhMode">
                            0
                        </strong>
                    </div>

                    <div>
                        🏖 Leave
                        <strong id="leaveMode">
                            0
                        </strong>
                    </div>
                </div>
            </div>

            <!-- Announcement -->
            <div class="section">
                <div class="section-header">
                    <h2>
                        📢 Latest Announcement
                    </h2>

                    <a href="announcement.php">
                        View All
                    </a>
                </div>

                <div id="announcementList">
                    <p>
                        Loading announcement...
                    </p>
                </div>
            </div>
        </main>
    </div>
    <script type="module" src="JS/dashboard.js"></script>
</body>
</html>