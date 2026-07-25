<?php
session_start();

// Contoh
$adminName = $_SESSION['username'] ?? 'Admin';
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Add Announcement - Work Pulse</title>
    <link rel="stylesheet" href="add_announcement.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">
</head>

<body>
    <div class="dashboard-container">
        <main class="main-content">

            <div class="page-header">
                <div>
                    <h1>Add Announcement</h1>
                    <p>Create announcement for company staff.</p>
                </div>
            </div>
            
            <form id="announcementForm">
                <div class="form-card">
                    <div class="form-group">
                        <label>Announcement Title</label>
                        <input type="text" id="title" required>
                    </div>
                    
                    <div class="form-group">
                        <label>
                            Target Department
                        </label>
                        <select id="target_role" required>
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
                        <label>Announcement Content</label>
                        <textarea id="content" rows="8" required></textarea>
                    </div>

                    <div class="button-group">
                        <a href="announcement.php" class="cancel-btn">
                        Cancel
                        </a>
                        
                        <button type="submit" class="save-btn">
                            <i class="fas fa-paper-plane"></i>
                            Publish Announcement
                        </button>
                    </div>
                </div>
            </form>
        </main>
    </div>
    <script type="module" src="add_announcement.js"></script>
</body>
</html>