<?php
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Manage Announcement - Work Pulse</title>
    <link rel="stylesheet" href="announcement.css">
    <link rel="stylesheet" href="sidebar.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">
</head>

<body>

    <div>

        <?php include 'sidebar.php'; ?>

        <main class="main-content">

            <button class="menu-toggle" id="toggleBtn">

                <i class="fas fa-bars"></i>

            </button>

            <!-- Header -->
            <div class="page-header">

                <div>

                    <h1>
                        Announcement Management
                    </h1>

                    <p>
                        Manage all company announcements.
                    </p>

                </div>

            </div>

            <!-- Filter -->
            <div class="top-bar">
                <div class="filter-box">
                    <select id="targetFilter">
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

                <a href="add_announcement.php" class="add-btn">
                    <i class="fas fa-plus"></i>
                    Add Announcement
                </a>
            </div>

            <!-- Table -->
            <div class="table-card">
                <table>
                    <thead>
                        <tr>

                            <th>
                                No
                            </th>

                            <th>
                                Title
                            </th>

                            <th>
                                Content
                            </th>

                            <th>
                                Created By
                            </th>

                            <th>
                                Target Role
                            </th>

                            <th>
                                Created At
                            </th>

                            <th>
                                Action
                            </th>

                        </tr>
                    </thead>
                    <tbody id="announcementTable">

                        <!-- Firebase Data -->

                    </tbody>
                </table>
            </div>
        </main>
    </div>
    <script type="module" src="announcement.js"></script>
</body>

</html>